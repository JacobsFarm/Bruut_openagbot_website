<script lang="ts">
  import * as m from '$lib/paraglide/messages.js';
  import { getLocale } from '$lib/paraglide/runtime';
  import { formatDate, formatViews, isPlaceholderThumbnail, type Video } from '$lib/youtube';

  export let video: Video;
  /** Markeert de nieuwste video met een badge. */
  export let latest = false;
  /**
   * Speelt de video af in de speler bovenaan de pagina in plaats van naar
   * YouTube te navigeren. Zonder deze prop blijft de kaart een gewone link.
   */
  export let onSelect: ((video: Video) => void) | null = null;

  $: locale = getLocale();
  $: views = formatViews(video.views, locale);

  // maxresdefault bestaat niet voor elke video; val dan terug op de feed-thumb.
  let failed = false;
  $: video, (failed = false);
  $: thumb = failed ? video.thumbnailFallback : video.thumbnail;

  function handleClick(event: MouseEvent) {
    if (!onSelect) return;
    // Laat ctrl/cmd/middenklik gewoon een YouTube-tab openen.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    onSelect(video);
  }
</script>

<!--
  Altijd een echte link naar YouTube: werkt zonder JS, is toetsenbord-
  toegankelijk en blijft ctrl-klikbaar. Met `onSelect` vangen we de gewone
  klik af om de video in de ingebouwde speler te tonen.
-->
<a
  class="card"
  href={video.url}
  target="_blank"
  rel="noopener noreferrer"
  on:click={handleClick}
>
  <div class="thumb-wrap">
    <img
      src={thumb}
      alt={video.title}
      loading="lazy"
      on:error={() => (failed = true)}
      on:load={(e) => isPlaceholderThumbnail(e.currentTarget) && (failed = true)}
    />

    <span class="play" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
    </span>

    {#if latest}
      <span class="badge">{m.videos_badge_new()}</span>
    {/if}
  </div>

  <div class="body">
    <h3>{video.title}</h3>
    <p class="meta">
      <span>{formatDate(video.published, locale)}</span>
      {#if views}
        <span class="dot" aria-hidden="true">•</span>
        <span>{m.videos_views({ count: views })}</span>
      {/if}
    </p>
  </div>
</a>

<style>
  .card {
    border: 1px solid oklch(85% 0.01 145); /* Soft Gray */
    background: #ffffff;
    color: inherit;
    text-decoration: none;
    cursor: pointer;

    display: flex;
    flex-direction: column;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transition:
      transform 0.3s ease,
      border-color 0.3s ease,
      box-shadow 0.3s ease;
  }

  .card:hover,
  .card:focus-visible {
    transform: translateY(-5px);
    border-color: oklch(65% 0.16 75); /* Deep Amber */
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  }

  .card:focus-visible {
    outline: 3px solid oklch(65% 0.16 75);
    outline-offset: 2px;
  }

  .thumb-wrap {
    position: relative;
    aspect-ratio: 16 / 9;
    background: oklch(22% 0.02 145); /* Deep Ink, zichtbaar tijdens laden */
    overflow: hidden;
  }

  .thumb-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }

  .card:hover .thumb-wrap img {
    transform: scale(1.05);
  }

  .play {
    position: absolute;
    inset: 0;
    margin: auto;
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.55);
    color: #ffffff;
    transition:
      background 0.25s ease,
      transform 0.25s ease;
  }

  .play svg {
    width: 28px;
    height: 28px;
    margin-left: 3px; /* optisch centreren van de driehoek */
  }

  .card:hover .play,
  .card:focus-visible .play {
    background: #ff0000; /* YouTube rood */
    transform: scale(1.1);
  }

  .badge {
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
    background: oklch(65% 0.16 75); /* Deep Amber */
    color: oklch(22% 0.02 145); /* Deep Ink */
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.25rem 0.6rem;
    border-radius: 999px;
  }

  .body {
    padding: 1rem 1.15rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex-grow: 1;
  }

  h3 {
    margin: 0;
    font-size: 1.05rem;
    line-height: 1.4;
    color: #386938; /* Emerald Green */

    /* Maximaal twee regels, zodat de kaarten even hoog blijven. */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .meta {
    margin: 0;
    font-size: 0.85rem;
    color: oklch(45% 0.02 145);
    display: flex;
    align-items: center;
    gap: 0.4rem;
    flex-wrap: wrap;
  }

  .dot {
    opacity: 0.6;
  }

  @media (prefers-reduced-motion: reduce) {
    .card,
    .card:hover,
    .thumb-wrap img,
    .card:hover .thumb-wrap img,
    .play {
      transition: none;
      transform: none;
    }
  }
</style>
