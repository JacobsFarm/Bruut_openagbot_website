// scripts/fetch-youtube.mjs
// Haalt ALLE video's van het YouTube kanaal op en schrijft ze naar
// src/lib/data/youtube.json. Draait vóór elke build, zodat de statische site
// altijd met de nieuwste video's wordt gepubliceerd.
//
// Run met: node scripts/fetch-youtube.mjs
//
// Geen API-key nodig. Drie bronnen, in deze volgorde:
//
//   1. De /videos-pagina van het kanaal + de "laad meer"-continuations.
//      Levert de volledige lijst met video-ID's en titels (de RSS-feed stopt
//      bij 15, en daar zit het hele begin van het project dus niet in).
//   2. De RSS-feed. Geeft voor de 15 nieuwste video's meteen de exacte datum,
//      de beschrijving en de weergaven — in één request.
//   3. De watch-pagina per video, alleen voor video's waarvan we die gegevens
//      nog niet hebben. De vorige youtube.json dient als cache, dus dit is
//      eenmalig werk: bij een volgende build worden alleen nieuwe video's
//      opgehaald.
//
// Overschrijven kan via environment variables:
//   YOUTUBE_CHANNEL_ID=UC...        (slaat het opzoeken van de handle over)
//   YOUTUBE_HANDLE=@opensource_agbot

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';

const HANDLE = process.env.YOUTUBE_HANDLE || '@opensource_agbot';
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || 'UCYW2RxlhWwQdn4d33I-OmGg';
const OUT_PATH = resolve('src/lib/data/youtube.json');

/** Hoeveel watch-pagina's tegelijk; vriendelijk blijven voor YouTube. */
const DETAIL_CONCURRENCY = 4;
/** Veiligheidsrem op het doorbladeren van de kanaalpagina. */
const MAX_CONTINUATIONS = 20;

// YouTube toont bezoekers uit de EU een cookie-consent pagina. De RSS-feed zelf
// heeft daar geen last van, maar de kanaal- en watch-pagina's wél. `ucbcb=1`
// plus deze cookies slaan die pagina over zodat het script ook lokaal in de EU
// werkt.
const BROWSER_HEADERS = {
  'user-agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
  'accept-language': 'en-US,en;q=0.9',
  cookie: 'SOCS=CAI; CONSENT=YES+cb'
};

const XML_ENTITIES = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&apos;': "'",
  '&#39;': "'"
};

