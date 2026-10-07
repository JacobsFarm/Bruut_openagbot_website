<script module lang="ts">
	export type EmblemKind = 'build' | 'functions' | 'goal' | 'configurator';
</script>

<script lang="ts">
	// Beeldmerken voor de vier hoofdonderdelen van de site.
	// build: zijaanzicht van het gatenbalkframe op twee wielunits met hubmotor
	// functions: bovenaanzicht van de robot met een aanbouwdeel erachter
	// goal: een kiemplant boven de akker, met zon
	// configurator: drie schuiven die elk een andere keuze vasthouden

	type Props = { kind: EmblemKind; size?: number; tile?: boolean; title?: string };
	let { kind, size = 64, tile = true, title }: Props = $props();
</script>

<svg
	class="emblem"
	class:tile
	width={size}
	height={size}
	viewBox="0 0 64 64"
	role={title ? 'img' : undefined}
	aria-hidden={title ? undefined : 'true'}
	aria-label={title}
	fill="none"
	stroke-linecap="round"
	stroke-linejoin="round"
>
	{#if tile}
		<rect class="bg" x="0" y="0" width="64" height="64" rx="16" />
	{/if}

	{#if kind === 'build'}
		<rect class="ln" x="8" y="17" width="48" height="10" rx="2" />
		<circle class="dot" cx="15.5" cy="22" r="1.9" />
		<circle class="dot" cx="25.5" cy="22" r="1.9" />
		<circle class="dot" cx="38.5" cy="22" r="1.9" />
		<circle class="dot" cx="48.5" cy="22" r="1.9" />
		<path class="ln" d="M13 27v8M19 27v8M45 27v8M51 27v8" />
		<circle class="ln" cx="16" cy="44" r="8.5" />
		<circle class="ln" cx="48" cy="44" r="8.5" />
		<circle class="acc" cx="16" cy="44" r="3" />
		<circle class="acc" cx="48" cy="44" r="3" />
		<path class="ln thin" d="M28 44h8" />
	{:else if kind === 'functions'}
		<rect class="ln" x="19" y="8" width="26" height="30" rx="3" />
		<rect class="ln" x="13" y="10" width="5" height="9" rx="1.5" />
		<rect class="ln" x="46" y="10" width="5" height="9" rx="1.5" />
		<rect class="ln" x="13" y="27" width="5" height="9" rx="1.5" />
		<rect class="ln" x="46" y="27" width="5" height="9" rx="1.5" />
		<circle class="dot" cx="32" cy="16" r="2" />
		<path class="ln" d="M26 38v8M38 38v8" />
		<path class="acc-ln" d="M11 47h42" />
		<path class="acc-ln" d="M15 47v8M23.5 47v8M32 47v8M40.5 47v8M49 47v8" />
	{:else if kind === 'goal'}
		<circle class="acc" cx="47" cy="17" r="6" />
		<path class="ln" d="M32 46V27" />
		<path class="ln fill" d="M32 34c-7 0-12-4-13-11 7-1 12 3 13 11z" />
		<path class="ln fill" d="M32 29c1-8 6-12 14-11-1 8-6 11-14 11z" />
		<path class="ln" d="M8 47c8-3 16-4 24-4s16 1 24 4" />
		<path class="ln thin" d="M10 54c7-2.4 14.5-3.4 22-3.4S47 51.6 54 54" />
	{:else if kind === 'configurator'}
		<path class="ln" d="M20 12v40M32 12v40M44 12v40" />
		<circle class="knob" cx="20" cy="36" r="5" />
		<circle class="knob" cx="32" cy="21" r="5" />
		<circle class="acc" cx="44" cy="41" r="5" />
	{/if}
</svg>

<style>
	.emblem {
		flex-shrink: 0;
		--em-line: currentColor;
		--em-acc: var(--amber);
		--em-bg: var(--brand);
	}

	.emblem.tile {
		--em-line: oklch(98% 0.005 145);
	}

	.bg {
		fill: var(--em-bg);
	}

	.ln {
		stroke: var(--em-line);
		stroke-width: 2.6;
	}

	.ln.thin {
		stroke-width: 2;
		opacity: 0.7;
	}

	.ln.fill {
		fill: var(--em-line);
		fill-opacity: 0.16;
	}

	.dot {
		fill: var(--em-line);
	}

	.acc {
		fill: var(--em-acc);
	}

	.acc-ln {
		stroke: var(--em-acc);
		stroke-width: 2.8;
	}

	.knob {
		fill: var(--em-bg);
		stroke: var(--em-line);
		stroke-width: 2.6;
	}

	.emblem:not(.tile) .knob {
		fill: var(--bg);
	}
</style>
