<script lang="ts">
	// Een FreeCAD-animatie als stille, herhalende video. Hij laadt pas als hij
	// bijna in beeld is en pauzeert buiten beeld. Met "minder beweging" aan
	// blijft het posterbeeld staan en start de bezoeker hem zelf.
	import { onMount } from 'svelte';
	import PlayIcon from 'phosphor-svelte/lib/PlayIcon';
	import PauseIcon from 'phosphor-svelte/lib/PauseIcon';
	import * as m from '$lib/paraglide/messages';

	type Props = {
		src: string;
		poster: string;
		label: string;
		/** Gestuurd van buitenaf (carrousel): speel alleen als dit true is. */
		active?: boolean;
		loop?: boolean;
		onended?: () => void;
		ratio?: string;
	};

	let { src, poster, label, active = true, loop = true, onended, ratio = '3 / 2' }: Props = $props();

	let video: HTMLVideoElement;
	let visible = $state(false);
	let loaded = $state(false);
	let reduced = $state(false);
	let userPaused = $state(false);
	let playing = $state(false);

	onMount(() => {
		reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		userPaused = reduced;
		const io = new IntersectionObserver(
			([entry]) => {
				visible = entry.isIntersecting;
				if (visible) loaded = true;
			},
			{ rootMargin: '200px 0px' }
		);
		io.observe(video);
		return () => io.disconnect();
	});

	$effect(() => {
		if (!video || !loaded) return;
		if (visible && active && !userPaused) {
			video.play().catch(() => {});
		} else {
			video.pause();
		}
	});

	$effect(() => {
		if (active && video && !loop) video.currentTime = 0;
	});

	function toggle() {
		userPaused = !userPaused;
		loaded = true;
	}
</script>

<div class="frame">
	<video
		bind:this={video}
		src={loaded ? src : undefined}
		{poster}
		muted
		playsinline
		{loop}
		preload="none"
		style:aspect-ratio={ratio}
		aria-label={label}
		onplay={() => (playing = true)}
		onpause={() => (playing = false)}
		onended={() => onended?.()}
	></video>
	<button
		type="button"
		class="toggle"
		onclick={toggle}
		aria-label={playing ? m.ui_pause_animation() : m.ui_play_animation()}
	>
		{#if playing}
			<PauseIcon size={18} weight="fill" />
		{:else}
			<PlayIcon size={18} weight="fill" />
		{/if}
	</button>
</div>

<style>
	.frame {
		position: relative;
		background: var(--plate);
		border-radius: var(--r-lg);
		overflow: hidden;
	}

	video {
		width: 100%;
		object-fit: cover;
	}

	.toggle {
		position: absolute;
		right: 0.75rem;
		bottom: 0.75rem;
		display: grid;
		place-items: center;
		width: 40px;
		height: 40px;
		border-radius: var(--r-pill);
		border: 0;
		background: oklch(22% 0.02 145 / 0.72);
		color: oklch(98% 0.005 145);
		cursor: pointer;
		backdrop-filter: blur(6px);
		transition: transform 0.2s var(--ease);
	}

	.toggle:hover {
		transform: scale(1.06);
	}
</style>