function decodeXml(value = '') {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&(?:amp|lt|gt|quot|apos|#39);/g, (entity) => XML_ENTITIES[entity] ?? entity)
    .trim();
}

function tagContent(xml, tag) {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  return match ? decodeXml(match[1]) : '';
}

function attr(xml, tag, name) {
  const match = xml.match(new RegExp(`<${tag}\\b[^>]*\\b${name}="([^"]*)"`));
  return match ? decodeXml(match[1]) : '';
}

async function getText(url, label) {
  const response = await fetch(url, { headers: BROWSER_HEADERS });
  if (!response.ok) {
    throw new Error(`${label} gaf HTTP ${response.status} (${url})`);
  }
  return response.text();
}

function thumbnailsFor(id, fallback) {
  return {
    // maxresdefault is scherp en 16:9, maar bestaat niet voor elke video.
    // De component valt terug op de tweede URL als hij 404't.
    thumbnail: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
    thumbnailFallback: fallback || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
  };
}

/* ------------------------------------------------------------------ *
 * 1. Volledige video-lijst van de kanaalpagina
 * ------------------------------------------------------------------ */

/**
 * YouTube stopt de pagina-inhoud in één grote `ytInitialData`. Video's zitten
 * daar als `lockupViewModel` in — we lopen de boom af in plaats van een vaste
 * route te volgen, want die route verandert bij elke redesign.
 */
function collectLockups(node, out = []) {
  if (!node || typeof node !== 'object') return out;
  if (Array.isArray(node)) {
    for (const child of node) collectLockups(child, out);
    return out;
  }

  if (node.lockupViewModel?.contentId) {
    const lockup = node.lockupViewModel;
    const title = lockup.metadata?.lockupMetadataViewModel?.title?.content ?? '';
    if (/^[\w-]{11}$/.test(lockup.contentId)) {
      out.push({ id: lockup.contentId, title });
    }
  }

  for (const key of Object.keys(node)) collectLockups(node[key], out);
  return out;
}

/** Het token waarmee YouTube de volgende pagina video's teruggeeft. */
function findContinuationToken(node) {
  if (!node || typeof node !== 'object') return null;
  if (Array.isArray(node)) {
    for (const child of node) {
      const found = findContinuationToken(child);
      if (found) return found;
    }
    return null;
  }

  const token = node.continuationItemRenderer?.continuationEndpoint?.continuationCommand?.token;
  if (token) return token;

  for (const key of Object.keys(node)) {
    const found = findContinuationToken(node[key]);
    if (found) return found;
  }
  return null;
}

function parseInitialData(html) {
  const start = html.indexOf('var ytInitialData = ');
  if (start === -1) throw new Error('ytInitialData niet gevonden op de kanaalpagina');
  const from = start + 'var ytInitialData = '.length;
  const end = html.indexOf(';</script>', from);
  if (end === -1) throw new Error('einde van ytInitialData niet gevonden');
  return JSON.parse(html.slice(from, end));
}

async function fetchAllUploads(handle) {
  const html = await getText(`https://www.youtube.com/${handle}/videos?ucbcb=1`, 'Kanaalpagina');

  const apiKey = html.match(/"INNERTUBE_API_KEY":"([^"]+)"/)?.[1];
  const clientVersion = html.match(/"clientVersion":"([\d.]+)"/)?.[1];
  const initial = parseInitialData(html);

  const found = new Map();
  for (const video of collectLockups(initial)) {
    if (!found.has(video.id)) found.set(video.id, video);
  }

  let token = findContinuationToken(initial);
  let page = 0;

  while (token && apiKey && clientVersion && page < MAX_CONTINUATIONS) {
    page += 1;

    const response = await fetch(
      `https://www.youtube.com/youtubei/v1/browse?key=${apiKey}&prettyPrint=false`,
      {
        method: 'POST',
        headers: { ...BROWSER_HEADERS, 'content-type': 'application/json' },
        body: JSON.stringify({
          context: { client: { clientName: 'WEB', clientVersion } },
          continuation: token
        })
      }
    );

    if (!response.ok) {
      console.warn(`⚠️  Vervolgpagina ${page} gaf HTTP ${response.status}; stoppen met bladeren.`);
      break;
    }

    const json = await response.json();
    const before = found.size;
    for (const video of collectLockups(json)) {
      if (!found.has(video.id)) found.set(video.id, video);
    }

    if (found.size === before) break; // niets nieuws meer
    token = findContinuationToken(json);
  }

  return [...found.values()];
}

/* ------------------------------------------------------------------ *
 * 2. RSS-feed: exacte gegevens voor de 15 nieuwste video's
 * ------------------------------------------------------------------ */

function parseFeed(xml) {
  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [];

  return entries.map((entry) => {
    const id = tagContent(entry, 'yt:videoId');
    const views = Number(attr(entry, 'media:statistics', 'views'));

    return {
      id,
      title: tagContent(entry, 'title') || tagContent(entry, 'media:title'),
      description: tagContent(entry, 'media:description'),
      url: `https://www.youtube.com/watch?v=${id}`,
      ...thumbnailsFor(id, attr(entry, 'media:thumbnail', 'url')),
      published: tagContent(entry, 'published'),
      views: Number.isFinite(views) ? views : null
    };
  });
}

/* ------------------------------------------------------------------ *
 * 3. Watch-pagina: datum, beschrijving en weergaven per video
 * ------------------------------------------------------------------ */

function unescapeJsonString(value) {
  try {
    return JSON.parse(`"${value}"`);
  } catch {
    return value;
  }
}

async function fetchVideoDetails(id) {
  const html = await getText(`https://www.youtube.com/watch?v=${id}&ucbcb=1`, `Video ${id}`);

  const published = html.match(/"uploadDate":"([^"]+)"/)?.[1] ?? '';
  const views = Number(html.match(/"viewCount":"(\d+)"/)?.[1]);
  const rawDescription = html.match(/"shortDescription":"((?:[^"\\]|\\.)*)"/)?.[1];
  const title =
    html.match(/<meta name="title" content="([^"]*)"/)?.[1] ??
    html.match(/"title":"((?:[^"\\]|\\.)*)","lengthSeconds"/)?.[1];

  return {
    published: published ? new Date(published).toISOString() : '',
    description: rawDescription ? unescapeJsonString(rawDescription) : '',
    views: Number.isFinite(views) ? views : null,
    title: title ? unescapeJsonString(title) : ''
  };
}

/** Haalt details op in kleine groepjes in plaats van 50 requests tegelijk. */
async function fetchDetailsFor(ids, onResult) {
  for (let i = 0; i < ids.length; i += DETAIL_CONCURRENCY) {
    const batch = ids.slice(i, i + DETAIL_CONCURRENCY);
    const results = await Promise.allSettled(batch.map((id) => fetchVideoDetails(id)));

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        onResult(batch[index], result.value);
      } else {
        console.warn(`⚠️  Details van ${batch[index]} niet gelukt: ${result.reason.message}`);
      }
    });

    console.log(`   ${Math.min(i + DETAIL_CONCURRENCY, ids.length)}/${ids.length} opgehaald…`);
  }
}

