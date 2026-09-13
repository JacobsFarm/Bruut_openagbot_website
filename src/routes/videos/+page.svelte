<script lang="ts">
  import * as m from '$lib/paraglide/messages.js';
  import { getLocale } from '$lib/paraglide/runtime';
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
  import { buildTimeline, milestoneCount, phaseLabels } from '$lib/timeline';

  const months = buildTimeline(videos);

  $: locale = getLocale();

  // Er speelt er hooguit één tegelijk: de vorige player verdwijnt uit de DOM,
  // dus nooit twee video's door elkaar en pas een YouTube-request na een klik.
  let playingId: string | null = null;

  // maxresdefault bestaat niet voor elke video; per video terugvallen op de
  // thumbnail uit de feed.
  let failed: Record<string, boolean> = {};
  const thumb = (video: Video) => (failed[video.id] ? video.thumbnailFallback : video.thumbnail);
  const markFailed = (id: string) => (failed = { ...failed, [id]: true });

  function formatMonth(iso: string, current: string): string {
    return new Intl.DateTimeFormat(current === 'nl' ? 'nl-NL' : 'en-GB', {
      month: 'long',
      year: 'numeric'
    }).format(new Date(iso));
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

  {#if months.length}
    <section class="all-videos">
      <div class="section-head">
        <h2>{m.videos_all_title()}</h2>
        <p>{m.videos_all_subtitle()}</p>
        <p class="counts">
          {m.videos_counts({ videos: videos.length, milestones: milestoneCount })}
        </p>
      </div>

      <ol class="timeline">
        <li class="marker">
          <span class="dot" aria-hidden="true"></span>
          <span class="marker-label">{m.timeline_now_label()}</span>
        </li>

        {#each months as month (month.key)}
          <li class="month">
            <span class="dot month-dot" aria-hidden="true"></span>
            <h3>{formatMonth(month.date, locale)}</h3>
          </li>

          {#each month.entries as entry (entry.video.id)}
            {@const video = entry.video}
            {#if entry.milestone}
              <li class="entry milestone" id={entry.milestone.key}>
                <span class="dot big" aria-hidden="true"></span>

                <article class="card">
                  <div class="frame">
                    {#if playingId === video.id}
                      <iframe
                        src={embedUrl(video.id)}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen
                      ></iframe>
                    {:else}
                      <button class="poster" type="button" on:click={() => (playingId = video.id)}>
                        <img
                          src={thumb(video)}
                          alt={entry.milestone.title()}
                          loading="lazy"
                          on:error={() => markFailed(video.id)}
                          on:load={(e) =>
                            isPlaceholderThumbnail(e.currentTarget) && markFailed(video.id)}
                        />
                        <span class="play" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="currentColor"
                            ><path d="M8 5v14l11-7z" /></svg
                          >
                        </span>
                        <span class="sr-only">
                          {m.videos_play_button({ title: entry.milestone.title() })}
                        </span>
                      </button>
                    {/if}
                  </div>

                  <div class="body">
                    <p class="meta">
                      <span class="phase phase-{entry.milestone.phase}">
                        {phaseLabels[entry.milestone.phase]()}
                      </span>
                      <span>{formatDate(video.published, locale)}</span>
                    </p>

                    <h4>{entry.milestone.title()}</h4>
                    <p class="story">{entry.milestone.body()}</p>

                    <a class="watch" href={video.url} target="_blank" rel="noopener noreferrer">
                      {m.timeline_watch()} &rarr;
                    </a>
                  </div>
                </article>
              </li>
            {:else}
              <li class="entry update">
                <span class="dot" aria-hidden="true"></span>

                {#if playingId === video.id}
                  <div class="frame update-frame">
                    <iframe
                      src={embedUrl(video.id)}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerpolicy="strict-origin-when-cross-origin"
                      allowfullscreen
                    ></iframe>
                  </div>
                {:else}
                  <button class="row" type="button" on:click={() => (playingId = video.id)}>
                    <span class="row-thumb">
                      <img
                        src={thumb(video)}
                        alt=""
                        loading="lazy"
                        on:error={() => markFailed(video.id)}
                        on:load={(e) =>
                          isPlaceholderThumbnail(e.currentTarget) && markFailed(video.id)}
                      />
                      <span class="play small" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="currentColor"
                          ><path d="M8 5v14l11-7z" /></svg
                        >
                      </span>
                    </span>

                    <span class="row-text">
                      <span class="row-date">{formatDate(video.published, locale)}</span>
                      <span class="row-title">{video.title}</span>
                    </span>
                  </button>
                {/if}
              </li>
            {/if}
          {/each}
        {/each}

        <li class="marker">
          <span class="dot start" aria-hidden="true"></span>
          <span class="marker-label">{m.timeline_start_label()}</span>
        </li>
      </ol>

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
    max-width: 660px;
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

  /* ---------- Kop boven de tijdlijn ---------- */

  .section-head {
    text-align: center;
    margin-bottom: 2.5rem;
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
    margin: 0 auto;
    max-width: 620px;
    color: oklch(45% 0.02 145);
    line-height: 1.6;
  }

  .counts {
    margin-top: 0.75rem !important;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  /* ---------- De tijdlijn ---------- */

  .timeline {
    list-style: none;
    margin: 0 auto;
    padding: 0;
    max-width: 720px;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  /* De lijn loopt links langs alles heen. */
  .timeline::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 8px;
    width: 3px;
    background: linear-gradient(
      to bottom,
      oklch(65% 0.16 75) 0%,
      oklch(85% 0.01 145) 6%,
      oklch(85% 0.01 145) 94%,
      #386938 100%
    );
    border-radius: 2px;
  }

  .marker,
  .month,
  .entry {
    position: relative;
    padding-left: 3rem;
  }

  /* Bolletje op de lijn. */
  .dot {
    position: absolute;
    left: 9px;
    top: 0.55rem;
    width: 13px;
    height: 13px;
    transform: translateX(-50%);
    border-radius: 50%;
    background: #ffffff;
    border: 3px solid oklch(70% 0.02 145);
    box-shadow: 0 0 0 4px #f9fbf9;
    z-index: 2;
  }

  /* Mijlpalen krijgen een dikker, groen bolletje. */
  .dot.big {
    top: 1.4rem;
    width: 19px;
    height: 19px;
    border: 5px solid #386938;
  }

  .month-dot {
    top: 0.7rem;
    border-color: oklch(65% 0.16 75); /* Deep Amber */
  }

  .dot.start {
    background: #386938;
    border-color: #386938;
  }

  /* ---------- Maandkop ---------- */

  .month {
    margin-top: 1.75rem;
  }

  .month:first-of-type {
    margin-top: 0;
  }

  .month h3 {
    margin: 0;
    font-family: 'Bebas Kai', sans-serif;
    font-size: 1.35rem;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: oklch(45% 0.02 145);
  }

  /* ---------- Mijlpaal-kaart ---------- */

  .card {
    background: #ffffff;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.07);
    border-left: 5px solid oklch(65% 0.16 75); /* Deep Amber */
    transition:
      transform 0.25s ease,
      box-shadow 0.25s ease;
  }

  .card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.11);
  }

  .frame {
    position: relative;
    aspect-ratio: 16 / 9;
    background: oklch(22% 0.02 145); /* Deep Ink */
  }

  .frame :global(iframe) {
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
    transform: scale(1.04);
  }

  .play {
    position: absolute;
    inset: 0;
    margin: auto;
    width: 62px;
    height: 62px;
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
    width: 30px;
    height: 30px;
    margin-left: 4px;
  }

  .poster:hover .play,
  .poster:focus-visible .play {
    background: #ff0000; /* YouTube rood */
    transform: scale(1.08);
  }

  .poster:focus-visible,
  .row:focus-visible {
    outline: 3px solid oklch(65% 0.16 75);
    outline-offset: -3px;
  }

  .body {
    padding: 1.4rem 1.6rem 1.6rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .meta {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
    font-size: 0.85rem;
    color: oklch(45% 0.02 145);
  }

  .phase {
    border-radius: 999px;
    padding: 0.2rem 0.7rem;
    font-weight: 700;
    font-size: 0.75rem;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: #ffffff;
    background: oklch(45% 0.02 145);
  }

  .phase-drive {
    background: oklch(50% 0.13 245); /* blauw: elektronica en aandrijving */
  }

  .phase-vision {
    background: oklch(45% 0.16 300); /* paars: computervisie */
  }

  .phase-autonomy {
    background: #386938; /* Emerald Green: autonoom rijden */
  }

  .phase-work {
    background: oklch(60% 0.16 75); /* Deep Amber: werktuigen */
  }

  .body h4 {
    margin: 0;
    font-family: 'Bebas Kai', sans-serif;
    font-size: 1.6rem;
    line-height: 1.15;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: #386938;
  }

  .story {
    margin: 0;
    line-height: 1.65;
  }

  .watch {
    margin-top: 0.25rem;
    align-self: flex-start;
    color: #386938;
    font-weight: bold;
    text-decoration: none;
  }

  .watch:hover {
    color: oklch(65% 0.16 75);
  }

  /* ---------- Gewone update: compacte regel ---------- */

  .row {
    all: unset;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    box-sizing: border-box;
    padding: 0.5rem;
    border-radius: 12px;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  .row:hover {
    background: #ffffff;
  }

  .row-thumb {
    position: relative;
    flex: 0 0 132px;
    aspect-ratio: 16 / 9;
    border-radius: 8px;
    overflow: hidden;
    background: oklch(22% 0.02 145);
  }

  .row-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .play.small {
    width: 34px;
    height: 34px;
    background: rgba(0, 0, 0, 0.5);
  }

  .play.small svg {
    width: 18px;
    height: 18px;
    margin-left: 2px;
  }

  .row:hover .play.small {
    background: #ff0000;
  }

  .row-text {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    min-width: 0;
  }

  .row-date {
    font-size: 0.8rem;
    color: oklch(45% 0.02 145);
  }

  .row-title {
    font-weight: 600;
    line-height: 1.35;
    color: oklch(22% 0.02 145);
  }

  .row:hover .row-title {
    color: #386938;
  }

  /* Een afgespeelde update krijgt dezelfde speler als een mijlpaal. */
  .update-frame {
    border-radius: 12px;
    overflow: hidden;
  }

  /* ---------- Begin- en eindmarkering ---------- */

  .marker-label {
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: oklch(45% 0.02 145);
  }

  .updated {
    margin-top: 2.5rem;
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

  @media (max-width: 768px) {
    .page {
      gap: 3rem;
    }

    .marker,
    .month,
    .entry {
      padding-left: 2.25rem;
    }

    .row-thumb {
      flex-basis: 104px;
    }

    .row-title {
      font-size: 0.95rem;
    }

    .play {
      width: 48px;
      height: 48px;
    }

    .play svg {
      width: 24px;
      height: 24px;
    }

    .btn-youtube,
    .btn-ghost {
      padding: 0.75rem 1.5rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .btn-youtube:hover,
    .btn-ghost:hover,
    .card:hover,
    .poster:hover img,
    .poster:hover .play {
      transform: none;
    }
  }
</style>
