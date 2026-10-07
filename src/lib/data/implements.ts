// De aanbouwdelen die echt in FreeCAD zijn uitgewerkt, met de getallen uit hun
// eigen berekeningen. Bron: github.com/JacobsFarm/Bruut_OpenAgbot_Implements
// (README.md, RATIONALE.md en *_calc.py per werktuig, oktober 2026).

import type { Localized } from '$lib/i18n';

import overseederWork from '$lib/assets/implement_overseeder_work.webp';
import overseederAdvIso from '$lib/assets/implement_overseeder_adv_iso.webp';
import overseederAdvUnitSide from '$lib/assets/implement_overseeder_adv_unit_side.webp';
import overseederAdvUnitDetail from '$lib/assets/implement_overseeder_adv_unit_detail.webp';
import overseederAdvAir from '$lib/assets/implement_overseeder_adv_air_seeder.webp';
import overseederAdvLifted from '$lib/assets/implement_overseeder_adv_lifted.webp';
import overseederChart from '$lib/assets/implement_overseeder_ground_chart.webp';
import overseederSimpleWork from '$lib/assets/implement_overseeder_simple_work.webp';
import overseederSimpleIso from '$lib/assets/implement_overseeder_simple_iso.webp';
import overseederSimpleBoot from '$lib/assets/implement_overseeder_simple_boot.webp';

import liquidWork from '$lib/assets/implement_liquid_work.webp';
import liquidAdvIso from '$lib/assets/implement_liquid_adv_iso.webp';
import liquidAdvUnitSide from '$lib/assets/implement_liquid_adv_unit_side.webp';
import liquidAdvDrive from '$lib/assets/implement_liquid_adv_drive.webp';
import liquidAdvLifted from '$lib/assets/implement_liquid_adv_lifted.webp';
import liquidSimpleIso from '$lib/assets/implement_liquid_simple_iso.webp';
import liquidV2Iso from '$lib/assets/implement_liquid_v2_iso.webp';
import liquidV2Knife from '$lib/assets/implement_liquid_v2_knife.webp';
import liquidChart from '$lib/assets/implement_liquid_ground_chart.webp';
import liquidAdvVideo from '$lib/assets/video/implement_liquid_adv.mp4';
import liquidAdvPoster from '$lib/assets/implement_liquid_adv_poster.webp';
import liquidV2Video from '$lib/assets/video/implement_liquid_v2.mp4';
import liquidV2Poster from '$lib/assets/implement_liquid_v2_poster.webp';

import feedWork from '$lib/assets/implement_feedpusher_work.webp';
import feedSide from '$lib/assets/implement_feedpusher_side.webp';
import feedIso from '$lib/assets/implement_feedpusher_iso.webp';
import feedDrive from '$lib/assets/implement_feedpusher_drive.webp';
import feedOpenEnd from '$lib/assets/implement_feedpusher_open_end.webp';
import feedSimple from '$lib/assets/implement_feedpusher_simple.webp';
import feedCleanVideo from '$lib/assets/video/implement_feedpusher_clean.mp4';
import feedCleanPoster from '$lib/assets/implement_feedpusher_clean_poster.webp';
import feedForcesVideo from '$lib/assets/video/implement_feedpusher_forces.mp4';
import feedForcesPoster from '$lib/assets/implement_feedpusher_forces_poster.webp';

import dockWork from '$lib/assets/implement_dockweed_work.webp';
import dockSide from '$lib/assets/implement_dockweed_side.webp';
import dockCutter from '$lib/assets/implement_dockweed_cutter.webp';
import dockMowing from '$lib/assets/implement_dockweed_mowing.webp';
import dockDriving from '$lib/assets/implement_dockweed_driving.webp';
import dockVideo from '$lib/assets/video/implement_dockweed.mp4';
import dockPoster from '$lib/assets/implement_dockweed_poster.webp';
import dockCloseVideo from '$lib/assets/video/implement_dockweed_closeup.mp4';
import dockClosePoster from '$lib/assets/implement_dockweed_closeup_poster.webp';

import trencherWork from '$lib/assets/implement_trencher_work.webp';
import trencherSide from '$lib/assets/implement_trencher_side.webp';
import trencherRearRight from '$lib/assets/implement_trencher_rear_right.webp';
import trencherRear from '$lib/assets/implement_trencher_rear.webp';

const L = (nl: string, en: string = nl): Localized => ({ nl, en });

export type Figure = { value: Localized; label: Localized; note?: Localized };
export type Step = { title: Localized; body: Localized };
export type Variant = { name: Localized; image: string; points: Localized[]; price?: Localized };
export type CalcRow = { label: Localized; value: Localized };
export type CalcGroup = { title: Localized; rows: CalcRow[]; formula?: string; note?: Localized };
export type Clip = { src: string; poster: string; caption: Localized };
export type Shot = { src: string; caption: Localized; chart?: boolean };

export type Implement = {
	slug: string;
	/** Nummer van de bijbehorende functie op /projects/functions. */
	functionId: number;
	name: Localized;
	category: Localized;
	short: Localized;
	lead: Localized;
	hero: string;
	figures: Figure[];
	steps: Step[];
	variants: Variant[];
	calcs: CalcGroup[];
	onRobot: Localized[];
	clips: Clip[];
	chart?: Shot;
	gallery: Shot[];
	repoPath: string;
};

const REPO = 'https://github.com/JacobsFarm/Bruut_OpenAgbot_Implements/tree/main/';

