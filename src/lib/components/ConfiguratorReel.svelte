<script lang="ts">
  // Eén rol van de gokkast. De strook bevat de opties een aantal keer achter
  // elkaar, zodat een draai een paar rondjes kan maken en daarna ongemerkt
  // terugspringt naar de middelste kopie.
  import * as m from '$lib/paraglide/messages.js';
  import { tick, untrack } from 'svelte';
  import type { Option } from '$lib/configurator';
  import ConfiguratorIcon from './ConfiguratorIcon.svelte';

  let {
    title,
    options,
    value = $bindable(),
    locked = new Set<string>(),
    disabled = undefined
  }: {
    title: string;
    options: Option[];
    value: string;
    locked?: Set<string>;
    /** Tekst die over de rol komt als hij er even niet toe doet. */
    disabled?: string;
  } = $props();

  const ITEM = 92; // hoogte van één vakje in px
  const COPIES = 11;
  const BASE = 5; // middelste kopie, genoeg ruimte voor 4 rondjes vooruit

  const n = $derived(options.length);
  const strip = $derived(Array.from({ length: COPIES }, () => options).flat());

  const startPos = () => BASE * options.length + Math.max(0, options.findIndex((o) => o.id === value));
  let pos = $state(startPos());
  let duration = $state(0);
  let easing = $state('ease');
  let busy = false;

  const current = () => ((pos % n) + n) % n;

  async function go(target: number, delta: number, ms: number, ease: string) {
    busy = true;
    duration = ms;
    easing = ease;
    await tick();
    pos += delta;
    await new Promise((r) => setTimeout(r, ms));
    value = options[target].id;
    duration = 0;
    pos = BASE * n + target;
    busy = false;
  }

  /** Draai een paar rondjes en land op `id`. Voor de hendel. */
  export function spin(id: string, loops: number, ms: number) {
    if (busy) return Promise.resolve();
    const target = options.findIndex((o) => o.id === id);
    const delta = loops * n + ((target - current() + n) % n);
    return go(target, delta, ms, 'cubic-bezier(0.12, 0.8, 0.3, 1.06)');
  }

  function step(dir: 1 | -1) {
    if (busy || disabled) return;
    let target = current();
    for (let i = 0; i < n; i++) {
      target = (target + dir + n) % n;
      if (!locked.has(options[target].id)) break;
    }
    if (target === current()) return;
    const delta = dir === 1 ? (target - current() + n) % n : -((current() - target + n) % n);
    go(target, delta, 380, 'cubic-bezier(0.3, 1.45, 0.55, 1)');
  }

  // Wordt de waarde van buitenaf veranderd (reset, of de aandrijfregel),
  // dan draait de rol er zelf naartoe.
  $effect(() => {
    const target = options.findIndex((o) => o.id === value);
    untrack(() => {
      if (busy || target < 0 || target === current()) return;
      const delta = (target - current() + n) % n;
      go(target, delta, 450, 'cubic-bezier(0.3, 1.3, 0.55, 1)');
    });
  });

  // Vegen op touchscreens en slepen met de muis.
  let dragStart: number | null = null;
  function onPointerDown(e: PointerEvent) {
    dragStart = e.clientY;
  }
  function onPointerUp(e: PointerEvent) {
    if (dragStart === null) return;
    const dy = e.clientY - dragStart;
    dragStart = null;
    if (Math.abs(dy) < 12) step(1);
    else step(dy < 0 ? 1 : -1);
  }

  const offset = $derived(-pos * ITEM + ITEM * 0.55);
  const selected = $derived(options.find((o) => o.id === value));
</script>

