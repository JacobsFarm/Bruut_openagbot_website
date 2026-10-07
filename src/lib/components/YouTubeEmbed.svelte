<script lang="ts">
	// Laadt YouTube pas na een klik: tot die tijd alleen een thumbnail, geen
	// cookies of scripts van Google.
	import PlayIcon from 'phosphor-svelte/lib/PlayIcon';

	let { id, label }: { id: string; label: string } = $props();
	let active = $state(false);
</script>

<div class="yt">
	{#if active}
		<iframe
			src="https://www.youtube-nocookie.com/embed/{id}?autoplay=1&rel=0"
			title={label}
			allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		></iframe>
	{:else}
		<button type="button" onclick={() => (active = true)} aria-label={label}>
			<img src="https://i.ytimg.com/vi/{id}/hqdefault.jpg" alt="" loading="lazy" />
			<span class="play"><PlayIcon size={30} weight="fill" /></span>
		</button>
	{/if}
</div>

<style>
	.yt {
		position: relative;
		aspect-ratio: 16 / 9;
		border-radius: var(--r-lg);
		overflow: hidden;
		background: var(--green-900);
	}

	iframe,
	button,
	img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border: 0;
	}

	button {
		padding: 0;
		background: none;
		cursor: pointer;
	}

	img {
		object-fit: cover;
		transition: transform 0.6s var(--ease);
	}

	button:hover img {
		transform: scale(1.03);
	}

	.play {
		position: absolute;
		left: 50%;
		top: 50%;
		display: grid;
		place-items: center;
		width: 76px;
		height: 76px;
		border-radius: var(--r-pill);
		background: var(--amber);
		color: var(--on-amber);
		transform: translate(-50%, -50%);
		box-shadow: 0 10px 30px oklch(10% 0.02 145 / 0.4);
		transition: transform 0.3s var(--ease);
	}

	button:hover .play {
		transform: translate(-50%, -50%) scale(1.08);
	}
</style>