export const implementsRepo = 'https://github.com/JacobsFarm/Bruut_OpenAgbot_Implements';

export const implementList: Implement[] = [
	{
		slug: 'overseeder',
		functionId: 15,
		name: L('Doorzaaier', 'Overseeder'),
		category: L('Zaaien & planten', 'Sowing & planting'),
		short: L(
			'Gras en klaver de bestaande zode in, 8 rijen per meter.',
			'Grass and clover into the existing sward, 8 rows per metre.'
		),
		lead: L(
			'Zaait gras en klaver ín de bestaande zode. Een schijf snijdt een sleuf, het zaad komt op 12 mm en een aandrukrol sluit de sleuf weer.',
			'Sows grass and clover into the existing sward. A disc cuts a slot, the seed lands at 12 mm and a press wheel closes the slot again.'
		),
		hero: overseederWork,
		figures: [
			{ value: L('1 m'), label: L('Werkbreedte per module', 'Working width per module'), note: L('8 rijen à 125 mm, koppelbaar', '8 rows at 125 mm, can be coupled') },
			{ value: L('12 mm'), label: L('Zaaddiepte', 'Seed depth'), note: L('in een sleuf van 15 mm', 'in a 15 mm slot') },
			{ value: L('0,27 ha/u', '0.27 ha/h'), label: L('Capaciteit', 'Capacity'), note: L('bij 0,75 m/s', 'at 0.75 m/s') },
			{ value: L('98%'), label: L('Diepte binnen ±3 mm', 'Depth within ±3 mm'), note: L('geavanceerd, testbaan (eenvoudig 94%)', 'advanced, test track (simple 94%)') },
			{ value: L('335 N'), label: L('Trekkracht, normaal', 'Draft force, normal'), note: L('ongeveer 34 kgf voor 1 m', 'about 34 kgf for 1 m') },
			{ value: L('€ 1.675', '€1,675'), label: L('Materiaal, eenvoudig', 'Materials, simple'), note: L('geavanceerd ± € 2.280', 'advanced approx. €2,280') }
		],
		steps: [
			{
				title: L('Snijden', 'Cut'),
				body: L(
					'Een dunne schijf van Ø 300 mm snijdt een sleuf van 15 mm in de zode. Een dieptering op de schijf houdt de diepte vast.',
					'A thin Ø 300 mm disc cuts a 15 mm slot in the sward. A depth ring on the disc holds the depth.'
				)
			},
			{
				title: L('Zaaien', 'Seed'),
				body: L(
					'Een zaaischoen in de luwte van de schijf (eenvoudig) of een gebogen kouter midden in de snede (geavanceerd) legt het zaad op ongeveer 12 mm.',
					'A seed boot in the lee of the disc (simple) or a curved coulter in the centre of the cut (advanced) places the seed at about 12 mm.'
				)
			},
			{
				title: L('Aandrukken', 'Press'),
				body: L(
					'Een aandrukrol op een geveerde arm sluit de sleuf, zodat het zaad contact maakt met de grond.',
					'A press wheel on a sprung arm closes the slot, so the seed makes contact with the soil.'
				)
			},
			{
				title: L('Grond volgen', 'Follow the ground'),
				body: L(
					'Elke rij volgt de grond op een eigen arm. Twee gasveren drukken het frame met robotgewicht omlaag.',
					'Every row follows the ground on its own arm. Two gas springs push the frame down with robot weight.'
				)
			}
		],
		variants: [
			{
				name: L('Eenvoudig', 'Simple'),
				image: overseederSimpleWork,
				points: [
					L('Hefframe rond één draaipunt', 'Lift frame around a single pivot'),
					L('Schijf 7° schuin, zaaischoen in de luwte', 'Disc angled 7°, seed boot in its lee'),
					L('Zaadbak 41 + 18 l, op zwaartekracht', 'Seed hopper 41 + 18 l, gravity fed'),
					L('Diepte binnen ±3 mm: 94%', 'Depth within ±3 mm: 94%'),
					L('Voorgewicht op de robot: ± 42 kg', 'Front weight on the robot: approx. 42 kg')
				],
				price: L('± € 1.675 materiaal', 'approx. €1,675 in materials')
			},
			{
				name: L('Geavanceerd', 'Advanced'),
				image: overseederAdvIso,
				points: [
					L('Parallellogram: de balk blijft evenwijdig', 'Parallel linkage: the toolbar stays parallel'),
					L('Rechte schijf met ringen aan twee kanten', 'Straight disc with rings on both sides'),
					L('Luchtzaaier 62 + 17 l met 12 V ventilator', 'Air seeder 62 + 17 l with 12 V fan'),
					L('Diepte binnen ±3 mm: 98%', 'Depth within ±3 mm: 98%'),
					L('Voorgewicht op de robot: ± 46 kg', 'Front weight on the robot: approx. 46 kg')
				],
				price: L('± € 2.280 materiaal', 'approx. €2,280 in materials')
			}
		],
		calcs: [
			{
				title: L('Dosering bij 0,75 m/s', 'Dosing at 0.75 m/s'),
				rows: [
					{ label: L('Engels raaigras, 25 kg/ha', 'Perennial ryegrass, 25 kg/ha'), value: L('20,1 omw/min', '20.1 rpm') },
					{ label: L('Witte klaver, 5 kg/ha', 'White clover, 5 kg/ha'), value: L('24,0 omw/min', '24.0 rpm') },
					{ label: L('Rode klaver, 12 kg/ha', 'Red clover, 12 kg/ha'), value: L('57,7 omw/min', '57.7 rpm') },
					{ label: L('Volle bak gras + klaver', 'Full hopper grass + clover'), value: L('0,36 + 2,79 ha', '0.36 + 2.79 ha') }
				],
				note: L('Eigen motor per nokkenrol, die de rijsnelheid volgt.', 'A motor per cam roller that follows the driving speed.')
			},
			{
				title: L('Krachten, 8 rijen, volle bak', 'Forces, 8 rows, full hopper'),
				rows: [
					{ label: L('Gasveren samen', 'Gas springs together'), value: L('868 N') },
					{ label: L('Neerwaarts per element', 'Down force per element'), value: L('179 N') },
					{ label: L('Trekkracht normaal / zwaar', 'Draft force normal / heavy'), value: L('335 / 540 N') },
					{ label: L('Grip van de robot', 'Robot grip'), value: L('788 N') }
				]
			},
			{
				title: L('Breder werken', 'Working wider'),
				rows: [
					{ label: L('2 m, 8 rijen per meter', '2 m, 8 rows per metre'), value: L('616 / 1.048 N', '616 / 1,048 N') },
					{ label: L('2 m, 4 rijen per meter', '2 m, 4 rows per metre'), value: L('308 / 524 N') },
					{ label: L('3 m, 8 rijen per meter', '3 m, 8 rows per metre'), value: L('924 / 1.572 N', '924 / 1,572 N') }
				],
				note: L('Trekkracht normaal / zware zode.', 'Draft force normal / heavy sward.')
			}
		],
		onRobot: [
			L('Met volle bak is ± 40 tot 45 kg voorgewicht nodig om te kunnen heffen.', 'With a full hopper approx. 40 to 45 kg of front weight is needed to lift.'),
			L('In harde, droge zode alleen met 4 rijen: elke tweede rij omhoog.', 'In hard, dry sward only with 4 rows: every second row raised.'),
			L('Grondkrachten per schijf zijn geschat. Meet ze voordat je bouwt.', 'Ground forces per disc are estimated. Measure them before you build.')
		],
		clips: [],
		chart: {
			src: overseederChart,
			chart: true,
			caption: L(
				'Bodemvolging over dezelfde hobbelige strook: geavanceerd, eenvoudig en de starre balk van de vloeibare-mesttoediener.',
				'Ground following over the same bumpy strip: advanced, simple and the rigid toolbar of the liquid applicator.'
			)
		},
		gallery: [
			{ src: overseederAdvUnitDetail, caption: L('Elementen met diepteringen en aandrukrollen', 'Row units with depth rings and press wheels') },
			{ src: overseederAdvUnitSide, caption: L('Eén element van opzij: vorkarm, schijf, kouter en rol', 'One row unit from the side: fork arm, disc, coulter and wheel') },
			{ src: overseederAdvAir, caption: L('Luchtzaaier boven de achteras', 'Air seeder above the rear axle') },
			{ src: overseederAdvLifted, caption: L('Geheven achter de robot', 'Lifted behind the robot') },
			{ src: overseederSimpleIso, caption: L('Eenvoudige versie met zwaartekrachtbak', 'Simple version with gravity hopper') },
			{ src: overseederSimpleBoot, caption: L('Zaaischoen in de luwte van de schuine schijf', 'Seed boot in the lee of the angled disc') }
		],
		repoPath: REPO + 'overseeder'
	},
	{
		slug: 'liquid-fertilizer',
		functionId: 38,
		name: L('Vloeibare-mesttoediener', 'Liquid fertilizer applicator'),
		category: L('Spuiten, bemesten & irrigeren', 'Spraying, fertilizing & irrigation'),
		short: L(
			'RENURE en vloeibare kunstmest vlak onder de zode, zonder drift.',
			'RENURE and liquid fertilizer just under the sward, without drift.'
		),
		lead: L(
			'Brengt vloeibare kunstmest zoals RENURE vlak onder de zode, zonder nevel of drift. Elk element volgt de grond op een eigen arm.',
			'Places liquid fertilizer such as RENURE just under the sward, without mist or drift. Each element follows the ground on its own arm.'
		),
		hero: liquidWork,
		figures: [
			{ value: L('1,0 m', '1.0 m'), label: L('Werkbreedte', 'Working width'), note: L('5 rijen à 200 mm', '5 rows at 200 mm') },
			{ value: L('89-1.316', '89-1,316'), label: L('Liter per hectare', 'Litres per hectare'), note: L('18 standen, standaard 505 l/ha', '18 settings, standard 505 l/ha') },
			{ value: L('0,36 ha/u', '0.36 ha/h'), label: L('Capaciteit', 'Capacity'), note: L('bij 1 m/s, theoretisch', 'at 1 m/s, theoretical') },
			{ value: L('27 mm'), label: L('Uitstroom onder maaiveld', 'Outflow below ground level'), note: L('schijf snijdt 40 mm', 'disc cuts 40 mm') },
			{ value: L('93%'), label: L('Mesdiepte tussen 25 en 55 mm', 'Knife depth between 25 and 55 mm'), note: L('geavanceerd, 80 posities', 'advanced, 80 positions') },
			{ value: L('€ 600', '€600'), label: L('Materiaal vanaf', 'Materials from'), note: L('eenvoudige versie', 'simple version') }
		],
		steps: [
			{
				title: L('Snijden', 'Cut'),
				body: L(
					'Een schijf van Ø 300 mm snijdt 40 mm in de zode. Diepteringen aan weerszijden houden de diepte vast.',
					'A Ø 300 mm disc cuts 40 mm into the sward. Depth rings on both sides hold the depth.'
				)
			},
			{
				title: L('Openen', 'Open'),
				body: L(
					'Een mes van 8 mm volgt in de snede en opent de sleuf. Een RVS-buisje legt de vloeistof erin.',
					'An 8 mm knife follows in the cut and opens the slot. A stainless steel tube places the liquid in it.'
				)
			},
			{
				title: L('Doseren', 'Dose'),
				body: L(
					'Een grondwiel drijft een 5-kanaals slangenpomp aan. Daardoor blijft de dosis per hectare gelijk, ook als de robot afremt.',
					'A ground wheel drives a 5-channel peristaltic pump. The dose per hectare therefore stays the same, even when the robot slows down.'
				)
			},
			{
				title: L('Heffen', 'Lift'),
				body: L(
					'Op de kopakker trekt een actuator de balk 140 mm op. De pomp staat stil en terugslagkleppen houden de slangen gevuld.',
					'On the headland an actuator pulls the toolbar up 140 mm. The pump stops and check valves keep the hoses filled.'
				)
			}
		],
		variants: [
			{
				name: L('Eenvoudig'),
				image: liquidSimpleIso,
				points: [
					L('5 vaste messen met RVS-buisje', '5 fixed knives with stainless tube'),
					L('Twee kruiwagenwielen houden de diepte', 'Two wheelbarrow wheels hold the depth'),
					L('12 V membraanpomp met doseerplaatjes', '12 V diaphragm pump with orifice plates'),
					L('Alleen strip, buis en standaard onderdelen', 'Only flat bar, tube and standard parts')
				],
				price: L('± € 600 materiaal', 'approx. €600 in materials')
			},
			{
				name: L('Eenvoudig v2', 'Simple v2'),
				image: liquidV2Iso,
				points: [
					L('Snijschijf Ø 300 voor elk mes, 45 mm diep', 'Cutting disc Ø 300 in front of each knife, 45 mm deep'),
					L('Mes loopt 14 mm achter de schijf in dezelfde snede', 'Knife runs 14 mm behind the disc in the same cut'),
					L('Actuator 1.500 N, 10 s heffen', '1,500 N actuator, 10 s to lift'),
					L('Tot 50 kg ballast in harde zode', 'Up to 50 kg ballast in hard sward')
				],
				price: L('± € 915 materiaal', 'approx. €915 in materials')
			},
			{
				name: L('Geavanceerd', 'Advanced'),
				image: liquidAdvIso,
				points: [
					L('Schijf en mes op veerarmen', 'Disc and knife on spring arms'),
					L('Grondwiel drijft een slangenpomp aan', 'Ground wheel drives a peristaltic pump'),
					L('Parallellogram, balk zweeft -80 / +68 mm', 'Parallel linkage, toolbar floats -80 / +68 mm'),
					L('Gewicht 107 kg, waarvan 83 kg meeheft', 'Mass 107 kg, of which 83 kg lifts')
				]
			}
		],
		calcs: [
			{
				title: L('Dosering', 'Dosing'),
				formula: 'D = i · V · 10 000 / (O · a)',
				rows: [
					{ label: L('Standaard overbrenging 30/15T', 'Standard ratio 30/15T'), value: L('i = 2,0', 'i = 2.0') },
					{ label: L('Standaard dosis', 'Standard dose'), value: L('505 l/ha') },
					{ label: L('Per rij bij 505 l/ha en 1 m/s', 'Per row at 505 l/ha and 1 m/s'), value: L('0,61 l/min', '0.61 l/min') }
				],
				note: L(
					'i = overbrenging, V = slagvolume per kanaal, O = omtrek grondwiel, a = rijafstand. De rijsnelheid zit er niet in.',
					'i = ratio, V = stroke volume per channel, O = ground wheel circumference, a = row spacing. Driving speed is not in it.'
				)
			},
			{
				title: L('Stikstof per werkgang', 'Nitrogen per pass'),
				rows: [
					{ label: L('Mineralenconcentraat, 505 l/ha', 'Mineral concentrate, 505 l/ha'), value: L('3-5 kg N/ha') },
					{ label: L('UAN op de laagste stand, 89 l/ha', 'UAN on the lowest setting, 89 l/ha'), value: L('32-35 kg N/ha') }
				],
				note: L('Laat het product altijd analyseren: het stikstofgehalte varieert sterk.', 'Always have the product analysed: the nitrogen content varies strongly.')
			},
			{
				title: L('Bodemvolging, 80 posities', 'Ground following, 80 positions'),
				rows: [
					{ label: L('Mesdiepte 25-55 mm, geavanceerd', 'Knife depth 25-55 mm, advanced'), value: L('93%') },
					{ label: L('Mesdiepte 25-55 mm, eenvoudig', 'Knife depth 25-55 mm, simple'), value: L('86%') },
					{ label: L('Mesdiepte 25-55 mm, eenvoudig v2', 'Knife depth 25-55 mm, simple v2'), value: L('82%') },
					{ label: L('Mes uit de grond', 'Knife out of the ground'), value: L('0 keer', '0 times') }
				]
			}
		],
		onRobot: [
			L('Weegt de robot minder dan ± 200 kg, dan is ± 25 kg voorgewicht nodig als de toediener geheven is.', 'If the robot weighs less than approx. 200 kg, about 25 kg of front ballast is needed with the applicator lifted.'),
			L('De grens is niet de toediener maar de tank en het bijvullen. Dat past bij kleine, frequente giften en een laadstation.', 'The limit is not the applicator but the tank and refilling. That suits small, frequent doses and a docking station.'),
			L('Montage met M10 door de bestaande gaten in de achterste balk.', 'Mounted with M10 through the existing holes in the rear beam.')
		],
		clips: [
			{ src: liquidAdvVideo, poster: liquidAdvPoster, caption: L('Geavanceerd: elk element volgt de hobbelige strook op een eigen arm.', 'Advanced: every element follows the bumpy strip on its own arm.') },
			{ src: liquidV2Video, poster: liquidV2Poster, caption: L('Eenvoudig v2: schijf en mes per rij, met mesdiepte en snede live.', 'Simple v2: disc and knife per row, with knife depth and cut shown live.') }
		],
		chart: {
			src: liquidChart,
			chart: true,
			caption: L('Snede en mesdiepte langs de hobbelige strook, per rij vergeleken.', 'Cut and knife depth along the bumpy strip, compared per row.')
		},
		gallery: [
			{ src: liquidAdvUnitSide, caption: L('Element van opzij: schijf, mes en veerpoot', 'Element from the side: disc, knife and spring leg') },
			{ src: liquidAdvDrive, caption: L('Grondwiel en kettingaandrijving van de pomp', 'Ground wheel and chain drive of the pump') },
			{ src: liquidAdvLifted, caption: L('Geheven achter de robot', 'Lifted behind the robot') },
			{ src: liquidV2Knife, caption: L('Versie 2: het mes volgt de schijf in dezelfde snede', 'Version 2: the knife follows the disc in the same cut') }
		],
		repoPath: REPO + 'liquid%20fertilizer%20applicator'
	},
	{
		slug: 'feed-pusher',
		functionId: 1,
		name: L('Voeraanschuifvijzel', 'Feed pusher auger'),
		category: L('Stal & erf', 'Barn & yard'),
		short: L(
			'Schuift weggeduwd voer terug naar het voerhek, 20 ton per uur.',
			'Pushes feed back to the feed fence, 20 tonnes per hour.'
		),
		lead: L(
			'Schuift weggeduwd voer terug naar het voerhek. Een vijzel van Ø 320 mm pakt het voer op en voert het zijwaarts af.',
			'Pushes feed that cows pushed away back to the feed fence. A Ø 320 mm auger picks the feed up and carries it sideways.'
		),
		hero: feedWork,
		figures: [
			{ value: L('1,44 m', '1.44 m'), label: L('Werkbreedte', 'Working width'), note: L('vijzel 1.420 mm', 'flight 1,420 mm') },
			{ value: L('20 t/u', '20 t/h'), label: L('Capaciteit', 'Capacity'), note: L('5,5 kg/s', '5.5 kg/s') },
			{ value: L('18 kg/m'), label: L('Voer per meter voergang', 'Feed per metre of alley'), note: L('bij 0,30 m/s rijden', 'at 0.30 m/s driving') },
			{ value: L('150 omw/min', '150 rpm'), label: L('Vijzel', 'Auger'), note: L('voer loopt 0,42 m/s', 'feed travels 0.42 m/s') },
			{ value: L('550 W'), label: L('Motor 24 V', '24 V motor'), note: L('ketting 15T naar 30T', 'chain 15T to 30T') },
			{ value: L('118 kg'), label: L('Gewicht', 'Mass'), note: L('plus 40 kg contragewicht', 'plus 40 kg counterweight') }
		],
		steps: [
			{
				title: L('Oppakken', 'Pick up'),
				body: L(
					'De robot rijdt met de vijzel voorop langs het voerhek. De vijzel draait met de voorkant omhoog, zodat het voer wordt opgetild in plaats van ondergedrukt.',
					'The robot drives with the auger first along the feed fence. The auger turns front-up, so the feed is lifted instead of pressed under.'
				)
			},
			{
				title: L('Afvoeren', 'Convey'),
				body: L(
					'Het voer loopt met 0,42 m/s langs de vijzel naar de kant van het voerhek.',
					'The feed travels at 0.42 m/s along the auger to the feed fence side.'
				)
			},
			{
				title: L('Lossen', 'Discharge'),
				body: L(
					'Aan de hekzijde is de eindplaat open. Daar valt het voer op de vloer, binnen bereik van de koeien.',
					'On the fence side the end plate is open. There the feed drops onto the floor, within reach of the cows.'
				)
			},
			{
				title: L('Beveiligen', 'Protect'),
				body: L(
					'Loopt de vijzel vast, dan breekt een M6-breekbout bij 145 Nm. Er gaat niets anders kapot.',
					'If the auger jams, an M6 shear bolt breaks at 145 Nm. Nothing else gets damaged.'
				)
			}
		],
		variants: [
			{
				name: L('Eenvoudig', 'Simple'),
				image: feedSimple,
				points: [
					L('Goedkope versie uit vlakke plaat', 'Cheap version from flat plate'),
					L('Sectionele vijzelwindingen', 'Sectional auger flights'),
					L('DXF-tekeningen voor zijplaat en windingring', 'DXF drawings for side plate and flight ring')
				]
			},
			{
				name: L('Geavanceerd', 'Advanced'),
				image: feedIso,
				points: [
					L('Gezette kap van 2 mm met 4 zettingen', 'Folded 2 mm hood with 4 bends'),
					L('24 V motorreductor met ketting en spanner', '24 V gearmotor with chain and tensioner'),
					L('Open uitloop aan de hekzijde', 'Open discharge on the fence side'),
					L('Voermodel en krachtenanimatie', 'Feed model and force animation')
				]
			}
		],
		calcs: [
			{
				title: L('Vijzel en aandrijving', 'Auger and drive'),
				rows: [
					{ label: L('Koppel nominaal / piek bij opstart', 'Torque nominal / peak at start-up'), value: L('34 / 85 Nm') },
					{ label: L('Breekbout bezwijkt bij', 'Shear bolt breaks at'), value: L('145 Nm') },
					{ label: L('Vermogen, 5 kg voer in de vijzel', 'Power, 5 kg of feed in the auger'), value: L('160 W') },
					{ label: L('Vermogen, 20 kg voer in de vijzel', 'Power, 20 kg of feed in the auger'), value: L('520 W') }
				]
			},
			{
				title: L('Vrije ruimte', 'Clearance'),
				rows: [
					{ label: L('Kap tot achterbanden', 'Hood to rear tyres'), value: L('48 mm') },
					{ label: L('Schraapflap tot achterbanden', 'Scraper flap to rear tyres'), value: L('59 mm') },
					{ label: L('Windingen boven de vloer', 'Flights above the floor'), value: L('15 mm') }
				]
			},
			{
				title: L('Afmetingen', 'Dimensions'),
				rows: [
					{ label: L('Breedte × lengte × hoogte', 'Width × length × height'), value: L('1.600 × 619 × 598 mm', '1,600 × 619 × 598 mm') },
					{ label: L('Vijzel', 'Auger'), value: L('Ø 320, spoed 260, 5 mm') },
					{ label: L('Rotor', 'Rotor'), value: L('28 kg') }
				]
			}
		],
		onRobot: [
			L('4 armen, elk met 4 × M10 door de bestaande gaten in de wielbeugels. Niets boren in het frame.', '4 arms, each with 4 × M10 through the existing holes in the wheel brackets. Nothing to drill in the frame.'),
			L('Zit aan de kant van de vaste wielmotoren; de stuurkoppen zitten dan achter.', 'Sits on the side of the fixed wheel motors; the steering heads are then at the back.'),
			L('2 × 20 kg contragewicht voorop, anders blijft er te weinig last op de gestuurde wielen.', '2 × 20 kg counterweight at the front, otherwise too little load stays on the steered wheels.')
		],
		clips: [
			{ src: feedCleanVideo, poster: feedCleanPoster, caption: L('Voer aanschuiven langs het voerhek.', 'Pushing feed along the feed fence.') },
			{ src: feedForcesVideo, poster: feedForcesPoster, caption: L('Dezelfde rit met de krachten op de vijzel en de reactie van de robot.', 'The same run with the forces on the auger and the robot’s reaction.') }
		],
		gallery: [
			{ src: feedSide, caption: L('Zijaanzicht op de robot', 'Side view on the robot') },
			{ src: feedDrive, caption: L('Kettingaandrijving met kap', 'Chain drive with guard') },
			{ src: feedOpenEnd, caption: L('Open eindplaat aan de hekzijde', 'Open end plate on the fence side') }
		],
		repoPath: REPO + 'feed%20pusher%20auger'
	},
	{
		slug: 'dock-weed-drill',
		functionId: 8,
		name: L('Ridderzuringfrees', 'Dock weed mill'),
		category: L('Onkruidbestrijding', 'Weed control'),
		short: L(
			'Vermaalt ridderzuring plant voor plant, zonder chemie.',
			'Grinds up broad-leaved dock plant by plant, without chemicals.'
		),
		lead: L(
			'Vermaalt ridderzuring plant voor plant. Een CNC-portaal zet een snel draaiende frees boven de plant en maalt de wortelkraag 15 cm diep fijn.',
			'Grinds up broad-leaved dock plant by plant. A CNC gantry places a fast cutter over the plant and grinds the root crown 15 cm deep.'
		),
		hero: dockWork,
		figures: [
			{ value: L('Ø 180 mm'), label: L('Gat', 'Hole'), note: L('standaard 150 mm diep, max 200', 'standard 150 mm deep, max 200') },
			{ value: L('1.500 omw/min', '1,500 rpm'), label: L('Frees', 'Cutter'), note: L('14 m/s, instelbaar tot 3.000', '14 m/s, adjustable up to 3,000') },
			{ value: L('± 20 s'), label: L('Per plant', 'Per plant'), note: L('150 tot 180 planten per uur', '150 to 180 plants per hour') },
			{ value: L('±2 mm'), label: L('Nauwkeurigheid X-as', 'X axis accuracy'), note: L('slag 1.000 mm', 'stroke 1,000 mm') },
			{ value: L('48 V'), label: L('Volledig elektrisch', 'Fully electric'), note: L('geen hydrauliek in het land', 'no hydraulics in the field') },
			{ value: L('€ 1.300-1.900', '€1,300-1,900'), label: L('Onderdelen incl. btw', 'Parts incl. VAT'), note: L('budgetversie ± € 1.000', 'budget version approx. €1,000') }
		],
		steps: [
			{
				title: L('Zoeken', 'Find'),
				body: L(
					'De robot rijdt langs de AB-lijn. Een camera met ledbalk zoekt ridderzuring, ook in de schemer.',
					'The robot drives along the AB line. A camera with an LED bar looks for dock, also at dusk.'
				)
			},
			{
				title: L('Positioneren', 'Position'),
				body: L(
					'De robot staat stil en de X-as schuift de frees boven de plant. Rijden kan alleen als de Z-as omhoog staat.',
					'The robot stops and the X axis moves the cutter over the plant. Driving is only possible with the Z axis up.'
				)
			},
			{
				title: L('Vermalen', 'Grind'),
				body: L(
					'De frees steekt met 25 mm/s in tot 150 mm diep, in plakjes van 0,25 mm. Een pot rond de frees houdt de grond in het gat.',
					'The cutter plunges at 25 mm/s to 150 mm deep, in slices of 0.25 mm. A pot around the cutter keeps the soil in the hole.'
				)
			},
			{
				title: L('Maaien', 'Mow'),
				body: L(
					'Met een tweede gereedschap maait hij de plant boven de grond af. Wisselen gaat met 4 bouten M10.',
					'With a second tool it mows the plant off above the ground. Changing takes 4 M10 bolts.'
				)
			}
		],
		variants: [
			{
				name: L('Standaard', 'Standard'),
				image: dockSide,
				points: [
					L('HGR15-rails op aluminium 40 × 80 profiel', 'HGR15 rails on 40 × 80 aluminium profile'),
					L('NEMA 23 closed loop met kogelomloopspindel', 'NEMA 23 closed loop with ball screw'),
					L('BLDC-spindel met VESC, stroom gemeten', 'BLDC spindle with VESC, current measured'),
					L('Slijtdelen van Hardox', 'Wear parts of Hardox')
				],
				price: L('± € 1.300-1.900 incl. btw', 'approx. €1,300-1,900 incl. VAT')
			},
			{
				name: L('Budget'),
				image: dockDriving,
				points: [
					L('Z-as met een lineaire actuator', 'Z axis with a linear actuator'),
					L('Geborstelde 48 V motor met eenvoudige regelaar', 'Brushed 48 V motor with a simple controller'),
					L('Trager en minder terugkoppeling, wel goed om het principe te testen', 'Slower and less feedback, but fine for testing the principle')
				],
				price: L('± € 1.000', 'approx. €1,000')
			}
		],
		calcs: [
			{
				title: L('Frees', 'Cutter'),
				rows: [
					{ label: L('Tipsnelheid bij 1.500 omw/min', 'Tip speed at 1,500 rpm'), value: L('14 m/s') },
					{ label: L('Insteeksnelheid', 'Plunge speed'), value: L('25 mm/s') },
					{ label: L('Dikte van de plakjes', 'Slice thickness'), value: L('0,25 mm', '0.25 mm') },
					{ label: L('Neerwaartse kracht, maximaal', 'Down force, maximum'), value: L('< 600 N') }
				],
				note: L('Te langzaam draaien geeft grove wortelstukken die weer uitlopen.', 'Turning too slowly gives coarse root pieces that sprout again.')
			},
			{
				title: L('Gewichtsverdeling, robot 150 kg', 'Weight distribution, robot 150 kg'),
				rows: [
					{ label: L('Portaal aan de gestuurde kant', 'Gantry on the steered side'), value: L('25 kg op de motoren', '25 kg on the motors') },
					{ label: L('Portaal aan de hubmotorkant', 'Gantry on the hub motor side'), value: L('216 / 25 kg') },
					{ label: L('Plus accu aan de andere kant', 'Plus battery on the far side'), value: L('184 / 57 kg') }
				],
				note: L(
					'Last op de aangedreven / gestuurde as. Daarom zit het portaal op de aangedreven as, met de accu als tegenwicht.',
					'Load on the driven / steered axle. That is why the gantry sits on the driven axle, with the battery as counterweight.'
				)
			},
			{
				title: L('Massa', 'Mass'),
				rows: [
					{ label: L('Werktuig totaal', 'Implement total'), value: L('± 91 kg') },
					{ label: L('Bewegend in X / Z', 'Moving in X / Z'), value: L('59 / 48 kg') }
				]
			}
		],
		onRobot: [
			L('4 kruisklemmen op 2 dwarsbalken: niet boren of lassen aan het frame.', '4 cross clamps on 2 cross beams: no drilling or welding on the frame.'),
			L('Op de aangedreven as; de robot rijdt met het portaal voorop.', 'On the driven axle; the robot drives with the gantry first.'),
			L('Gebaseerd op Robot Ruud (WUR). Die kostte destijds ± € 25.000 alleen aan motor, pompen en ventielblok.', 'Based on Robot Ruud (WUR). That cost approx. €25,000 for the motor, pumps and valve block alone.')
		],
		clips: [
			{ src: dockVideo, poster: dockPoster, caption: L('De hele cyclus: zoeken, positioneren, vermalen en terug in rijstand.', 'The full cycle: find, position, grind and back to driving position.') },
			{ src: dockCloseVideo, poster: dockClosePoster, caption: L('Close-up van het vermalen in de pot.', 'Close-up of the grinding inside the pot.') }
		],
		gallery: [
			{ src: dockCutter, caption: L('Kruisfrees Ø 180 in de grond, met de pot eromheen', 'Ø 180 cross cutter in the soil, with the pot around it') },
			{ src: dockMowing, caption: L('Maaischijf voor boven de grond', 'Mowing disc for above the ground') },
			{ src: dockDriving, caption: L('Rijstand: frees 280 mm boven de grond', 'Driving position: cutter 280 mm above the ground') }
		],
		repoPath: REPO + 'dockweed%20drill'
	},
	{
		slug: 'trencher',
		functionId: 2,
		name: L('Greppelfrees', 'Trencher'),
		category: L('Grondbewerking', 'Soil cultivation'),
		short: L(
			'Freest een ondiepe greppel van plas naar sloot.',
			'Mills a shallow channel from puddle to ditch.'
		),
		lead: L(
			'Freest een ondiepe greppel van plas naar sloot, zodat water van het land kan. Een schoepenschijf snijdt en werpt de grond in één beweging opzij.',
			'Mills a shallow channel from puddle to ditch, so water can leave the field. A paddle disc cuts and throws the soil aside in one movement.'
		),
		hero: trencherWork,
		figures: [
			{ value: L('150 mm'), label: L('Greppelbreedte', 'Channel width'), note: L('100 tot 200 mm', '100 to 200 mm') },
			{ value: L('100-200 mm'), label: L('Diepte, instelbaar', 'Depth, adjustable'), note: L('in stappen van ± 25 mm', 'in steps of approx. 25 mm') },
			{ value: L('1,5 kW', '1.5 kW'), label: L('BLDC-motor 48 V', '48 V BLDC motor'), note: L('schijf 300 omw/min', 'disc 300 rpm') },
			{ value: L('11 m/s'), label: L('Tipsnelheid', 'Tip speed'), note: L('werpt grond 1 tot 3 m weg', 'throws soil 1 to 3 m away') },
			{ value: L('250-600 W'), label: L('Freesvermogen nodig', 'Milling power needed'), note: L('bij 3 m/min', 'at 3 m/min') },
			{ value: L('± 110 kg', 'approx. 110 kg'), label: L('Eerste model', 'First model'), note: L('doel onder 80 kg', 'target below 80 kg') }
		],
		steps: [
			{
				title: L('Zakken', 'Lower'),
				body: L(
					'Een actuator laat het gereedschap zakken. Een glijschoen naast de greppel bepaalt de diepte.',
					'An actuator lowers the tool. A glide shoe next to the channel sets the depth.'
				)
			},
			{
				title: L('Frezen', 'Mill'),
				body: L(
					'De schijf draait tegen de rijrichting in. Zo snijdt hij de grond van onder naar boven en werpt hij hem over de top.',
					'The disc counter-rotates. It cuts the soil from below upwards and throws it over the top.'
				)
			},
			{
				title: L('Werpen', 'Throw'),
				body: L(
					'De kap stuurt de grond naar links, weg van de robot. Een werpklep regelt de spreidbreedte.',
					'The hood directs the soil to the left, away from the robot. A throwing flap controls the spread.'
				)
			},
			{
				title: L('Volgen', 'Follow'),
				body: L(
					'De robot rijdt over een AB-lijn van AgOpenGPS, typisch 10 tot 20 m van plas naar sloot.',
					'The robot drives an AgOpenGPS AB line, typically 10 to 20 m from puddle to ditch.'
				)
			}
		],
		variants: [],
		calcs: [
			{
				title: L('Aandrijving', 'Drive'),
				rows: [
					{ label: L('Motor', 'Motor'), value: L('BLDC 48 V, 1,5 kW, 3.000 omw/min', 'BLDC 48 V, 1.5 kW, 3,000 rpm') },
					{ label: L('Planeetkast', 'Planetary gearbox'), value: L('i = 10, 300 omw/min') },
					{ label: L('Stroom bij 48 V / 24 V', 'Current at 48 V / 24 V'), value: L('31 / 62 A') }
				],
				note: L('48 V heeft de voorkeur; bij 24 V zijn dikke kabels nodig.', '48 V is preferred; at 24 V thick cables are needed.')
			},
			{
				title: L('Waarom een schoepenschijf', 'Why a paddle disc'),
				rows: [
					{ label: L('Kettingfrees', 'Chain trencher'), value: L('veel slijtdelen, duur', 'many wear parts, expensive') },
					{ label: L('Greppelploeg', 'Ditch plough'), value: L('> 2 kN trekkracht', '> 2 kN draft force') },
					{ label: L('Freestrommel', 'Milling drum'), value: L('grond valt terug', 'soil falls back') },
					{ label: L('Schoepenschijf met kap', 'Paddle disc with hood'), value: L('gekozen', 'chosen') }
				]
			}
		],
		onRobot: [
			L('Met U-beugels om de achterste balk, door één persoon te monteren.', 'With U-bolts around the rear beam, mountable by one person.'),
			L('Freesmotor draait alleen als het gereedschap omlaag is; de noodstop schakelt hem uit.', 'The milling motor only runs with the tool down; the emergency stop switches it off.'),
			L('Niemand binnen 5 m tijdens het frezen: stenen en kluiten worden weggeworpen.', 'Nobody within 5 m while milling: stones and clods are thrown away.')
		],
		clips: [],
		gallery: [
			{ src: trencherSide, caption: L('Zijaanzicht met de schoepenschijf', 'Side view with the paddle disc') },
			{ src: trencherRearRight, caption: L('Achteraanzicht, rechts', 'Rear view, right') },
			{ src: trencherRear, caption: L('Achteraanzicht', 'Rear view') }
		],
		repoPath: REPO + 'trencher'
	}
];

export const implementBySlug = new Map(implementList.map((i) => [i.slug, i]));
export const implementByFunction = new Map(implementList.map((i) => [i.functionId, i]));
