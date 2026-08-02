// Toegang tot de YouTube-data die scripts/fetch-youtube.mjs vóór elke build ophaalt.
// De JSON wordt meegebundeld, dus de video's staan meteen in de HTML: geen
// laadspinner, geen API-key en het werkt op een statische host als GitHub Pages.

import data from '$lib/data/youtube.json';

export type Video = {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  thumbnailFallback: string;
  published: string;
  views: number | null;
};

export const videos: Video[] = data.videos as Video[];

export const channel = {
  id: data.channelId,
  title: data.channelTitle,
  url: data.channelUrl,
  /** Opent YouTube met het abonneer-dialoog al open. */
  subscribeUrl: `${data.channelUrl}?sub_confirmation=1`
};

/** Wanneer de video-lijst voor het laatst is ververst (= de laatste build). */
export const fetchedAt: string = data.fetchedAt;

/**
 * Niet elke video heeft een maxresdefault. YouTube antwoordt dan met een grijze
 * 120x90 placeholder én status 404 — die decodeert gewoon, dus het `error`-event
 * vuurt niet. We herkennen hem daarom aan zijn formaat en schakelen alsnog over
 * op de thumbnail uit de RSS-feed.
 */
export function isPlaceholderThumbnail(target: EventTarget | null): boolean {
  const img = target as HTMLImageElement | null;
  return !!img && img.naturalWidth > 0 && img.naturalWidth <= 120;
}

function intlLocale(locale: string) {
  return locale === 'nl' ? 'nl-NL' : 'en-GB';
}

export function formatDate(iso: string, locale: string): string {
  if (!iso) return '';
  return new Intl.DateTimeFormat(intlLocale(locale), {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(iso));
}

export function formatViews(views: number | null, locale: string): string | null {
  if (views === null || views === undefined) return null;
  return new Intl.NumberFormat(intlLocale(locale), {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(views);
}

/**
 * youtube-nocookie.com zet pas tracking-cookies zodra er echt wordt afgespeeld.
 * In combinatie met de klik-om-te-spelen kaarten laadt de pagina dus geen
 * enkele YouTube-player tot de bezoeker daar zelf om vraagt.
 */
export function embedUrl(id: string, autoplay = true): string {
  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    rel: '0',
    modestbranding: '1'
  });
  return `https://www.youtube-nocookie.com/embed/${id}?${params}`;
}
