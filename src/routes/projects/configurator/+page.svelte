<script lang="ts">
  import * as m from '$lib/paraglide/messages';
  import { base } from '$app/paths';
  import { untrack } from 'svelte';

  import ConfiguratorReel from '$lib/components/ConfiguratorReel.svelte';
  import ConfiguratorPreview from '$lib/components/ConfiguratorPreview.svelte';
  import {
    reels,
    defaultConfig,
    lockedRear,
    driveLabel,
    steeringLabel,
    tractionLabel,
    hasTracks,
    type Config
  } from '$lib/configurator';

  let config = $state<Config>({ ...defaultConfig });
  let spinning = $state(false);
  let pulled = $state(false);
  let notice = $state(false);

  const reelRefs: { spin: (id: string, loops: number, ms: number) => Promise<void> }[] = [];

  const rearLocked = $derived(lockedRear(config.front));

  // De voorwielen bepalen: kies je daar een as zonder motor terwijl de
  // achterwielen ook geen motor hebben, dan gaan de achterwielen naar de hubmotor.
  let noticeTimer: ReturnType<typeof setTimeout>;
  $effect(() => {
    const locked = rearLocked;
    untrack(() => {
      if (spinning || !locked.has(config.rear)) return;
      config.rear = 'fixed_hub';
      notice = true;
      clearTimeout(noticeTimer);
      noticeTimer = setTimeout(() => (notice = false), 4500);
    });
  });

  const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)];

  async function spinAll() {
    if (spinning) return;
    spinning = true;
    pulled = true;
    setTimeout(() => (pulled = false), 450);

    const target: Record<string, string> = {};
    for (const reel of reels) {
      const locked = reel.key === 'rear' ? lockedRear(target.front as Config['front']) : new Set();
      target[reel.key] = pick(reel.options.filter((o) => !locked.has(o.id))).id;
    }

    // De rollen stoppen één voor één, zodat de robot stukje bij beetje ontstaat.
    await Promise.all(
      reels.map((reel, i) => reelRefs[i]?.spin(target[reel.key], 2 + Math.floor(i / 3), 900 + i * 320))
    );
    spinning = false;
  }

  function reset() {
    if (spinning) return;
    Object.assign(config, defaultConfig);
  }
</script>

<svelte:head>
  <title>{m.configurator_title()} | Bruut</title>
</svelte:head>

