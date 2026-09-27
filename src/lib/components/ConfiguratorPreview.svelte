<script lang="ts">
  // Zijaanzicht van de samengestelde robot, als cartoon.
  //
  // Rijrichting is naar rechts: rechts zitten de voorwielen en de "kop" met de
  // besturing, links de achterwielen met de accu. Elk onderdeel dat van een rol
  // komt, staat in een eigen {#key}-blok, zodat alleen dat onderdeel opnieuw
  // tevoorschijn "popt" als de rol erop landt.
  import { isBig, isDriven, isSteered, type Config, type FrameId, type WheelId } from '$lib/configurator';

  let {
    config,
    alt,
    labels
  }: {
    config: Config;
    alt: string;
    labels: { clearance: string; lowEntry: string; hang: string; frontView: string };
  } = $props();

  const GROUND = 350;
  const REAR_X = 165;
  const FRONT_X = 475;
  const BEAM_Y = 190; // hartlijn van de balk boven de wielen
  const MID_X = 320;

  type Pt = [number, number];

  // Hartlijn van de zijbalk per variant. De uiteinden boven de wielen liggen
  // altijd op dezelfde hoogte; alleen het middenstuk verschilt. "Verhoogd" zit
  // in de breedte (de dwarsbalken lopen als boog over het gewas), dus van opzij
  // blijft de zijbalk recht; de boog zelf staat in het vooraanzicht.
  const beams: Record<FrameId, { pts: Pt[]; mid: number }> = {
    standard: { pts: [[100, BEAM_Y], [540, BEAM_Y]], mid: BEAM_Y },
    raised: { pts: [[100, BEAM_Y], [540, BEAM_Y]], mid: BEAM_Y },
    lowered: {
      pts: [[100, BEAM_Y], [238, BEAM_Y], [262, 250], [378, 250], [402, BEAM_Y], [540, BEAM_Y]],
      mid: 250
    },
    side_high: {
      pts: [[100, BEAM_Y], [244, BEAM_Y], [252, 118], [388, 118], [396, BEAM_Y], [540, BEAM_Y]],
      mid: 118
    }
  };

  const toPath = (pts: Pt[]) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ');

  /** Gaten op vaste afstand langs de hele balk, ook over de knikken heen. */
  function holes(pts: Pt[], step = 24): Pt[] {
    const out: Pt[] = [];
    let d = step / 2;
    for (let i = 1; i < pts.length; i++) {
      const [ax, ay] = pts[i - 1];
      const [bx, by] = pts[i];
      const len = Math.hypot(bx - ax, by - ay);
      while (d < len) {
        out.push([ax + ((bx - ax) * d) / len, ay + ((by - ay) * d) / len]);
        d += step;
      }
      d -= len;
    }
    return out;
  }

  const beam = $derived(beams[config.frame]);
  const beamHoles = $derived(holes(beam.pts));
  const midTop = $derived(beam.mid - 11);
  const midBottom = $derived(beam.mid + 11);
  const solar = $derived(config.charge === 'solar');
  const indoor = $derived(config.control === 'lidar');
  const tracks = $derived(config.rear === 'tracks');

  // Bij lage instap staat er een stoel in het midden; de generator schuift dan
  // naar boven op de accu.
  const genOnBattery = $derived(config.frame === 'lowered');
  const genX = $derived(genOnBattery ? 138 : 282);
  const genBase = $derived(genOnBattery ? (config.battery === 'big' ? 116 : 131) : midTop);
</script>

