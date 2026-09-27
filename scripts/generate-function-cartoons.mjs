// scripts/generate-function-cartoons.mjs
// Tekent voor elke functie op /projects/functions een cartoon van de robot
// met dat werktuig erop, en schrijft die als SVG naar
// src/lib/assets/function_cartoons/func_<nr>.svg.
//
// Run met: node scripts/generate-function-cartoons.mjs
//
// De robot is dezelfde als in de configurator (ConfiguratorPreview.svelte):
// zijaanzicht, rijrichting naar rechts, voor een gestuurd wiel met hubmotor,
// achter een vast wiel met hubmotor, de grote accu achterop en de groene kop
// met gezicht voorop. Net als op het echte prototype staat de witte GPS-dome
// midden op het frame.
//
// Alle coördinaten van de robot zijn "lokaal": grond op y=350, achterwiel op
// x=165, voorwiel op x=475, de zijbalk loopt van x=100 tot x=540 op y=190.
// Een functie kan de hele robot met `dx` opschuiven om plek te maken voor een
// werktuig voor- of achterop. Wat in `behind` en `over` staat, is in
// scènecoördinaten (dus niet verschoven).
//
// De viewBox is ruimer dan de tekening zelf (-40 -30 720 460), zodat de lucht
// en de grond doorlopen als de kaart de afbeelding met object-fit: cover
// bijsnijdt. Houd belangrijke dingen binnen x 40–600 en y 35–365.

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = join(
	dirname(fileURLToPath(import.meta.url)),
	'..',
	'src',
	'lib',
	'assets',
	'function_cartoons'
);

const GROUND = 350;
const REAR_X = 165;
const FRONT_X = 475;
const BEAM_Y = 190;

const INK = '#1f2a22';
const r1 = (n) => Math.round(n * 10) / 10;
const rad = (deg) => (deg * Math.PI) / 180;
const range = (from, to, step) => {
	const out = [];
	for (let v = from; v <= to; v += step) out.push(v);
	return out;
};

// ---------------------------------------------------------------- helpers

/** Een staaf of slang met inktrand: eerst dik en donker, dan de kleur erin. */
function rod(d, w = 8, color = '#b9c3bc') {
	const base = 'fill:none;stroke-linecap:round;stroke-linejoin:round';
	return (
		`<path d="${d}" style="${base};stroke:${INK};stroke-width:${w + 6}"/>` +
		`<path d="${d}" style="${base};stroke:${color};stroke-width:${w}"/>`
	);
}

/** Lijn met pijlpunt (of twee). */
function arrow(x1, y1, x2, y2, color = '#2f9a9e', both = false, w = 4) {
	const a = Math.atan2(y2 - y1, x2 - x1);
	const head = (x, y, ang) => {
		const l = 11;
		const s = 6.5;
		const bx = x - Math.cos(ang) * l;
		const by = y - Math.sin(ang) * l;
		const px = -Math.sin(ang) * s;
		const py = Math.cos(ang) * s;
		return `<path d="M${r1(x)} ${r1(y)} L${r1(bx + px)} ${r1(by + py)} L${r1(bx - px)} ${r1(by - py)} Z" style="fill:${color};stroke:${color};stroke-width:2"/>`;
	};
	const sx = both ? x1 + Math.cos(a) * 8 : x1;
	const sy = both ? y1 + Math.sin(a) * 8 : y1;
	const ex = x2 - Math.cos(a) * 8;
	const ey = y2 - Math.sin(a) * 8;
	return (
		`<path d="M${r1(sx)} ${r1(sy)} L${r1(ex)} ${r1(ey)}" style="fill:none;stroke:${color};stroke-width:${w};stroke-linecap:round"/>` +
		head(x2, y2, a) +
		(both ? head(x1, y1, a + Math.PI) : '')
	);
}

/** Zigzaglijn (licht als golf) van a naar b. */
function zigzag(x1, y1, x2, y2, n = 10, amp = 5) {
	const len = Math.hypot(x2 - x1, y2 - y1);
	const nx = -(y2 - y1) / len;
	const ny = (x2 - x1) / len;
	const pts = range(0, n, 1).map((i) => {
		const t = i / n;
		const off = i === 0 || i === n ? 0 : i % 2 ? amp : -amp;
		return `${r1(x1 + (x2 - x1) * t + nx * off)} ${r1(y1 + (y2 - y1) * t + ny * off)}`;
	});
	return `M${pts.join(' L')}`;
}

/** Tandwiel- of tandenkrans: driehoekjes rond een middelpunt. */
function teeth(cx, cy, rIn, rOut, n, fill, spread = 12) {
	return range(0, n - 1, 1)
		.map((i) => {
			const a = (360 / n) * i;
			const p = (deg, r) => `${r1(cx + Math.cos(rad(deg)) * r)} ${r1(cy + Math.sin(rad(deg)) * r)}`;
			return `<path d="M${p(a - spread, rIn)} L${p(a, rOut)} L${p(a + spread, rIn)} Z" fill="${fill}"/>`;
		})
		.join('');
}

const sprout = (x, y = GROUND, s = 1) => `
  <g class="sprout" transform="translate(${x} ${y}) scale(${s})">
    <path d="M0 0 V-12"/>
    <path d="M0 -8 Q -10 -16 -12 -8 Q -6 -4 0 -8"/>
    <path d="M0 -10 Q 10 -20 13 -11 Q 6 -6 0 -10"/>
  </g>`;

/** Hoog gewas (mais) zoals in het vooraanzicht van de configurator. */
const maize = (x, h = 150, y = GROUND) => `
  <g class="crop" transform="translate(${x} ${y})">
    <path d="M0 0 V-${h}"/>
    ${range(1, Math.floor(h / 45), 1)
			.map((i) => {
				const ly = -i * 42;
				return i % 2
					? `<path d="M0 ${ly} Q 22 ${ly - 16} 30 ${ly - 2} Q 14 ${ly + 4} 0 ${ly}"/>`
					: `<path d="M0 ${ly} Q -22 ${ly - 16} -30 ${ly - 2} Q -14 ${ly + 4} 0 ${ly}"/>`;
			})
			.join('')}
    <path d="M0 -${h} l-6 -12 M0 -${h} l0 -14 M0 -${h} l6 -12" style="stroke:#c9a227;stroke-width:3"/>
  </g>`;

/** Onkruid: getande bladeren met een geel bloemetje. */
const weed = (x, y = GROUND, s = 1) => `
  <g transform="translate(${x} ${y}) scale(${s})">
    <path d="M0 0 L-6 -8 L-12 -6 L-10 -13 L-18 -16 L-8 -18 L0 -6 Z" class="weed"/>
    <path d="M0 0 L6 -9 L13 -7 L11 -14 L19 -17 L8 -19 L0 -6 Z" class="weed"/>
    <path d="M0 -4 V-26" style="stroke:#2f6b2a;stroke-width:2.5"/>
    <circle cx="0" cy="-29" r="5.5" fill="#f6c945"/>
  </g>`;

/** Grasplukje. */
const tuft = (x, h = 22, y = GROUND) => `
  <path d="M${x - 8} ${y} Q ${x - 7} ${y - h * 0.6} ${x - 12} ${y - h * 0.9} Q ${x - 2} ${y - h * 0.6} ${x} ${y - h} Q ${x + 2} ${y - h * 0.6} ${x + 11} ${y - h * 0.85} Q ${x + 6} ${y - h * 0.5} ${x + 8} ${y} Z" class="blade"/>`;

const cabbage = (x, y = GROUND) => `
  <g transform="translate(${x} ${y})">
    <ellipse cx="0" cy="-14" rx="24" ry="14" fill="#6bb04f"/>
    <circle cx="0" cy="-18" r="12" fill="#a8d67e"/>
    <path d="M-6 -22 Q0 -14 6 -22" style="fill:none;stroke-width:2"/>
  </g>`;

const drop = (x, y, s = 1, fill = '#7fc4d6', cls = '') =>
	`<path transform="translate(${x} ${y}) scale(${s})" d="M0 -10 C 4 -3, 7 1, 7 4 A 7 7 0 0 1 -7 4 C -7 1, -4 -3, 0 -10 Z" fill="${fill}"${cls ? ` class="${cls}"` : ''} style="stroke-width:2"/>`;

/** Kaartje in de lucht, zoals het vooraanzicht in de configurator. */
const card = (x, y, w, h, content) =>
	`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" class="card"/>${content}`;

/** Losse deeltjes die vallen of wegvliegen; `cls` bepaalt de animatie. */
const bits = (pts, draw, cls = 'fall') =>
	pts
		.map(
			([x, y], i) =>
				`<g class="${cls}" style="animation-delay:${r1((i * 0.37) % 1.3)}s">${draw(x, y, i)}</g>`
		)
		.join('');

// ---------------------------------------------------------------- robot

function wheel(x, steered) {
	const r = 42;
	const ay = GROUND - r;
	const legTop = steered ? 212 : 198;
	const holes = range(legTop + 12, ay - 14, 16)
		.map((hy) => `<circle cx="${x}" cy="${hy}" r="2.6" class="hole-dark"/>`)
		.join('');
	return `
    <circle cx="${x}" cy="${ay}" r="${r}" class="tire"/>
    <circle cx="${x}" cy="${ay}" r="${r - 6}" class="tread"/>
    <circle cx="${x}" cy="${ay}" r="${r1(r * 0.62)}" class="hub"/>
    <circle cx="${x}" cy="${ay}" r="${r1(r * 0.34)}" class="hub-inner"/>
    <path transform="translate(${x - 12} ${ay - 24})" d="M16 0 L4 22 H13 L8 40 L22 15 H13 Z" class="bolt"/>
    <rect x="${x - 9}" y="${legTop}" width="18" height="${ay - legTop + 8}" rx="4" class="metal"/>
    ${holes}
    <circle cx="${x}" cy="${ay}" r="5" class="nut"/>
    ${
			steered
				? `<rect x="${x - 22}" y="198" width="44" height="16" rx="5" class="dark"/>
           <rect x="${x + 20}" y="194" width="24" height="22" rx="5" class="motor"/>`
				: ''
		}`;
}

function beam(x1 = 100, x2 = 540) {
	const d = `M${x1} ${BEAM_Y} L${x2} ${BEAM_Y}`;
	const holes = range(x1 + 12, x2 - 6, 24)
		.map((hx) => `<circle cx="${hx}" cy="${BEAM_Y + 1}" r="3" class="hole"/>`)
		.join('');
	return `
    <path d="${d}" class="beam-outline"/>
    <path d="${d}" class="beam"/>
    <path d="${d}" class="beam-shine" transform="translate(0 -5)"/>
    ${holes}`;
}

const beamEnds = (xs = [100, 518]) =>
	xs
		.map(
			(cx) => `<rect x="${cx}" y="157" width="22" height="22" rx="2" class="beam-end"/>
               <rect x="${cx + 6}" y="163" width="10" height="10" class="beam-end-hole"/>`
		)
		.join('');

