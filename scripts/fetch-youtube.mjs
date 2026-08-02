// scripts/fetch-youtube.mjs
// Haalt de laatste video's van het YouTube kanaal op via de publieke RSS-feed
// en schrijft ze naar src/lib/data/youtube.json. Draait vóór elke build, zodat
// de statische site altijd met de nieuwste video's wordt gepubliceerd.
//
// Run met: node scripts/fetch-youtube.mjs
//
// Geen API-key nodig: de RSS-feed van YouTube is publiek.
// De feed geeft maximaal 15 video's terug; dat is ook wat we tonen.
//
// Overschrijven kan via environment variables:
//   YOUTUBE_CHANNEL_ID=UC...        (slaat het opzoeken van de handle over)
//   YOUTUBE_HANDLE=@opensource_agbot

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';

const HANDLE = process.env.YOUTUBE_HANDLE || '@opensource_agbot';
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || 'UCYW2RxlhWwQdn4d33I-OmGg';
const MAX_VIDEOS = 15;
const OUT_PATH = resolve('src/lib/data/youtube.json');

// YouTube toont bezoekers uit de EU een cookie-consent pagina. De RSS-feed zelf
// heeft daar geen last van, maar het opzoeken van een handle wél. `ucbcb=1`
// slaat die pagina over zodat het script ook lokaal in de EU werkt.
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

/** Zoekt het channel ID (UC...) op bij een @handle. */
async function resolveChannelId(handle) {
  const clean = handle.startsWith('@') ? handle : `@${handle}`;
  const html = await getText(`https://www.youtube.com/${clean}?ucbcb=1`, 'Kanaalpagina');
  const match = html.match(/"(?:channelId|externalId)":"(UC[\w-]{22})"/);
  if (!match) {
    throw new Error(`Geen channel ID gevonden op de pagina van ${clean}`);
  }
  return match[1];
}

function parseFeed(xml) {
  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [];

  return entries.slice(0, MAX_VIDEOS).map((entry) => {
    const id = tagContent(entry, 'yt:videoId');
    const views = Number(attr(entry, 'media:statistics', 'views'));

    return {
      id,
      title: tagContent(entry, 'title') || tagContent(entry, 'media:title'),
      description: tagContent(entry, 'media:description'),
      url: `https://www.youtube.com/watch?v=${id}`,
      // maxresdefault is scherp en 16:9, maar bestaat niet voor elke video.
      // De component valt terug op de thumbnail uit de feed als hij 404't.
      thumbnail: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
      thumbnailFallback: attr(entry, 'media:thumbnail', 'url'),
      published: tagContent(entry, 'published'),
      views: Number.isFinite(views) ? views : null
    };
  });
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

  if (existsSync(OUT_PATH)) {
    const previous = JSON.parse(readFileSync(OUT_PATH, 'utf-8'));
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
  const channelId = CHANNEL_ID || (await resolveChannelId(HANDLE));

  const xml = await getText(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
    'RSS-feed'
  );

  const videos = parseFeed(xml);
  if (videos.length === 0) {
    throw new Error('Feed bevatte geen video-entries');
  }

  writeOutput({
    channelId,
    channelTitle: tagContent(xml.split('<entry>')[0], 'title') || 'Agbot bruut',
    channelUrl: `https://www.youtube.com/${HANDLE}`,
    fetchedAt: new Date().toISOString(),
    videos
  });

  console.log(`✅ youtube.json geschreven (${videos.length} video's, nieuwste: "${videos[0].title}")`);
}

main().catch((error) => keepExisting(error.message));