/* ------------------------------------------------------------------ *
 * Samenvoegen en wegschrijven
 * ------------------------------------------------------------------ */

function readExisting() {
  if (!existsSync(OUT_PATH)) return null;
  try {
    return JSON.parse(readFileSync(OUT_PATH, 'utf-8'));
  } catch {
    return null;
  }
}

function writeOutput(data) {
  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, `${JSON.stringify(data, null, 2)}\n`, 'utf-8');
}

/**
 * Een mislukte fetch (offline, YouTube plat, rate limit) mag de build nooit
 * breken: we houden dan gewoon de laatst opgehaalde video's aan.
 */
function keepExisting(reason) {
  console.warn(`⚠️  YouTube ophalen mislukt: ${reason}`);

  const previous = readExisting();
  if (previous) {
    console.warn(`↩️  Bestaande youtube.json behouden (${previous.videos?.length ?? 0} video's).`);
    return;
  }

  console.warn('↩️  Nog geen youtube.json — lege placeholder geschreven.');
  writeOutput({
    channelId: CHANNEL_ID,
    channelTitle: 'Agbot bruut',
    channelUrl: `https://www.youtube.com/${HANDLE}`,
    fetchedAt: new Date().toISOString(),
    videos: []
  });
}

async function main() {
  const handle = HANDLE.startsWith('@') ? HANDLE : `@${HANDLE}`;
  const previous = readExisting();
  const cached = new Map((previous?.videos ?? []).map((video) => [video.id, video]));

  // Stap 1: de volledige lijst. Lukt dat niet, dan varen we op wat we al hebben.
  let uploads = [];
  try {
    uploads = await fetchAllUploads(handle);
    console.log(`📺 ${uploads.length} video's gevonden op de kanaalpagina.`);
  } catch (error) {
    console.warn(`⚠️  Kanaalpagina lezen mislukt: ${error.message}`);
  }

  // Stap 2: de RSS-feed vult de nieuwste video's meteen compleet aan en is
  // tegelijk het vangnet als de kanaalpagina niet te lezen was.
  const feed = parseFeed(
    await getText(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`,
      'RSS-feed'
    )
  );
  const fromFeed = new Map(feed.map((video) => [video.id, video]));

  const ids = new Set([
    ...uploads.map((video) => video.id),
    ...feed.map((video) => video.id),
    ...cached.keys()
  ]);

  if (ids.size === 0) throw new Error('Geen enkele video gevonden');

  // Bouw per video het beste dat we hebben: feed > cache > alleen een titel.
  const videos = [...ids].map((id) => {
    const feedVideo = fromFeed.get(id);
    if (feedVideo) return feedVideo;

    const known = cached.get(id);
    const listed = uploads.find((video) => video.id === id);

    return {
      id,
      title: known?.title || listed?.title || '',
      description: known?.description ?? '',
      url: `https://www.youtube.com/watch?v=${id}`,
      ...thumbnailsFor(id, known?.thumbnailFallback),
      published: known?.published ?? '',
      views: known?.views ?? null
    };
  });

  // Stap 3: alles zonder exacte datum krijgt alsnog zijn watch-pagina.
  const missing = videos.filter((video) => !video.published).map((video) => video.id);
  if (missing.length) {
    console.log(`🔎 Details ophalen voor ${missing.length} video's…`);
    const byId = new Map(videos.map((video) => [video.id, video]));

    await fetchDetailsFor(missing, (id, details) => {
      const video = byId.get(id);
      video.published = details.published || video.published;
      video.description = video.description || details.description;
      video.views = video.views ?? details.views;
      video.title = video.title || details.title;
    });
  }

  // Nieuwste eerst; video's zonder datum achteraan in plaats van bovenaan.
  videos.sort((a, b) => (b.published || '').localeCompare(a.published || ''));

  writeOutput({
    channelId: CHANNEL_ID,
    channelTitle: previous?.channelTitle || 'Agbot bruut',
    channelUrl: `https://www.youtube.com/${handle}`,
    fetchedAt: new Date().toISOString(),
    videos
  });

  const oldest = videos.at(-1);
  console.log(
    `✅ youtube.json geschreven (${videos.length} video's, nieuwste: "${videos[0].title}", oudste: "${oldest?.title}")`
  );
}

main().catch((error) => keepExisting(error.message));