const bigBattery = () => `
  <rect x="144" y="116" width="14" height="9" rx="2" class="dark"/>
  <rect x="194" y="116" width="14" height="9" rx="2" class="dark"/>
  <rect x="130" y="123" width="92" height="57" rx="9" class="battery"/>
  ${[0, 1, 2, 3].map((i) => `<rect x="${140 + i * 19}" y="162" width="13" height="10" rx="2" class="led"/>`).join('')}
  <path transform="translate(166 128)" d="M14 0 L3 16 H10 L6 30 L18 11 H11 Z" class="bolt"/>`;

/** De witte GPS-dome van het prototype, op een korte paal op de balk. */
const gps = (x) => `
  <rect x="${x - 3}" y="150" width="6" height="30" class="metal"/>
  <rect x="${x - 17}" y="147" width="34" height="7" rx="2" class="dark"/>
  <path d="M${x - 16} 148 Q ${x} 124 ${x + 16} 148 Z" class="dome"/>`;

const brain = () => `
  <rect x="416" y="126" width="88" height="54" rx="10" class="box"/>
  <circle cx="430" cy="140" r="4" class="blink"/>
  <circle cx="466" cy="150" r="9" class="eye"/>
  <circle cx="488" cy="150" r="9" class="eye"/>
  <circle cx="469" cy="151" r="4.5" class="pupil"/>
  <circle cx="491" cy="151" r="4.5" class="pupil"/>
  <path d="M468 166 Q477 173 486 166" class="mouth"/>`;

function robot(o) {
	return `
    <g transform="translate(14 -12)" class="far">${wheel(FRONT_X, true)}${wheel(REAR_X, false)}${beam()}</g>
    ${o.mid ?? ''}
    ${wheel(FRONT_X, true)}${wheel(REAR_X, false)}
    ${o.beamExtra ?? ''}
    ${beam()}${beamEnds()}
    ${o.battery === false ? '' : bigBattery()}
    ${o.dome === false ? '' : gps(o.domeX ?? 320)}
    ${brain()}
    ${o.top ?? ''}`;
}

// ---------------------------------------------------------------- achtergronden

const clouds = () => `
  <g class="cloud">
    <ellipse cx="250" cy="58" rx="34" ry="14"/><ellipse cx="275" cy="48" rx="22" ry="16"/><ellipse cx="228" cy="52" rx="16" ry="11"/>
  </g>
  <g class="cloud">
    <ellipse cx="470" cy="84" rx="26" ry="10"/><ellipse cx="488" cy="76" rx="16" ry="12"/>
  </g>`;

const sky = (o) =>
	`<rect x="-40" y="-30" width="720" height="460" fill="url(#sky)" class="ns"/>${o.clouds === false ? '' : clouds()}`;

const backgrounds = {
	field: (o) => `${sky(o)}
    <rect x="-40" y="${GROUND}" width="720" height="80" class="grass"/>
    <path d="M-40 ${GROUND} H680" class="ground-line"/>
    ${o.sprouts === false ? '' : [20, 600].map((x) => sprout(x)).join('')}`,
	meadow: (o) => `${sky(o)}
    <rect x="-40" y="${GROUND}" width="720" height="80" class="grass"/>
    <path d="M-40 ${GROUND} H680" class="ground-line"/>
    ${o.tufts === false ? '' : [-10, 30, 250, 390, 600, 640].map((x, i) => tuft(x, 16 + (i % 3) * 5)).join('')}`,
	soil: (o) => `${sky(o)}
    <rect x="-40" y="${GROUND}" width="720" height="80" class="soil"/>
    <path d="M-40 ${GROUND} H680" class="soil-line"/>
    ${range(-30, 670, 38)
			.map(
				(x) => `<path d="M${x} ${GROUND + 16} h18 M${x + 19} ${GROUND + 34} h18" class="furrow"/>`
			)
			.join('')}
    ${o.sprouts === false ? '' : [10, 610].map((x) => sprout(x)).join('')}`,
	stable: () => `
    <rect x="-40" y="-30" width="720" height="460" fill="#d8bf93" class="ns"/>
    ${range(-40, 680, 34)
			.map((x) => `<path d="M${x} -30 V${GROUND}" class="plank"/>`)
			.join('')}
    <path d="M-40 70 H680" class="plank-rail"/>
    <rect x="-40" y="${GROUND}" width="720" height="80" class="floor"/>
    <path d="M-40 ${GROUND} H680" class="floor-line"/>`,
	night: () => `
    <rect x="-40" y="-30" width="720" height="460" fill="url(#night)" class="ns"/>
    ${[
			[110, 40],
			[180, 90],
			[330, 36],
			[400, 70],
			[540, 50],
			[600, 110],
			[20, 120],
			[470, 30]
		]
			.map(
				([x, y], i) =>
					`<circle cx="${x}" cy="${y}" r="${i % 3 ? 1.8 : 2.6}" class="star" style="animation-delay:${i * 0.4}s"/>`
			)
			.join('')}
    <circle cx="62" cy="62" r="24" fill="#f4f1d0" class="ns"/>
    <circle cx="74" cy="54" r="22" fill="#223a63" class="ns"/>
    <rect x="-40" y="${GROUND}" width="720" height="80" fill="#3f6b3a" class="ns"/>
    <path d="M-40 ${GROUND} H680" style="stroke:#2c4d29;stroke-width:4"/>`
};

// ---------------------------------------------------------------- losse onderdelen die vaker terugkomen

/** Trechter bovenop het frame, gevuld met korrels. */
const hopper = (x1, x2, top, color, fillColor, grains = true) => {
	const inset = (x2 - x1) * 0.28;
	return `
    <path d="M${x1} ${top} H${x2} L${x2 - inset} 178 H${x1 + inset} Z" fill="${color}"/>
    <path d="M${x1 + 6} ${top + 2} Q ${(x1 + x2) / 2} ${top - 18} ${x2 - 6} ${top + 2} Z" fill="${fillColor}" style="stroke-width:2"/>
    ${
			grains
				? range(x1 + 20, x2 - 16, 16)
						.map(
							(gx, i) =>
								`<circle cx="${gx}" cy="${top - 4 - (i % 2) * 4}" r="2.5" fill="#ffffff" style="stroke-width:1.2"/>`
						)
						.join('')
				: ''
		}
    <path d="M${x1 + 10} ${top + 12} H${x2 - 10}" style="stroke:${INK};stroke-width:2;opacity:.35"/>`;
};

/** Zonnepaneel als dak, met palen. */
const solarRoof = (x1 = 100, x2 = 545, y = 40) => `
  <rect x="${x1 + 18}" y="${y + 20}" width="8" height="${180 - y - 20}" class="metal"/>
  <rect x="${x2 - 21}" y="${y + 20}" width="8" height="${180 - y - 20}" class="metal"/>
  <path d="M${x1} ${y} H${x2} L${x2 + 15} ${y + 24} H${x1 - 15} Z" class="solar"/>
  ${range(1, 7, 1)
		.map((i) => {
			const t = i / 8;
			return `<path d="M${r1(x1 + (x2 - x1) * t)} ${y} L${r1(x1 - 15 + (x2 + 15 - (x1 - 15)) * t)} ${y + 24}" class="cells"/>`;
		})
		.join('')}
  <path d="M${x1 - 7.5} ${y + 12} H${x2 + 7.5}" class="cells"/>`;

const sun = (x, y, r = 22) => `
  <g class="sun">
    <circle cx="${x}" cy="${y}" r="${r}"/>
    ${[0, 45, 90, 135, 180, 225, 270, 315]
			.map((a) => {
				const c = Math.cos(rad(a));
				const s = Math.sin(rad(a));
				return `<path d="M${r1(x + c * (r + 6))} ${r1(y + s * (r + 6))} L${r1(x + c * (r + 14))} ${r1(y + s * (r + 14))}"/>`;
			})
			.join('')}
  </g>`;

/** Boerin/boer met pet, zittend of staand, vanaf de zijkant. */
const farmerHead = (x, y) => `
  <circle cx="${x}" cy="${y}" r="13" class="skin"/>
  <path d="M${x - 14} ${y - 4} Q ${x - 12} ${y - 20} ${x + 2} ${y - 18} Q ${x + 12} ${y - 16} ${x + 13} ${y - 6} Z" fill="#386938"/>
  <path d="M${x + 6} ${y - 7} H${x + 24}" style="stroke:${INK};stroke-width:5;stroke-linecap:round"/>
  <circle cx="${x + 6}" cy="${y + 1}" r="2" fill="${INK}" class="ns"/>`;

// ---------------------------------------------------------------- de functies