{#snippet wheel(x: number, type: WheelId)}
  {#if type === 'caster'}
    {@const r = 28}
    {@const ax = x - 16}
    {@const ay = GROUND - r}
    <path d="M{x + 26} 206 A 26 7 0 1 1 {x - 26} 206" class="swivel" />
    <rect x={x - 20} y="198" width="40" height="9" rx="3" class="metal" />
    <rect x={x - 5} y="206" width="10" height="12" class="dark" />
    <circle cx={ax} cy={ay} r={r} class="tire" />
    <circle cx={ax} cy={ay} r={r - 6} class="tread" />
    <circle cx={ax} cy={ay} r={r * 0.45} class="rim" />
    <path d="M{x - 11} 216 H{x + 11} L{ax + 7} {ay} H{ax - 7} Z" class="metal" />
    <circle cx={ax} cy={ay} r="4" class="nut" />
  {:else if type === 'tracks'}
    <!-- Rups over de hele lengte: achter het aangedreven kettingwiel, voor het spanwiel -->
    {#each [REAR_X, FRONT_X] as lx (lx)}
      <rect x={lx - 9} y="198" width="18" height="72" rx="4" class="metal" />
    {/each}
    <rect x="100" y="262" width="450" height="88" rx="44" class="tire" />
    <rect x="105" y="267" width="440" height="78" rx="39" class="links" />
    <rect x="115" y="276" width="420" height="60" rx="30" class="track-inner" />
    <circle cx="146" cy="306" r="27" class="hub" />
    <circle cx="146" cy="306" r="14" class="hub-inner" />
    <path transform="translate(135 290) scale(0.8)" d="M16 0 L4 22 H13 L8 40 L22 15 H13 Z" class="bolt" />
    <circle cx="504" cy="306" r="27" class="rim" />
    <circle cx="504" cy="306" r="5" class="nut" />
    {#each [210, 262, 314, 366, 418] as wx (wx)}
      <circle cx={wx} cy="322" r="13" class="rim" />
      <circle cx={wx} cy="322" r="4" class="nut" />
    {/each}
  {:else if isBig(type)}
    <!-- Dubbel zo groot: het wiel staat buiten de zijbalk, dus vóór het frame -->
    {@const r = 80}
    {@const ay = GROUND - r}
    <circle cx={x} cy={ay} r={r} class="tire" />
    <circle cx={x} cy={ay} r={r - 9} class="tread big-tread" />
    <circle cx={x} cy={ay} r={r * 0.62} class="hub" />
    <circle cx={x} cy={ay} r={r * 0.34} class="hub-inner" />
    <path
      transform="translate({x - 26} {ay - 42}) scale(2)"
      d="M16 0 L4 22 H13 L8 40 L22 15 H13 Z"
      class="bolt"
    />
    <rect x={x - 12} y="180" width="24" height={ay - 168} rx="5" class="metal" />
    {#each Array.from({ length: Math.floor((ay - 200) / 18) }, (_, i) => 196 + i * 18) as hy (hy)}
      <circle cx={x} cy={hy} r="3" class="hole-dark" />
    {/each}
    <circle cx={x} cy={ay} r="8" class="nut" />
    {#if isSteered(type)}
      <rect x={x - 22} y="180" width="44" height="24" rx="6" class="motor" />
      <path d="M{x - 54} 214 A 54 13 0 0 0 {x + 54} 214" class="steer-arrow" />
      <path d="M{x + 54} 204 L{x + 61} 216 L{x + 47} 216 Z" class="steer-head" />
    {/if}
  {:else}
    {@const r = 42}
    {@const ay = GROUND - r}
    {@const steered = isSteered(type)}
    {@const top = steered ? 212 : 198}
    <circle cx={x} cy={ay} r={r} class="tire" />
    <circle cx={x} cy={ay} r={r - 6} class="tread" />
    {#if isDriven(type)}
      <circle cx={x} cy={ay} r={r * 0.62} class="hub" />
      <circle cx={x} cy={ay} r={r * 0.34} class="hub-inner" />
      <path
        transform="translate({x - 12} {ay - 24})"
        d="M16 0 L4 22 H13 L8 40 L22 15 H13 Z"
        class="bolt"
      />
    {:else}
      <circle cx={x} cy={ay} r={r * 0.5} class="rim" />
      {#each [0, 72, 144, 216, 288] as a (a)}
        <circle
          cx={x + Math.cos((a * Math.PI) / 180) * 12}
          cy={ay + Math.sin((a * Math.PI) / 180) * 12}
          r="2.5"
          class="dark"
        />
      {/each}
    {/if}
    <rect x={x - 9} y={top} width="18" height={ay - top + 8} rx="4" class="metal" />
    {#each Array.from({ length: Math.floor((ay - top - 14) / 16) }, (_, i) => top + 12 + i * 16) as hy (hy)}
      <circle cx={x} cy={hy} r="2.6" class="hole-dark" />
    {/each}
    <circle cx={x} cy={ay} r="5" class="nut" />
    {#if steered}
      <rect x={x - 22} y="198" width="44" height="16" rx="5" class="dark" />
      <rect x={x + 20} y="194" width="24" height="22" rx="5" class="motor" />
      <path d="M{x - 34} 226 A 34 9 0 0 0 {x + 34} 226" class="steer-arrow" />
      <path d="M{x + 34} 217 L{x + 40} 228 L{x + 28} 228 Z" class="steer-head" />
    {/if}
  {/if}
{/snippet}

{#snippet frame(far: boolean)}
  <g class:far>
    <path d={toPath(beam.pts)} class="beam-outline" />
    <path d={toPath(beam.pts)} class="beam" />
    <path d={toPath(beam.pts)} class="beam-shine" transform="translate(0 -5)" />
    {#each beamHoles as [hx, hy], i (i)}
      <circle cx={hx} cy={hy + 1} r="3" class="hole" />
    {/each}
  </g>
{/snippet}

<svg viewBox="0 0 640 400" role="img" aria-label={alt} class="preview">
  <defs>
    <linearGradient id="cfg-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#bfe3f2" />
      <stop offset="1" stop-color="#eef8f2" />
    </linearGradient>
    <linearGradient id="cfg-indoor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#e3efe6" />
      <stop offset="1" stop-color="#f7faf6" />
    </linearGradient>
  </defs>

  <!-- Achtergrond: buiten in het veld, of binnen in de kas bij LiDAR/SLAM -->
  <rect width="640" height="400" fill={indoor ? 'url(#cfg-indoor)' : 'url(#cfg-sky)'} />
  {#if indoor}
    <g class="greenhouse">
      {#each [0, 160, 320, 480] as gx (gx)}
        <path d="M{gx} 110 L{gx + 80} 40 L{gx + 160} 110" />
        <path d="M{gx + 80} 40 V350" />
      {/each}
      <path d="M0 110 H640" />
      {#each [40, 120, 200, 280, 360, 440, 520, 600] as gx (gx)}
        <path d="M{gx} 110 V350" />
      {/each}
    </g>
  {:else}
    <g class="cloud">
      <ellipse cx="250" cy="52" rx="34" ry="14" />
      <ellipse cx="275" cy="42" rx="22" ry="16" />
      <ellipse cx="228" cy="46" rx="16" ry="11" />
    </g>
    <g class="cloud">
      <ellipse cx="420" cy="80" rx="26" ry="10" />
      <ellipse cx="438" cy="72" rx="16" ry="12" />
    </g>
  {/if}
  {#if solar}
    {#key config.charge}
      <g class="pop sun">
        <circle cx="42" cy="40" r="22" />
        {#each [0, 45, 90, 135, 180, 225, 270, 315] as a (a)}
          <path
            d="M{42 + Math.cos((a * Math.PI) / 180) * 28} {40 + Math.sin((a * Math.PI) / 180) * 28} L{42 +
              Math.cos((a * Math.PI) / 180) * 36} {40 + Math.sin((a * Math.PI) / 180) * 36}"
          />
        {/each}
      </g>
    {/key}
  {/if}
  {#if config.control === 'rtk'}
    {#key config.control}
      <!-- Transform op een eigen <g>: de pop-animatie zet zelf een CSS-transform. -->
      <g class="pop">
        <g transform="translate(596 28) rotate(-20)">
          <rect x="-24" y="-7" width="17" height="14" class="panel-mini" />
          <rect x="7" y="-7" width="17" height="14" class="panel-mini" />
          <rect x="-6" y="-10" width="12" height="20" rx="3" class="dark" />
        </g>
      </g>
    {/key}
  {/if}

  <!-- Grond met een rij gewas -->
  <rect y={GROUND} width="640" height="50" class={indoor ? 'floor' : 'grass'} />
  <path d="M0 {GROUND} H640" class="ground-line" />
  {#each [30, 280, 360, 560] as sx (sx)}
    <g class="sprout" transform="translate({sx} {GROUND})">
      <path d="M0 0 V-12" />
      <path d="M0 -8 Q -10 -16 -12 -8 Q -6 -4 0 -8" />
      <path d="M0 -10 Q 10 -20 13 -11 Q 6 -6 0 -10" />
    </g>
  {/each}

  <!-- Zonnepaneel: palen achter alles, het dak zelf komt als laatste -->
  {#if solar}
    {#key config.charge}
      <g class="pop">
        <rect x="118" y="56" width="8" height="126" class="metal" />
        <rect x="524" y="56" width="8" height="126" class="metal" />
      </g>
    {/key}
  {/if}

  <!-- Verre kant: tweede zijbalk en wielen, iets verschoven voor diepte -->
  <g transform="translate(14 -12)">
    {#key `${config.front}-${tracks}`}
      {#if !tracks}<g class="pop far">{@render wheel(FRONT_X, config.front)}</g>{/if}
    {/key}
    {#key config.rear}<g class="pop far">{@render wheel(REAR_X, config.rear)}</g>{/key}
    {#key config.frame}<g class="pop">{@render frame(true)}</g>{/key}
  </g>

  <!-- Verhoogd over de breedte: hoog gewas in het midden, de boogbalken van
       opzij gezien als staanders, met een langsbalk over de top -->
  {#if config.frame === 'raised'}
    {#key config.frame}
      <g class="pop">
        {#each [258, 300, 340, 382] as cx (cx)}
          <g class="crop" transform="translate({cx} {GROUND})">
            <path d="M0 0 V-226" />
            {#each [-60, -110, -160, -205] as ly, i (ly)}
              <path
                d={i % 2
                  ? `M0 ${ly} Q -22 ${ly - 16} -30 ${ly - 2} Q -14 ${ly + 4} 0 ${ly}`
                  : `M0 ${ly} Q 22 ${ly - 16} 30 ${ly - 2} Q 14 ${ly + 4} 0 ${ly}`}
              />
            {/each}
          </g>
        {/each}
        <path d="M111 104 H529" class="beam-outline thin" />
        <path d="M111 104 H529" class="beam thin" />
        {#each [100, 518] as cx (cx)}
          <rect x={cx} y="94" width="22" height="86" rx="2" class="beam-end" />
          <rect x={cx + 6} y="100" width="10" height="10" class="beam-end-hole" />
        {/each}
      </g>
    {/key}
  {/if}

  <!-- Machine onder het hoge middenstuk -->
  {#if config.frame === 'side_high'}
    {#key config.frame}
      <g class="pop-down">
        <path d="M296 {midBottom} V270 M344 {midBottom} V270" class="chain" />
        {#each [272, 288, 304, 320, 336, 352, 368] as tx (tx)}
          <path d="M{tx} 280 V310 Q{tx} 322 {tx + 8} 324" class="tine" />
        {/each}
        <rect x="262" y="266" width="116" height="16" rx="5" class="implement" />
        <text x={MID_X} y="165" text-anchor="middle" class="note">{labels.hang}</text>
      </g>
    {/key}
  {/if}

  <!-- Dichtbije kant -->
  <!-- Gewone wielen en rupsen hangen onder het frame, grote wielen staan ervoor -->
  {#key `${config.front}-${tracks}`}
    {#if !tracks && !isBig(config.front)}<g class="pop">{@render wheel(FRONT_X, config.front)}</g>{/if}
  {/key}
  {#key config.rear}
    {#if !isBig(config.rear)}<g class="pop">{@render wheel(REAR_X, config.rear)}</g>{/if}
  {/key}
  {#key config.frame}
    <g class="pop">
      {@render frame(false)}
      <!-- De dwarsbalken, van opzij gezien als kopse kant -->
      {#if config.frame !== 'raised'}
        {#each [100, 518] as cx (cx)}
          <rect x={cx} y="157" width="22" height="22" rx="2" class="beam-end" />
          <rect x={cx + 6} y="163" width="10" height="10" class="beam-end-hole" />
        {/each}
      {/if}
    </g>
  {/key}
  {#key `${config.front}-${tracks}`}
    {#if !tracks && isBig(config.front)}<g class="pop">{@render wheel(FRONT_X, config.front)}</g>{/if}
  {/key}
  {#key config.rear}
    {#if isBig(config.rear)}<g class="pop">{@render wheel(REAR_X, config.rear)}</g>{/if}
  {/key}

  <!-- Lage instap: maataanduiding en een stoel op het verlaagde middenstuk -->
  {#if config.frame === 'lowered'}
    {#key config.frame}
      <g class="pop dimension">
        <path d="M{MID_X} {GROUND - 4} V{midBottom + 5}" />
        <path d="M{MID_X - 7} {midBottom + 13} L{MID_X} {midBottom + 5} L{MID_X + 7} {midBottom + 13}" />
        <path d="M{MID_X - 7} {GROUND - 12} L{MID_X} {GROUND - 4} L{MID_X + 7} {GROUND - 12}" />
        <text x={MID_X + 12} y={(GROUND + midBottom) / 2 + 5} class="note">{labels.lowEntry}</text>
      </g>
      <g class="pop">
        <rect x="316" y={midTop - 16} width="10" height="17" class="dark" />
        <rect x="294" y={midTop - 30} width="62" height="16" rx="8" class="seat" />
        <rect x="286" y={midTop - 86} width="18" height="64" rx="8" class="seat" />
        <path d="M300 {midTop - 40} H336" class="seat-arm" />
        <path d="M303 {midTop - 26} H348" class="seat-line" />
      </g>
    {/key}
  {/if}

  <!-- Accu op het achterste deel -->
  {#key config.battery}
    <g class="pop">
      {#if config.battery === 'big'}
        <rect x="144" y="116" width="14" height="9" rx="2" class="dark" />
        <rect x="194" y="116" width="14" height="9" rx="2" class="dark" />
        <rect x="130" y="123" width="92" height="57" rx="9" class="battery" />
        {#each [0, 1, 2, 3] as i (i)}
          <rect x={140 + i * 19} y="162" width="13" height="10" rx="2" class="led" />
        {/each}
        <path transform="translate(166 128)" d="M14 0 L3 16 H10 L6 30 L18 11 H11 Z" class="bolt" />
      {:else}
        {#each [0, 1, 2] as i (i)}
          {@const bx = 130 + i * 31}
          <path d="M{bx + 6} 142 V132 H{bx + 21} V142" class="handle" />
          <rect x={bx} y="140" width="27" height="40" rx="4" class="battery" />
          <rect x={bx + 7} y="166" width="13" height="7" rx="2" class="led" />
          <path transform="translate({bx + 8} 145)" d="M8 0 L1 10 H6 L3 18 L11 7 H6 Z" class="bolt" />
        {/each}
      {/if}
    </g>
  {/key}

  <!-- Generator op het middenstuk, dus hij beweegt mee met het frame -->
  {#if config.charge === 'generator'}
    {#key `${config.charge}-${config.frame}-${config.battery}`}
      <g class="pop">
        <path d="M{genX + 6} {genBase - 38} V{genBase - 46} H{genX + 70} V{genBase - 38}" class="handle" />
        <rect x={genX} y={genBase - 40} width="76" height="40" rx="6" class="generator" />
        {#each [0, 1, 2] as i (i)}
          <path d="M{genX + 10} {genBase - 30 + i * 9} H{genX + 40}" class="grille" />
        {/each}
        <circle cx={genX + 58} cy={genBase - 20} r="8" class="dark" />
        <rect x={genX + 68} y={genBase - 54} width="7" height="16" rx="2" class="dark" />
        <circle cx={genX + 74} cy={genBase - 62} r="7" class="puff p1" />
        <circle cx={genX + 80} cy={genBase - 74} r="5" class="puff p2" />
      </g>
    {/key}
  {/if}

  <!-- Stekker: kabel van de accu naar een laadpaal -->
  {#if config.charge === 'plug'}
    {#key config.charge}
      <g class="pop">
        <rect x="22" y="246" width="34" height="104" rx="5" class="post" />
        <circle cx="39" cy="272" r="11" class="socket" />
        <path d="M130 168 C 88 170, 112 268, 76 272" class="cable" />
        <rect x="62" y="264" width="16" height="16" rx="3" class="dark" />
        <path d="M50 268 H62 M50 276 H62" class="prong" />
        <path d="M44 236 L36 248 H44 L38 260" class="spark" />
      </g>
    {/key}
  {/if}

  <!-- De kop: besturingskast met gezicht en de gekozen sensor -->
  <g class="brain">
    <rect x="416" y="126" width="88" height="54" rx="10" class="box" />
    <circle cx="430" cy="140" r="4" class="blink" />
    <circle cx="466" cy="150" r="9" class="eye" />
    <circle cx="488" cy="150" r="9" class="eye" />
    <circle cx="469" cy="151" r="4.5" class="pupil" />
    <circle cx="491" cy="151" r="4.5" class="pupil" />
    <path d="M468 166 Q477 173 486 166" class="mouth" />
  </g>

  {#key config.control}
    <g class="pop">
      {#if config.control === 'rtk'}
        {#each [111, 529] as ax (ax)}
          {@const base = solar ? 34 : 96}
          {#if !solar}
            <rect x={ax - 3} y={base} width="6" height={157 - base} class="metal" />
          {/if}
          <rect x={ax - 18} y={base - 4} width="36" height="6" rx="2" class="dark" />
          <path d="M{ax - 16} {base - 4} Q {ax} {base - 28} {ax + 16} {base - 4} Z" class="dome" />
          <path d="M{ax - 10} {base - 26} Q {ax} {base - 32} {ax + 10} {base - 26}" class="signal s1" />
          <path d="M{ax - 16} {base - 33} Q {ax} {base - 41} {ax + 16} {base - 33}" class="signal s2" />
        {/each}
      {:else if config.control === 'camera'}
        <polygon points="522,87 640,36 640,352 600,352" class="cone" />
        <rect x="493" y="92" width="6" height="34" class="metal" />
        <rect x="478" y="76" width="36" height="22" rx="5" class="dark" />
        <circle cx="516" cy="87" r="8" class="lens" />
        <g class="person">
          <path d="M596 314 L593 348 M608 314 L611 348" class="leg" />
          <rect x="589" y="272" width="26" height="46" rx="9" class="shirt" />
          <path d="M614 282 L628 262" class="leg arm" />
          <circle cx="602" cy="258" r="12" class="skin" />
        </g>
        <rect x="580" y="240" width="46" height="112" rx="4" class="track" />
      {:else if config.control === 'lidar'}
        <g class="scan">
          <ellipse cx="462" cy="108" rx="170" ry="34" class="ring r1" />
          <ellipse cx="462" cy="108" rx="170" ry="34" class="ring r2" />
          <ellipse cx="462" cy="108" rx="170" ry="34" class="ring r3" />
        </g>
        <rect x="448" y="110" width="28" height="16" rx="3" class="dark" />
        <rect x="451" y="97" width="22" height="15" rx="5" class="dark" />
        <rect x="453" y="102" width="18" height="4" class="laser" />
      {:else}
        <path d="M500 126 V102" class="antenna" />
        <circle cx="500" cy="99" r="4" class="knob" />
        <path d="M540 86 Q532 96 540 106 M528 80 Q516 96 528 112" class="signal s1" />
        <g transform="rotate(-12 596 92)">
          <path d="M596 76 V58" class="stick" />
          <circle cx="596" cy="56" r="8" class="knob" />
          <rect x="560" y="74" width="72" height="36" rx="17" class="dark" />
          <circle cx="576" cy="92" r="4.5" class="btn-a" />
          <circle cx="616" cy="92" r="4.5" class="btn-b" />
        </g>
      {/if}
    </g>
  {/key}

  <!-- Het zonnepaneel als dak, bovenop alles -->
  {#if solar}
    {#key config.charge}
      <g class="pop-down">
        <path d="M100 34 H545 L560 58 H85 Z" class="solar" />
        {#each [1, 2, 3, 4, 5, 6, 7] as i (i)}
          <path d="M{100 + i * 55.6} 34 L{85 + i * 59.4} 58" class="cells" />
        {/each}
        <path d="M92.5 46 H552.5" class="cells" />
      </g>
    {/key}
  {/if}

  <!-- Vooraanzicht-kaartje: van opzij zie je de boog over de breedte niet -->
  {#if config.frame === 'raised'}
    {#key config.frame}
      <g class="pop-down">
        <rect x="226" y="6" width="188" height="132" rx="10" class="inset-card" />
        <text x="238" y="24" class="inset-title">{labels.frontView}</text>
        <path d="M236 116 H404" class="inset-ground" />
        <g class="crop" transform="translate(320 116)">
          <path d="M0 0 V-58" />
          <path d="M0 -22 Q 12 -32 17 -23 Q 8 -19 0 -22" />
          <path d="M0 -40 Q -12 -50 -17 -41 Q -8 -37 0 -40" />
        </g>
        {#each [262, 378] as wx (wx)}
          <rect x={wx - 4} y="80" width="8" height="24" class="metal" />
          <circle cx={wx} cy="104" r="12" class="tire" />
          <circle cx={wx} cy="104" r="5" class="hub" />
        {/each}
        <path d="M262 76 V60 Q320 18 378 60 V76" class="inset-arch-outline" />
        <path d="M262 76 V60 Q320 18 378 60 V76" class="inset-arch" />
        {#each [252, 368] as bx (bx)}
          <rect x={bx} y="70" width="20" height="14" rx="2" class="beam-end" />
        {/each}
        <g class="dimension">
          <path d="M296 112 V51" />
          <path d="M291 57 L296 51 L301 57 M291 106 L296 112 L301 106" />
        </g>
        <text x="320" y="132" text-anchor="middle" class="inset-note">{labels.clearance}</text>
      </g>
    {/key}
  {/if}
</svg>

<style>
  .preview {
    display: block;
    width: 100%;
    height: auto;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  /* Alles krijgt een dikke inktlijn, dat maakt het cartoon. */
  .preview :global(rect),
  .preview :global(circle:not(.hole):not(.hole-dark)),
  .preview :global(path),
  .preview :global(ellipse),
  .preview :global(polygon) {
    stroke: #1f2a22;
    stroke-width: 3;
  }

  .grass { fill: #7cb35b; stroke: none !important; }
  .floor { fill: #cfc6b4; stroke: none !important; }
  .ground-line { stroke: #4f8a3a !important; stroke-width: 4 !important; }
  .sprout path { fill: #5aa447; stroke: #2f6b2a !important; stroke-width: 2 !important; }
  .cloud ellipse { fill: #ffffff; stroke: none !important; }
  .greenhouse path { fill: none; stroke: #a9c4b3 !important; stroke-width: 3 !important; }
  .sun circle { fill: #f6c945; }
  .sun path { stroke: #e0a02c !important; stroke-width: 4 !important; }
  .panel-mini { fill: #2d4a7a; stroke-width: 2 !important; }

  .tire { fill: #33383a; }
  .tread { fill: none; stroke: #5d6663 !important; stroke-dasharray: 7 6; stroke-width: 4 !important; }
  .rim { fill: #dfe5df; }
  .hub { fill: #e0a02c; }
  .hub-inner { fill: #c07f14; }
  .bolt { fill: #fffdf5; stroke-width: 2 !important; }
  .metal { fill: #b9c3bc; }
  .dark { fill: #2c3e2c; }
  .nut { fill: #7b857f; }
  .hole-dark { fill: #6f7a73; }
  .motor { fill: #2f9a9e; }
  .swivel { fill: none; stroke: #7b857f !important; stroke-dasharray: 4 5; stroke-width: 2.5 !important; }
  .steer-arrow { fill: none; stroke: #2f9a9e !important; stroke-width: 4 !important; }
  .steer-head { fill: #2f9a9e; stroke: #2f9a9e !important; stroke-width: 2 !important; }

  .beam-outline { fill: none; stroke: #1f2a22 !important; stroke-width: 26 !important; stroke-linecap: butt !important; }
  .beam { fill: none; stroke: #4a544e !important; stroke-width: 20 !important; stroke-linecap: butt !important; }
  .beam-shine { fill: none; stroke: #6d7972 !important; stroke-width: 3 !important; stroke-linecap: butt !important; }
  .hole { fill: #c7cfc9; }
  .beam-end { fill: #4a544e; }
  .beam-end-hole { fill: #1f2a22; stroke: none !important; }
  .far { opacity: 0.55; }

  .battery { fill: #f08a2c; }
  .led { fill: #6fcf6f; stroke-width: 2 !important; }
  .handle { fill: none; stroke-width: 4 !important; }

  .generator { fill: #f6c945; }
  .grille { stroke-width: 2.5 !important; }
  .puff { fill: #e6eae7; stroke: #9aa39e !important; stroke-width: 2 !important; }

  .post { fill: #eef1ee; }
  .socket { fill: #ffffff; }
  .cable { fill: none; stroke-width: 5 !important; }
  .prong { stroke: #c9a227 !important; stroke-width: 3 !important; }
  .spark { fill: none; stroke: #e0a02c !important; stroke-width: 3.5 !important; }

  .solar { fill: #2d4a7a; }
  .cells { fill: none; stroke: #8fb3e6 !important; stroke-width: 1.8 !important; }

  .chain { fill: none; stroke-dasharray: 5 4; stroke-width: 3 !important; }
  .implement { fill: #c0492b; }
  .tine { fill: none; stroke-width: 4 !important; }

  .box { fill: #386938; }
  .eye { fill: #ffffff; }
  .pupil { fill: #1f2a22; stroke: none !important; }
  .mouth { fill: none; stroke-width: 3 !important; }
  .blink { fill: #6fcf6f; }

  .dome { fill: #f4f6f4; }
  .signal { fill: none; stroke: #2f9a9e !important; stroke-width: 3 !important; }
  .cone { fill: rgba(246, 201, 69, 0.28); stroke: none !important; }
  .lens { fill: #7fc4d6; }
  .shirt { fill: #2f9a9e; }
  .skin { fill: #f2c7a0; }
  .leg { stroke-width: 6 !important; }
  .arm { stroke-width: 5 !important; }
  .track { fill: none; stroke: #e0a02c !important; stroke-dasharray: 8 5; stroke-width: 3 !important; }
  .ring { fill: none; stroke: #c0492b !important; stroke-dasharray: 10 8; stroke-width: 2.5 !important; }
  .laser { fill: #c0492b; stroke: none !important; }
  .antenna { stroke-width: 3.5 !important; }
  .stick { stroke-width: 6 !important; }
  .knob { fill: #c0492b; }
  .btn-a { fill: #e0a02c; stroke-width: 2 !important; }
  .btn-b { fill: #2f9a9e; stroke-width: 2 !important; }

  .note {
    font: 700 14px 'Roboto', 'Segoe UI', sans-serif;
    fill: #7a5410;
    stroke: #fffdf5 !important;
    stroke-width: 4 !important;
    paint-order: stroke;
  }
  .dimension path { fill: none; stroke: #c07f14 !important; stroke-width: 3 !important; }

  .big-tread { stroke-dasharray: 14 10; stroke-width: 9 !important; }
  .links { fill: none; stroke: #6b7470 !important; stroke-dasharray: 5 9; stroke-width: 5 !important; }
  .track-inner { fill: #4a524e; }
  .beam-outline.thin { stroke-width: 18 !important; }
  .beam.thin { stroke-width: 12 !important; }
  .crop path { fill: #6bb04f; stroke: #2f6b2a !important; stroke-width: 2.5 !important; }
  .seat { fill: #5b6360; }
  .seat-arm { fill: none; stroke-width: 5 !important; }
  .seat-line { fill: none; stroke: #f08a2c !important; stroke-width: 3 !important; }

  .inset-card { fill: #fffdf5; filter: drop-shadow(0 3px 0 #1f2a22); }
  .inset-title { font: 700 13px 'Roboto', 'Segoe UI', sans-serif; fill: #386938; text-transform: uppercase; letter-spacing: 0.5px; }
  .inset-note { font: 700 11px 'Roboto', 'Segoe UI', sans-serif; fill: #7a5410; }
  .inset-ground { stroke: #4f8a3a !important; stroke-width: 3 !important; }
  .inset-arch-outline { fill: none; stroke: #1f2a22 !important; stroke-width: 11 !important; }
  .inset-arch { fill: none; stroke: #4a544e !important; stroke-width: 6 !important; }

  /* Een onderdeel dat net geland is, springt erin. */
  .pop,
  .pop-down {
    transform-box: fill-box;
    transform-origin: 50% 100%;
    animation: pop 0.55s cubic-bezier(0.3, 1.6, 0.5, 1) both;
  }
  .pop-down {
    transform-origin: 50% 0%;
  }
  @keyframes pop {
    from { transform: scale(0.3); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  .pop.far {
    animation-name: pop-far;
  }
  @keyframes pop-far {
    from { transform: scale(0.3); opacity: 0; }
    to { transform: scale(1); opacity: 0.55; }
  }

  .blink { animation: blink 1.6s steps(2, jump-none) infinite; }
  @keyframes blink { 50% { fill: #c0492b; } }

  .signal.s1 { animation: pulse 1.4s ease-in-out infinite; }
  .signal.s2 { animation: pulse 1.4s ease-in-out 0.35s infinite; }
  @keyframes pulse { 0%, 100% { opacity: 0.15; } 50% { opacity: 1; } }

  .ring {
    transform-box: fill-box;
    transform-origin: center;
    animation: scan 2.4s linear infinite;
  }
  .ring.r2 { animation-delay: 0.8s; }
  .ring.r3 { animation-delay: 1.6s; }
  @keyframes scan {
    from { transform: scale(0.12); opacity: 1; }
    to { transform: scale(1); opacity: 0; }
  }

  .puff { animation: puff 2s ease-out infinite; }
  .puff.p2 { animation-delay: 0.7s; }
  @keyframes puff {
    from { transform: translate(0, 6px); opacity: 0; }
    30% { opacity: 1; }
    to { transform: translate(8px, -18px); opacity: 0; }
  }

  .spark { animation: pulse 0.9s ease-in-out infinite; }

  .pupil { animation: look 5s ease-in-out infinite; }
  @keyframes look {
    0%, 70%, 100% { transform: translate(0, 0); }
    78%, 92% { transform: translate(-5px, -1px); }
  }

  @media (prefers-reduced-motion: reduce) {
    .pop, .pop-down, .blink, .signal, .ring, .puff, .spark, .pupil {
      animation: none !important;
    }
    .ring.r1 { transform: scale(0.6); }
    .ring.r2, .ring.r3 { display: none; }
  }
</style>
