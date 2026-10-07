// Tekst in gestructureerde data (versies, aanbouwdelen) staat per taal in één
// object. De losse UI-teksten blijven in messages/{nl,en}/*.json.

import { getLocale } from '$lib/paraglide/runtime';

export type Localized = { nl: string; en: string };

export const t = (value: Localized): string => (getLocale() === 'nl' ? value.nl : value.en);

const formatters = new Map<string, Intl.NumberFormat>();

/** Getal in de notatie van de huidige taal: 1.316 en 0,36 in het Nederlands. */
export function num(value: number, digits = 0): string {
	const locale = getLocale() === 'nl' ? 'nl-NL' : 'en-GB';
	const key = `${locale}-${digits}`;
	if (!formatters.has(key)) {
		formatters.set(
			key,
			new Intl.NumberFormat(locale, { minimumFractionDigits: digits, maximumFractionDigits: digits })
		);
	}
	return formatters.get(key)!.format(value);
}