const cartoons = {
	// (Rubber) schuifblad: voer aanschuiven aan het voerhek
	1: {
		bg: 'stable',
		dx: -30,
		behind: `
      ${[520, 548, 632, 660].map((x) => `<rect x="${x - 5}" y="200" width="10" height="150" class="metal"/>`).join('')}
      <rect x="490" y="208" width="200" height="10" rx="3" class="dark"/>
      <g class="cow">
        <ellipse cx="560" cy="236" rx="15" ry="7" fill="#ffffff" transform="rotate(-20 560 236)"/>
        <ellipse cx="620" cy="236" rx="15" ry="7" fill="#ffffff" transform="rotate(20 620 236)"/>
        <path d="M576 222 q-4 -12 -12 -14 M604 222 q4 -12 12 -14" style="fill:none;stroke:#e8dcc0;stroke-width:5"/>
        <path d="M568 226 Q590 212 612 226 L616 270 Q590 296 564 270 Z" fill="#ffffff"/>
        <path d="M570 230 Q580 226 588 232 Q584 246 572 244 Z" fill="${INK}" style="stroke-width:1"/>
        <ellipse cx="590" cy="276" rx="21" ry="13" fill="#f2b8b0"/>
        <circle cx="583" cy="276" r="2.5" fill="${INK}"/>
        <circle cx="597" cy="276" r="2.5" fill="${INK}"/>
        <circle cx="579" cy="250" r="3.5" fill="${INK}"/>
        <circle cx="601" cy="250" r="3.5" fill="${INK}"/>
      </g>
      <path d="M548 350 C 556 316, 582 306, 596 320 C 610 302, 636 314, 640 350 Z" fill="#d9b44a"/>
      ${[
				[560, 336, 8],
				[578, 322, -10],
				[602, 328, 12],
				[620, 338, -6],
				[590, 342, 4]
			]
				.map(
					([x, y, a]) =>
						`<path d="M${x - 9} ${y} l18 ${a / 2}" style="stroke:#a8872a;stroke-width:2.5"/>`
				)
				.join('')}`,
		top: `
      ${rod('M526 198 L566 270', 9)}
      ${rod('M510 206 L560 300', 7, '#7b857f')}
      <path d="M558 258 Q 584 298 562 340 H580 Q 600 298 576 254 Z" fill="#c0492b"/>
      <rect x="560" y="334" width="22" height="16" rx="3" class="dark"/>`
	},

	// Greppelfrees: rotor graaft een greppel, water loopt eruit weg
	2: {
		bg: 'field',
		sprouts: false,
		behind: `
      <path d="M-40 350 H286 L300 378 H-40 Z" fill="#6e4a2c" class="ns"/>
      <rect x="-40" y="366" width="336" height="12" fill="#7fc4d6" class="ns"/>
      <path d="M-40 366 H294" style="stroke:#4d8fa3;stroke-width:2"/>`,
		mid: `
      ${rod('M288 200 L306 300', 8)}
      ${rod('M352 200 L334 300', 8)}
      <g class="spin">
        <circle cx="320" cy="330" r="26" fill="#c0492b"/>
        ${teeth(320, 330, 24, 40, 10, '#b9c3bc', 10)}
        <circle cx="320" cy="330" r="26" fill="#c0492b"/>
        <circle cx="320" cy="330" r="8" class="nut"/>
      </g>
      <path d="M270 330 A50 50 0 0 1 370 330 L356 330 A36 36 0 0 0 284 330 Z" class="metal"/>`,
		over: bits(
			[
				[252, 292],
				[236, 270],
				[220, 300],
				[258, 252],
				[204, 276]
			],
			(x, y, i) =>
				i % 2
					? drop(x, y, 0.9)
					: `<circle cx="${x}" cy="${y}" r="${5 + (i % 3)}" fill="#8a5a3b" style="stroke-width:2"/>`,
			'fly-back'
		)
	},

	// Kleine cultivator
	3: {
		bg: 'soil',
		mid: `
      ${rod('M262 200 V256', 8)}
      ${rod('M378 200 V256', 8)}
      <rect x="236" y="250" width="168" height="13" rx="4" fill="#c0492b"/>
      ${[252, 287, 322, 357, 392]
				.map((x) =>
					rod(
						`M${x} 262 C ${x + 16} 284, ${x - 14} 306, ${x + 4} 338 L ${x + 12} 346`,
						5,
						'#7b857f'
					)
				)
				.join('')}`,
		over: bits(
			[
				[240, 346],
				[272, 344],
				[306, 347],
				[342, 345],
				[216, 343]
			],
			(x, y, i) =>
				`<ellipse cx="${x}" cy="${y}" rx="${7 + (i % 2) * 3}" ry="5" fill="#7a4e2e" style="stroke-width:2"/>`,
			'bob'
		)
	},

	// Schoffel met 1-assige besturing: schuift links/rechts tussen de mais
	4: {
		bg: 'soil',
		sprouts: false,
		behind: [30, 240, 400, 600].map((x) => maize(x, 150)).join(''),
		mid: `
      ${rod('M252 200 V232', 7)}
      ${rod('M388 200 V232', 7)}
      ${rod('M236 234 H404', 6, '#2c3e2c')}
      <rect x="298" y="222" width="44" height="24" rx="5" class="motor"/>
      ${rod('M320 246 V334', 7)}
      <path d="M290 346 L320 332 L352 346 Z" class="metal"/>`,
		over: card(
			228,
			34,
			184,
			84,
			`<path d="M238 108 H402" style="stroke:#6e4a2c;stroke-width:3"/>
       <rect x="246" y="46" width="148" height="8" rx="2" class="beam-end"/>
       ${[250, 390].map((x) => `<rect x="${x - 3}" y="54" width="6" height="40" class="metal"/><circle cx="${x}" cy="99" r="9" class="tire"/>`).join('')}
       ${maize(282, 40, 108).replace('class="crop"', 'class="crop small"')}
       ${maize(358, 40, 108).replace('class="crop"', 'class="crop small"')}
       <rect x="314" y="56" width="12" height="36" class="metal"/>
       <path d="M306 104 L320 96 L334 104 Z" class="metal"/>
       <g class="sway">${arrow(298, 72, 342, 72, '#2f9a9e', true, 3.5)}</g>`
		)
	},

	// Vingerwieders
	5: {
		bg: 'soil',
		behind: [320, 40, 590].map((x) => sprout(x, GROUND, 1.2)).join(''),
		mid: `
      ${rod('M270 200 L284 318', 7)}
      ${rod('M370 200 L356 318', 7)}
      ${[284, 356]
				.map(
					(x) => `<g class="spin${x > 300 ? ' rev' : ''}">
            ${range(0, 330, 30)
							.map((a) =>
								rod(
									`M${r1(x + Math.cos(rad(a)) * 8)} ${r1(322 + Math.sin(rad(a)) * 8)} L${r1(x + Math.cos(rad(a)) * 27)} ${r1(322 + Math.sin(rad(a)) * 27)}`,
									4,
									'#f08a2c'
								)
							)
							.join('')}
            <circle cx="${x}" cy="322" r="10" class="hub"/>
            <circle cx="${x}" cy="322" r="3.5" class="nut"/>
          </g>`
				)
				.join('')}`
	},

	// Spotspray: fijne nevel alleen op het onkruid
	6: spray('mist'),

	// Drop-on-demand: grove druppels op commando
	7: spray('drops'),

	// CNC-onkruidboor tegen ridderzuring
	8: {
		bg: 'meadow',
		behind: `
      <path d="M346 352 C 352 364, 349 380, 346 398 C 343 380, 338 364, 344 352 Z" fill="#b5652f"/>
      ${[
				[-1, 0],
				[1, 1]
			]
				.map(
					([s]) =>
						`<path d="M345 350 Q ${345 + s * 30} ${310} ${345 + s * 12} ${300} Q ${345 + s * 4} ${330} 345 350 Z" fill="#3f7d34"/>`
				)
				.join('')}
      <path d="M345 350 V316" style="stroke:#8b3a2a;stroke-width:3"/>
      <path d="M338 372 l-8 4 M352 380 l9 -3 M340 388 l-7 6" style="stroke:#fff6c2;stroke-width:3"/>`,
		mid: `
      ${rod('M244 200 V226', 7)}
      ${rod('M396 200 V226', 7)}
      ${rod('M236 226 H404', 7, '#2c3e2c')}
      <rect x="326" y="214" width="38" height="24" rx="5" class="motor"/>
      ${rod('M345 238 V300', 7)}
      <rect x="337" y="296" width="16" height="50" rx="3" class="metal"/>
      ${range(302, 340, 8)
				.map((y) => `<path d="M337 ${y} L353 ${y + 6}" style="stroke:${INK};stroke-width:2"/>`)
				.join('')}
      ${arrow(252, 246, 312, 246, '#e0a02c', true, 3.5)}
      ${arrow(378, 262, 378, 316, '#e0a02c', true, 3.5)}`
	},

	// Graslandbeluchter: prikrol maakt gaatjes in de zode
	9: {
		bg: 'meadow',
		behind: `
      ${range(40, 280, 30)
				.map((x) => `<ellipse cx="${x}" cy="358" rx="4" ry="7" fill="#3b2a1a" class="ns"/>`)
				.join('')}
      ${[100, 190].map((x) => arrow(x, 318, x - 6, 346, '#7fc4d6', false, 3)).join('')}`,
		mid: `
      ${rod('M284 200 L310 316', 7)}
      ${rod('M356 200 L330 316', 7)}
      <g class="spin slow">
        ${teeth(320, 316, 24, 40, 12, '#b9c3bc', 9)}
        <circle cx="320" cy="316" r="26" class="dark"/>
        <circle cx="320" cy="316" r="16" fill="#4a544e"/>
        <circle cx="320" cy="316" r="5" class="nut"/>
      </g>`
	},

	// Vingerbalkmaaier: hoog gras voor, stoppels achter
	10: {
		bg: 'meadow',
		tufts: false,
		behind: `
      ${range(-30, 250, 14)
				.map(
					(x) =>
						`<path d="M${x} 350 V338 M${x + 5} 350 V340" style="stroke:#3f7d34;stroke-width:3"/>`
				)
				.join('')}
      ${range(420, 660, 24)
				.map((x, i) => tuft(x, 46 + (i % 3) * 10))
				.join('')}`,
		mid: `
      ${rod('M252 200 V330', 7)}
      ${rod('M396 200 V330', 7)}
      <rect x="226" y="332" width="200" height="10" rx="3" class="dark"/>
      <g class="saw">
        ${range(232, 420, 14)
					.map(
						(x) =>
							`<path d="M${x} 334 L${x + 14} 338 L${x} 342 Z" class="metal" style="stroke-width:1.5"/>`
					)
					.join('')}
      </g>
      <rect x="236" y="310" width="30" height="22" rx="4" class="motor"/>`,
		over: bits(
			[
				[300, 318],
				[340, 312],
				[270, 322],
				[372, 320]
			],
			(x, y) =>
				`<path d="M${x} ${y} l10 -6" style="stroke:#5aa447;stroke-width:4;stroke-linecap:round"/>`,
			'fly-back'
		)
	},

	// Maaiarm / bosmaaier onder het schrikdraad
	11: {
		bg: 'meadow',
		dx: -60,
		tufts: false,
		behind: `
      ${[548, 628].map((x) => `<rect x="${x - 6}" y="226" width="12" height="124" rx="3" fill="#8a5a3b"/>`).join('')}
      <path d="M540 256 H640 M540 290 H640" style="stroke:#7b857f;stroke-width:2.5"/>
      ${[556, 584, 612, 640].map((x, i) => tuft(x, 32 + (i % 2) * 8)).join('')}
      ${[20, 60, 260].map((x) => tuft(x, 14)).join('')}`,
		top: `
      ${rod('M522 186 L586 128', 11, '#2f9a9e')}
      ${rod('M586 128 L632 318', 9, '#2f9a9e')}
      <circle cx="586" cy="128" r="9" class="nut"/>
      <g class="spin fast"><ellipse cx="632" cy="330" rx="26" ry="7" fill="#c0492b"/>
        <path d="M606 330 H658" style="stroke:#fffdf5;stroke-width:2"/></g>
      <rect x="624" y="310" width="16" height="18" rx="4" class="dark"/>`,
		over: bits(
			[
				[594, 318],
				[600, 300],
				[612, 326]
			],
			(x, y) =>
				`<path d="M${x} ${y} l8 -8" style="stroke:#5aa447;stroke-width:4;stroke-linecap:round"/>`,
			'fly-up'
		)
	},

	// Bevloeipomp: water uit de sloot over het gewas
	12: {
		bg: 'field',
		dx: 40,
		sprouts: false,
		behind: `
      <path d="M-40 350 H10 L34 392 H96 L118 350 Z" fill="#6e4a2c" class="ns"/>
      <path d="M22 372 H106 L96 392 H34 Z" fill="#7fc4d6" class="ns"/>
      <path d="M22 372 H106" style="stroke:#4d8fa3;stroke-width:2.5"/>
      ${[560, 600, 640].map((x) => cabbage(x)).join('')}`,
		top: `
      ${rod('M252 160 C 170 80, 40 90, -8 372', 7, '#2c3e2c')}
      <rect x="242" y="136" width="62" height="44" rx="8" fill="#2d6fb3"/>
      <circle cx="273" cy="158" r="12" fill="#7fc4d6"/>
      <path d="M273 150 V166 M265 158 H281" style="stroke:${INK};stroke-width:2"/>
      <rect x="304" y="146" width="24" height="30" rx="4" class="motor"/>
      ${rod('M524 184 V88', 6)}
      ${rod('M318 146 C 330 60, 500 70, 516 82', 5, '#2c3e2c')}
      <rect x="514" y="72" width="20" height="16" rx="3" class="dark"/>
      ${[0, 1, 2]
				.map(
					(i) =>
						`<path d="M534 ${78 + i * 3} Q ${560 + i * 12} ${36 + i * 16} ${570 + i * 10} ${120 + i * 50}" class="water w${i}"/>`
				)
				.join('')}`,
		domeX: 380
	},

	// Kunstmeststrooier: trechter met strooischijf
	13: {
		bg: 'soil',
		dome: false,
		mid: `
      <rect x="312" y="200" width="16" height="50" class="metal"/>
      <ellipse cx="320" cy="256" rx="36" ry="8" class="hub"/>
      <g class="spin fast"><path d="M296 256 H344" style="stroke:${INK};stroke-width:3"/></g>`,
		top: hopper(248, 392, 98, '#c0492b', '#f4ede4'),
		over: bits(
			[
				[270, 270],
				[250, 290],
				[230, 312],
				[370, 270],
				[390, 290],
				[410, 312],
				[300, 300],
				[340, 300]
			],
			(x, y) => `<circle cx="${x}" cy="${y}" r="3.2" fill="#ffffff" style="stroke-width:1.5"/>`,
			'fall'
		)
	},

	// Kalkstrooier: bak achterop met witte kalk
	14: {
		bg: 'meadow',
		dx: 70,
		behind: `<ellipse cx="60" cy="350" rx="70" ry="9" fill="#f4f4ef" class="ns" opacity=".9"/>`,
		top: `
      ${rod('M108 200 L86 214', 8)}
      <path d="M-46 196 H96 L84 256 H-34 Z" fill="#dfe5df"/>
      <path d="M-40 198 Q 25 176 90 198 Z" fill="#ffffff" style="stroke-width:2"/>
      <rect x="-34" y="256" width="118" height="10" rx="3" class="dark"/>
      ${range(-26, 76, 14)
				.map(
					(x) =>
						`<rect x="${x}" y="262" width="6" height="7" class="metal" style="stroke-width:1.5"/>`
				)
				.join('')}`,
		over: bits(
			range(52, 150, 12).flatMap((x, i) => [[x, 290 + (i % 3) * 14]]),
			(x, y) =>
				`<circle cx="${x}" cy="${y}" r="${4}" fill="#ffffff" style="stroke:#c7cfc9;stroke-width:1.5"/>`,
			'fall'
		)
	},

	// Zaaibak & doorzaaimachine
	15: {
		bg: 'meadow',
		dome: false,
		mid: `
      ${[268, 320, 372].map((x) => rod(`M${x} 196 V318`, 5, '#2c3e2c')).join('')}
      ${[268, 320, 372]
				.map(
					(x) => `<g class="spin slow"><circle cx="${x + 6}" cy="336" r="17" class="metal"/>
            ${range(0, 300, 60)
							.map(
								(a) =>
									`<path d="M${x + 6} 336 L${r1(x + 6 + Math.cos(rad(a)) * 17)} ${r1(336 + Math.sin(rad(a)) * 17)}" style="stroke:${INK};stroke-width:1.5"/>`
							)
							.join('')}</g>
            <circle cx="${x + 6}" cy="336" r="4" class="nut"/>`
				)
				.join('')}`,
		top: `
      <rect x="240" y="116" width="160" height="62" rx="6" fill="#f6c945"/>
      <path d="M234 116 H406 L398 102 H242 Z" fill="#386938"/>
      ${[272, 320, 368].map((x) => `<ellipse cx="${x}" cy="148" rx="7" ry="11" fill="#c9a227" style="stroke-width:2"/><path d="M${x} 139 V157" style="stroke:${INK};stroke-width:1.5"/>`).join('')}`,
		over: bits(
			[
				[262, 322],
				[314, 326],
				[366, 322],
				[258, 340],
				[310, 342]
			],
			(x, y) =>
				`<ellipse cx="${x}" cy="${y}" rx="2.5" ry="4" fill="#c9a227" style="stroke-width:1.2"/>`,
			'fall'
		)
	},

	// Tray-uitzetter: plantjes uit de tray, op afstand in de grond
	16: {
		bg: 'soil',
		dx: -50,
		sprouts: false,
		behind: [200, 270, 340, 410, 480]
			.map(
				(x) =>
					`${sprout(x, GROUND, 1.2)}<rect x="${x - 5}" y="349" width="10" height="7" fill="#6e4a2c" class="ns"/>`
			)
			.join(''),
		top: `
      ${rod('M530 186 H600', 8)}
      <rect x="536" y="164" width="94" height="16" rx="3" class="dark"/>
      ${range(546, 622, 14)
				.map(
					(x) =>
						`<rect x="${x - 4}" y="159" width="8" height="8" fill="#6e4a2c" style="stroke-width:1.5"/>${sprout(x, 160, 0.9)}`
				)
				.join('')}
      <g class="plant-arm">
        ${rod('M612 186 V300', 7, '#2f9a9e')}
        <rect x="600" y="296" width="24" height="12" rx="3" class="dark"/>
        <path d="M602 308 L598 324 M622 308 L626 324" style="stroke:${INK};stroke-width:4"/>
        <rect x="606" y="314" width="12" height="10" fill="#6e4a2c" style="stroke-width:2"/>
        ${sprout(612, 314, 1.1)}
      </g>
      ${arrow(640, 250, 640, 300, '#e0a02c')}`
	},

	// Zaaimachientje voor kale plekken
	17: {
		bg: 'meadow',
		tufts: false,
		behind: `
      <ellipse cx="320" cy="352" rx="62" ry="7" fill="#8a5a3b" class="ns"/>
      <ellipse cx="70" cy="352" rx="56" ry="7" fill="#8a5a3b" class="ns"/>
      ${[40, 62, 84, 104].map((x) => sprout(x, 350, 0.7)).join('')}
      ${[-10, 170, 420, 460, 620].map((x) => tuft(x, 20)).join('')}`,
		mid: `
      ${rod('M292 200 V236', 6)}
      ${rod('M348 200 V236', 6)}
      <path d="M282 232 H358 L346 278 H294 Z" fill="#f6c945"/>
      <path d="M288 232 Q 320 218 352 232 Z" fill="#c9a227" style="stroke-width:2"/>
      <rect x="296" y="278" width="48" height="10" rx="3" class="dark"/>`,
		over: bits(
			[
				[304, 300],
				[318, 312],
				[332, 298],
				[310, 326],
				[326, 330],
				[300, 318]
			],
			(x, y) =>
				`<ellipse cx="${x}" cy="${y}" rx="2.2" ry="3.4" fill="#c9a227" style="stroke-width:1.2"/>`,
			'fall'
		)
	},

	// Zaagselstrooier in de stal
	18: {
		bg: 'stable',
		dome: false,
		behind: `
      ${[20, 110].map((x) => `<path d="M${x} 350 V230 Q ${x} 210 ${x + 20} 210 H${x + 60} Q ${x + 76} 210 ${x + 76} 236 V262" style="fill:none;stroke:#7b857f;stroke-width:7;stroke-linecap:round"/>`).join('')}
      <path d="M-40 348 H200" style="stroke:#e8cf97;stroke-width:6"/>`,
		mid: `
      <rect x="306" y="200" width="28" height="80" class="metal"/>
      <g class="spin fast">
        <circle cx="320" cy="298" r="24" class="dark"/>
        ${range(0, 330, 30)
					.map(
						(a) =>
							`<path d="M${r1(320 + Math.cos(rad(a)) * 14)} ${r1(298 + Math.sin(rad(a)) * 14)} L${r1(320 + Math.cos(rad(a)) * 32)} ${r1(298 + Math.sin(rad(a)) * 32)}" style="stroke:#e0a02c;stroke-width:3"/>`
					)
					.join('')}
        <circle cx="320" cy="298" r="8" class="nut"/>
      </g>`,
		top: `
      <path d="M238 112 H402 L392 180 H248 Z" fill="#b9854f"/>
      ${[134, 156].map((y) => `<path d="M242 ${y} H398" style="stroke:#8a5a3b;stroke-width:2"/>`).join('')}
      <path d="M244 114 Q 320 92 396 114 Z" fill="#f0d9a6" style="stroke-width:2"/>`,
		over: bits(
			[
				[282, 300],
				[262, 290],
				[242, 312],
				[226, 296],
				[254, 322],
				[210, 318],
				[272, 334]
			],
			(x, y, i) =>
				`<rect x="${x}" y="${y}" width="7" height="4" rx="1" fill="#f0d9a6" transform="rotate(${i * 37} ${x} ${y})" style="stroke-width:1.2"/>`,
			'fly-back'
		)
	},

	// Strostrooier tussen de groenterijen
	19: {
		bg: 'soil',
		dome: false,
		sprouts: false,
		behind: [0, 60, 580, 640].map((x) => cabbage(x)).join(''),
		mid: `
      <rect x="306" y="200" width="28" height="64" class="metal"/>
      <g class="spin">
        <circle cx="320" cy="282" r="22" class="dark"/>
        ${teeth(320, 282, 20, 30, 8, '#b9c3bc', 12)}
        <circle cx="320" cy="282" r="7" class="nut"/>
      </g>`,
		top: `
      <rect x="236" y="106" width="168" height="74" rx="8" fill="#e7c65a"/>
      ${[120, 136, 152, 166].map((y, i) => `<path d="M${246 + i * 6} ${y} H${394 - i * 4}" style="stroke:#b8962f;stroke-width:2"/>`).join('')}
      ${[284, 356].map((x) => `<path d="M${x} 106 V180" style="stroke:#c0492b;stroke-width:4"/>`).join('')}`,
		over: bits(
			[
				[284, 300],
				[262, 292],
				[246, 312],
				[360, 300],
				[382, 292],
				[398, 312],
				[300, 322],
				[344, 324]
			],
			(x, y, i) =>
				`<path d="M${x} ${y} q 6 -${4 + (i % 3) * 2} 13 0" style="fill:none;stroke:#d9b44a;stroke-width:3;stroke-linecap:round"/>`,
			'fall'
		)
	},

	// Compoststrooier / compostbak
	20: {
		bg: 'soil',
		dome: false,
		mid: `
      <rect x="248" y="250" width="144" height="14" rx="7" class="dark"/>
      ${range(258, 384, 18)
				.map((x) => `<circle cx="${x}" cy="257" r="3.5" class="nut" style="stroke-width:1.5"/>`)
				.join('')}`,
		top: `
      <path d="M236 102 H404 L392 252 H248 Z" fill="#7b857f"/>
      <path d="M244 104 C 270 80, 300 94, 320 84 C 344 74, 372 92, 396 104 Z" fill="#5a3b24" style="stroke-width:2"/>
      ${[
				[270, 96],
				[304, 90],
				[340, 86],
				[372, 96]
			]
				.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.5" fill="#3b2a1a" class="ns"/>`)
				.join('')}
      <path d="M250 214 H390" style="stroke:${INK};stroke-width:2;opacity:.35"/>`,
		over: bits(
			[
				[258, 276],
				[282, 292],
				[306, 280],
				[330, 300],
				[356, 284],
				[378, 296],
				[268, 316],
				[344, 318]
			],
			(x, y, i) =>
				`<circle cx="${x}" cy="${y}" r="${3 + (i % 2) * 1.5}" fill="#5a3b24" style="stroke-width:1.5"/>`,
			'fall'
		)
	},

	// Extra accupakketten tussen het frame
	21: {
		bg: 'field',
		domeX: 395,
		top: `
      <circle cx="320" cy="92" r="20" class="plus"/>
      <path d="M320 82 V102 M310 92 H330" style="stroke:#ffffff;stroke-width:5;stroke-linecap:round"/>`,
		mid: [232, 326]
			.map(
				(bx) => `${rod(`M${bx + 14} 198 V212 M${bx + 68} 198 V212`, 5)}
          <rect x="${bx}" y="208" width="82" height="54" rx="9" class="battery"/>
          ${[0, 1, 2].map((i) => `<rect x="${bx + 10 + i * 22}" y="244" width="15" height="10" rx="2" class="led"/>`).join('')}
          <path transform="translate(${bx + 32} 213)" d="M14 0 L3 16 H10 L6 30 L18 11 H11 Z" class="bolt"/>`
			)
			.join('')
	},

	// Generator / motor als hulpkrachtbron
	22: {
		bg: 'field',
		domeX: 395,
		top: `
      <path d="M252 132 V122 H342 V132" class="handle"/>
      <rect x="246" y="130" width="102" height="50" rx="7" class="generator"/>
      ${[0, 1, 2].map((i) => `<path d="M258 ${142 + i * 10} H300" class="grille"/>`).join('')}
      <circle cx="324" cy="155" r="11" class="dark"/>
      <rect x="334" y="104" width="9" height="28" rx="2" class="dark"/>
      <circle cx="342" cy="94" r="8" class="puff"/>
      <circle cx="350" cy="78" r="6" class="puff p2"/>
      ${rod('M246 160 C 234 160, 232 150, 222 150', 4, '#2c3e2c')}
      <path d="M232 110 L222 126 H232 L224 142" class="spark"/>`
	},

	// Zonnepanelen
	23: {
		bg: 'field',
		clouds: false,
		over: `${sun(40, 56)}`,
		top: `${solarRoof()}
      <path d="M200 70 L188 92 H200 L190 112" class="spark"/>`
	},

	// Zware elektromotor die een maaidek aandrijft
	24: {
		bg: 'meadow',
		domeX: 395,
		mid: `
      ${rod('M300 196 V296', 7)}
      <path d="M240 320 Q 244 298 300 296 Q 356 298 360 320 Z" class="metal"/>
      <rect x="234" y="316" width="132" height="10" rx="4" class="dark"/>
      <path d="M246 334 H354" class="blade-line"/>`,
		top: `
      <rect x="262" y="118" width="76" height="62" rx="12" fill="#2c3e2c"/>
      <rect x="262" y="138" width="76" height="12" fill="#9bd33a" style="stroke-width:2"/>
      <rect x="276" y="100" width="48" height="22" rx="5" fill="#2c3e2c"/>
      <rect x="284" y="106" width="32" height="6" rx="2" fill="#9bd33a" style="stroke-width:1.5"/>
      ${range(272, 330, 10)
				.map((x) => `<path d="M${x} 160 V172" style="stroke:#6d7972;stroke-width:2"/>`)
				.join('')}`,
		over: bits(
			[
				[240, 330],
				[226, 316],
				[360, 328],
				[374, 314]
			],
			(x, y) =>
				`<path d="M${x} ${y} l7 -6" style="stroke:#5aa447;stroke-width:4;stroke-linecap:round"/>`,
			'fly-up'
		)
	},

	// Bezem / veger voorop
	25: {
		bg: 'stable',
		dx: -60,
		behind: `
      ${[
				[582, 346, 10],
				[604, 342, 12],
				[628, 346, 9]
			]
				.map(
					([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.5}" fill="#9a7b4f"/>`
				)
				.join('')}
      ${[
				[596, 336, 30],
				[618, 330, -20]
			]
				.map(
					([x, y, a]) =>
						`<path d="M${x} ${y} q6 -8 12 0 q-6 6 -12 0 Z" fill="#c07f14" transform="rotate(${a} ${x} ${y})"/>`
				)
				.join('')}`,
		top: `
      ${rod('M526 198 L584 300', 9)}
      <path d="M540 300 A48 48 0 0 1 636 300 L624 300 A36 36 0 0 0 552 300 Z" class="metal"/>
      <g class="spin">
        <circle cx="588" cy="310" r="38" fill="#e0a02c"/>
        ${range(0, 345, 15)
					.map(
						(a) =>
							`<path d="M${r1(588 + Math.cos(rad(a)) * 16)} ${r1(310 + Math.sin(rad(a)) * 16)} L${r1(588 + Math.cos(rad(a)) * 38)} ${r1(310 + Math.sin(rad(a)) * 38)}" style="stroke:#8a5a0f;stroke-width:2"/>`
					)
					.join('')}
        <circle cx="588" cy="310" r="12" class="dark"/>
      </g>`,
		over: bits(
			[
				[590, 318],
				[610, 304],
				[602, 290]
			],
			(x, y) => `<circle cx="${x}" cy="${y}" r="7" class="puff"/>`,
			'fly-up'
		)
	},

	// Zitje & frame-extensie achterop
	26: {
		bg: 'field',
		dx: 80,
		beamExtra: `${beam(8, 110)}<rect x="8" y="157" width="22" height="22" rx="2" class="beam-end"/><rect x="14" y="163" width="10" height="10" class="beam-end-hole"/>`,
		top: `
      <rect x="54" y="160" width="10" height="20" class="dark"/>
      <rect x="30" y="146" width="66" height="16" rx="8" class="seat"/>
      <rect x="20" y="92" width="18" height="66" rx="8" class="seat"/>
      ${rod('M64 146 L100 148 L106 206', 10, '#2d4a7a')}
      <rect x="98" y="202" width="24" height="10" rx="4" class="dark"/>
      <rect x="40" y="92" width="30" height="56" rx="11" fill="#2f9a9e"/>
      ${rod('M60 106 L88 124 L112 116', 6, '#2f9a9e')}
      <circle cx="112" cy="116" r="5" class="skin"/>
      ${farmerHead(56, 76)}`
	},

	// Dumper / kruiwagenbak die achterover kiept
	27: {
		bg: 'field',
		dx: 70,
		battery: false,
		dome: false,
		sprouts: false,
		behind: `
      <path d="M40 350 C 52 318, 90 306, 116 322 C 132 312, 158 322, 170 350 Z" fill="#8a5a3b"/>
      ${[
				[70, 336],
				[100, 322],
				[130, 334],
				[86, 344]
			]
				.map(
					([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="#a9b1ab" style="stroke-width:2"/>`
				)
				.join('')}`,
		top: `
      ${rod('M270 186 L258 132', 9, '#c0492b')}
      ${rod('M268 180 L262 152', 5, '#dfe5df')}
      <g transform="rotate(-20 140 178)">
        <path d="M130 100 H330 L310 178 H150 Z" fill="#e0a02c"/>
        <path d="M140 112 H322" style="stroke:${INK};stroke-width:2;opacity:.35"/>
      </g>
      <circle cx="140" cy="178" r="7" class="nut"/>`,
		over: bits(
			[
				[168, 136],
				[162, 170],
				[156, 206],
				[150, 244],
				[146, 282],
				[160, 190]
			],
			(x, y, i) =>
				`<circle cx="${x}" cy="${y}" r="${5 + (i % 2)}" fill="${i % 2 ? '#a9b1ab' : '#8a5a3b'}" style="stroke-width:2"/>`,
			'fall'
		)
	},

	// Trekhaak met aanhangertje
	28: {
		bg: 'field',
		dx: 120,
		sprouts: false,
		behind: `
      <rect x="-6" y="226" width="150" height="72" rx="4" fill="#b9854f"/>
      ${[244, 262, 280].map((y) => `<path d="M-2 ${y} H140" style="stroke:#8a5a3b;stroke-width:2"/>`).join('')}
      ${[
				[10, 202, '#c0492b'],
				[52, 196, '#e0a02c'],
				[94, 204, '#6bb04f']
			]
				.map(
					([x, y, c]) =>
						`<rect x="${x}" y="${y}" width="38" height="${226 - y}" rx="3" fill="${c}"/>`
				)
				.join('')}
      <circle cx="68" cy="316" r="30" class="tire"/>
      <circle cx="68" cy="316" r="13" class="rim"/>
      <circle cx="68" cy="316" r="4" class="nut"/>`,
		top: `
      ${rod('M106 200 L86 262', 9, '#4a544e')}
      ${rod('M24 282 L80 264', 8, '#4a544e')}
      <circle cx="86" cy="262" r="8" class="nut"/>`
	},

	// Contragewichten voor en achter
	29: {
		bg: 'soil',
		dx: -10,
		top: `
      ${rod('M530 196 L556 212', 9)}
      ${rod('M110 196 L86 212', 9)}
      ${[548, 38]
				.map((x) =>
					[212, 244, 276]
						.map(
							(y) => `<rect x="${x}" y="${y}" width="54" height="30" rx="4" fill="#4a544e"/>
                <rect x="${x + 17}" y="${y + 9}" width="20" height="12" rx="6" fill="#2c3e2c" style="stroke-width:2"/>`
						)
						.join('')
				)
				.join('')}
      ${arrow(575, 316, 575, 344, '#e0a02c')}
      ${arrow(65, 316, 65, 344, '#e0a02c')}`
	},

	// Hydrauliekpomp die een voorhef aandrijft
	30: {
		bg: 'field',
		dx: -50,
		dome: false,
		top: `
      <rect x="236" y="120" width="84" height="60" rx="8" fill="#c0492b"/>
      <rect x="262" y="110" width="20" height="12" rx="3" class="dark"/>
      <path d="M248 140 H308 M248 150 H308" style="stroke:#8b2f1a;stroke-width:2.5"/>
      <rect x="320" y="136" width="56" height="44" rx="10" class="motor"/>
      ${rod('M376 150 C 420 60, 540 70, 574 300', 5, '#2c3e2c')}
      ${rod('M376 162 C 430 80, 530 90, 574 186', 5, '#2c3e2c')}
      ${rod('M530 190 H566', 9)}
      ${rod('M566 150 V344', 9)}
      <rect x="574" y="180" width="14" height="120" rx="6" fill="#c0492b"/>
      ${rod('M581 180 V150', 5, '#dfe5df')}
      ${rod('M566 232 H632', 7, '#4a544e')}
      <rect x="590" y="192" width="44" height="36" rx="3" fill="#b9854f"/>
      <path d="M590 206 H634 M612 192 V228" style="stroke:#8a5a3b;stroke-width:2"/>
      ${arrow(626, 170, 626, 130, '#e0a02c')}`
	},

	// Driepuntsbok achterop met een eg
	31: {
		bg: 'soil',
		dx: 100,
		top: `
      <rect x="92" y="194" width="18" height="84" rx="3" class="metal"/>
      ${rod('M100 210 L44 234', 8, '#2f9a9e')}
      ${rod('M100 270 L40 290', 9, '#4a544e')}
      <path d="M28 222 H58 L50 300 H36 Z" fill="#c0492b"/>
      <rect x="-26" y="294" width="96" height="12" rx="3" fill="#c0492b"/>
      ${[-16, 10, 36, 62].map((x) => rod(`M${x} 306 C ${x + 10} 324, ${x - 10} 332, ${x + 2} 346`, 4, '#7b857f')).join('')}
      <circle cx="44" cy="234" r="4.5" class="nut"/>
      <circle cx="40" cy="290" r="4.5" class="nut"/>
      ${arrow(8, 250, 8, 206, '#e0a02c')}`
	},

	// Kleine cabine
	32: {
		bg: 'field',
		battery: false,
		dome: false,
		clouds: false,
		behind: `
      <g class="cloud rain-cloud"><ellipse cx="200" cy="30" rx="48" ry="17"/><ellipse cx="232" cy="20" rx="30" ry="18"/><ellipse cx="170" cy="24" rx="22" ry="14"/></g>
      ${bits(
				[
					[168, 50],
					[194, 56],
					[220, 48],
					[246, 58]
				],
				(x, y) => drop(x, y, 0.8),
				'rain'
			)}`,
		top: `
      <rect x="146" y="72" width="12" height="108" class="dark"/>
      <rect x="352" y="72" width="12" height="108" class="dark"/>
      <rect x="158" y="80" width="194" height="96" fill="#cfe9f2" opacity=".85"/>
      <rect x="138" y="62" width="236" height="16" rx="5" fill="#386938"/>
      <path d="M172 92 L196 122 M184 90 L212 124 M300 92 L326 124" style="stroke:#ffffff;stroke-width:4;stroke-linecap:round;opacity:.8"/>
      <rect x="226" y="122" width="44" height="54" rx="12" fill="#2f9a9e"/>
      <rect x="218" y="146" width="14" height="30" rx="5" class="seat"/>
      ${rod('M262 138 L298 150', 6, '#2f9a9e')}
      ${rod('M300 176 V150', 4, '#2c3e2c')}
      <circle cx="300" cy="148" r="5" class="knob"/>
      ${farmerHead(250, 106)}`
	},

	// Grasmeter / gewasscanner
	33: {
		bg: 'meadow',
		dx: -40,
		tufts: false,
		behind: `${[
			[520, 22],
			[548, 36],
			[576, 52],
			[604, 30],
			[632, 44],
			[20, 18],
			[260, 22],
			[400, 24]
		]
			.map(([x, h]) => tuft(x, h))
			.join('')}`,
		top: `
      ${rod('M526 186 L600 170', 8)}
      <rect x="588" y="158" width="44" height="24" rx="6" class="dark"/>
      <circle cx="610" cy="182" r="7" class="lens"/>
      ${[0, 1, 2].map((i) => `<path d="M${594 - i * 8} ${204 + i * 22} Q 610 ${214 + i * 22} ${626 + i * 8} ${204 + i * 22}" class="signal s${i}"/>`).join('')}
      <path d="M646 190 V296" style="stroke:#c07f14;stroke-width:3"/>
      <path d="M640 196 L646 190 L652 196 M640 290 L646 296 L652 290" style="fill:none;stroke:#c07f14;stroke-width:3"/>`,
		over: card(
			224,
			36,
			132,
			70,
			[
				[238, 34, '#e0a02c'],
				[266, 50, '#9bd33a'],
				[294, 22, '#c0492b'],
				[322, 44, '#6bb04f']
			]
				.map(
					([x, h, c]) =>
						`<rect x="${x}" y="${96 - h}" width="20" height="${h}" rx="2" fill="${c}" style="stroke-width:2"/>`
				)
				.join('')
		)
	},

	// Bodemverdichtingsmeter: penetrometer de grond in
	34: {
		bg: 'soil',
		domeX: 395,
		sprouts: false,
		behind: `
      <rect x="-40" y="382" width="720" height="48" fill="#6e4a2c" class="ns"/>
      ${range(-30, 670, 26)
				.map((x) => `<path d="M${x} 396 h12" style="stroke:#4a2f1b;stroke-width:3"/>`)
				.join('')}
      ${[40, 600].map((x) => `<path d="M${x} 350 c -12 -14 -12 -34 0 -34 c 12 0 12 20 0 34 Z" fill="#c0492b"/><circle cx="${x}" cy="327" r="4.5" fill="#ffffff"/>`).join('')}`,
		mid: `
      ${rod('M296 200 V214', 6)}
      ${rod('M344 200 V214', 6)}
      <rect x="306" y="210" width="28" height="64" rx="6" class="motor"/>
      <path d="M320 274 V398" style="stroke:${INK};stroke-width:7"/>
      <path d="M320 274 V398" style="stroke:#dfe5df;stroke-width:3"/>
      <path d="M314 398 L320 412 L326 398 Z" class="metal"/>
      ${arrow(356, 290, 356, 336, '#e0a02c')}`,
		top: `
      <rect x="296" y="160" width="48" height="20" rx="4" class="dark"/>
      <circle cx="320" cy="140" r="26" fill="#fffdf5"/>
      <path d="M300 146 A21 21 0 0 1 306 124" style="fill:none;stroke:#6bb04f;stroke-width:5"/>
      <path d="M309 121 A21 21 0 0 1 331 121" style="fill:none;stroke:#e0a02c;stroke-width:5"/>
      <path d="M334 124 A21 21 0 0 1 340 146" style="fill:none;stroke:#c0492b;stroke-width:5"/>
      <path d="M320 142 L334 126" class="needle"/>
      <circle cx="320" cy="142" r="3.5" fill="${INK}"/>`
	},

	// NIR-sensor: rood en nabij-infrarood licht teruggekaatst door het gewas
	35: {
		bg: 'field',
		dx: -40,
		clouds: false,
		sprouts: false,
		behind: `${[478, 560, 620].map((x) => maize(x, 70)).join('')}`,
		over: `
      ${sun(598, 56, 18)}
      <path d="M586 76 L566 272" style="stroke:#f6c945;stroke-width:4;stroke-dasharray:8 6"/>
      <path d="${zigzag(560, 272, 556, 166)}" class="ray red"/>
      <path d="${zigzag(576, 276, 536, 166)}" class="ray nir"/>
      ${card(
				214,
				36,
				128,
				74,
				[0, 1, 2]
					.flatMap((row) =>
						[0, 1, 2, 3, 4].map((col) => {
							const shades = ['#c0492b', '#e0a02c', '#f6c945', '#9bd33a', '#4f8a3a'];
							return `<rect x="${226 + col * 21}" y="${46 + row * 20}" width="19" height="18" fill="${shades[(col + row * 2) % 5]}" style="stroke-width:1.5"/>`;
						})
					)
					.join('')
			)}`,
		top: `
      ${rod('M526 186 L574 146', 8)}
      <rect x="560" y="126" width="48" height="26" rx="6" class="dark"/>
      <circle cx="574" cy="152" r="6" fill="#c0492b"/>
      <circle cx="594" cy="152" r="6" fill="#8e44ad"/>`
	},

	// Dronecombinatie: platform op de robot, drone brengt het veld in kaart
	36: {
		bg: 'field',
		dome: false,
		behind: `<polygon points="470,86 660,300 660,350 560,350" class="cone"/>`,
		top: `
      <rect x="236" y="166" width="164" height="12" rx="4" class="dark"/>
      <ellipse cx="318" cy="166" rx="40" ry="6" style="fill:none;stroke:#e0a02c;stroke-width:3"/>
      <g class="hover">
        <rect x="438" y="66" width="64" height="18" rx="8" fill="#dfe5df"/>
        ${rod('M430 66 H510', 4, '#2c3e2c')}
        ${[430, 510].map((x) => `<ellipse cx="${x}" cy="60" rx="24" ry="4" class="prop"/><rect x="${x - 3}" y="58" width="6" height="10" class="dark"/>`).join('')}
        <circle cx="470" cy="90" r="7" class="lens"/>
      </g>
      <path d="M470 106 Q 420 140 336 158" class="link"/>`
	},

	// Zwerm: meerdere robots op één perceel
	37: {
		bg: 'swarm',
		robots: [
			{ x: 10, y: 110, s: 0.4 },
			{ x: 400, y: 103, s: 0.32 },
			{ x: 200, y: 163, s: 0.62 }
		],
		over: `
      <path d="M138 164 L502 147" class="link"/>
      <path d="M398 247 L502 147" class="link"/>
      <path d="M138 164 L398 247" class="link"/>`
	},

	// Vloeibare kunstmest (RENURE)
	38: {
		bg: 'soil',
		dome: false,
		mid: `
      ${rod('M280 200 V300', 5, '#2c3e2c')}
      ${rod('M252 300 H392', 8, '#4a544e')}
      ${[264, 304, 344, 384].map((x) => `<rect x="${x - 4}" y="302" width="8" height="18" rx="2" class="dark"/>`).join('')}`,
		top: `
      <rect x="236" y="92" width="152" height="88" rx="6" fill="#f4f6f4" opacity=".95"/>
      <rect x="240" y="126" width="144" height="50" fill="#9fcf73" class="ns"/>
      <path d="M240 126 H384" style="stroke:#5d8f3a;stroke-width:2.5"/>
      ${range(266, 364, 32)
				.map((x) => `<path d="M${x} 92 V180" style="stroke:#9aa39e;stroke-width:3"/>`)
				.join('')}
      <path d="M236 136 H388" style="stroke:#9aa39e;stroke-width:3"/>
      <rect x="298" y="80" width="28" height="14" rx="3" class="dark"/>
      <g transform="translate(454 70)">
        <circle r="26" fill="#fffdf5"/>
        <path d="M-15 -8 A17 17 0 0 1 14 -9" style="fill:none;stroke:#4f8a3a;stroke-width:4"/>
        <path d="M14 -9 l2 -9 M14 -9 l-9 -1" style="stroke:#4f8a3a;stroke-width:4"/>
        <path d="M15 8 A17 17 0 0 1 -14 9" style="fill:none;stroke:#4f8a3a;stroke-width:4"/>
        <path d="M-14 9 l-2 9 M-14 9 l9 1" style="stroke:#4f8a3a;stroke-width:4"/>
        ${drop(0, 3, 0.9, '#9fcf73')}
      </g>`,
		over: bits(
			[
				[264, 328],
				[304, 334],
				[344, 328],
				[384, 334]
			],
			(x, y) => drop(x, y, 0.7, '#9fcf73'),
			'fall'
		)
	},

	// Trailer met tent als mobiel basisstation
	39: {
		bg: 'field',
		sprouts: false,
		robots: [{ x: 330, y: 157, s: 0.55 }],
		behind: `
      ${rod('M-40 268 H20', 7, '#4a544e')}
      <rect x="10" y="252" width="330" height="18" rx="3" class="dark"/>
      ${[150, 226].map((x) => `<circle cx="${x}" cy="298" r="28" class="tire"/><circle cx="${x}" cy="298" r="11" class="rim"/>`).join('')}
      <path d="M22 252 V128 Q 170 44 330 128 V252 Z" fill="#386938"/>
      <path d="M22 150 Q 170 66 330 150" style="fill:none;stroke:#e0a02c;stroke-width:6"/>
      <path d="M276 252 V148 Q 300 132 330 142 V252 Z" fill="#1f2a22"/>
      <path d="M276 252 V150 L250 252 Z" fill="#2c5a2c"/>
      <path d="M340 256 L396 350" style="stroke:${INK};stroke-width:14;stroke-linecap:round"/>
      <path d="M340 256 L396 350" style="stroke:#b9c3bc;stroke-width:8;stroke-linecap:round"/>`
	},

	// Oplaadstation aan de rand van het veld
	40: {
		bg: 'field',
		dx: -60,
		sprouts: false,
		behind: `
      <rect x="484" y="340" width="130" height="12" rx="4" class="metal"/>
      <rect x="530" y="150" width="56" height="196" rx="8" fill="#eef1ee"/>
      <path d="M516 150 Q 558 118 600 150 Z" fill="#386938"/>
      ${rod('M530 186 H490', 6, '#4a544e')}
      <rect x="480" y="178" width="12" height="18" rx="2" fill="#e0a02c"/>
      <circle cx="558" cy="218" r="10" class="led"/>
      ${[0, 1, 2].map((i) => `<rect x="${546}" y="${240 + i * 18}" width="24" height="12" rx="2" class="led charge c${i}"/>`).join('')}`,
		over: `<path d="M476 150 L466 166 H476 L468 182" class="spark"/>`
	},

	// Cycly: om de paar dagen met de wiedeg over het veld
	41: {
		bg: 'soil',
		dx: 90,
		sprouts: false,
		behind: `${[520, 560, 610].map((x) => sprout(x)).join('')}`,
		top: `
      ${rod('M104 200 L70 284', 4, '#4a544e')}
      ${rod('M104 240 L40 284', 4, '#4a544e')}
      <rect x="-50" y="280" width="140" height="10" rx="3" fill="#c0492b"/>
      ${range(-44, 86, 13)
				.map(
					(x) =>
						`<path d="M${x} 290 Q ${x + 8} 316 ${x - 4} 348" style="fill:none;stroke:${INK};stroke-width:3"/>`
				)
				.join('')}`,
		over: `
      ${bits(
				[
					[30, 336],
					[70, 330],
					[110, 338]
				],
				(x, y) =>
					`<g transform="translate(${x} ${y})"><path d="M0 0 V-8 M0 -6 q-6 -4 -8 0 M0 -7 q6 -5 8 0" style="fill:none;stroke:#6bb04f;stroke-width:2.5"/><path d="M0 0 v6" style="stroke:#fffdf5;stroke-width:1.5"/></g>`,
				'fly-up'
			)}
      <g transform="translate(320 76)">
        <circle r="40" fill="#fffdf5" style="stroke-width:3"/>
        <path d="M-28 -12 A30 30 0 0 1 22 -20" style="fill:none;stroke:#2f9a9e;stroke-width:5"/>
        <path d="M22 -20 l3 -11 M22 -20 l-11 -2" style="stroke:#2f9a9e;stroke-width:5"/>
        <path d="M28 12 A30 30 0 0 1 -22 20" style="fill:none;stroke:#2f9a9e;stroke-width:5"/>
        <path d="M-22 20 l-3 11 M-22 20 l11 2" style="stroke:#2f9a9e;stroke-width:5"/>
        <circle cx="-6" cy="-2" r="9" fill="#f6c945"/>
        <ellipse cx="6" cy="6" rx="13" ry="7" fill="#dfe5df"/>
      </g>`
	},

	// Automatisch bijvullen uit een voorraadbak op de kopakker
	42: {
		bg: 'soil',
		dome: false,
		behind: `
      ${[48, 592].map((x) => `<rect x="${x - 7}" y="72" width="14" height="278" class="metal"/>`).join('')}
      <rect x="36" y="72" width="568" height="14" rx="3" fill="#4a544e"/>
      <path d="M222 40 H418 V86 L350 112 H290 L222 86 Z" fill="#2f9a9e"/>
      <path d="M228 52 H412" style="stroke:${INK};stroke-width:2;opacity:.35"/>
      <rect x="308" y="112" width="24" height="10" rx="2" class="dark"/>`,
		top: hopper(262, 378, 128, '#c0492b', '#f4ede4', false),
		over: bits(
			[
				[314, 126],
				[322, 132],
				[330, 124],
				[318, 138],
				[326, 142]
			],
			(x, y) => `<circle cx="${x}" cy="${y}" r="2.8" fill="#ffffff" style="stroke-width:1.2"/>`,
			'fall-short'
		)
	},

	// Wildverschrikker: 360-camera, zonnepaneel en zwaailicht, dag en nacht
	43: {
		bg: 'night',
		domeX: 395,
		behind: `
      <g class="flee">
        <ellipse cx="596" cy="318" rx="34" ry="20" fill="#5a3b24"/>
        <path d="M566 312 L548 322 L566 330 Z" fill="#5a3b24"/>
        <path d="M552 322 l-4 -6" style="stroke:#fffdf5;stroke-width:3"/>
        ${[574, 590, 606, 620].map((x) => `<rect x="${x - 3}" y="332" width="6" height="18" fill="#3b2a1a"/>`).join('')}
        <path d="M580 300 l6 -8 l6 8 l6 -8 l6 8" style="fill:none;stroke:#3b2a1a;stroke-width:3"/>
        <path d="M636 306 q-10 -2 -18 6 M640 318 q-10 0 -18 6" style="fill:none;stroke:#fffdf5;stroke-width:3;opacity:.7"/>
      </g>
      ${[
				[510, 90],
				[548, 72],
				[586, 96]
			]
				.map(([x, y]) => `<path d="M${x - 12} ${y} q6 -8 12 0 q6 -8 12 0" class="goose"/>`)
				.join('')}`,
		top: `
      <path d="M236 150 H372 L380 176 H228 Z" class="solar"/>
      <path d="M270 150 L264 176 M304 150 L304 176 M338 150 L344 176" class="cells"/>
      ${rod('M460 126 V66', 5, '#b9c3bc')}
      <circle cx="460" cy="56" r="14" class="dark"/>
      ${[-8, 0, 8].map((dx) => `<circle cx="${460 + dx}" cy="56" r="3" class="lens"/>`).join('')}
      <ellipse cx="460" cy="56" rx="44" ry="10" class="ring"/>
      <rect x="484" y="104" width="14" height="22" rx="6" class="beacon"/>
      <path d="M476 100 l-8 -6 M506 100 l8 -6 M491 96 V86" class="beam-light"/>`
	},

	// Mechanische aandrijving: ketting van het wiel naar een schudder
	44: {
		bg: 'meadow',
		dx: 100,
		tufts: false,
		behind: `${range(-40, 160, 22)
			.map(
				(x, i) =>
					`<path d="M${x} 350 q 10 -${8 + (i % 3) * 3} 22 0" style="fill:#d9b44a;stroke:#a8872a;stroke-width:2"/>`
			)
			.join('')}`,
		top: `
      ${rod('M104 200 L40 292', 8)}
      <path d="M40 286 L165 293 M40 314 L165 323" class="chain"/>
      <circle cx="165" cy="308" r="15" class="sprocket"/>
      <g class="spin rev">
        ${range(0, 300, 60)
					.map((a) => {
						const ex = 40 + Math.cos(rad(a)) * 44;
						const ey = 300 + Math.sin(rad(a)) * 44;
						return `${rod(`M40 300 L${r1(ex)} ${r1(ey)}`, 5, '#c0492b')}<path d="M${r1(ex)} ${r1(ey)} l${r1(Math.cos(rad(a + 90)) * 10)} ${r1(Math.sin(rad(a + 90)) * 10)}" style="stroke:${INK};stroke-width:3"/>`;
					})
					.join('')}
        <circle cx="40" cy="300" r="14" class="sprocket"/>
      </g>`,
		over: bits(
			[
				[118, 250],
				[96, 236],
				[150, 244],
				[80, 262]
			],
			(x, y) =>
				`<path d="M${x} ${y} q 6 -6 13 0" style="fill:none;stroke:#d9b44a;stroke-width:3.5;stroke-linecap:round"/>`,
			'fly-up'
		)
	}
};

/** Spuitboom voorop met camera, voor de twee spot-spray-varianten. */
function spray(kind) {
	const nozzles = [548, 574, 600, 626];
	const out =
		kind === 'mist'
			? `<polygon points="600,306 568,348 632,348" class="mist"/>
         ${bits(
						[
							[590, 322],
							[604, 330],
							[612, 318],
							[596, 338],
							[584, 336]
						],
						(x, y) => `<circle cx="${x}" cy="${y}" r="2.6" fill="#2d6fb3" class="ns"/>`,
						'pulse'
					)}`
			: bits(
					[
						[600, 314],
						[600, 330],
						[600, 346]
					],
					(x, y) => drop(x, y, 1.1, '#2d6fb3'),
					'drip'
				);
	return {
		bg: 'soil',
		dx: -50,
		sprouts: false,
		domeX: 395,
		behind: `${sprout(470, GROUND, 1.2)}${weed(550, GROUND, 1.3)}${sprout(620, GROUND, 1.2)}${sprout(80)}`,
		top: `
      <rect x="248" y="126" width="100" height="54" rx="22" fill="#dfe5df"/>
      <rect x="252" y="146" width="92" height="30" rx="14" fill="#7fc4d6" class="ns"/>
      <rect x="286" y="116" width="24" height="12" rx="3" class="dark"/>
      ${rod('M348 150 C 400 60, 560 60, 566 200', 4, '#2c3e2c')}
      ${rod('M526 196 H560 V290', 8)}
      ${rod('M536 290 H640', 7, '#4a544e')}
      ${nozzles.map((x) => `<rect x="${x - 5}" y="294" width="10" height="12" rx="2" class="${x === 600 ? 'motor' : 'dark'}"/>`).join('')}
      ${out}
      ${rod('M560 196 L600 170', 6)}
      <rect x="590" y="150" width="36" height="22" rx="5" class="dark"/>
      <circle cx="608" cy="172" r="6" class="lens"/>`
	};
}

// ---------------------------------------------------------------- stijl

const CSS = `
  svg { stroke-linecap: round; stroke-linejoin: round; }
  rect, circle, path, ellipse, polygon { stroke: ${INK}; stroke-width: 3; }
  .ns, .hole { stroke: none !important; }
  .hole-dark { fill: #6f7a73; stroke: none; }

  .grass { fill: #7cb35b; stroke: none; }
  .ground-line { stroke: #4f8a3a; stroke-width: 4; }
  .soil { fill: #9b6b43; stroke: none; }
  .soil-line { stroke: #6e4a2c; stroke-width: 4; }
  .furrow { stroke: #7f5433; stroke-width: 3; }
  .floor { fill: #cfc6b4; stroke: none; }
  .floor-line { stroke: #a39a88; stroke-width: 4; }
  .plank { stroke: #b99c6c; stroke-width: 2.5; }
  .plank-rail { stroke: #a8865a; stroke-width: 10; }
  .sprout path { fill: #5aa447; stroke: #2f6b2a; stroke-width: 2; }
  .blade { fill: #5aa447; stroke: #2f6b2a; stroke-width: 2; }
  .weed { fill: #3f7d34; stroke: #1f4a1c; stroke-width: 2; }
  .crop path { fill: #6bb04f; stroke: #2f6b2a; stroke-width: 2.5; }
  .crop.small path { stroke-width: 1.5; }
  .cloud ellipse { fill: #ffffff; stroke: none; }
  .rain-cloud ellipse { fill: #c7d0cb; }
  .sun circle { fill: #f6c945; }
  .sun path { stroke: #e0a02c; stroke-width: 4; }
  .star { fill: #fff6c2; stroke: none; animation: twinkle 2.4s ease-in-out infinite; }

  .tire { fill: #33383a; }
  .tread { fill: none; stroke: #5d6663; stroke-dasharray: 7 6; stroke-width: 4; }
  .rim { fill: #dfe5df; }
  .hub { fill: #e0a02c; }
  .hub-inner { fill: #c07f14; }
  .bolt { fill: #fffdf5; stroke-width: 2; }
  .metal { fill: #b9c3bc; }
  .dark { fill: #2c3e2c; }
  .nut { fill: #7b857f; }
  .motor { fill: #2f9a9e; }
  .far { opacity: 0.55; }

  .beam-outline { fill: none; stroke: ${INK}; stroke-width: 26; stroke-linecap: butt; }
  .beam { fill: none; stroke: #4a544e; stroke-width: 20; stroke-linecap: butt; }
  .beam-shine { fill: none; stroke: #6d7972; stroke-width: 3; stroke-linecap: butt; }
  .hole { fill: #c7cfc9; }
  .beam-end { fill: #4a544e; }
  .beam-end-hole { fill: ${INK}; stroke: none; }

  .battery { fill: #f08a2c; }
  .led { fill: #6fcf6f; stroke-width: 2; }
  .handle { fill: none; stroke-width: 4; }
  .plus { fill: #4f8a3a; }
  .generator { fill: #f6c945; }
  .grille { stroke-width: 2.5; }
  .puff { fill: #e6eae7; stroke: #9aa39e; stroke-width: 2; }
  .spark { fill: none; stroke: #e0a02c; stroke-width: 3.5; animation: pulse 0.9s ease-in-out infinite; }
  .solar { fill: #2d4a7a; }
  .cells { fill: none; stroke: #8fb3e6; stroke-width: 1.8; }

  .box { fill: #386938; }
  .eye { fill: #ffffff; }
  .pupil { fill: ${INK}; stroke: none; animation: look 5s ease-in-out infinite; }
  .mouth { fill: none; stroke-width: 3; }
  .blink { fill: #6fcf6f; animation: blink 1.6s steps(2, jump-none) infinite; }
  .dome { fill: #f4f6f4; }

  .seat { fill: #5b6360; }
  .skin { fill: #f2c7a0; }
  .knob { fill: #c0492b; }
  .lens { fill: #7fc4d6; }
  .cone { fill: rgba(246, 201, 69, 0.28); stroke: none; }
  .mist { fill: rgba(127, 196, 214, 0.75); stroke: none; animation: pulse 1.2s ease-in-out infinite; }
  .water { fill: none; stroke: #7fc4d6; stroke-width: 4; stroke-dasharray: 3 9; animation: flow 0.8s linear infinite; }
  .signal { fill: none; stroke: #2f9a9e; stroke-width: 3; animation: pulse 1.4s ease-in-out infinite; }
  .signal.s1 { animation-delay: 0.3s; }
  .signal.s2 { animation-delay: 0.6s; }
  .link { fill: none; stroke: #2f9a9e; stroke-width: 3; stroke-dasharray: 2 8; animation: flow 1s linear infinite; }
  .ray { fill: none; stroke-width: 3.5; }
  .ray.red { stroke: #c0492b; }
  .ray.nir { stroke: #8e44ad; }
  .ring { fill: none; stroke: #c0492b; stroke-dasharray: 10 8; stroke-width: 2.5; animation: flow 1.2s linear infinite; }
  .beacon { fill: #f08a2c; animation: beacon 0.8s steps(2, jump-none) infinite; }
  .beam-light { fill: none; stroke: #f6c945; stroke-width: 3; animation: pulse 0.8s ease-in-out infinite; }
  .goose { fill: none; stroke: #dfe5df; stroke-width: 3; }
  .needle { stroke: #c0492b; stroke-width: 3.5; }
  .prop { fill: rgba(223, 229, 223, 0.7); stroke: #9aa39e; stroke-width: 1.5; }
  .blade-line { fill: none; stroke: #7b857f; stroke-width: 4; stroke-dasharray: 14 6; animation: flow 0.3s linear infinite; }
  .chain { fill: none; stroke: #2c3e2c; stroke-width: 4; stroke-dasharray: 5 3; animation: flow 0.6s linear infinite; }
  .sprocket { fill: #e0a02c; stroke-dasharray: 3 2; }
  .card { fill: #fffdf5; filter: drop-shadow(0 3px 0 ${INK}); }

  /* Beweging: draaiende rotors, vallende korrels, wegvliegende brokjes. */
  .spin { transform-box: fill-box; transform-origin: center; animation: spin 1.4s linear infinite; }
  .spin.slow { animation-duration: 3s; }
  .spin.fast { animation-duration: 0.5s; }
  .spin.rev { animation-direction: reverse; }
  .fall { animation: fall 1.3s linear infinite; }
  .fall-short { animation: fall-short 0.9s linear infinite; }
  .fly-back { animation: fly-back 1.3s ease-out infinite; }
  .fly-up { animation: fly-up 1.3s ease-out infinite; }
  .drip { animation: drip 1.1s ease-in infinite; }
  .rain { animation: drip 1s linear infinite; }
  .bob { animation: bob 1.1s ease-in-out infinite; }
  .pulse { animation: pulse 0.7s ease-in-out infinite; }
  .saw { animation: saw 0.25s linear infinite alternate; }
  .sway { animation: sway 1.6s ease-in-out infinite alternate; }
  .hover { animation: hover 2.2s ease-in-out infinite alternate; }
  .plant-arm { animation: plant 2.4s ease-in-out infinite; }
  .flee { animation: flee 3s ease-in infinite; }
  .charge { animation: pulse 1.5s ease-in-out infinite; }
  .charge.c1 { animation-delay: 0.3s; }
  .charge.c2 { animation-delay: 0.6s; }

  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fall { from { transform: translate(0, -18px); opacity: 0; } 25% { opacity: 1; } to { transform: translate(0, 24px); opacity: 0; } }
  @keyframes fall-short { from { transform: translate(0, -8px); opacity: 0; } 30% { opacity: 1; } to { transform: translate(0, 10px); opacity: 0; } }
  @keyframes fly-back { from { transform: translate(14px, 10px); opacity: 0; } 30% { opacity: 1; } to { transform: translate(-22px, -14px); opacity: 0; } }
  @keyframes fly-up { from { transform: translate(0, 8px); opacity: 0; } 30% { opacity: 1; } to { transform: translate(10px, -20px); opacity: 0; } }
  @keyframes drip { from { transform: translate(0, -14px); opacity: 0; } 20% { opacity: 1; } to { transform: translate(0, 16px); opacity: 0; } }
  @keyframes bob { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(0, -4px); } }
  @keyframes pulse { 0%, 100% { opacity: 0.25; } 50% { opacity: 1; } }
  @keyframes flow { to { stroke-dashoffset: -24; } }
  @keyframes saw { from { transform: translateX(-3px); } to { transform: translateX(3px); } }
  @keyframes sway { from { transform: translateX(-10px); } to { transform: translateX(10px); } }
  @keyframes hover { from { transform: translateY(-4px); } to { transform: translateY(4px); } }
  @keyframes plant { 0%, 100% { transform: translateY(-14px); } 50% { transform: translateY(0); } }
  @keyframes flee { from { transform: translateX(0); } 70% { opacity: 1; } to { transform: translateX(60px); opacity: 0; } }
  @keyframes blink { 50% { fill: #c0492b; } }
  @keyframes beacon { 50% { fill: #f6c945; } }
  @keyframes twinkle { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
  @keyframes look { 0%, 70%, 100% { transform: translate(0, 0); } 78%, 92% { transform: translate(-5px, -1px); } }

  @media (prefers-reduced-motion: reduce) {
    * { animation: none !important; }
  }
`;

const DEFS = `
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#bfe3f2"/><stop offset="1" stop-color="#eef8f2"/>
    </linearGradient>
    <linearGradient id="night" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#142440"/><stop offset="1" stop-color="#34507a"/>
    </linearGradient>
  </defs>`;

// Zwerm: vakken over het perceel, met een horizon in plaats van één rij.
backgrounds.swarm = (o) => `${sky({ ...o, clouds: false })}
  <rect x="-40" y="170" width="720" height="260" class="grass"/>
  ${[
		[170, 196, '#8cc26a'],
		[196, 236, '#7cb35b'],
		[236, 296, '#8cc26a'],
		[296, 430, '#7cb35b']
	]
		.map(
			([y1, y2, c]) =>
				`<rect x="-40" y="${y1}" width="720" height="${y2 - y1}" fill="${c}" class="ns"/>`
		)
		.join('')}
  <path d="M-40 170 H680" class="ground-line"/>
`;

// ---------------------------------------------------------------- schrijven

function render(id, o) {
	const robots = o.robots ?? [{ x: o.dx ?? 0, y: 0, s: 1 }];
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-40 -30 720 460" width="720" height="460">
<!-- Gegenereerd door scripts/generate-function-cartoons.mjs (functie ${id}); niet met de hand bewerken. -->
<style>${CSS.replace(/\s+/g, ' ')}</style>
${DEFS}
${backgrounds[o.bg ?? 'field'](o)}
${o.behind ?? ''}
${robots
	.map(
		(r) =>
			`<g transform="translate(${r.x} ${r.y})${r.s === 1 ? '' : ` scale(${r.s})`}">${robot(o.robots ? {} : o)}</g>`
	)
	.join('')}
${o.over ?? ''}
</svg>
`
		.replace(/\n\s*\n/g, '\n')
		.replace(/^\s+/gm, '');
}

mkdirSync(OUT, { recursive: true });
for (const [id, o] of Object.entries(cartoons)) {
	writeFileSync(join(OUT, `func_${id}.svg`), render(id, o));
}
console.log(`${Object.keys(cartoons).length} cartoons geschreven naar ${OUT}`);
