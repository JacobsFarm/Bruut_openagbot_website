// De vier uitvoeringen van de Bruut OpenAgbot.
//
// Bronnen (repo Bruut_OpenAgbot_Implements, map agbots/):
// - maten, gewicht en trekkracht: agbot comparison/weight_traction.json
// - prijzen: Veldrobot_kostenoverzicht.xlsx, blad "Prijsvergelijking" (september 2026),
//   onderdelen voor zelfbouw incl. 21% btw, zonder camera.
// Trekkracht is netto en continu (nominaal koppel), droog gras μ 0,6 en nat gras μ 0,35.

import type { Localized } from '$lib/i18n';

export type VersionId = 'agbot-2wd' | 'agbot-4wd' | 'xl-2wd' | 'xl-4wd';

export type Version = {
	id: VersionId;
	name: string;
	xl: boolean;
	drivenWheels: 2 | 4;
	motor: string;
	powerKw: number;
	massKg: number;
	pullDryKgf: number;
	pullWetKgf: number;
	vmaxKmh: number;
	priceInclVat: number;
	/** Wielmaten in mm, voor de bovenaanzicht-tekening op schaal. */
	track: number;
	wheelbase: number;
	tireDia: number;
	tireWidth: number;
	fit: Localized;
};

export const versions: Version[] = [
	{
		id: 'agbot-2wd',
		name: 'Agbot 2WD',
		xl: false,
		drivenWheels: 2,
		motor: 'Quinder 8" 48 V 550 W',
		powerKw: 1.1,
		massKg: 151,
		pullDryKgf: 27,
		pullWetKgf: 11,
		vmaxKmh: 6,
		priceInclVat: 6021,
		track: 750,
		wheelbase: 1000,
		tireDia: 430,
		tireWidth: 100,
		fit: {
			nl: 'Draagplatform voor sensoren, spuiten en scouten. Trekt een aanhanger over gemaaid gras.',
			en: 'Carrier for sensors, spraying and scouting. Pulls a trailer over mown grass.'
		}
	},
	{
		id: 'agbot-4wd',
		name: 'Agbot 4WD',
		xl: false,
		drivenWheels: 4,
		motor: 'Quinder 8" 48 V 550 W',
		powerKw: 2.2,
		massKg: 162,
		pullDryKgf: 82,
		pullWetKgf: 44,
		vmaxKmh: 6,
		priceInclVat: 8282,
		track: 750,
		wheelbase: 1000,
		tireDia: 430,
		tireWidth: 100,
		fit: {
			nl: 'Licht trekwerk: een smalle wiedeg, een paar schoffels of een gazonrol.',
			en: 'Light draft work: a narrow tine weeder, a few hoes or a lawn roller.'
		}
	},
	{
		id: 'xl-2wd',
		name: 'Agbot XL 2WD',
		xl: true,
		drivenWheels: 2,
		motor: 'Quinder 16" 60 V 2100 W',
		powerKw: 4.2,
		massKg: 392,
		pullDryKgf: 88,
		pullWetKgf: 38,
		vmaxKmh: 11.4,
		priceInclVat: 14448,
		track: 1200,
		wheelbase: 1400,
		tireDia: 686,
		tireWidth: 198,
		fit: {
			nl: 'Trekt ongeveer evenveel als de kleine 4WD, maar draagt veel meer.',
			en: 'Pulls about as much as the small 4WD, but carries far more.'
		}
	},
	{
		id: 'xl-4wd',
		name: 'Agbot XL 4WD',
		xl: true,
		drivenWheels: 4,
		motor: 'Quinder 16" 60 V 2100 W',
		powerKw: 8.4,
		massKg: 430,
		pullDryKgf: 224,
		pullWetKgf: 116,
		vmaxKmh: 11.4,
		priceInclVat: 23291,
		track: 1200,
		wheelbase: 1400,
		tireDia: 686,
		tireWidth: 198,
		fit: {
			nl: 'Het werkpaard: wiedeg tot 2 m, doorzaaier of een aanhanger van 600 kg.',
			en: 'The workhorse: tine weeder up to 2 m, an overseeder or a 600 kg trailer.'
		}
	}
];

/** Afgerond op honderden: het blijft een schatting. */
export const roundedPrice = (v: Version) => Math.round(v.priceInclVat / 100) * 100;

/** Euro per kgf netto trekkracht (droog), lager is meer kracht voor je geld. */
export const pricePerKgf = (v: Version) => v.priceInclVat / v.pullDryKgf;

export const bestValue = versions.reduce((a, b) => (pricePerKgf(a) <= pricePerKgf(b) ? a : b));