<div class="page">
  <header class="hero">
    <h1>{m.configurator_title()}</h1>
    <p>{m.configurator_subtitle()}</p>
  </header>

  <div class="layout">
    <section class="stage">
      <ConfiguratorPreview
        {config}
        alt={m.configurator_preview_alt()}
        labels={{
          clearance: m.configurator_preview_clearance(),
          lowEntry: m.configurator_preview_low_entry(),
          hang: m.configurator_preview_hang(),
          frontView: m.configurator_preview_front_view()
        }}
      />
    </section>

    <aside class="summary">
      <h2>{m.configurator_summary_title()}</h2>
      <dl class="parts">
        {#each reels as reel (reel.key)}
          <div>
            <dt>{reel.title()}</dt>
            <dd>
              {reel.key === 'front' && hasTracks(config)
                ? m.configurator_front_none()
                : reel.options.find((o) => o.id === config[reel.key])?.label()}
            </dd>
          </div>
        {/each}
      </dl>
      <dl class="specs">
        <div>
          <dt>{m.configurator_spec_drive()}</dt>
          <dd>{driveLabel(config)}</dd>
        </div>
        <div>
          <dt>{m.configurator_spec_steering()}</dt>
          <dd>{steeringLabel(config)}</dd>
        </div>
        <div>
          <dt>{m.configurator_spec_traction()}</dt>
          <dd>{tractionLabel(config)}</dd>
        </div>
      </dl>
      <a href="{base}/projects/robotbuild" class="btn-primary">{m.configurator_cta()} &rarr;</a>
    </aside>

    <section class="cabinet">
      <div class="bulbs" class:spinning aria-hidden="true">
        {#each Array.from({ length: 14 }) as _, i (i)}<span></span>{/each}
      </div>

      <p class="notice" class:show={notice} role="status">{notice ? m.configurator_rule_notice() : ''}</p>

      <div class="machine">
        <div class="reels">
          {#each reels as reel, i (reel.key)}
            <ConfiguratorReel
              bind:this={reelRefs[i]}
              bind:value={config[reel.key]}
              title={reel.title()}
              options={reel.options}
              locked={reel.key === 'rear' ? rearLocked : undefined}
              disabled={reel.key === 'front' && hasTracks(config) ? m.configurator_front_disabled() : undefined}
            />
          {/each}
        </div>

        <button
          class="lever"
          class:pulled
          onclick={spinAll}
          disabled={spinning}
          aria-label={m.configurator_spin()}
        >
          <svg viewBox="0 0 60 220" aria-hidden="true">
            <rect x="14" y="150" width="32" height="60" rx="8" class="lever-base" />
            <g class="lever-arm">
              <rect x="26" y="40" width="8" height="130" rx="4" class="lever-rod" />
              <circle cx="30" cy="34" r="20" class="lever-knob" />
              <circle cx="23" cy="27" r="6" class="lever-shine" />
            </g>
          </svg>
        </button>
      </div>

      <div class="actions">
        <button class="btn-spin" onclick={spinAll} disabled={spinning}>{m.configurator_spin()}</button>
        <button class="btn-reset" onclick={reset} disabled={spinning}>{m.configurator_reset()}</button>
      </div>
      <p class="hint">{m.configurator_hint()}</p>
    </section>
  </div>
</div>

<style>
  .page {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    font-family: 'Roboto', sans-serif;
  }

  .hero {
    text-align: center;
  }

  .hero h1 {
    font-family: 'Bebas Kai', 'Bebas Neue', sans-serif;
    font-size: clamp(2.5rem, 8vw, 4rem);
    text-transform: uppercase;
    line-height: 1;
    margin: 0 0 0.75rem;
    color: #386938;
  }

  .hero p {
    max-width: 640px;
    margin: 0 auto;
    font-size: 1.1rem;
    line-height: 1.6;
  }

  .layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 300px;
    grid-template-areas:
      'stage summary'
      'cabinet cabinet';
    gap: 1.75rem;
  }

  .stage {
    grid-area: stage;
    border: 3px solid #1f2a22;
    border-radius: 18px;
    overflow: hidden;
    background: #eef8f2;
    box-shadow: 0 6px 0 #1f2a22;
    align-self: start;
  }

  /* ---------- Samenvatting ---------- */

  .summary {
    grid-area: summary;
    background: #ffffff;
    border: 3px solid #1f2a22;
    border-radius: 18px;
    box-shadow: 0 6px 0 #1f2a22;
    padding: 1.25rem 1.4rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .summary h2 {
    font-family: 'Bebas Kai', 'Bebas Neue', sans-serif;
    font-weight: normal;
    font-size: 1.8rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #386938;
    margin: 0;
  }

  dl {
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
  }

  dl div {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 0.75rem;
  }

  dt {
    font-size: 0.85rem;
    color: oklch(45% 0.02 145);
  }

  dd {
    margin: 0;
    font-weight: 700;
    font-size: 0.9rem;
    text-align: right;
    color: oklch(22% 0.02 145);
  }

  .specs {
    border-top: 2px dashed oklch(85% 0.01 145);
    padding-top: 0.9rem;
  }

  .specs div {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.15rem;
  }

  .specs dd {
    text-align: left;
    color: #386938;
    font-size: 1rem;
  }

  .btn-primary {
    margin-top: auto;
    background-color: #386938;
    color: #ffffff;
    padding: 0.7rem 1.2rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: bold;
    text-align: center;
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  .btn-primary:hover {
    background-color: oklch(65% 0.16 75);
    color: oklch(22% 0.02 145);
  }

  /* ---------- De gokkast ---------- */

  .cabinet {
    grid-area: cabinet;
    position: relative;
    background: #386938;
    border: 3px solid #1f2a22;
    border-radius: 22px;
    box-shadow: 0 8px 0 #1f2a22, inset 0 0 0 6px #2c5a2c;
    padding: 2.25rem 1.5rem 1.5rem;
  }

  .bulbs {
    position: absolute;
    top: 10px;
    left: 24px;
    right: 24px;
    display: flex;
    justify-content: space-between;
  }

  .bulbs span {
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: #f6c945;
    border: 2px solid #1f2a22;
    box-shadow: 0 0 8px #f6c945;
  }

  .bulbs span:nth-child(even) {
    background: #fffdf5;
    box-shadow: none;
  }

  .bulbs.spinning span {
    animation: chase 0.4s steps(2, jump-none) infinite;
  }

  .bulbs.spinning span:nth-child(even) {
    animation-delay: 0.2s;
  }

  @keyframes chase {
    50% {
      background: #fffdf5;
      box-shadow: none;
    }
  }

  .machine {
    display: flex;
    gap: 1rem;
    align-items: stretch;
  }

  .reels {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 0.75rem;
    min-width: 0;
  }

  .lever {
    width: 60px;
    flex-shrink: 0;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    align-self: center;
  }

  .lever:disabled {
    cursor: wait;
  }

  .lever:focus-visible {
    outline: 3px solid #f6c945;
    outline-offset: 4px;
    border-radius: 8px;
  }

  .lever svg {
    width: 60px;
    height: 220px;
    overflow: visible;
  }

  .lever-base {
    fill: #2c3e2c;
    stroke: #1f2a22;
    stroke-width: 3;
  }

  .lever-rod {
    fill: #b9c3bc;
    stroke: #1f2a22;
    stroke-width: 3;
  }

  .lever-knob {
    fill: #c0492b;
    stroke: #1f2a22;
    stroke-width: 3;
  }

  .lever-shine {
    fill: rgba(255, 255, 255, 0.55);
  }

  .lever-arm {
    transform-box: view-box;
    transform-origin: 30px 180px;
    transition: transform 0.35s cubic-bezier(0.3, 1.5, 0.5, 1);
  }

  .lever:hover:not(:disabled) .lever-arm {
    transform: rotate(-6deg);
  }

  .lever.pulled .lever-arm {
    transform: scaleY(-0.55);
    transition-duration: 0.15s;
  }

  .notice {
    min-height: 1.4em;
    margin: -0.6rem 0 0.4rem;
    text-align: center;
    font-weight: 700;
    font-size: 0.9rem;
    color: #f6c945;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .notice.show {
    opacity: 1;
  }

  .actions {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.9rem;
    margin-top: 1.25rem;
  }

  .actions button {
    font: inherit;
    font-weight: 800;
    font-size: 1.1rem;
    padding: 0.7rem 2rem;
    border: 3px solid #1f2a22;
    border-radius: 12px;
    cursor: pointer;
    box-shadow: 0 5px 0 #1f2a22;
    transition: transform 0.1s ease, box-shadow 0.1s ease, background-color 0.2s ease;
  }

  .actions button:active:not(:disabled) {
    transform: translateY(5px);
    box-shadow: 0 0 0 #1f2a22;
  }

  .actions button:disabled {
    opacity: 0.6;
    cursor: wait;
  }

  .actions button:focus-visible {
    outline: 3px solid #fffdf5;
    outline-offset: 3px;
  }

  .btn-spin {
    background: #c0492b;
    color: #fffdf5;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .btn-spin:hover:not(:disabled) {
    background: #d6583a;
  }

  .btn-reset {
    background: #fffdf5;
    color: oklch(22% 0.02 145);
  }

  .btn-reset:hover:not(:disabled) {
    background: #f6c945;
  }

  .hint {
    margin: 0.9rem 0 0;
    text-align: center;
    font-size: 0.85rem;
    color: oklch(92% 0.02 145);
  }

  /* ---------- Kleinere schermen ---------- */

  @media (max-width: 1000px) {
    .reels {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      row-gap: 1.25rem;
    }
  }

  @media (max-width: 768px) {
    .page {
      gap: 1.5rem;
    }

    .layout {
      grid-template-columns: minmax(0, 1fr);
      grid-template-areas:
        'stage'
        'cabinet'
        'summary';
      gap: 1.25rem;
    }

    /* Op een telefoon blijft de robot in beeld terwijl je aan de rollen draait. */
    .stage {
      position: sticky;
      top: 0.5rem;
      z-index: 5;
    }

    .cabinet {
      padding: 2rem 0.9rem 1.25rem;
    }

    .lever {
      display: none;
    }
  }

  @media (max-width: 520px) {
    .reels {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bulbs.spinning span,
    .lever-arm {
      animation: none;
      transition: none;
    }
  }
</style>
