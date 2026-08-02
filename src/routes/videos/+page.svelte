<script lang="ts">
  import * as m from '$lib/paraglide/messages.js';
  import { getLocale } from '$lib/paraglide/runtime';
  import VideoCard from '$lib/components/VideoCard.svelte';
  import {
    channel,
    fetchedAt,
    formatDate,
    formatViews,
    embedUrl,
    isPlaceholderThumbnail,
    videos,
    type Video
  } from '$lib/youtube';

  let selected: Video | null = videos[0] ?? null;
  let playing = false;
  let playerRef: HTMLElement;

  $: locale = getLocale();
  $: selectedViews = selected ? formatViews(selected.views, locale) : null;

  // maxresdefault bestaat niet altijd; val dan terug op de feed-thumbnail.
  let heroFailed = false;
  $: selected, (heroFailed = false);
  $: heroThumb = selected ? (heroFailed ? selected.thumbnailFallback : selected.thumbnail) : '';

  function play(video: Video) {
    selected = video;
    playing = true;
  }

  function selectFromGrid(video: Video) {
    play(video);
    playerRef?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
</script>

<svelte:head>
  <title>{m.videos_meta_title()} | BRUUT</title>
  <meta name="description" content={m.videos_meta_description()} />
</svelte:head>

<div class="page">
  <header class="hero">
    <span class="eyebrow">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path
          d="M23 12s0-3.9-.5-5.8c-.3-1-1.1-1.8-2.1-2.1C18.5 3.6 12 3.6 12 3.6s-6.5 0-8.4.5c-1 .3-1.8 1.1-2.1 2.1C1 8.1 1 12 1 12s0 3.9.5 5.8c.3 1 1.1 1.8 2.1 2.1 1.9.5 8.4.5 8.4.5s6.5 0 8.4-.5c1-.3 1.8-1.1 2.1-2.1.5-1.9.5-5.8.5-5.8zM9.9 15.6V8.4l5.4 3.6-5.4 3.6z"
        />
      </svg>
      {channel.title}
    </span>

    <h1>{m.videos_hero_title()}</h1>
    <p class="lead">{m.videos_hero_description()}</p>

    <div class="hero-actions">
      <a class="btn-youtube" href={channel.subscribeUrl} target="_blank" rel="noopener noreferrer">
        {m.videos_subscribe()}
      </a>
      <a class="btn-ghost" href={channel.url} target="_blank" rel="noopener noreferrer">
        {m.videos_visit_channel()}
      </a>
    </div>
  </header>

  {#if selected}
    <section class="player-section" bind:this={playerRef}>
      <div class="player">
        {#if playing}
          <iframe
            src={embedUrl(selected.id)}
            title={selected.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        {:else}
          <!-- Pas bij een klik laden we de YouTube-player: sneller én geen tracking vooraf. -->
          <button class="poster" type="button" on:click={() => selected && play(selected)}>
            <img
              src={heroThumb}
              alt={selected.title}
              on:error={() => (heroFailed = true)}
              on:load={(e) => isPlaceholderThumbnail(e.currentTarget) && (heroFailed = true)}
            />
            <span class="poster-play" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            </span>
            <span class="sr-only">{m.videos_play_button({ title: selected.title })}</span>
          </button>
        {/if}
      </div>

      <div class="player-meta">
        <h2>{selected.title}</h2>
        <p class="meta-line">
          <span>{formatDate(selected.published, locale)}</span>
          {#if selectedViews}
            <span class="dot" aria-hidden="true">•</span>
            <span>{m.videos_views({ count: selectedViews })}</span>
          {/if}
        </p>
        {#if selected.description}
          <p class="description">{selected.description}</p>
        {/if}
        <a class="watch-link" href={selected.url} target="_blank" rel="noopener noreferrer">
          {m.videos_watch_on_youtube()} &rarr;
        </a>
      </div>
    </section>

    <section class="all-videos">
      <div class="section-head">
        <h2>{m.videos_all_title()}</h2>
        <p>{m.videos_all_subtitle()}</p>
      </div>

      <div class="video-grid">
        {#each videos as video, i (video.id)}
          <VideoCard {video} latest={i === 0} onSelect={selectFromGrid} />
        {/each}
      </div>

      <p class="updated">
        {m.videos_last_updated({ date: formatDate(fetchedAt, locale) })}
      </p>
    </section>
  {:else}
    <section class="empty">
      <h2>{m.videos_empty_title()}</h2>
      <p>{m.videos_empty_desc()}</p>
      <a class="btn-youtube" href={channel.url} target="_blank" rel="noopener noreferrer">
        {m.videos_visit_channel()}
      </a>
    </section>
  {/if}

  <section class="follow-cta">
    <h2>{m.videos_cta_title()}</h2>
    <p>{m.videos_cta_desc()}</p>
    <div class="hero-actions">
      <a class="btn-youtube" href={channel.subscribeUrl} target="_blank" rel="noopener noreferrer">
        {m.videos_subscribe()}
      </a>
      <a
        class="btn-ghost"
        href="https://github.com/JacobsFarm/Bruut_OpenAgbot"
        target="_blank"
        rel="noopener noreferrer"
      >
        {m.videos_cta_github()}
      </a>
    </div>
  </section>
</div>

<style>
  .page {
    display: flex;
    flex-direction: column;
    gap: 4.5rem;
  }

  /* ---------- Hero ---------- */

  .hero {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: #ffffff;
    border: 1px solid oklch(85% 0.01 145);
    border-radius: 999px;
    padding: 0.4rem 1rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: oklch(22% 0.02 145);
  }

  .eyebrow svg {
    width: 22px;
    height: 22px;
    color: #ff0000; /* YouTube rood */
  }

  h1 {
    font-family: 'Bebas Kai', sans-serif;
    font-size: clamp(2.25rem, 7vw, 3.75rem);
    color: #386938; /* Emerald Green */
    text-transform: uppercase;
    line-height: 1;
    margin: 0;
  }

  .lead {
    max-width: 640px;
    margin: 0;
    font-size: clamp(1rem, 3.5vw, 1.15rem);
    line-height: 1.6;
  }

  .hero-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .btn-youtube,
  .btn-ghost {
    padding: 0.8rem 2rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: bold;
    transition:
      background 0.25s ease,
      color 0.25s ease,
      transform 0.25s ease;
  }

  .btn-youtube {
    background: #ff0000; /* YouTube rood */
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(255, 0, 0, 0.25);
  }

  .btn-youtube:hover {
    background: oklch(55% 0.22 28);
    transform: translateY(-2px);
  }

  .btn-ghost {
    border: 2px solid #386938;
    color: #386938;
  }

  .btn-ghost:hover {
    background: #386938;
    color: oklch(98% 0.005 145);
    transform: translateY(-2px);
  }

  /* ---------- Speler ---------- */

  .player-section {
    display: grid;
    grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
    gap: 2rem;
    align-items: start;
  }

  .player {
    position: relative;
    aspect-ratio: 16 / 9;
    border-radius: 16px;
    overflow: hidden;
    background: oklch(22% 0.02 145); /* Deep Ink */
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  }

  .player :global(iframe) {
    width: 100%;
    height: 100%;
    border: 0;
    display: block;
  }

  .poster {
    all: unset;
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .poster img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }

  .poster:hover img {
    transform: scale(1.03);
  }

  .poster-play {
    position: absolute;
    inset: 0;
    margin: auto;
    width: 88px;
    height: 88px;
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

  .poster-play svg {
    width: 44px;
    height: 44px;
    margin-left: 5px;
  }

  .poster:hover .poster-play,
  .poster:focus-visible .poster-play {
    background: #ff0000;
    transform: scale(1.08);
  }

  .poster:focus-visible {
    outline: 3px solid oklch(65% 0.16 75);
    outline-offset: -3px;
  }

  .player-meta {
    background: #ffffff;
    border-radius: 16px;
    padding: 1.75rem;
    border-left: 5px solid oklch(65% 0.16 75); /* Deep Amber */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  .player-meta h2 {
    margin: 0;
    font-size: 1.35rem;
    line-height: 1.35;
    color: #386938;
  }

  .meta-line {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    flex-wrap: wrap;
    font-size: 0.9rem;
    color: oklch(45% 0.02 145);
  }

  .dot {
    opacity: 0.6;
  }

  .description {
    margin: 0;
    line-height: 1.6;
    white-space: pre-line;

    /* Lange beschrijvingen inkorten zodat de kaart compact blijft. */
    display: -webkit-box;
    -webkit-line-clamp: 6;
    line-clamp: 6;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .watch-link {
    margin-top: auto;
    color: #386938;
    font-weight: bold;
    text-decoration: none;
    align-self: flex-start;
  }

  .watch-link:hover {
    color: oklch(65% 0.16 75);
  }

  /* ---------- Overzicht ---------- */

  .section-head {
    text-align: center;
    margin-bottom: 2rem;
  }

  .section-head h2 {
    font-family: 'Bebas Kai', sans-serif;
    font-size: 2rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #386938;
    margin: 0 0 0.5rem;
  }

  .section-head p {
    margin: 0;
    color: oklch(45% 0.02 145);
  }

  .video-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr));
    gap: 1.75rem;
  }

  .updated {
    margin-top: 2rem;
    text-align: center;
    font-size: 0.85rem;
    color: oklch(45% 0.02 145);
  }

  /* ---------- Lege staat & CTA ---------- */

  .empty {
    text-align: center;
    background: #ffffff;
    border-radius: 16px;
    padding: 3rem 2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  .empty h2 {
    color: #386938;
    margin-top: 0;
  }

  .follow-cta {
    text-align: center;
    background: #386938; /* Emerald Green */
    color: oklch(98% 0.005 145);
    border-radius: 16px;
    padding: 3rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .follow-cta h2 {
    font-family: 'Bebas Kai', sans-serif;
    font-size: 2rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 0;
    color: oklch(98% 0.005 145);
  }

  .follow-cta p {
    margin: 0;
    max-width: 560px;
    line-height: 1.6;
    opacity: 0.92;
  }

  .follow-cta .btn-ghost {
    border-color: oklch(98% 0.005 145);
    color: oklch(98% 0.005 145);
  }

  .follow-cta .btn-ghost:hover {
    background: oklch(98% 0.005 145);
    color: #386938;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* ---------- Responsief ---------- */

  @media (max-width: 900px) {
    .player-section {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .page {
      gap: 3rem;
    }

    .poster-play {
      width: 64px;
      height: 64px;
    }

    .poster-play svg {
      width: 32px;
      height: 32px;
    }

    .btn-youtube,
    .btn-ghost {
      padding: 0.75rem 1.5rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .btn-youtube:hover,
    .btn-ghost:hover,
    .poster:hover img,
    .poster:hover .poster-play {
      transform: none;
    }
  }
</style>
