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

import brushesWork from '$lib/assets/implement_brushes_work.webp';
import brushes650 from '$lib/assets/implement_brushes_650.webp';
import brushes850 from '$lib/assets/implement_brushes_850.webp';
import brushesUnit from '$lib/assets/implement_brushes_unit.webp';
import brushesClamp from '$lib/assets/implement_brushes_clamp.webp';
import brushesWindrowTop from '$lib/assets/implement_brushes_windrow_top.webp';
import brushesSide from '$lib/assets/implement_brushes_side.webp';
import brushesWindrowVideo from '$lib/assets/video/implement_brushes_windrow.mp4';
import brushesWindrowPoster from '$lib/assets/implement_brushes_windrow_poster.webp';
import brushesSpreadVideo from '$lib/assets/video/implement_brushes_spread.mp4';
import brushesSpreadPoster from '$lib/assets/implement_brushes_spread_poster.webp';
import brushesSingleVideo from '$lib/assets/video/implement_brushes_single.mp4';
import brushesSinglePoster from '$lib/assets/implement_brushes_single_poster.webp';

import markerWork from '$lib/assets/implement_marker_work.webp';
import markerStage from '$lib/assets/implement_marker_stage.webp';
import markerHead from '$lib/assets/implement_marker_head.webp';
import markerHeadSection from '$lib/assets/implement_marker_head_section.webp';
import markerTop from '$lib/assets/implement_marker_top.webp';
import markerVideo from '$lib/assets/video/implement_marker.mp4';
import markerPoster from '$lib/assets/implement_marker_poster.webp';

import refillerDocked from '$lib/assets/implement_refiller_docked.webp';
import refillerLiquid from '$lib/assets/implement_refiller_liquid.webp';
import refillerSpout from '$lib/assets/implement_refiller_spout.webp';
import refillerBoom from '$lib/assets/implement_refiller_boom.webp';
import refillerIbc from '$lib/assets/implement_refiller_ibc.webp';
import refillerIbcRefill from '$lib/assets/implement_refiller_ibc_refill.webp';
import refillerPattern from '$lib/assets/implement_refiller_pattern.webp';
import refillerIbcPump from '$lib/assets/implement_refiller_ibc_pump.webp';
import refillerStation from '$lib/assets/implement_refiller_station.webp';
import refillerLiquidVideo from '$lib/assets/video/implement_refiller_liquid.mp4';
import refillerLiquidPoster from '$lib/assets/implement_refiller_liquid_poster.webp';
import refillerIbcVideo from '$lib/assets/video/implement_refiller_ibc.mp4';
import refillerIbcPoster from '$lib/assets/implement_refiller_ibc_poster.webp';

import poleWork from '$lib/assets/implement_polemower_work.webp';
import poleSwing from '$lib/assets/implement_polemower_swing.webp';
import poleBelt from '$lib/assets/implement_polemower_belt.webp';
import polePivot from '$lib/assets/implement_polemower_pivot.webp';
import poleHead from '$lib/assets/implement_polemower_head.webp';
import poleVideo from '$lib/assets/video/implement_polemower.mp4';
import polePoster from '$lib/assets/implement_polemower_poster.webp';

import pickerWork from '$lib/assets/implement_weedpicker_work.webp';
import pickerHeight from '$lib/assets/implement_weedpicker_height.webp';
import pickerBelow from '$lib/assets/implement_weedpicker_below.webp';
import pickerRotors from '$lib/assets/implement_weedpicker_rotors.webp';
import pickerLinkage from '$lib/assets/implement_weedpicker_linkage.webp';
import pickerVideo from '$lib/assets/video/implement_weedpicker.mp4';
import pickerPoster from '$lib/assets/implement_weedpicker_poster.webp';

import irrigationWork from '$lib/assets/implement_irrigation_work.webp';
import irrigationLaidOut from '$lib/assets/implement_irrigation_laid_out.webp';
import irrigationHosePath from '$lib/assets/implement_irrigation_hose_path.webp';
import irrigationPinch from '$lib/assets/implement_irrigation_pinch.webp';
import irrigationReel from '$lib/assets/implement_irrigation_reel.webp';
import irrigationVideo from '$lib/assets/video/implement_irrigation.mp4';
import irrigationPoster from '$lib/assets/implement_irrigation_poster.webp';

import spotWork from '$lib/assets/implement_spotspray_work.webp';
import spotFolded from '$lib/assets/implement_spotspray_folded.webp';
import spotCamera from '$lib/assets/implement_spotspray_camera.webp';
import spotHinge from '$lib/assets/implement_spotspray_hinge.webp';
import spotNozzle from '$lib/assets/implement_spotspray_nozzle.webp';
import spotVideo from '$lib/assets/video/implement_spotspray.mp4';
import spotPoster from '$lib/assets/implement_spotspray_poster.webp';

import inrowWork from '$lib/assets/implement_inrow_work.webp';
import inrowKnives from '$lib/assets/implement_inrow_knives.webp';
import inrowUnit from '$lib/assets/implement_inrow_unit.webp';
import inrowCamera from '$lib/assets/implement_inrow_camera.webp';
import inrowDouble from '$lib/assets/implement_inrow_double.webp';
import inrowDoubleKnives from '$lib/assets/implement_inrow_double_knives.webp';
import inrowFingerVideo from '$lib/assets/video/implement_inrow_finger.mp4';
import inrowFingerPoster from '$lib/assets/implement_inrow_finger_poster.webp';
import inrowDoubleVideo from '$lib/assets/video/implement_inrow_double.mp4';
import inrowDoublePoster from '$lib/assets/implement_inrow_double_poster.webp';

import rakeWork from '$lib/assets/implement_beltrake_work.webp';
import rakeNursery from '$lib/assets/implement_beltrake_nursery.webp';
import rakeWindrow from '$lib/assets/implement_beltrake_windrow.webp';
import rakeTines from '$lib/assets/implement_beltrake_tines.webp';
import rakeDrive from '$lib/assets/implement_beltrake_drive.webp';
import rakeVideo from '$lib/assets/video/implement_beltrake.mp4';
import rakePoster from '$lib/assets/implement_beltrake_poster.webp';

import flameWork from '$lib/assets/implement_flame_work.webp';
import flameHood from '$lib/assets/implement_flame_hood.webp';
import flameSection from '$lib/assets/implement_flame_section.webp';
import flameBelow from '$lib/assets/implement_flame_below.webp';
import flameCylinders from '$lib/assets/implement_flame_cylinders.webp';
import flameVideo from '$lib/assets/video/implement_flame.mp4';
import flamePoster from '$lib/assets/implement_flame_poster.webp';

import sickleWork from '$lib/assets/implement_sicklebar_work.webp';
import sickleTransport from '$lib/assets/implement_sicklebar_transport.webp';
import sickleKnifeDrive from '$lib/assets/implement_sicklebar_knife_drive.webp';
import sickleFloat from '$lib/assets/implement_sicklebar_float.webp';
import sickleHinge from '$lib/assets/implement_sicklebar_hinge.webp';
import sickleVideo from '$lib/assets/video/implement_sicklebar.mp4';
import sicklePoster from '$lib/assets/implement_sicklebar_poster.webp';

import rollRoll from '$lib/assets/implement_cambridge_roll.webp';
import rollHitch from '$lib/assets/implement_cambridge_hitch.webp';
import rollSeeder from '$lib/assets/implement_cambridge_seeder.webp';
import rollMetering from '$lib/assets/implement_cambridge_metering.webp';
import rollCombo from '$lib/assets/implement_cambridge_combo.webp';
import rollSection from '$lib/assets/implement_cambridge_section.webp';
import rollTurn from '$lib/assets/implement_cambridge_turn.webp';
import rollVideo from '$lib/assets/video/implement_cambridge.mp4';
import rollPoster from '$lib/assets/implement_cambridge_poster.webp';

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
	/** Nummers van de bijbehorende functies op /projects/functions (mag leeg zijn). */
	functionIds: number[];
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
	/** Beeldverhouding van de animaties, standaard 3 / 2. */
	clipRatio?: string;
	chart?: Shot;
	gallery: Shot[];
	repoPath: string;
};

const REPO = 'https://github.com/JacobsFarm/Bruut_OpenAgbot_Implements/tree/main/';

export const implementsRepo = 'https://github.com/JacobsFarm/Bruut_OpenAgbot_Implements';

