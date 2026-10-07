<script module lang="ts">
	export type Slide = {
		src: string;
		poster: string;
		title: string;
		text: string;
		href: string;
		ratio?: string;
	};
</script>

<script lang="ts">
	// Carrousel met FreeCAD-animaties. Elke animatie speelt één keer af en
	// daarna schuift hij door naar de volgende; met "minder beweging" aan
	// speelt er niets vanzelf en kies je zelf met de knoppen.
	import { fade } from 'svelte/transition';
	import * as m from '$lib/paraglide/messages';
	import { base } from '$app/paths';
	import CaretLeftIcon from 'phosphor-svelte/lib/CaretLeftIcon';
	import CaretRightIcon from 'phosphor-svelte/lib/CaretRightIcon';
	import ArrowRightIcon from 'phosphor-svelte/lib/ArrowRightIcon';
	import LoopVideo from './LoopVideo.svelte';

	let { slides }: { slides: Slide[] } = $props();

	let index = $state(0);
	const slide = $derived(slides[index]);

	const go = (step: number) => (index = (index + step + slides.length) % slides.length);
</script>

<div class="carousel" role="region" aria-roledescription="carousel" aria-label={m.ui_animations()}>
	<div class="stage">
		{#key index}
			<div class="slide" in:fade={{ duration: 450 }}>
				<LoopVideo
					src={slide.src}
					poster={slide.poster}
					label={slide.title}
					loop={false}
					ratio={slide.ratio ?? '3 / 2'}
					onended={() => go(1)}
				/>
			</div>
		{/key}
	</div>

	<div class="caption" aria-live="polite">
		<div class="text">
			<h3>{slide.title}</h3>
			<p>{slide.text}</p>
		</div>
		<a class="link-arrow" href="{base}{slide.href}">
			{m.ui_view_design()}
			<ArrowRightIcon size={18} weight="bold" />
		</a>
	</div>

	<div class="controls">
		<div class="dots">
			{#each slides as s, i}
				<button
					type="button"
					class="dot"
					class:active={i === index}
					aria-label={s.title}
					aria-current={i === index}
					onclick={() => (index = i)}
				></button>
			{/each}
		</div>
		<div class="arrows">
			<button type="button" class="arrow" onclick={() => go(-1)} aria-label={m.ui_prev()}>
				<CaretLeftIcon size={18} weight="bold" />
			</button>
			<button type="button" class="arrow" onclick={() => go(1)} aria-label={m.ui_next()}>
				<CaretRightIcon size={18} weight="bold" />
			</button>
		</div>
	</div>
</div>

<style>
	.carousel {
		display: grid;
		gap: 1rem;
	}

	.stage {
		display: grid;
	}

	.slide {
		grid-area: 1 / 1;
	}

	.caption {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 1rem 2rem;
		min-height: 4.5rem;
	}

	.caption h3 {
		font-size: 1.15rem;
	}

	.caption p {
		margin-top: 0.2rem;
		color: var(--ink-2);
		font-size: 0.95rem;
		max-width: 52ch;
	}

	.caption .link-arrow {
		flex-shrink: 0;
		white-space: nowrap;
	}

	.controls {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	.dots {
		display: flex;
		gap: 0.4rem;
	}

	.dot {
		width: 28px;
		height: 6px;
		padding: 0;
		border: 0;
		border-radius: var(--r-pill);
		background: var(--line-strong);
		cursor: pointer;
		transition:
			width 0.4s var(--ease),
			background-color 0.2s ease;
	}

	.dot.active {
		width: 52px;
		background: var(--brand);
	}

	.arrows {
		display: flex;
		gap: 0.5rem;
	}

	.arrow {
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
		border-radius: var(--r-pill);
		border: 1.5px solid var(--line-strong);
		background: transparent;
		color: var(--ink);
		cursor: pointer;
		transition:
			border-color 0.2s ease,
			transform 0.2s var(--ease);
	}

	.arrow:hover {
		border-color: var(--ink);
	}

	.arrow:active {
		transform: scale(0.95);
	}

	@media (max-width: 640px) {
		.caption {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
