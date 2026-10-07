<script lang="ts">
	// Bovenaanzicht op schaal: alle vier de versies gebruiken hetzelfde vak van
	// 1600 × 2300 mm, dus de XL staat echt groter in beeld. Voorkant boven.
	// Aangedreven wielen (hubmotor) zijn gevuld, standaard wielen open.
	// De voorwielen staan iets ingestuurd: alle versies sturen voor.
	import type { Version } from '$lib/data/versions';

	let { version }: { version: Version } = $props();

	const W = 1600;
	const H = 2300;

	const v = $derived(version);
	const x = $derived(v.track / 2);
	const y = $derived(v.wheelbase / 2);
	const beam = $derived(v.xl ? 60 : 40);
	const frontDriven = $derived(v.drivenWheels === 4);

	const wheels = $derived([
		{ cx: -x, cy: -y, front: true, driven: frontDriven },
		{ cx: x, cy: -y, front: true, driven: frontDriven },
		{ cx: -x, cy: y, front: false, driven: true },
		{ cx: x, cy: y, front: false, driven: true }
	]);
</script>

<svg viewBox="{-W / 2} {-H / 2} {W} {H}" class="diagram" aria-hidden="true">
	<path d="M0 {-H / 2 + 60} l-70 110 h140 Z" class="arrow" />

	<rect x={-x - beam * 1.6} y={-y - beam * 1.8} width={beam * 3.2} height={v.wheelbase + beam * 3.6} rx="10" class="beam" />
	<rect x={x - beam * 1.6} y={-y - beam * 1.8} width={beam * 3.2} height={v.wheelbase + beam * 3.6} rx="10" class="beam" />
	<rect x={-x} y={-y - beam * 1.2} width={v.track} height={beam * 2.4} rx="8" class="beam soft" />
	<rect x={-x} y={y - beam * 1.2} width={v.track} height={beam * 2.4} rx="8" class="beam soft" />

	{#each wheels as w}
		<g transform="translate({w.cx} {w.cy}) rotate({w.front ? (w.cx < 0 ? -14 : -10) : 0})">
			<rect
				x={-v.tireWidth / 2}
				y={-v.tireDia / 2}
				width={v.tireWidth}
				height={v.tireDia}
				rx={v.tireWidth * 0.32}
				class="wheel"
				class:driven={w.driven}
			/>
			{#if w.driven}
				<circle r={v.tireWidth * 0.3} class="motor" />
			{/if}
		</g>
	{/each}
</svg>

<style>
	.diagram {
		width: 100%;
		height: auto;
		overflow: visible;
	}

	.arrow {
		fill: var(--ink-3);
		opacity: 0.55;
	}

	.beam {
		fill: var(--ink-2);
		opacity: 0.85;
	}

	.beam.soft {
		opacity: 0.45;
	}

	.wheel {
		fill: transparent;
		stroke: var(--ink-3);
		stroke-width: 22;
	}

	.wheel.driven {
		fill: var(--brand);
		stroke: var(--brand);
	}

	.motor {
		fill: var(--amber);
	}
</style>