export const implementList: Implement[] = [
	{
		slug: 'overseeder',
		functionIds: [15],
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
		functionIds: [38],
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
		functionIds: [1],
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
		functionIds: [8],
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
		clipRatio: '8 / 5',
		gallery: [
			{ src: dockCutter, caption: L('Kruisfrees Ø 180 in de grond, met de pot eromheen', 'Ø 180 cross cutter in the soil, with the pot around it') },
			{ src: dockMowing, caption: L('Maaischijf voor boven de grond', 'Mowing disc for above the ground') },
			{ src: dockDriving, caption: L('Rijstand: frees 280 mm boven de grond', 'Driving position: cutter 280 mm above the ground') }
		],
		repoPath: REPO + 'dockweed%20drill'
	},
	{
		slug: 'trencher',
		functionIds: [2],
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
	},
	{
		slug: 'sickle-bar-mower',
		functionIds: [10],
		name: L('Vingerbalkmaaier', 'Sickle bar mower'),
		category: L('Maaien', 'Mowing'),
		short: L(
			'3,25 m maaien met drie dubbelmesbalken, bij laag vermogen.',
			'Mows 3.25 m with three double-knife cutter bars, at low power.'
		),
		lead: L(
			'Drie dubbelmesbalken: één van 1,25 m voor de robot en twee vleugels van 1,0 m midden onder het frame. Samen maaien ze 3,25 m in één werkgang, met een schone snede bij laag vermogen. Het gras blijft in een vlak zwad liggen om te drogen.',
			'Three double-knife cutter bars: one of 1.25 m in front of the robot and two 1.0 m wings in the middle of the frame. Together they mow 3.25 m in one pass, with a clean cut at low power. The grass is left lying in a flat swath to dry.'
		),
		hero: sickleWork,
		figures: [
			{ value: L('3,25 m', '3.25 m'), label: L('Werkbreedte', 'Working width'), note: L('1,25 m voor + 2 × 1,0 m', '1.25 m front + 2 × 1.0 m') },
			{ value: L('1,0 ha/u', '1.0 ha/h'), label: L('Capaciteit', 'Capacity'), note: L('bij 1 m/s', 'at 1 m/s') },
			{ value: L('0,55 kW/m', '0.55 kW/m'), label: L('Maaivermogen per meter', 'Mowing power per metre'), note: L('cirkelmaaier: 3 tot 5 kW/m', 'rotary mower: 3 to 5 kW/m') },
			{ value: L('2,2 kW', '2.2 kW'), label: L('Elektrisch, maaien', 'Electric, mowing'), note: L('3,4 kW met rijden', '3.4 kW with driving') },
			{ value: L('1,59 m', '1.59 m'), label: L('Transportbreedte', 'Transport width'), note: L('vleugels in 11 s omhoog', 'wings up in 11 s') },
			{ value: L('€ 3.200', '€3,200'), label: L('Materiaal', 'Materials'), note: L('210 kg', '210 kg') }
		],
		steps: [
			{
				title: L('Knippen', 'Cut'),
				body: L(
					'Twee messen bewegen tegen elkaar in, met een slag van 50 mm en 600 omw/min, en knippen het gras als een heggenschaar. Hun traagheidskrachten heffen elkaar op: de balk trilt nauwelijks.',
					'Two knives move against each other, with a 50 mm stroke at 600 rpm, and shear the grass like a hedge trimmer. Their inertia forces cancel: the bar hardly shakes.'
				)
			},
			{
				title: L('Voorbalk', 'Front bar'),
				body: L(
					'De voorbalk hangt aan een parallellogram met een zwevende koppeling en een rolpen. Hij zakt 40 mm in een kuil en rijdt 141 mm over een bult.',
					'The front bar hangs on a parallel linkage with a float link and a roll pin. It drops 40 mm into a dip and rides 141 mm up over a hump.'
				)
			},
			{
				title: L('Vleugels', 'Wings'),
				body: L(
					'De vleugels hangen aan een scharnier bij hun binnenste slof. Het anker van de actuator zit in een sleufgat, dus ze zweven mee van −9° tot +17°.',
					'The wings hang on a hinge at their inner shoe. The actuator anchor sits in a slot, so they float along from −9° to +17°.'
				)
			},
			{
				title: L('Inklappen', 'Fold'),
				body: L(
					'Op de kopakker gaat de voorbalk 300 mm omhoog en klappen de actuatoren de vleugels verticaal. Zo is de maaier 1,59 m breed.',
					'On the headland the front bar goes up 300 mm and the actuators fold the wings vertical. The mower is then 1.59 m wide.'
				)
			}
		],
		variants: [],
		calcs: [
			{
				title: L('Vermogen bij 1 m/s, 3 t ds/ha', 'Power at 1 m/s, 3 t DM/ha'),
				rows: [
					{ label: L('Voorbalk, aan de krukas', 'Front bar, at the crank'), value: L('650 W (motor 72%)') },
					{ label: L('Elke vleugel', 'Each wing'), value: L('520 W (motor 58%)') },
					{ label: L('Elektrisch, maaien / met rijden', 'Electric, mowing / with driving'), value: L('2,2 / 3,4 kW', '2.2 / 3.4 kW') },
					{ label: L('Stroom bij 48 V', 'Current at 48 V'), value: L('71 A') }
				]
			},
			{
				title: L('Rijsnelheid naar gewas', 'Driving speed by crop'),
				rows: [
					{ label: L('1 tot 2 t ds/ha', '1 to 2 t DM/ha'), value: L('1,5 m/s', '1.5 m/s') },
					{ label: L('3 t ds/ha', '3 t DM/ha'), value: L('1,3 m/s', '1.3 m/s') },
					{ label: L('4 t ds/ha', '4 t DM/ha'), value: L('1,0 m/s', '1.0 m/s') }
				],
				note: L('Bij 4 t ds/ha draait de motor van de voorbalk op 90%.', 'At 4 t DM/ha the front bar motor runs at 90%.')
			},
			{
				title: L('Messen', 'Knives'),
				rows: [
					{ label: L('Slagen per minuut', 'Strokes per minute'), value: L('1.200', '1,200') },
					{ label: L('Piekkracht per mes', 'Peak force per knife'), value: L('260-345 N') },
					{ label: L('Samen op de kast', 'Together on the gearbox'), value: L('< 20 N') },
					{ label: L('Trekkracht', 'Draft force'), value: L('≈ 690 N') }
				],
				note: L('Met één mes zou de kast 550 tot 670 N krijgen.', 'With a single knife the gearbox would get 550 to 670 N.')
			}
		],
		onRobot: [
			L('In het werk rusten de balken op hun sloffen: de robot draagt maar 85 kg van de 210 kg.', 'In work the bars rest on their shoes: the robot carries only 85 kg of the 210 kg.'),
			L('In transport komt 72% op de vooras (267 kg), binnen de 500 kg per as.', 'In transport 72% is on the front axle (267 kg), within the 500 kg per axle.'),
			L('Eén module voor alle drie de balken: dezelfde messen, kast en 48 V-motor van 1.000 W, alleen de lengte verschilt.', 'One module for all three bars: the same knives, gearbox and 1,000 W 48 V motor, only the length differs.')
		],
		clips: [
			{ src: sickleVideo, poster: sicklePoster, caption: L('Een strook van 3,25 m maaien; op de kopakker gaat de voorbalk omhoog en klappen de vleugels in. De mesbeweging is vertraagd weergegeven.', 'Mowing a 3.25 m strip; on the headland the front bar lifts and the wings fold up. The knife motion is shown slowed down.') }
		],
		gallery: [
			{ src: sickleTransport, caption: L('Transportstand: voorbalk omhoog, vleugels verticaal', 'Transport: front bar up, wings vertical') },
			{ src: sickleKnifeDrive, caption: L('Kast verborgen: twee krukken 180° uit elkaar', 'Gearbox hidden: two cranks 180° apart') },
			{ src: sickleFloat, caption: L('De vleugels zweven van −9° tot +17°', 'The wings float from −9° to +17°') },
			{ src: sickleHinge, caption: L('Middenframe, scharnier en vleugelactuator', 'Mid frame, hinge and wing actuator') }
		],
		repoPath: REPO + 'sickle%20bar%20mower'
	},
	{
		slug: 'weed-picker',
		functionIds: [10],
		name: L('Onkruidtopper', 'Weed picker'),
		category: L('Maaien', 'Mowing'),
		short: L(
			'Topt distels, jakobskruiskruid en ridderzuring en legt ze op één zwad.',
			'Tops thistles, ragwort and dock and lays them in one windrow.'
		),
		lead: L(
			'Een maaidek met twee rotors voor de robot. Het maait distels, jakobskruiskruid en ridderzuring boven het gras af en legt al het onkruid op één zwad tussen de voorwielen. Er is geen opvangbak; het zwad kun je daarna oprapen, want vooral jakobskruiskruid moet van het land.',
			'A twin-rotor mowing deck in front of the robot. It tops thistles, ragwort and dock above the grass and lays all the cut weed in one windrow between the front wheels. There is no bin; the windrow can be picked up afterwards, because ragwort in particular has to leave the field.'
		),
		hero: pickerWork,
		figures: [
			{ value: L('990 mm'), label: L('Maaibreedte', 'Cutting width'), note: L('2 rotors Ø 510', '2 rotors Ø 510') },
			{ value: L('100-400 mm'), label: L('Maaihoogte', 'Cut height'), note: L('instelbaar tijdens het rijden', 'adjustable while driving') },
			{ value: L('≈ 320 mm'), label: L('Breedte van het zwad', 'Windrow width'), note: L('± 85% van het onkruid', 'approx. 85% of the weed') },
			{ value: L('≈ 1 kW'), label: L('Elektrisch', 'Electric'), note: L('bij 0,5 m/s, 0,2 kg/m² onkruid', 'at 0.5 m/s, 0.2 kg/m² of weed') },
			{ value: L('0,18 ha/u', '0.18 ha/h'), label: L('Capaciteit', 'Capacity'), note: L('± 0,3 ha per acculading', 'approx. 0.3 ha per charge') },
			{ value: L('€ 1.040', '€1,040'), label: L('Materiaal', 'Materials'), note: L('82 kg', '82 kg') }
		],
		steps: [
			{
				title: L('Inrijden', 'Drive in'),
				body: L(
					'De voorschort duwt een hoge plant om. Die glijdt onder het dek en de messen hakken hem op de ingestelde hoogte in korte stukken.',
					'The front skirt pushes a tall plant over. It slides under the deck and the blades chop it into short pieces at the set height.'
				)
			},
			{
				title: L('Naar het midden', 'To the middle'),
				body: L(
					'De rotors draaien naar elkaar toe. In het midden bewegen beide naar achteren en werpen ze het hakselsel door een opening achter in de kap.',
					'The rotors turn towards each other. In the middle both move backwards and throw the chopped weed through an opening at the rear of the hood.'
				)
			},
			{
				title: L('Zwad', 'Windrow'),
				body: L(
					'Twee korte zwadborden houden het zwad ± 320 mm smal. Het valt tussen de voorwielen en gaat onder de robot door.',
					'Two short swath boards keep the windrow approx. 320 mm narrow. It lands between the front wheels and passes under the robot.'
				)
			},
			{
				title: L('Hoogte', 'Height'),
				body: L(
					'Een actuator op de diagonaal van een parallellogram zet de maaihoogte. Een zwevende koppeling met een sleufgat laat het dek zelf over een bult rijden.',
					'An actuator on the diagonal of a parallel linkage sets the cut height. A float link with a slot lets the deck ride over a hump by itself.'
				)
			}
		],
		variants: [],
		calcs: [
			{
				title: L('Vermogen bij 0,5 m/s, 0,2 kg/m² onkruid', 'Power at 0.5 m/s, 0.2 kg/m² of weed'),
				rows: [
					{ label: L('Luchtweerstand van de messen', 'Blade windage'), value: L('392 W') },
					{ label: L('Hakselen', 'Chopping'), value: L('396 W') },
					{ label: L('Stationair', 'Idle'), value: L('50 W') },
					{ label: L('Elektrisch, beide rotors', 'Electric, both rotors'), value: L('986 W (20,5 A)', '986 W (20.5 A)') }
				],
				note: L('Elke motor draait dan op 70%.', 'Each motor then runs at 70%.')
			},
			{
				title: L('Rijsnelheid naar onkruid', 'Driving speed by weed density'),
				rows: [
					{ label: L('0,05 kg/m²', '0.05 kg/m²'), value: L('1,0 m/s', '1.0 m/s') },
					{ label: L('0,2 kg/m²', '0.2 kg/m²'), value: L('0,8 m/s', '0.8 m/s') },
					{ label: L('0,5 kg/m²', '0.5 kg/m²'), value: L('0,32 m/s', '0.32 m/s') },
					{ label: L('1,0 kg/m²', '1.0 kg/m²'), value: L('0,16 m/s', '0.16 m/s') }
				],
				note: L('De robot remt af op de motorstroom.', 'The robot slows down on the motor current.')
			},
			{
				title: L('Massa en aslast', 'Mass and axle load'),
				rows: [
					{ label: L('Werktuig', 'Implement'), value: L('82 kg') },
					{ label: L('Op de vooras', 'On the front axle'), value: L('85% (206 kg)') },
					{ label: L('Met 45 kg achterop', 'With 45 kg at the rear'), value: L('30% achter', '30% rear') }
				]
			}
		],
		onRobot: [
			L('Een contragewicht achterop is aan te raden: zonder komt 85% van het gewicht op de vooras.', 'A counterweight at the rear is advised: without it 85% of the weight is on the front axle.'),
			L('Vrijzwaaiende messen klappen terug op een steen of molshoop. Er zijn geen riemen en links en rechts gebruiken hetzelfde mes.', 'Free-swinging blades fold back when they hit a stone or a molehill. There are no belts and left and right use the same blade.'),
			L('De linker rotor loopt 24 mm hoger, zodat de messen mogen overlappen zonder dat ze op elkaar afgestemd hoeven te zijn.', 'The left rotor runs 24 mm higher, so the blades may overlap without being timed to each other.')
		],
		clips: [
			{ src: pickerVideo, poster: pickerPoster, caption: L('Een dichte onkruidplek: de robot remt af als de motoren op 90% komen en halverwege gaat de maaihoogte van 150 naar 250 mm.', 'A dense weed patch: the robot slows down when the motors reach 90% and halfway the cut height goes from 150 to 250 mm.') }
		],
		gallery: [
			{ src: pickerHeight, caption: L('Maaihoogte 200 mm, met 100 en 400 mm doorzichtig', 'Cut height 200 mm, with 100 and 400 mm see-through') },
			{ src: pickerBelow, caption: L('Van onderen: twee messenbalken met vrijzwaaiende messen', 'From below: two blade bars with free-swinging blades') },
			{ src: pickerRotors, caption: L('Dek verborgen: spillen, koppelingen en messen', 'Deck hidden: spindles, couplings and blades') },
			{ src: pickerLinkage, caption: L('Parallellogram met actuator en zwevende koppeling', 'Parallel linkage with actuator and float link') }
		],
		repoPath: REPO + 'weed%20picker'
	},
	{
		slug: 'fence-mower',
		functionIds: [11],
		name: L('Afrasteringsmaaier', 'Around-pole fence mower'),
		category: L('Maaien', 'Mowing'),
		short: L(
			'Maait de strook onder het schrikdraad en gaat zelf om de palen heen.',
			'Mows the strip under the electric fence and goes around the posts by itself.'
		),
		lead: L(
			'Maait de strook onder een schrikdraad. Een meeslepende zwenkarm houdt een lage maaikop met nylondraad onder de draad. Bij elke paal duwt de paal de kop opzij, glijdt de kop eromheen en zwaait een veer hem terug. Geen sensor, geen actuator en geen software.',
			'Mows the strip under an electric fence. A trailing swing arm holds a low nylon-string head under the wire. At every post the post pushes the head aside, the head slides around it and a spring swings it back. No sensor, no actuator and no software.'
		),
		hero: poleWork,
		figures: [
			{ value: L('Ø 400 mm'), label: L('Maaicirkel', 'Cutting circle'), note: L('4 nylondraden, 3.667 omw/min', '4 nylon strings, 3,667 rpm') },
			{ value: L('1,8 km/u', '1.8 km/h'), label: L('Afrastering per uur', 'Fence per hour'), note: L('bij 0,5 m/s', 'at 0.5 m/s') },
			{ value: L('≈ 615 W'), label: L('Elektrisch', 'Electric'), note: L('12,8 A bij 48 V, hoog gras', '12.8 A at 48 V, tall grass') },
			{ value: L('≈ 4,3 km', '≈ 4.3 km'), label: L('Per acculading', 'Per charge'), note: L('± 2,4 uur, met rijden', 'approx. 2.4 hours, with driving') },
			{ value: L('182 mm'), label: L('Hoogte maaikop', 'Head height'), note: L('onderste draad vanaf 281 mm', 'bottom wire from 281 mm') },
			{ value: L('€ 575', '€575'), label: L('Materiaal', 'Materials'), note: L('50 kg', '50 kg') }
		],
		steps: [
			{
				title: L('Maaien', 'Mow'),
				body: L(
					'De arm sleept 30° achter de robot. Een veer houdt hem tegen de aanslag, tegen de weerstand van het gras in. Een glijschotel draagt de kop over de grond.',
					'The arm trails 30° behind the robot. A spring holds it against the rest stop, against the drag of the grass. A skid carries the head over the ground.'
				)
			},
			{
				title: L('Raken', 'Contact'),
				body: L(
					'De paal raakt de PE-beschermring aan de buitenkant. De kracht duwt de kop naar achteren en naar binnen: de arm zwaait om de paal.',
					'The post hits the PE guard ring on its outer side. The force pushes the head back and inwards: the arm swings around the post.'
				)
			},
			{
				title: L('Eromheen', 'Around'),
				body: L(
					'De kop glijdt langs de paal terwijl de robot doorrijdt. De draden reiken 42 mm voorbij de ring en maaien tot tegen de paal.',
					'The head slides along the post while the robot drives on. The strings reach 42 mm past the ring and cut right up to the post.'
				)
			},
			{
				title: L('Terug', 'Back'),
				body: L(
					'Is de paal voorbij het midden van de kop, dan zwaait de veer de arm in ± 0,45 s terug achter de paal, op de aanslag.',
					'Once the post is past the middle of the head, the spring swings the arm back behind the post onto the rest stop in approx. 0.45 s.'
				)
			}
		],
		variants: [],
		calcs: [
			{
				title: L('Vermogen bij 0,5 m/s, hoog gras', 'Power at 0.5 m/s, tall grass'),
				rows: [
					{ label: L('Maaien', 'Cutting'), value: L('280 W') },
					{ label: L('Luchtweerstand draden', 'String air drag'), value: L('177 W') },
					{ label: L('Stationair', 'Idle'), value: L('40 W') },
					{ label: L('Elektrisch', 'Electric'), value: L('615 W') }
				]
			},
			{
				title: L('Langs een paal, 0,5 m/s', 'Past a post, 0.5 m/s'),
				rows: [
					{ label: L('Arm zwaait terug', 'Arm swings back'), value: L('16° (tot 46°)', '16° (to 46°)') },
					{ label: L('Kracht op de paal, eerste contact', 'Force on the post, first contact'), value: L('≈ 210 N') },
					{ label: L('Kracht tijdens het glijden', 'Force while sliding'), value: L('≈ 20 N') },
					{ label: L('Ongemaaid per paal', 'Uncut per post'), value: L('≈ 150 cm²') }
				]
			},
			{
				title: L('Veer en aslasten', 'Spring and axle loads'),
				rows: [
					{ label: L('Veer in rust / grasweerstand', 'Spring at rest / grass drag'), value: L('33 / 22 Nm') },
					{ label: L('Robot + maaier', 'Robot + mower'), value: L('212 kg') },
					{ label: L('Vooras', 'Front axle'), value: L('36%') },
					{ label: L('Rechter achterwiel', 'Right rear wheel'), value: L('83 kg') }
				]
			}
		],
		onRobot: [
			L('De arm draait op een paal achter het rechter achterwiel. De robot rijdt 279 mm naast de palen.', 'The arm pivots on a post behind the right rear wheel. The robot drives 279 mm beside the posts.'),
			L('Nylondraad geleidt niet, snijdt de draad niet door en beschadigt een houten paal niet.', 'Nylon string does not conduct, does not cut the wire and does not damage a wooden post.'),
			L('De 48 V-motor staat aan de voet van de arm, binnen de afrastering. Een V-snaar in de arm drijft een gekochte maaidekspil aan.', 'The 48 V motor sits at the root of the arm, inside the fence line. A V-belt inside the arm drives a bought deck spindle.')
		],
		clips: [
			{ src: poleVideo, poster: polePoster, caption: L('Maaien langs de afrastering en om twee palen heen, met de zwaai van de arm en de kracht van de paal.', 'Mowing along the fence and around two posts, with the swing of the arm and the force of the post.') }
		],
		gallery: [
			{ src: poleSwing, caption: L('Van boven: rust (30°), langs een paal (53°) en de aanslag (85°)', 'From above: rest (30°), past a post (53°) and the stop (85°)') },
			{ src: poleBelt, caption: L('Kap eraf: motor, V-snaar en maaispil', 'Cover off: motor, V-belt and deck spindle') },
			{ src: polePivot, caption: L('Draaipunt met veer en aanslagbouten', 'Pivot with spring and stop bolts') },
			{ src: poleHead, caption: L('Van onderen: schijf met 4 draden, ring en glijschotel', 'From below: disc with 4 strings, ring and skid') }
		],
		repoPath: REPO + 'around_pole_mower'
	},
	{
		slug: 'spot-sprayer',
		functionIds: [6],
		name: L('Spotspuit', 'Spot sprayer'),
		category: L('Onkruidbestrijding', 'Weed control'),
		short: L(
			'Spuit onkruid plant voor plant met een klapbare boom van 3,75 m.',
			'Sprays weeds plant by plant with a 3.75 m folding boom.'
		),
		lead: L(
			'Spuit onkruid plant voor plant in plaats van het hele veld. Een camera op een mast vóór de robot vindt het onkruid. De boom achter de robot opent alleen de doppen boven een plant, en alleen zolang die eronder is.',
			'Sprays weeds plant by plant instead of the whole field. A camera on a mast in front of the robot finds the weeds. The boom behind the robot opens only the nozzles above a plant, and only while it is under them.'
		),
		hero: spotWork,
		figures: [
			{ value: L('3,75 m', '3.75 m'), label: L('Werkbreedte', 'Working width'), note: L('15 doppen à 250 mm', '15 nozzles at 250 mm') },
			{ value: L('≈ 20 l/ha'), label: L('Middel over het veld', 'Liquid over the field'), note: L('bij 5% onkruid', 'at 5% weed cover') },
			{ value: L('1,1 ha/u', '1.1 ha/h'), label: L('Capaciteit', 'Capacity'), note: L('netto, bij 1 m/s', 'net, at 1 m/s') },
			{ value: L('2,65 s'), label: L('Van camera tot dop', 'From camera to nozzle'), note: L('nodig: ± 135 ms', 'needed: approx. 135 ms') },
			{ value: L('3,2 s', '3.2 s'), label: L('Vleugel opklappen', 'Fold a wing up'), note: L('ook in het veld, voor palen', 'also in the field, for posts') },
			{ value: L('€ 3.580', '€3,580'), label: L('Materiaal', 'Materials'), note: L('91 kg leeg', '91 kg empty') }
		],
		steps: [
			{
				title: L('Kijken', 'Look'),
				body: L(
					'Een groothoekcamera op 1,48 m hoogte kijkt 55° naar beneden en ziet de hele strook vanaf 1,8 m voor de robot. Elke plant staat in zo’n 60 beelden.',
					'A wide-angle camera 1.48 m high looks 55° down and sees the whole strip from 1.8 m ahead of the robot. Every plant appears in about 60 frames.'
				)
			},
			{
				title: L('Volgen', 'Track'),
				body: L(
					'De computer geeft elke plant een plek op de grond. Wielodometrie draagt die plek 2,6 tot 5,6 m mee naar de boom.',
					'The computer gives every plant a position on the ground. Wheel odometry carries that position 2.6 to 5.6 m back to the boom.'
				)
			},
			{
				title: L('Spuiten', 'Spray'),
				body: L(
					'De doppen boven de plant gaan 50 mm ervoor open en 50 mm erna dicht. Elke gespoten plek wordt met zijn positie vastgelegd.',
					'The nozzles above the plant open 50 mm before it and close 50 mm after it. Every sprayed spot is logged with its position.'
				)
			},
			{
				title: L('Uitwijken', 'Avoid'),
				body: L(
					'Voor een paal of boom klapt de vleugel aan die kant op en zijn doppen gaan uit. De gemiste strook wordt vastgelegd voor de volgende werkgang.',
					'Before a post or a tree the wing on that side folds up and its nozzles switch off. The missed strip is logged for the next pass.'
				)
			}
		],
		variants: [],
		calcs: [
			{
				title: L('Doppen', 'Nozzles'),
				rows: [
					{ label: L('Spleetdop 40°, maat 015', '40° flat fan, size 015'), value: L('0,59 l/min bij 3 bar', '0.59 l/min at 3 bar') },
					{ label: L('Dosis waar gespoten wordt', 'Dose where it sprays'), value: L('393 l/ha') },
					{ label: L('Plek voor een ridderzuring Ø 300', 'Spot for a Ø 300 dock'), value: L('400 mm, ≤ 12 ml') }
				]
			},
			{
				title: L('Tank en pomp', 'Tank and pump'),
				rows: [
					{ label: L('Tank 120 l bij 5% onkruid', '120 l tank at 5% weed'), value: L('≈ 6 ha') },
					{ label: L('Membraanpomp bij 3 bar', 'Diaphragm pump at 3 bar'), value: L('9,5 l/min', '9.5 l/min') },
					{ label: L('Alle 15 doppen tegelijk', 'All 15 nozzles at once'), value: L('8,8 l/min', '8.8 l/min') }
				]
			},
			{
				title: L('Animatie, 16 m', 'Animation, 16 m'),
				rows: [
					{ label: L('Ridderzuringen', 'Docks'), value: L('14') },
					{ label: L('Gespoten', 'Sprayed'), value: L('139 ml') },
					{ label: L('Volvelds op dezelfde strook', 'Blanket spraying the same strip'), value: L('2,4 l', '2.4 l') }
				]
			}
		],
		onRobot: [
			L('De mast zou de GNSS-antenne van de robot afschermen, dus die antenne verhuist naar de top van de mast.', 'The mast would shade the robot’s GNSS antenna, so that antenna moves to the top of the mast.'),
			L('Vol weegt robot plus spuit 372 kg: 45% voor en hooguit 102 kg per wiel van de 500 kg.', 'Full, robot plus sprayer weighs 372 kg: 45% at the front and at most 102 kg per wheel of the 500 kg.'),
			L('≈ 600 W met rijden: ± 4 uur en 4,3 ha op een accu van 2,4 kWh.', 'Approx. 600 W with driving: about 4 hours and 4.3 ha on a 2.4 kWh battery.')
		],
		clips: [
			{ src: spotVideo, poster: spotPoster, caption: L('Ridderzuring plekgewijs spuiten. Voor de paal klapt de rechtervleugel op; de ene plant in die strook wordt vastgelegd voor een tweede ronde.', 'Spot spraying dock. Before the post the right wing folds up; the one plant in that strip is logged for a second pass.') }
		],
		clipRatio: '8 / 5',
		gallery: [
			{ src: spotFolded, caption: L('Beide vleugels omhoog: 1,61 m breed', 'Both wings up: 1.61 m wide') },
			{ src: spotCamera, caption: L('Wat de camera op de grond ziet (geel)', 'What the camera sees on the ground (yellow)') },
			{ src: spotHinge, caption: L('Scharnier met actuator; de eindplaten zijn de aanslag', 'Hinge with actuator; the end plates are the stop') },
			{ src: spotNozzle, caption: L('Dophouders met PWM-magneetklep', 'Nozzle bodies with PWM solenoid valve') }
		],
		repoPath: REPO + 'spotspray%20unit'
	},
	{
		slug: 'in-row-weeder',
		functionIds: [5],
		name: L('Rijwieder', 'In-row weeder'),
		category: L('Onkruidbestrijding', 'Weed control'),
		short: L(
			'Schoffelt ín twee rijen broccoli en zwaait om elke plant heen.',
			'Hoes inside two rows of broccoli and swings around every plant.'
		),
		lead: L(
			'Schoffelt in de gewasrij, tussen de planten, in twee rijen broccoli tegelijk. Een camera onder de voorbalken vindt de planten. Per rij zwaait een stappenmotor een mesje vlak voor elke plant opzij en erachter weer terug.',
			'Hoes inside the crop row, between the plants, in two rows of broccoli at once. A camera under the front beams finds the plants. Per row a stepper motor swings a knife aside just before each plant and back in behind it.'
		),
		hero: inrowWork,
		figures: [
			{ value: L('2 rijen', '2 rows'), label: L('Per werkgang', 'Per pass'), note: L('375 mm uit elkaar, 0,75 m', '375 mm apart, 0.75 m') },
			{ value: L('6.400', '6,400'), label: L('Planten per uur', 'Plants per hour'), note: L('bij 0,5 m/s', 'at 0.5 m/s') },
			{ value: L('98 / 148 ms'), label: L('Uit / in zwaaien', 'Swing out / in'), note: L('vinger, tegen de grond in', 'finger, against the soil') },
			{ value: L('≥ 50 mm'), label: L('Van elke stengel', 'From every stem'), note: L('veilige zone rond de plant', 'safe zone around the plant') },
			{ value: L('90%'), label: L('Rijband geschoffeld', 'Row band hoed'), note: L('dubbele armen (vinger 68%)', 'double arms (finger 68%)') },
			{ value: L('€ 2.240', '€2,240'), label: L('Materiaal vanaf', 'Materials from'), note: L('dubbele armen € 2.820', 'double arms €2,820') }
		],
		steps: [
			{
				title: L('Zien', 'See'),
				body: L(
					'Een camera met ledbalken onder de voorbalken ziet beide rijen, ook in de schaduw van de robot. Hij vindt de planten 0,84 s voordat het mes er is.',
					'A camera with LED bars under the front beams sees both rows, also in the robot’s shadow. It finds the plants 0.84 s before the knife gets there.'
				)
			},
			{
				title: L('Schoffelen', 'Hoe'),
				body: L(
					'Tussen de planten loopt het mes 20 mm diep in de rijlijn en snijdt het de kiemplanten weg.',
					'Between the plants the knife runs 20 mm deep in the row line and cuts the weed seedlings.'
				)
			},
			{
				title: L('Uitzwaaien', 'Swing out'),
				body: L(
					'132 mm voor de stengel zwaait de stappenmotor het mes opzij. 82 mm erna zwaait hij het terug de rij in.',
					'132 mm before the stem the stepper swings the knife aside. 82 mm after it, it swings it back into the row.'
				)
			},
			{
				title: L('Kopakker', 'Headland'),
				body: L(
					'Op de kopakker tillen twee actuatoren de units 50 mm op. De messen blijven naast de rij.',
					'On the headland two actuators lift the units 50 mm. The knives stay beside the row.'
				)
			}
		],
		variants: [
			{
				name: L('Vinger, 2 rijen', 'Finger, 2 rows'),
				image: inrowWork,
				points: [
					L('Eén stappenmotor per rij, arm van 220 mm', 'One stepper per row, 220 mm arm'),
					L('Verenstalen vinger met een mes van 80 × 35 mm', 'Spring-steel finger with an 80 × 35 mm knife'),
					L('Uit in 98 ms, terug in 148 ms', 'Out in 98 ms, back in 148 ms'),
					L('68% van de rijband geschoffeld, 55 kg', '68% of the row band hoed, 55 kg')
				],
				price: L('± € 2.240 materiaal', 'approx. €2,240 in materials')
			},
			{
				name: L('Dubbele armen', 'Double arms'),
				image: inrowDouble,
				points: [
					L('Twee messen per rij, 4 stappenmotoren', 'Two knives per row, 4 steppers'),
					L('Ze openen naar beide kanten en sluiten achter de plant', 'They open to both sides and close behind the plant'),
					L('Elk mes beweegt maar 78 mm: 89 / 118 ms', 'Each knife moves only 78 mm: 89 / 118 ms'),
					L('90% van de rijband geschoffeld, 68 kg', '90% of the row band hoed, 68 kg')
				],
				price: L('± € 2.820 materiaal', 'approx. €2,820 in materials')
			}
		],
		calcs: [
			{
				title: L('Stappenmotor, vinger', 'Stepper, finger'),
				rows: [
					{ label: L('NEMA 23 closed loop, 10:1', 'NEMA 23 closed loop, 10:1'), value: L('17,6 Nm bruikbaar', '17.6 Nm usable') },
					{ label: L('Grondlast bij inzwaaien', 'Soil load swinging in'), value: L('tot 16,2 Nm', 'up to 16.2 Nm') },
					{ label: L('Vasthouden in de rij', 'Holding in the row'), value: L('0,8 Nm (× 3,8)', '0.8 Nm (× 3.8)') }
				]
			},
			{
				title: L('Krachten per mes, 20 mm diep', 'Forces per knife, 20 mm deep'),
				rows: [
					{ label: L('Vinger: trek / zijwaarts', 'Finger: draft / sideways'), value: L('65 / 47 N') },
					{ label: L('Dubbele arm: trek / zijwaarts', 'Double arm: draft / sideways'), value: L('41 / 47 N') }
				],
				note: L('Grondkrachten zijn geschat.', 'Soil forces are estimated.')
			},
			{
				title: L('Rijband geschoffeld naar snelheid', 'Row band hoed by speed'),
				rows: [
					{ label: L('Vinger, 0,3 m/s', 'Finger, 0.3 m/s'), value: L('76%') },
					{ label: L('Vinger, 0,5 m/s', 'Finger, 0.5 m/s'), value: L('68%') },
					{ label: L('Vinger, 0,7 m/s', 'Finger, 0.7 m/s'), value: L('60%') },
					{ label: L('Dubbele armen, 0,3-0,7 m/s', 'Double arms, 0.3-0.7 m/s'), value: L('90%') }
				],
				note: L('De dubbele armen timen op de echte afstand tot de stengel, dus de snelheid maakt bijna niet uit.', 'The double arms are timed by the real distance to the stem, so the speed hardly matters.')
			}
		],
		onRobot: [
			L('Twee units onder de buik, elk op een parallellogram met een dieptewiel in het wielspoor van de robot.', 'Two units under the belly, each on a parallel linkage with a gauge wheel in the robot’s wheel track.'),
			L('De robotwielen lopen midden in de tussenrijen; de volgende werkgang sluit aan op een rijpatroon van 375 mm.', 'The robot wheels run in the middle of the inter-rows; the next pass fits a 375 mm row pattern.'),
			L('≈ 475 W met rijden: ± 5 uur en 0,55 ha op een accu van 2,4 kWh.', 'Approx. 475 W with driving: about 5 hours and 0.55 ha on a 2.4 kWh battery.')
		],
		clips: [
			{ src: inrowFingerVideo, poster: inrowFingerPoster, caption: L('Vinger: het mes zwaait om elke plant heen. Linksonder beide rijen van bovenaf.', 'Finger: the knife swings around every plant. Bottom left both rows from above.') },
			{ src: inrowDoubleVideo, poster: inrowDoublePoster, caption: L('Dubbele armen: twee messen per rij openen bij elke plant naar beide kanten.', 'Double arms: two knives per row open to both sides at every plant.') }
		],
		clipRatio: '8 / 5',
		gallery: [
			{ src: inrowKnives, caption: L('Van boven: rechts uit naast een plant, links in de rij', 'From above: right knife out beside a plant, left in the row') },
			{ src: inrowUnit, caption: L('Rij-unit: parallellogram, stappenmotor, arm en dieptewiel', 'Row unit: parallel linkage, stepper, arm and gauge wheel') },
			{ src: inrowDoubleKnives, caption: L('Dubbele armen van boven: open rond een plant', 'Double arms from above: open around a plant') },
			{ src: inrowCamera, caption: L('Camera met ledbalken onder de voorbalk', 'Camera with LED bars under the front beam') }
		],
		repoPath: REPO + 'in%20row%20weeder'
	},
	{
		slug: 'flame-weeder',
		functionIds: [],
		name: L('Onkruidbrander', 'Flame weeder'),
		category: L('Onkruidbestrijding', 'Weed control'),
		short: L(
			'Brandt kiemend onkruid weg op een vers gezaaid bed, vlak voor de opkomst.',
			'Burns emerged weed seedlings on a freshly sown bed, just before the crop comes up.'
		),
		lead: L(
			'Branden voor de opkomst, op vers gezaaide bedden van wortel, ui, biet of pastinaak. Een geïsoleerde kap van 1,5 m met zes vlakvlambranders doodt elke kiemplant die al boven staat. Het gewaszaad ligt dieper en de grond blijft liggen, dus er komt geen nieuw onkruidzaad boven.',
			'Pre-emergence flaming on freshly sown beds of carrot, onion, beetroot or parsnip. An insulated 1.5 m hood with six flat-flame burners kills every seedling that has already emerged. The crop seed lies deeper and the soil is not moved, so no new weed seeds come up.'
		),
		hero: flameWork,
		figures: [
			{ value: L('1,5 m', '1.5 m'), label: L('Kapbreedte', 'Hood width'), note: L('één bed', 'one bed') },
			{ value: L('167 kW'), label: L('Branders', 'Burners'), note: L('6 stuks, 13 kg propaan per uur', '6 of them, 13 kg propane per hour') },
			{ value: L('34 kg/ha'), label: L('Gasdosis', 'Gas dose'), note: L('bij 0,7 m/s', 'at 0.7 m/s') },
			{ value: L('0,84 ha', '0.84 ha'), label: L('Per vulling', 'Per filling'), note: L('2 flessen van 18 kg', '2 cylinders of 18 kg') },
			{ value: L('≈ € 55/ha', '≈ €55/ha'), label: L('Gaskosten', 'Gas cost'), note: L('0,32 ha/u netto', '0.32 ha/h net') },
			{ value: L('€ 3.400', '€3,400'), label: L('Materiaal', 'Materials'), note: L('131 kg leeg', '131 kg empty') }
		],
		steps: [
			{
				title: L('Timing', 'Timing'),
				body: L(
					'Zaaien en een paar dagen voor de opkomst branden; bij wortel na 8 tot 12 dagen. Een glasplaat op het bed laat zien wanneer het gewas bijna boven komt.',
					'Sow, then flame a few days before the crop emerges; for carrot after 8 to 12 days. A glass plate on the bed shows when the crop is nearly up.'
				)
			},
			{
				title: L('Ontsteken', 'Ignite'),
				body: L(
					'Eerst gaan de waakvlammen aan, met een vonk en een vlamsensor per brander. Daarna opent de branderklep en rijdt de robot 0,7 m/s.',
					'First the pilot flames light, with a spark and a flame sensor per burner. Then the burner valve opens and the robot drives at 0.7 m/s.'
				)
			},
			{
				title: L('Branden', 'Flame'),
				body: L(
					'De vlammen wijzen 40° naar achteren. De hete gassen onder de kap verhitten elke plek 1,14 s lang en doden de kiemplanten.',
					'The flames point 40° backwards. The hot gas under the hood heats every spot for 1.14 s and kills the seedlings.'
				)
			},
			{
				title: L('Stoppen', 'Stop'),
				body: L(
					'Onder 0,2 m/s sluiten de hoofdkleppen meteen; alleen de waakvlammen blijven branden. Op de kopakker volgt de kap op zijn zwenkwielen.',
					'Below 0.2 m/s the main valves close at once; only the pilot flames stay on. On the headland the hood follows on its castors.'
				)
			}
		],
		variants: [],
		calcs: [
			{
				title: L('Dosis bij 2 bar', 'Dose at 2 bar'),
				rows: [
					{ label: L('0,5 m/s', '0.5 m/s'), value: L('48 kg/ha') },
					{ label: L('0,7 m/s', '0.7 m/s'), value: L('34 kg/ha') },
					{ label: L('0,9 m/s', '0.9 m/s'), value: L('27 kg/ha') }
				],
				note: L('Bij 0,7 m/s komt er ≈ 104 kJ/m² op de grond.', 'At 0.7 m/s approx. 104 kJ/m² reaches the soil.')
			},
			{
				title: L('Resultaat in de animatie', 'Result in the animation'),
				rows: [
					{ label: L('Kiemplanten tot 2 blaadjes', 'Seedlings up to 2 leaves'), value: L('alle dood', 'all killed') },
					{ label: L('Alle kiemplanten', 'All seedlings'), value: L('73%') },
					{ label: L('Planten met 4 blaadjes', 'Plants with 4 leaves'), value: L('17%') }
				],
				note: L('Dodelijke dosis 60 tot 120 kJ/m², geschat.', 'Lethal dose 60 to 120 kJ/m², estimated.')
			},
			{
				title: L('Gas en veiligheid', 'Gas and safety'),
				rows: [
					{ label: L('Werkt tot een flestemperatuur van', 'Works down to a cylinder temperature of'), value: L('−7 °C') },
					{ label: L('Verdamper in de kap', 'Vaporiser in the hood'), value: L('2,4 kW', '2.4 kW') },
					{ label: L('Hoofdmagneetkleppen', 'Main solenoid valves'), value: L('2, in serie', '2, in series') },
					{ label: L('Straling achter het hitteschild', 'Radiation behind the heat shield'), value: L('14 W/m²') }
				],
				note: L('Zonder hitteschild zou de voorwand 975 W/m² op de achterbanden stralen.', 'Without the heat shield the front wall would radiate 975 W/m² onto the rear tyres.')
			}
		],
		onRobot: [
			L('Twee heftruckflessen van 18 kg met vloeistofonttrekking op de bovenbalken. De vloeistof verdampt in een spiraal in de kap, zodat de flessen niet bevriezen.', 'Two 18 kg forklift cylinders with liquid withdrawal on the upper beams. The liquid evaporates in a coil inside the hood, so the cylinders do not freeze.'),
			L('De kap rust op twee stalen zwenkwielen; een vrij parallellogram trekt hem en houdt hem in lijn.', 'The hood rests on two steel swivel castors; a free parallel linkage pulls it and keeps it in line.'),
			L('325 W elektrisch: de accu houdt het 7,4 uur vol, langer dan het gas.', '325 W electric: the battery lasts 7.4 hours, longer than the gas.')
		],
		clips: [
			{ src: flameVideo, poster: flamePoster, caption: L('Een gezaaid bed branden bij 0,7 m/s. Aan het eind stopt de robot en sluit de hoofdklep meteen.', 'Flaming a sown bed at 0.7 m/s. At the end the robot stops and the main valve closes at once.') }
		],
		clipRatio: '8 / 5',
		gallery: [
			{ src: flameHood, caption: L('Kap doorzichtig: zes vlammen en de verbrande strook', 'Hood see-through: six flames and the burnt strip') },
			{ src: flameSection, caption: L('Zijaanzicht: brander onder 40°, vlam op de grond', 'Side view: burner at 40°, flame on the soil') },
			{ src: flameBelow, caption: L('Van onderen: branders, verdamperspiraal en isolatie', 'From below: burners, vaporiser coil and insulation') },
			{ src: flameCylinders, caption: L('Twee flessen van 18 kg op de robot', 'Two 18 kg cylinders on the robot') }
		],
		repoPath: REPO + 'weeds%20burner'
	},
	{
		slug: 'belt-rake',
		functionIds: [],
		name: L('Bandhark', 'Belt rake'),
		category: L('Onkruidbestrijding', 'Weed control'),
		short: L(
			'Kamt kiemend onkruid uit kwekerijbedden of harkt mos en vilt op één zwad.',
			'Combs weed seedlings out of nursery beds or rakes moss and thatch into one windrow.'
		),
		lead: L(
			'Een bandhark voor de robot: een rubberen band met 15 tandbalken loopt rond twee trommels. Hij kamt kiemend onkruid uit bedden tussen jonge bomen, of harkt mos en dood gras uit grasland en legt het op één zwad.',
			'A belt rake in front of the robot: a rubber belt with 15 tine bars runs around two drums. It combs weed seedlings out of beds between young trees, or rakes moss and dead grass out of grassland into one windrow.'
		),
		hero: rakeWork,
		figures: [
			{ value: L('1,52 m', '1.52 m'), label: L('Werkbreedte', 'Working width'), note: L('kammen; harken 1,41 m', 'combing; raking 1.41 m') },
			{ value: L('0,49 ha/u', '0.49 ha/h'), label: L('Capaciteit, harken', 'Capacity, raking'), note: L('netto bij 1,2 m/s', 'net at 1.2 m/s') },
			{ value: L('10 mm'), label: L('Kamdiepte', 'Combing depth'), note: L('over bomen tot ± 180 mm', 'over trees up to approx. 180 mm') },
			{ value: L('750 W'), label: L('Motor 48 V', '48 V motor'), note: L('± 37% belast bij het kammen', 'approx. 37% loaded when combing') },
			{ value: L('100 mm'), label: L('Heffen op de kopakker', 'Lift on the headland'), note: L('in 3,3 s', 'in 3.3 s') },
			{ value: L('€ 2.380', '€2,380'), label: L('Materiaal', 'Materials'), note: L('134 kg', '134 kg') }
		],
		steps: [
			{
				title: L('Kammen', 'Comb'),
				body: L(
					'In kwekerijbedden gaan de tanden 10 mm de grond in en trekken ze fijne kiemplanten los. Band en balken gaan over boompjes tot ± 180 mm.',
					'In nursery beds the tines go 10 mm into the soil and pull out fine weed seedlings. The belt and bars pass over trees up to approx. 180 mm.'
				)
			},
			{
				title: L('Harken', 'Rake'),
				body: L(
					'In grasland lopen de tanden 15 mm boven de grond door het vilt en harken ze mos en dood gras los, bijvoorbeeld na verticuteren en voor het doorzaaien.',
					'In grassland the tines run 15 mm above the soil through the thatch and rake out moss and dead grass, for example after scarifying and before overseeding.'
				)
			},
			{
				title: L('Zwad leggen', 'Lay a windrow'),
				body: L(
					'De onderste baan voert alles naar links tegen een zwadbord. De robot werkt van buiten naar binnen, zodat elk zwad meegaat in het volgende: aan het eind ligt er één zwad.',
					'The bottom run carries everything to the left against a swath board. The robot works from the outside inwards, so every windrow is carried into the next: at the end there is one windrow.'
				)
			},
			{
				title: L('Heffen', 'Lift'),
				body: L(
					'Twee zwenkwielen op 24 V-actuatoren dragen de hark, stellen de diepte in en heffen hem 100 mm op de kopakker. De robot draagt het gewicht nooit.',
					'Two swivel castors on 24 V actuators carry the rake, set the depth and lift it 100 mm on the headland. The robot never carries its weight.'
				)
			}
		],
		variants: [],
		calcs: [
			{
				title: L('Kammen, kwekerijbed', 'Combing, nursery bed'),
				rows: [
					{ label: L('Rijden / band', 'Driving / belt'), value: L('0,6 / 1,0 m/s', '0.6 / 1.0 m/s') },
					{ label: L('Tandkracht zijwaarts / sleep', 'Tine force sideways / drag'), value: L('156 / 94 N') },
					{ label: L('Aandrijving, elektrisch', 'Drive, electric'), value: L('277 W') },
					{ label: L('Per acculading', 'Per charge'), value: L('3,3 u, 0,9 ha', '3.3 h, 0.9 ha') }
				]
			},
			{
				title: L('Harken, grasland', 'Raking, grassland'),
				rows: [
					{ label: L('Rijden / band', 'Driving / belt'), value: L('1,2 / 1,5 m/s', '1.2 / 1.5 m/s') },
					{ label: L('Tandkracht zijwaarts / sleep', 'Tine force sideways / drag'), value: L('87 / 69 N') },
					{ label: L('Aandrijving, elektrisch', 'Drive, electric'), value: L('244 W') },
					{ label: L('Per acculading', 'Per charge'), value: L('2,5 u, 1,2 ha', '2.5 h, 1.2 ha') }
				]
			},
			{
				title: L('Waarom zwenkwielen', 'Why castors'),
				rows: [
					{ label: L('Hark aan de robot gehangen', 'Rake hung on the robot'), value: L('6 kg op de achteras', '6 kg on the rear axle') },
					{ label: L('Op eigen zwenkwielen', 'On its own castors'), value: L('voor 99 / achter 87 kg', 'front 99 / rear 87 kg') },
					{ label: L('Zijkracht, kammen', 'Side force, combing'), value: L('50% van de grip voor', '50% of the front grip') }
				]
			}
		],
		onRobot: [
			L('Een vrij parallellogram onder de voorbalken duwt de hark, vangt de zijkracht op en houdt hem waterpas. Een rolas laat hem dwars de grond volgen.', 'A free parallel linkage under the front beams pushes the rake, takes its side force and keeps it level. A roll stub lets it follow the ground across.'),
			L('In kwekerijbedden lopen de robotwielen en de zwenkwielen in vrije paden.', 'In nursery beds the robot wheels and the castors run in free lanes.'),
			L('Dezelfde hark maakt ook kleine zwaden van hooi of kuilgras.', 'The same rake also makes small windrows of hay or silage grass.')
		],
		clips: [
			{ src: rakeVideo, poster: rakePoster, caption: L('Grasland harken bij 1,2 m/s. Het zwad van de vorige werkgang gaat mee in het nieuwe; op de kopakker gaat de hark 100 mm omhoog.', 'Raking grassland at 1.2 m/s. The windrow of the previous pass is carried into the new one; on the headland the rake lifts 100 mm.') }
		],
		clipRatio: '8 / 5',
		gallery: [
			{ src: rakeNursery, caption: L('Kwekerijbed: kammen tussen rijen jonge bomen', 'Nursery bed: combing between rows of young trees') },
			{ src: rakeWindrow, caption: L('Van boven: vilt voor de hark, het zwad links', 'From above: thatch in front, the windrow on the left') },
			{ src: rakeTines, caption: L('Onderste baan: tandbalken met dubbele tanden', 'Bottom run: tine bars with double tines') },
			{ src: rakeDrive, caption: L('Motor op de aandrijftrommel en een zwenkwiel op zijn actuator', 'Motor on the drive drum and a castor on its actuator') }
		],
		repoPath: REPO + 'bandrake'
	},
	{
		slug: 'cambridge-roll',
		functionIds: [17],
		name: L('Cambridgerol & doorzaaier', 'Cambridge roll & overseeder'),
		category: L('Zaaien & planten', 'Sowing & planting'),
		short: L(
			'Getrokken graslandherstel: zaad op kale plekken en meteen aanrollen.',
			'Trailed lawn repair: seed on bare patches, rolled in straight away.'
		),
		lead: L(
			'Eenvoudige getrokken werktuigen voor gazon- en graslandherstel, aan één kogelkoppeling van 50 mm. Een camera ziet kale grond en zet de zaaier alleen daar aan. De ringen van de cambridgerol drukken het zaad 300 mm later aan.',
			'Simple trailed implements for lawn and grassland repair, on one 50 mm tow ball. A camera sees bare soil and switches the seeder on only there. The rings of the Cambridge roll press the seed in 300 mm later.'
		),
		hero: rollCombo,
		figures: [
			{ value: L('1 m'), label: L('Werkbreedte', 'Working width'), note: L('rol, zaaier en combinatie', 'roll, seeder and combination') },
			{ value: L('1.350 m²/u', '1,350 m²/h'), label: L('Capaciteit', 'Capacity'), note: L('bij 0,5 m/s', 'at 0.5 m/s') },
			{ value: L('35 g/m²'), label: L('Zaad op kale plekken', 'Seed on bare patches'), note: L('alleen waar de camera kale grond ziet', 'only where the camera sees bare soil') },
			{ value: L('49 l'), label: L('Zaadbak', 'Seed hopper'), note: L('17 kg = 490 m² kale grond', '17 kg = 490 m² of bare soil') },
			{ value: L('99,8%', '99.8%'), label: L('Kale grond ingezaaid', 'Bare soil seeded'), note: L('animatie, 100% aangerold', 'animation, 100% rolled') },
			{ value: L('€ 500'), label: L('Materiaal vanaf', 'Materials from'), note: L('rol € 850, combinatie € 1.200', 'roll €850, combination €1,200') }
		],
		steps: [
			{
				title: L('Zien', 'See'),
				body: L(
					'Een camera kijkt 0,4 tot 1,2 m voor de zaailijn en deelt de grond op in vakjes van 50 mm. Een vakje met weinig groen telt als kaal.',
					'A camera looks 0.4 to 1.2 m ahead of the drop line and divides the ground into 50 mm cells. A cell with little green counts as bare.'
				)
			},
			{
				title: L('Zaaien', 'Seed'),
				body: L(
					'Een nokkenrol op een 24 V-wormmotor gaat 220 mm voor een kale plek aan en 100 mm voor het eind uit. Losse kale vakjes worden genegeerd.',
					'A fluted roller on a 24 V worm gearmotor switches on 220 mm before a bare patch and off 100 mm before its end. Single bare cells are ignored.'
				)
			},
			{
				title: L('Aanrollen', 'Roll in'),
				body: L(
					'Twintig gietijzeren ringen van Ø 280 mm drukken het zaad 0,6 s later aan. De rol rolt altijd, ook over het gras.',
					'Twenty cast-iron rings of Ø 280 mm press the seed in 0.6 s later. The roll always rolls, also over the grass.'
				)
			},
			{
				title: L('Keren', 'Turn'),
				body: L(
					'Aan de kogelkoppeling knikt de aanhanger tot 75°. De kleinste draaicirkel van de achteras is 2,11 m.',
					'On the tow ball the trailer articulates up to 75°. The smallest rear axle turning radius is 2.11 m.'
				)
			}
		],
		variants: [
			{
				name: L('Cambridgerol', 'Cambridge roll'),
				image: rollRoll,
				points: [
					L('20 gietijzeren ringen Ø 280 op een as Ø 40', '20 cast-iron rings Ø 280 on a Ø 40 shaft'),
					L('178 kg, 169 kg per meter op de rol', '178 kg, 169 kg per metre on the roll'),
					L('Trekkracht 100 tot 250 N', 'Draft force 100 to 250 N')
				],
				price: L('± € 850 incl. trekhaak', 'approx. €850 incl. hitch')
			},
			{
				name: L('Doorzaaier', 'Overseeder'),
				image: rollSeeder,
				points: [
					L('Valzaaier van 1 m, bak van 49 l', '1 m drop seeder, 49 l hopper'),
					L('Camera schakelt per kale plek', 'Camera switches per bare patch'),
					L('61 kg op twee kleine wielen, ± 60 N trekkracht', '61 kg on two small wheels, approx. 60 N draft')
				],
				price: L('± € 500 materiaal', 'approx. €500 in materials')
			},
			{
				name: L('Combinatie', 'Combination'),
				image: rollCombo,
				points: [
					L('Zaaiunit tussen de armen van de rol', 'Seeder unit between the arms of the roll'),
					L('Zaad valt 300 mm voor de ringen', 'Seed falls 300 mm in front of the rings'),
					L('216 kg, 234 kg met volle bak', '216 kg, 234 kg with a full hopper')
				],
				price: L('± € 1.200 materiaal', 'approx. €1,200 in materials')
			}
		],
		calcs: [
			{
				title: L('Trekkracht', 'Draft force'),
				rows: [
					{ label: L('Rol, stevig gazon', 'Roll, firm lawn'), value: L('100 N') },
					{ label: L('Combinatie, vochtig gazon', 'Combination, moist lawn'), value: L('185 N') },
					{ label: L('Combinatie, kale plek', 'Combination, bare patch'), value: L('310 N') },
					{ label: L('Wat de robot kan trekken', 'What the robot can pull'), value: L('630-980 N') }
				],
				note: L('Trekvermogen van de robot op nat tot droog gras, vlak.', 'Robot pull on wet to dry grass, level ground.')
			},
			{
				title: L('Dosering', 'Metering'),
				rows: [
					{ label: L('Nokkenrol Ø 50, 12 groeven', 'Fluted roller Ø 50, 12 flutes'), value: L('101 g per omwenteling', '101 g per revolution') },
					{ label: L('35 g/m² bij 0,5 m/s', '35 g/m² at 0.5 m/s'), value: L('10 omw/min', '10 rpm') },
					{ label: L('Hoogste rijsnelheid bij 35 g/m²', 'Top speed at 35 g/m²'), value: L('0,96 m/s', '0.96 m/s') }
				]
			},
			{
				title: L('Animatie, 43 s', 'Animation, 43 s'),
				rows: [
					{ label: L('Kale grond', 'Bare soil'), value: L('1,21 m² in 6 plekken', '1.21 m² in 6 patches') },
					{ label: L('Ingezaaid / aangerold', 'Seeded / rolled'), value: L('99,8 / 100%', '99.8 / 100%') },
					{ label: L('Zaad gebruikt', 'Seed used'), value: L('114 g') }
				]
			}
		],
		onRobot: [
			L('Trekhaak: een plaat met 4 × M10 onder beide achterste onderbalken en een kogel van 50 mm, 115 mm achter de achterbanden.', 'Tow hitch: a plate with 4 × M10 under both rear lower beams and a 50 mm ball, 115 mm behind the rear tyres.'),
			L('Op de kogel rust maar 100 tot 241 N: de rol of de wielen dragen de rest.', 'Only 100 to 241 N rests on the ball: the roll or the wheels carry the rest.'),
			L('Niet te verwarren met de doorzaaier hierboven: die snijdt zaad ín een gesloten zode, deze strooit op kale plekken.', 'Not to be confused with the overseeder above: that one cuts seed into a closed sward, this one broadcasts on bare patches.')
		],
		clips: [
			{ src: rollVideo, poster: rollPoster, caption: L('Plekgewijs zaaien: zes kale plekken, zes keer aan. Goud is zaad op de grond, bruin is aangerold zaad.', 'Spot seeding: six bare patches, switched on six times. Gold is seed on the soil, brown is seed rolled in.') }
		],
		gallery: [
			{ src: rollSection, caption: L('Doorsnede: zaad valt, de ringen rollen het aan', 'Section: the seed drops, the rings roll it in') },
			{ src: rollMetering, caption: L('Doseerhuis met nokkenrol en borstel', 'Metering housing with fluted roller and brush') },
			{ src: rollHitch, caption: L('Trekhaak met kogel van 50 mm', 'Tow hitch with 50 mm ball') },
			{ src: rollTurn, caption: L('In de bocht: de aanhanger knikt 40°', 'In the turn: the trailer articulates 40°') }
		],
		repoPath: REPO + 'overseeding'
	},
	{
		slug: 'irrigation',
		functionIds: [12],
		name: L('Bevloeiing met slanghaspel', 'Irrigation with hose reel'),
		category: L('Spuiten, bemesten & irrigeren', 'Spraying, fertilizing & irrigation'),
		short: L(
			'Legt 150 m platte slang uit en bevloeit grasland bij lage druk.',
			'Lays out 150 m of lay-flat hose and floods grassland at low pressure.'
		),
		lead: L(
			'Bevloeit grasland bij lage druk vanuit een benzinepomp aan de sloot. De robot draagt een haspel met 150 m platte slang, legt hem leeg uit en rolt hem na de gift leeg weer op. Hij sjouwt dus nooit water.',
			'Floods grassland at low pressure from a petrol pump at the ditch. The robot carries a reel with 150 m of lay-flat hose, lays it out empty and winds it up empty after the irrigation. So it never carries water.'
		),
		hero: irrigationWork,
		figures: [
			{ value: L('7,4 m³/u', '7.4 m³/h'), label: L('Debiet', 'Flow'), note: L('bij 0,17 bar', 'at 0.17 bar') },
			{ value: L('99%'), label: L('Gelijkmatigheid', 'Uniformity'), note: L('CU op vlak land', 'CU on level ground') },
			{ value: L('4 m'), label: L('Breedte per strook', 'Width per strip'), note: L('uitlaat elke 2 m', 'outlet every 2 m') },
			{ value: L('122 min'), label: L('Per strook van 500 m²', 'Per 500 m² strip'), note: L('25 mm water', '25 mm of water') },
			{ value: L('≈ 4 ha'), label: L('Nat houden', 'Kept wet'), note: L('bij 3,5 mm verdamping per dag', 'at 3.5 mm evaporation a day') },
			{ value: L('€ 1.900', '€1,900'), label: L('Materiaal op de robot', 'Materials on the robot'), note: L('146 kg', '146 kg') }
		],
		steps: [
			{
				title: L('Uitleggen', 'Lay out'),
				body: L(
					'De slang zit vast aan de hydrant bij de pomp. De robot rijdt het veld in en de lege slang loopt achter hem af. De robot trekt niets.',
					'The hose is coupled to the hydrant at the pump. The robot drives into the field and the empty hose pays out behind it. The robot pulls nothing.'
				)
			},
			{
				title: L('Bevloeien', 'Irrigate'),
				body: L(
					'De pomp draait op 0,17 bar. Elke 2 m laat een uitlaat ± 120 l/u door, dat zich over 4 m verspreidt en inzakt. Knijprollen houden de haspel droog.',
					'The pump runs at 0.17 bar. Every 2 m an outlet lets out approx. 120 l/h, which spreads over 4 m and soaks in. Pinch rollers keep the reel dry.'
				)
			},
			{
				title: L('Leeglopen', 'Drain'),
				body: L(
					'De pomp stopt en de klep zet de slang op aftappen. Hij loopt op eigen gewicht leeg.',
					'The pump stops and the valve switches the hose to drain. It runs empty by gravity.'
				)
			},
			{
				title: L('Oprollen', 'Wind up'),
				body: L(
					'De robot rijdt achteruit terug en rolt de platte slang op; de knijprollen persen het laatste water eruit. Daarna schuift hij 4 m op naar de volgende strook.',
					'The robot reverses and winds up the flat hose; the pinch rollers squeeze out the last water. Then it shifts 4 m to the next strip.'
				)
			}
		],
		variants: [],
		calcs: [
			{
				title: L('Cyclus per strook', 'Cycle per strip'),
				rows: [
					{ label: L('Uitleggen + vullen', 'Lay out + fill'), value: L('10,4 min', '10.4 min') },
					{ label: L('Bevloeien, 25 mm', 'Irrigate, 25 mm'), value: L('100 min') },
					{ label: L('Leeglopen + oprollen + verschuiven', 'Drain + wind + shift'), value: L('11,5 min', '11.5 min') },
					{ label: L('Totaal', 'Total'), value: L('122 min') }
				],
				note: L('Infiltratie 15 mm/u, geschat.', 'Infiltration 15 mm/h, estimated.')
			},
			{
				title: L('Hydrauliek', 'Hydraulics'),
				rows: [
					{ label: L('Per uitlaat', 'Per outlet'), value: L('119-124 l/u', '119-124 l/h') },
					{ label: L('Totale opvoerhoogte', 'Total head'), value: L('3,6 m', '3.6 m') },
					{ label: L('Benzine', 'Petrol'), value: L('≈ 0,35 l/u', '≈ 0.35 l/h') },
					{ label: L('CU bij ±0,5% helling', 'CU at ±0.5% slope'), value: L('96 / 94%') }
				]
			},
			{
				title: L('Haspel', 'Reel'),
				rows: [
					{ label: L('48 V-wormmotor, ketting 3:1', '48 V worm gearmotor, chain 3:1'), value: L('86 Nm (63 nodig)', '86 Nm (63 needed)') },
					{ label: L('Oprolsnelheid', 'Winding speed'), value: L('0,58-0,60 m/s', '0.58-0.60 m/s') },
					{ label: L('Knijprollen', 'Pinch rollers'), value: L('300 N (19 N nodig)', '300 N (19 N needed)') }
				]
			}
		],
		onRobot: [
			L('Het zware deel, een volle slang van 650 l, blijft altijd in het veld. De robot draagt alleen de lege slang van 60 kg.', 'The heavy part, a full hose of 650 l, always stays in the field. The robot only carries the empty 60 kg hose.'),
			L('Robot en haspel samen 308 kg met het zwaartepunt op 788 mm; kantelt zijwaarts pas bij 25°.', 'Robot and reel together weigh 308 kg with the centre of gravity at 788 mm; it only tips sideways at 25°.'),
			L('≈ 950 Wh per dag: 2,5 dag op een accu van 2,4 kWh.', 'Approx. 950 Wh a day: 2.5 days on a 2.4 kWh battery.')
		],
		clips: [
			{ src: irrigationVideo, poster: irrigationPoster, caption: L('Eén strook: uitleggen, vullen, bevloeien, leeglopen en oprollen. In het echt ± 2 uur.', 'One strip: lay out, fill, irrigate, drain and wind up. In reality about 2 hours.') }
		],
		gallery: [
			{ src: irrigationLaidOut, caption: L('Haspel bijna leeg, de slang ligt achter de robot', 'Reel almost empty, the hose lies behind the robot') },
			{ src: irrigationHosePath, caption: L('Het slangpad: haspel, knijprollen, geleiderol, grond', 'The hose path: reel, pinch rollers, guide roller, ground') },
			{ src: irrigationPinch, caption: L('Knijprollen met twee veren van 150 N', 'Pinch rollers with two 150 N springs') },
			{ src: irrigationReel, caption: L('Wormmotor met ketting 12 → 36', 'Worm gearmotor with chain 12 → 36') }
		],
		repoPath: REPO + 'irrigation'
	},
	{
		slug: 'mobile-refiller',
		functionIds: [42],
		name: L('Mobiele bijvuller', 'Mobile refiller'),
		category: L('Spuiten, bemesten & irrigeren', 'Spraying, fertilizing & irrigation'),
		short: L(
			'Brengt vloeistof naar de werkende robot, zodat die het veld niet af hoeft.',
			'Brings liquid to the working robot, so it never has to leave the field.'
		),
		lead: L(
			'Een tweede Bruut als bevoorrader. Hij wacht op de kopakker en vult de tank van de werkende robot bij tijdens diens draai, zodat die niet heen en weer naar het erf hoeft. Uitgewerkt voor vloeistof; zaad, korrelmest, water en accu’s staan in het concept.',
			'A second Bruut as a supply robot. It waits on the headland and tops up the tank of the working robot during its turn, so that robot never drives back and forth to the yard. Worked out for liquid; seed, granular fertilizer, water and batteries are in the concept.'
		),
		hero: refillerDocked,
		figures: [
			{ value: L('± 25 l', 'approx. 25 l'), label: L('Per draai, al rijdend', 'Per turn, while driving'), note: L('± 3 s stilstand (vloeibaar)', 'approx. 3 s standstill (liquid)') },
			{ value: L('1.000 l', '1,000 l'), label: L('Standaard IBC', 'Standard IBC'), note: L('eenvoudige versie', 'simple version') },
			{ value: L('≈ 13 s'), label: L('Stilstand per bijvulling', 'Standstill per refill'), note: L('eenvoudig, 200 m-velden', 'simple, 200 m fields') },
			{ value: L('150 l/min'), label: L('Pomp', 'Pump'), note: L('24 V, 1,5"', '24 V, 1.5"') },
			{ value: L('1,98 ha', '1.98 ha'), label: L('Per IBC bij 505 l/ha', 'Per IBC at 505 l/ha'), note: L('9,2 uur werk', '9.2 hours of work') },
			{ value: L('€ 1.650', '€1,650'), label: L('Materiaal vanaf', 'Materials from'), note: L('vloeibaar ± € 6.000', 'liquid approx. €6,000') }
		],
		steps: [
			{
				title: L('Wachten', 'Wait'),
				body: L(
					'De bijvuller staat op de kopakker, bij de plek waar de werkende robot zijn volgende draai maakt.',
					'The refiller stands on the headland, where the working robot makes its next turn.'
				)
			},
			{
				title: L('Aanmeren', 'Dock'),
				body: L(
					'Een RTK-antenne staat recht boven de tuit. De werkende robot brengt zijn trechter eronder; bij de vloeibare versie bevestigt een camera de trechter eerst.',
					'An RTK antenna sits straight above the spout. The working robot brings its funnel under it; on the liquid version a camera confirms the funnel first.'
				)
			},
			{
				title: L('Vullen', 'Fill'),
				body: L(
					'De pomp loopt tot de niveausensor hem stopt. Bij de vloeibare versie rijden beide robots 3,8 m mee langs de kopakker en volgt de giek de trechter.',
					'The pump runs until the level sensor stops it. On the liquid version both robots drive 3.8 m along the headland and the boom follows the funnel.'
				)
			},
			{
				title: L('Doorschuiven', 'Move on'),
				body: L(
					'De werkende robot rijdt zijn volgende werkgang in. De bijvuller schuift op naar de volgende draai op deze kopakker.',
					'The working robot drives into its next pass. The refiller moves on to the next turn on this headland.'
				)
			}
		],
		variants: [
			{
				name: L('Vloeibaar', 'Liquid'),
				image: refillerLiquid,
				points: [
					L('T-tank 268 l plus aangedreven aanhanger 246 l', '268 l T-tank plus powered 246 l trailer'),
					L('Zwenkgiek tot 1,5 m met loopkat en tuit', 'Slewing boom up to 1.5 m with trolley and spout'),
					L('Camera en RTK op de tuit', 'Camera and RTK on the spout'),
					L('Vult bij terwijl beide robots rijden', 'Tops up while both robots drive')
				],
				price: L('± € 6.000 materiaal', 'approx. €6,000 in materials')
			},
			{
				name: L('Eenvoudig (IBC)', 'Simple (IBC)'),
				image: refillerIbc,
				points: [
					L('Standaard IBC van 1.000 l, met de palletvork erop', 'Standard 1,000 l IBC, set on with pallet forks'),
					L('Vaste mast met hangende slang', 'Fixed mast with a hanging hose'),
					L('Werkgangen overslaan: elke draai een U-bocht', 'Skip passes: every turn a U-turn'),
					L('Geen giek, aanhanger of camera', 'No boom, trailer or camera')
				],
				price: L('± € 1.650 materiaal', 'approx. €1,650 in materials')
			},
			{
				name: L('Stationair', 'Stationary'),
				image: refillerStation,
				points: [
					L('Vulstation op de kopakker, neergezet met een trekker', 'Refill station on the headland, set down by a tractor'),
					L('IBC-aanhanger, driepuntsframe of platte wagen met 6 IBC’s', 'IBC trailer, three-point frame or flat wagon with 6 IBCs'),
					L('Eigen kast met pomp, accu en RTK', 'Own box with pump, battery and RTK'),
					L('De werkende robot haalt 120 l per bezoek', 'The working robot collects 120 l per visit')
				]
			}
		],
		calcs: [
			{
				title: L('Vloeibaar: bijvullen in de draai', 'Liquid: refill in the turn'),
				rows: [
					{ label: L('Recht stuk', 'Straight part'), value: L('3,8 m in 10,3 s', '3.8 m in 10.3 s') },
					{ label: L('Extra stilstand, 505 l/ha', 'Extra standstill, 505 l/ha'), value: L('0 s') },
					{ label: L('Extra stilstand, 1.000 l/ha', 'Extra standstill, 1,000 l/ha'), value: L('6 s') },
					{ label: L('Aanmeerfout met camera', 'Docking error with camera'), value: L('≈ 15 mm (tolerantie 125)', '≈ 15 mm (tolerance 125)') }
				],
				note: L('Bij velden van 200 m.', 'For 200 m fields.')
			},
			{
				title: L('Eenvoudig: stilstand per bijvulling', 'Simple: standstill per refill'),
				rows: [
					{ label: L('Velden van 100 / 200 / 400 m, 505 l/ha', 'Fields of 100 / 200 / 400 m, 505 l/ha'), value: L('8 / 13 / 23 s') },
					{ label: L('Idem, 1.000 l/ha', 'Same, 1,000 l/ha'), value: L('12 / 22 / 42 s') },
					{ label: L('Kopakker nodig', 'Headland needed'), value: L('5,3 m', '5.3 m') }
				],
				note: L('Dat is 2 tot 4% van de tijd van een heen-en-terug.', 'That is 2 to 4% of the time of a round trip.')
			},
			{
				title: L('Zonder bijvuller', 'Without a refiller'),
				rows: [
					{ label: L('Tank leeg na', 'Tank empty after'), value: L('0,29 ha') },
					{ label: L('Veldrendement, erf op 0,2 / 0,5 km', 'Field efficiency, yard at 0.2 / 0.5 km'), value: L('89 / 80%') },
					{ label: L('Veldrendement, erf op 1 / 2 km', 'Field efficiency, yard at 1 / 2 km'), value: L('69 / 53%') }
				]
			}
		],
		onRobot: [
			L('Vol weegt de eenvoudige versie 1.494 kg. Het zwaarste wiel draagt 470 kg van de 500 kg uit het datablad; met UAN vul je tot 980 l.', 'Full, the simple version weighs 1,494 kg. The heaviest wheel carries 470 kg of the 500 kg in the datasheet; with UAN fill to 980 l.'),
			L('Vol op nat gras alleen korte stukken rijden. De vloeibare versie haalt 5% helling dankzij de zes aangedreven wielen.', 'Full on wet grass, only short moves. The liquid version manages a 5% grade thanks to its six driven wheels.'),
			L('De werkende robot krijgt een ontvangerkit: tank van 147 l, trechter Ø 300 met zeef en een niveausensor.', 'The working robot gets a receiver kit: 147 l tank, Ø 300 funnel with strainer and a level sensor.')
		],
		clips: [
			{ src: refillerLiquidVideo, poster: refillerLiquidPoster, caption: L('Vloeibaar: bijvullen in de draai terwijl beide robots rijden, 22 l in 8,9 s.', 'Liquid: refilling in the turn while both robots drive, 22 l in 8.9 s.') },
			{ src: refillerIbcVideo, poster: refillerIbcPoster, caption: L('Eenvoudig: de werkende robot stopt in zijn U-bocht onder de tuit, 22 l in 12,7 s stilstand.', 'Simple: the working robot stops in its U-turn under the nozzle, 22 l in 12.7 s standstill.') }
		],
		chart: {
			src: refillerPattern,
			chart: true,
			caption: L(
				'Werkgangen overslaan (1, 7, 2, 8, …): elke draai wordt een U-bocht, met de bijvuller binnen de bocht.',
				'Skipping passes (1, 7, 2, 8, …): every turn becomes a U-turn, with the refiller inside it.'
			)
		},
		gallery: [
			{ src: refillerSpout, caption: L('Tuit in de trechter, met camera en antenne', 'Spout in the funnel, with camera and antenna') },
			{ src: refillerBoom, caption: L('Giek helemaal uit, 1,5 m', 'Boom fully out, 1.5 m') },
			{ src: refillerIbcRefill, caption: L('Eenvoudig: de werkende robot staat stil in zijn U-bocht', 'Simple: the working robot stopped in its U-turn') },
			{ src: refillerIbcPump, caption: L('Pomp onder de IBC: altijd onder het vloeistofniveau', 'Pump under the IBC: always below the liquid level') }
		],
		repoPath: REPO + 'mobile%20refiller'
	},
	{
		slug: 'disc-brushes',
		functionIds: [25],
		name: L('Schijfborstels', 'Disc brushes'),
		category: L('Stal & erf', 'Barn & yard'),
		short: L(
			'Veegt los materiaal op beton op een zwad, of spreidt het juist breed uit.',
			'Sweeps loose material on concrete into a windrow, or spreads it out wide.'
		),
		lead: L(
			'Veegborstels voor los materiaal op beton, zoals zaagsel, zand en voerresten. Elke borstel heeft een eigen 48 V-motor. Draai de motoren om en hetzelfde paar legt een zwad in het midden of spreidt het materiaal breed uit.',
			'Sweeper brushes for loose material on concrete, such as sawdust, sand and feed remains. Each brush has its own 48 V motor. Reverse the motors and the same pair lays a windrow in the middle or spreads the material out wide.'
		),
		hero: brushesWork,
		figures: [
			{ value: L('1,50-1,70 m', '1.50-1.70 m'), label: L('Werkbreedte', 'Working width'), note: L('2 × Ø 750, standaard', '2 × Ø 750, standard') },
			{ value: L('100 omw/min', '100 rpm'), label: L('Borstel', 'Brush'), note: L('70 voor een zwad', '70 for a windrow') },
			{ value: L('460 W'), label: L('Per borstel', 'Per brush'), note: L('9,5 A bij 48 V', '9.5 A at 48 V') },
			{ value: L('0 N'), label: L('Zijkracht op de robot', 'Side force on the robot'), note: L('de borstels draaien tegen elkaar in', 'the brushes turn against each other') },
			{ value: L('1,6 u', '1.6 h'), label: L('Accuduur', 'Battery life'), note: L('met rijden, 2 × Ø 750', 'with driving, 2 × Ø 750') },
			{ value: L('110 kg'), label: L('Gewicht', 'Mass'), note: L('2 × Ø 750, zonder contragewicht', '2 × Ø 750, without counterweight') }
		],
		steps: [
			{
				title: L('Monteren', 'Mount'),
				body: L(
					'Een balk van 80 × 80 hangt achter de vaste achterwielen, aan twee hangers met 4 × M10 onder de onderste balken. Er hoeft niets geboord te worden.',
					'An 80 × 80 toolbar hangs behind the fixed rear wheels, on two hangers with 4 × M10 under the lower beams. Nothing has to be drilled.'
				)
			},
			{
				title: L('Zwad leggen', 'Make a windrow'),
				body: L(
					'De voorkanten van de borstels draaien naar binnen. Het materiaal komt in het midden en gaat tussen de wielen onder de robot door.',
					'The fronts of the brushes turn inwards. The material ends up in the middle and passes between the wheels under the robot.'
				)
			},
			{
				title: L('Breed spreiden', 'Spread wide'),
				body: L(
					'De voorkanten draaien naar buiten. Een zwad of hoop wordt naar beide kanten uitgespreid, tot ± 1,2 m.',
					'The fronts turn outwards. A windrow or heap is spread out to both sides, up to approx. 1.2 m.'
				)
			},
			{
				title: L('Afstellen', 'Adjust'),
				body: L(
					'Draai 4 moeren los en de unit schuift langs de balk (afstand) of op en neer (slijtage, transport). Eén sleutel van 24 mm is genoeg.',
					'Loosen 4 nuts and the unit slides along the toolbar (spacing) or up and down (wear, transport). One 24 mm spanner is enough.'
				)
			}
		],
		variants: [
			{
				name: L('Dubbel Ø 750', 'Double Ø 750'),
				image: brushesWork,
				points: [
					L('Standaard: 1,50 tot 1,70 m', 'Standard: 1.50 to 1.70 m'),
					L('Zwad of breed spreiden', 'Windrow or spread wide'),
					L('Motor op 67%, 110 kg', 'Motor at 67%, 110 kg')
				]
			},
			{
				name: L('Dubbel Ø 650', 'Double Ø 650'),
				image: brushes650,
				points: [
					L('1,30 tot 1,50 m', '1.30 to 1.50 m'),
					L('Smaller en lichter: 104 kg', 'Narrower and lighter: 104 kg'),
					L('340 W per borstel, 2,1 uur accuduur', '340 W per brush, 2.1 hours battery life')
				]
			},
			{
				name: L('Enkel Ø 850', 'Single Ø 850'),
				image: brushes850,
				points: [
					L('0,85 m: de breedte van de robot', '0.85 m: the width of the robot'),
					L('Veegt de strook naar één kant', 'Sweeps the strip to one side'),
					L('75 N zijkracht: de robot stuurt 1,7° tegen', '75 N side force: the robot steers 1.7° against it')
				]
			}
		],
		calcs: [
			{
				title: L('Per borstel: Ø 650 / 750 / 850', 'Per brush: Ø 650 / 750 / 850'),
				rows: [
					{ label: L('Koppel, geschat', 'Torque, estimated'), value: L('19 / 25 / 31 Nm') },
					{ label: L('Elektrisch vermogen', 'Electric power'), value: L('340 / 460 / 510 W') },
					{ label: L('Belasting wormmotor 550 W', 'Load on 550 W gearmotor'), value: L('49 / 67 / 75%') },
					{ label: L('Accuduur met rijden', 'Battery life with driving'), value: L('2,1 / 1,6 / 2,5 u', '2.1 / 1.6 / 2.5 h') }
				]
			},
			{
				title: L('Last op de stuurwielen, 2 × Ø 750', 'Load on the steering wheels, 2 × Ø 750'),
				rows: [
					{ label: L('Werkend / borstels geheven', 'Working / brushes lifted'), value: L('35 / 17%') },
					{ label: L('Met 2 × 20 kg contragewicht', 'With 2 × 20 kg counterweight'), value: L('45 / 29%') },
					{ label: L('Minimaal nodig', 'Minimum needed'), value: L('20%') }
				]
			}
		],
		onRobot: [
			L('De robot rijdt met de borstels voorop; de stuurwielen zitten dan achter.', 'The robot drives with the brushes first; the steering wheels are then at the back.'),
			L('Gebruik bij de dubbele versies het contragewicht (dezelfde blokken als bij de voeraanschuifvijzel) als je met geheven borstels rijdt.', 'With the double versions, use the counterweight (the same blocks as the feed pusher) when driving with the brushes lifted.'),
			L('Borstelkracht, wrijving en het materiaalmodel zijn geschat, niet gemeten.', 'Brush force, friction and the material model are estimated, not measured.')
		],
		clips: [
			{ src: brushesWindrowVideo, poster: brushesWindrowPoster, caption: L('Zwad leggen: een laag van 2 kg/m² wordt een zwad van ± 0,4 m in het midden.', 'Windrow: a 2 kg/m² layer becomes a windrow of approx. 0.4 m in the middle.') },
			{ src: brushesSpreadVideo, poster: brushesSpreadPoster, caption: L('Breed spreiden: een zwad van 8 kg/m gaat naar beide kanten.', 'Spread wide: an 8 kg/m windrow goes out to both sides.') },
			{ src: brushesSingleVideo, poster: brushesSinglePoster, caption: L('Enkele borstel: de strook voor de robot gaat naar rechts.', 'Single brush: the strip in front of the robot goes to the right.') }
		],
		gallery: [
			{ src: brushesUnit, caption: L('Borstelunit: kopplaat, schotten en wormmotor', 'Brush unit: head plate, gussets and worm gearmotor') },
			{ src: brushesClamp, caption: L('Klemplaat met sleufgaten, U-beugels en stelbout', 'Clamp plate with slots, U-bolts and jack bolt') },
			{ src: brushesWindrowTop, caption: L('Van boven, ingesteld voor een zwad (200 mm uit elkaar)', 'From above, set for a windrow (200 mm apart)') },
			{ src: brushesSide, caption: L('Zijaanzicht: borstel 4° naar voren gekanteld', 'Side view: brush tilted 4° forwards') }
		],
		repoPath: REPO + 'brushes'
	},
	{
		slug: 'field-marker',
		functionIds: [],
		name: L('Veldmarkeerder', 'Field marker'),
		category: L('Meten & sensoren', 'Measuring & sensors'),
		short: L(
			'Zet punten uit een coördinatenlijst uit en markeert ze met verf.',
			'Stakes out points from a coordinate list and marks them with paint.'
		),
		lead: L(
			'Zet punten uit een coördinatenlijst uit in het veld: palen, plantposities of de hoeken van proefvelden. De robot stopt ongeveer achter het punt; een XYZ-tafel zet de spuitkop er precies op en markeert het met verf.',
			'Stakes out points from a coordinate list in the field: posts, planting positions or the corners of trial plots. The robot stops roughly behind the point; an XYZ stage puts the spray head exactly on it and marks it with paint.'
		),
		hero: markerWork,
		figures: [
			{ value: L('800 × 200 mm'), label: L('Vangvenster', 'Capture window'), note: L('de robot mag ± 100 mm ernaast stoppen', 'the robot may stop ±100 mm off') },
			{ value: L('≈ 21 mm'), label: L('Nauwkeurigheid', 'Accuracy'), note: L('95% van de punten, met RTK', '95% of the points, with RTK') },
			{ value: L('≈ 215'), label: L('Punten per uur', 'Points per hour'), note: L('op 3 m afstand', 'at 3 m spacing') },
			{ value: L('Ø 57 mm'), label: L('Verfstip', 'Paint dot'), note: L('± 450 per spuitbus', 'approx. 450 per can') },
			{ value: L('35 kg'), label: L('Gewicht', 'Mass'), note: L('± 9 uur op een volle accu', 'approx. 9 hours on a full battery') },
			{ value: L('€ 1.450', '€1,450'), label: L('Materiaal', 'Materials'), note: L('alles gekocht of gelaserd', 'all bought or laser cut') }
		],
		steps: [
			{
				title: L('Stoppen', 'Stop'),
				body: L(
					'De robot stopt zo dat het volgende punt in het vangvenster valt. Hij staat 1,5 s stil en middelt dan 2,5 s: RTK, de antenne boven de spuitkop en de helling.',
					'The robot stops so that the next point falls inside the capture window. It stands still 1.5 s and then averages for 2.5 s: RTK, the antenna above the nozzle and the tilt.'
				)
			},
			{
				title: L('Positioneren', 'Position'),
				body: L(
					'De X- en Y-module bewegen samen en zetten de spuitkop in 0,7 s boven het punt.',
					'The X and Y modules move together and put the nozzle above the point in 0.7 s.'
				)
			},
			{
				title: L('Grond zoeken', 'Find the ground'),
				body: L(
					'Z zakt snel tot 40 mm boven de verwachte grond en dan langzaam, tot een sensor ziet dat de spuitkap optilt. X en Y worden gecorrigeerd voor de helling.',
					'Z drops quickly to 40 mm above the expected ground and then slowly, until a sensor sees the spray shroud lift. X and Y are corrected for the tilt.'
				)
			},
			{
				title: L('Markeren', 'Mark'),
				body: L(
					'Een servo drukt de spuitbus 0,6 s in. Z gaat omhoog, er wordt een foto gemaakt en een logregel met de afwijking weggeschreven.',
					'A servo presses the spray can for 0.6 s. Z goes up, a photo is taken and a log line with the deviation is written.'
				)
			}
		],
		variants: [],
		calcs: [
			{
				title: L('Cyclus op 3 m afstand', 'Cycle at 3 m spacing'),
				rows: [
					{ label: L('Rijden', 'Drive'), value: L('7,0 s', '7.0 s') },
					{ label: L('Stilstaan en meten', 'Settle and measure'), value: L('4,0 s', '4.0 s') },
					{ label: L('Tafel, Z omlaag, spuiten, Z omhoog, foto', 'Stage, Z down, spray, Z up, photo'), value: L('5,8 s', '5.8 s') },
					{ label: L('Totaal', 'Total'), value: L('16,8 s ≈ 215 punten/u', '16.8 s ≈ 215 points/h') }
				]
			},
			{
				title: L('Nauwkeurigheid', 'Accuracy'),
				rows: [
					{ label: L('Met RTK-GNSS', 'With RTK GNSS'), value: L('≈ 21 mm') },
					{ label: L('Met een robotic total station', 'With a robotic total station'), value: L('≈ 8 mm') },
					{ label: L('3° helling zonder correctie', '3° tilt without correction'), value: L('52 mm fout', '52 mm off') }
				],
				note: L('Daarom is de hellingsmeter niet optioneel.', 'That is why the inclinometer is not optional.')
			},
			{
				title: L('Aandrijving', 'Drives'),
				rows: [
					{ label: L('X, riemmodule 800 mm', 'X, 800 mm belt module'), value: L('55 N, 0,88 Nm', '55 N, 0.88 Nm') },
					{ label: L('Y / Z, kogelomloopspindel', 'Y / Z, ball screw'), value: L('29 / 54 N') },
					{ label: L('Drukkracht Z, begrensd', 'Z press force, limited'), value: L('300 N') },
					{ label: L('Vermogen', 'Power'), value: L('≈ 63 W') }
				]
			}
		],
		onRobot: [
			L('Twee gelaserde hangers achter de achterwielen. Niets boren of frezen aan de robot.', 'Two laser-cut hangers behind the rear wheels. Nothing to drill or machine on the robot.'),
			L('Een tweede GNSS-antenne op een mast recht boven de spuitkop meet waar de kop echt staat, zoals een landmeter met zijn prismastok.', 'A second GNSS antenna on a mast straight above the nozzle measures where the head really is, like a surveyor with a rover pole.'),
			L('Het concept noemt ook koppen met een vlag, een pen, een pons of een bodemprobe.', 'The concept also lists heads with a flag, a peg, a punch or a soil probe.')
		],
		clips: [
			{ src: markerVideo, poster: markerPoster, caption: L('Drie punten uitgezet. De robot stopt telkens te vroeg of te laat en de tafel zet de spuitkop er precies op.', 'Three points staked out. The robot stops too early or too late each time and the stage puts the nozzle exactly on the point.') }
		],
		gallery: [
			{ src: markerStage, caption: L('XYZ-tafel zonder robot: X-module, Y- en Z-module en de mast', 'XYZ stage without the robot: X module, Y and Z modules and the mast') },
			{ src: markerHead, caption: L('Spuitkop: PVC-geleider, servo en geveerde spuitkap', 'Paint head: PVC guide, servo and sprung shroud') },
			{ src: markerHeadSection, caption: L('Buizen verborgen: spuitbus, drukstang en hendel', 'Pipes hidden: spray can, pusher and lever') },
			{ src: markerTop, caption: L('Van boven: de X-module achter de achterwielen', 'From above: the X module behind the rear wheels') }
		],
		repoPath: REPO + 'marker'
	}
];

export const implementBySlug = new Map(implementList.map((i) => [i.slug, i]));
/** Per functienummer de uitgewerkte aanbouwdelen (een functie kan er meer hebben). */
export const implementsByFunction = implementList.reduce((map, i) => {
	for (const nr of i.functionIds) map.set(nr, [...(map.get(nr) ?? []), i]);
	return map;
}, new Map<number, Implement[]>());