<div class="reel" class:off={!!disabled} role="group" aria-label={title}>
  <h3>{title}</h3>

  <button class="arrow" disabled={!!disabled} onclick={() => step(-1)} aria-label="{m.configurator_prev()}: {title}">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 15l7-7 7 7" /></svg>
  </button>

  <div
    class="window"
    style="--item: {ITEM}px"
    onpointerdown={onPointerDown}
    onpointerup={onPointerUp}
    onpointercancel={() => (dragStart = null)}
    aria-hidden="true"
  >
    <div
      class="strip"
      style="transform: translateY({offset}px); transition: transform {duration}ms {easing};"
    >
      {#each strip as option, i (i)}
        {@const isLocked = locked.has(option.id)}
        <div class="item" class:locked={isLocked}>
          <ConfiguratorIcon id={option.id} />
          <span class="label">{option.label()}</span>
          <span class="desc">{isLocked ? m.configurator_locked() : option.desc()}</span>
        </div>
      {/each}
    </div>
    <div class="payline"></div>
    {#if disabled}
      <div class="disabled">{disabled}</div>
    {/if}
  </div>

  <button class="arrow" disabled={!!disabled} onclick={() => step(1)} aria-label="{m.configurator_next()}: {title}">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9l7 7 7-7" /></svg>
  </button>

  <p class="sr-only" aria-live="polite">{title}: {disabled ?? selected?.label()}</p>
</div>

<style>
  .reel {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0.35rem;
    min-width: 0;
  }

  h3 {
    margin: 0 0 0.2rem;
    text-align: center;
    font-family: 'Bebas Kai', 'Bebas Neue', sans-serif;
    font-weight: normal;
    font-size: 1.25rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: oklch(98% 0.005 145); /* Off White */
  }

  .arrow {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    border: 2px solid #1f2a22;
    border-radius: 8px;
    background: oklch(65% 0.16 75); /* Deep Amber */
    cursor: pointer;
    box-shadow: 0 3px 0 #1f2a22;
    transition: transform 0.1s ease, box-shadow 0.1s ease;
  }

  .arrow:hover {
    background: oklch(72% 0.15 80);
  }

  .arrow:active {
    transform: translateY(3px);
    box-shadow: 0 0 0 #1f2a22;
  }

  .arrow:focus-visible {
    outline: 3px solid oklch(98% 0.005 145);
    outline-offset: 2px;
  }

  .arrow svg {
    width: 18px;
    height: 18px;
    fill: none;
    stroke: #1f2a22;
    stroke-width: 3.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .window {
    position: relative;
    height: calc(var(--item) * 2.1);
    overflow: hidden;
    border: 3px solid #1f2a22;
    border-radius: 12px;
    background: #fffdf5;
    box-shadow: inset 0 6px 10px rgba(0, 0, 0, 0.18);
    cursor: grab;
    touch-action: pan-y; /* pagina blijft scrollbaar; tikken draait de rol */
    user-select: none;
  }

  /* Glaseffect: boven en onder vervaagt de rol, zoals bij een echte kast. */
  .window::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(
      to bottom,
      rgba(31, 42, 34, 0.55) 0%,
      rgba(255, 253, 245, 0) 30%,
      rgba(255, 253, 245, 0) 70%,
      rgba(31, 42, 34, 0.55) 100%
    );
  }

  .strip {
    will-change: transform;
  }

  .item {
    height: var(--item);
    box-sizing: border-box;
    padding: 0.35rem 0.4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.1rem;
    text-align: center;
    border-bottom: 1px dashed oklch(85% 0.01 145);
  }

  .item :global(svg) {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
  }

  .label {
    font-weight: 700;
    font-size: 0.85rem;
    line-height: 1.15;
    color: oklch(22% 0.02 145); /* Deep Ink */
  }

  .desc {
    font-size: 0.7rem;
    line-height: 1.15;
    color: oklch(45% 0.02 145);
  }

  .label,
  .desc {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    overflow: hidden;
  }

  @media (max-width: 520px) {
    .item :global(svg) {
      width: 30px;
      height: 30px;
    }
  }

  .item.locked {
    opacity: 0.45;
  }

  .item.locked .label {
    text-decoration: line-through;
  }

  .item.locked .desc {
    color: oklch(50% 0.18 28);
  }

  .disabled {
    position: absolute;
    inset: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem;
    text-align: center;
    font-weight: 700;
    font-size: 0.85rem;
    line-height: 1.3;
    color: #fffdf5;
    background: repeating-linear-gradient(
      -45deg,
      rgba(31, 42, 34, 0.82) 0 12px,
      rgba(31, 42, 34, 0.7) 12px 24px
    );
  }

  .off .arrow {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .off .window {
    cursor: not-allowed;
  }

  .payline {
    position: absolute;
    left: 0;
    right: 0;
    top: calc(var(--item) * 0.55);
    height: var(--item);
    border-top: 3px solid oklch(65% 0.16 75);
    border-bottom: 3px solid oklch(65% 0.16 75);
    box-sizing: border-box;
    pointer-events: none;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }

  @media (prefers-reduced-motion: reduce) {
    .strip {
      transition: none !important;
    }
  }
</style>
