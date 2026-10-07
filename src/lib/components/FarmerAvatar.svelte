<script module lang="ts">
	export type FarmerKind = 'organic-visionary' | 'organic-engineer' | 'founder-dev' | 'grower-mechanic' | 'gps-pioneer';
</script>

<script lang="ts">
	// Getekende portretten van de boeren in het team, elk met een kenmerk van
	// hun specialiteit. Er zijn (nog) geen foto's; dit zijn geen gelijkenissen.

	type Props = { kind: FarmerKind; size?: number };
	let { kind, size = 112 }: Props = $props();

	const id = $props.id();

	const look: Record<FarmerKind, { bg: string; skin: string; shirt: string }> = {
		'organic-visionary': { bg: 'oklch(90% 0.04 145)', skin: 'oklch(83% 0.055 60)', shirt: 'oklch(52% 0.07 195)' },
		'organic-engineer': { bg: 'oklch(90% 0.035 75)', skin: 'oklch(72% 0.075 55)', shirt: 'oklch(34% 0.03 250)' },
		'founder-dev': { bg: 'oklch(91% 0.03 195)', skin: 'oklch(85% 0.05 45)', shirt: '#386938' },
		'grower-mechanic': { bg: 'oklch(91% 0.045 100)', skin: 'oklch(77% 0.07 62)', shirt: 'oklch(92% 0.02 90)' },
		'gps-pioneer': { bg: 'oklch(88% 0.03 160)', skin: 'oklch(52% 0.075 45)', shirt: 'oklch(32% 0.015 145)' }
	};

	const c = $derived(look[kind]);
	const ink = 'oklch(24% 0.02 60)';
</script>

<svg width={size} height={size} viewBox="0 0 120 120" aria-hidden="true" class="farmer">
	<defs>
		<clipPath id="clip-{id}">
			<circle cx="60" cy="60" r="60" />
		</clipPath>
	</defs>
	<g clip-path="url(#clip-{id})">
		<rect width="120" height="120" fill={c.bg} />

		<!-- schouders en hals -->
		<path d="M12 126 C14 97 35 87 60 87 C85 87 106 97 108 126 Z" fill={c.shirt} />
		<path d="M51 70 h18 v17 c-5 4 -13 4 -18 0 Z" fill={c.skin} />
		<path d="M51 74 h18 v6 c-6 3 -12 3 -18 0 Z" fill="oklch(20% 0.03 50 / 0.16)" />

		{#if kind === 'organic-visionary'}
			<path d="M47 88 l13 12 l13 -12" fill="none" stroke="oklch(40% 0.06 195)" stroke-width="3" stroke-linejoin="round" />
			<path d="M78 108 c0 -6.5 5 -10 11 -10 c0 6.5 -4.5 10 -11 10 z" fill="oklch(68% 0.11 140)" />
			<path d="M78.5 107.5 l7 -6" stroke="oklch(40% 0.08 145)" stroke-width="1.4" />
		{:else if kind === 'organic-engineer'}
			<path d="M44 89 l16 14 l16 -14" fill="none" stroke="oklch(24% 0.02 250)" stroke-width="3.2" stroke-linejoin="round" />
			<rect x="70" y="102" width="15" height="13" rx="2" fill="oklch(28% 0.025 250)" />
			<path d="M74 97 v12" stroke="oklch(70% 0.14 60)" stroke-width="2.6" stroke-linecap="round" />
		{:else if kind === 'founder-dev'}
			<path d="M50 87 l10 9 l10 -9 v-2 h-20 z" fill="oklch(30% 0.05 145)" />
			<rect x="69" y="99" width="20" height="14" rx="3" fill="oklch(97% 0.008 145)" />
			<path d="M75 103 l-3 3 l3 3 M83 103 l3 3 l-3 3 M80.6 101.8 l-2.2 8.4" fill="none" stroke="#386938" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
		{:else if kind === 'grower-mechanic'}
			<path d="M42 126 V100 h36 v26 Z" fill="oklch(46% 0.08 250)" />
			<path d="M34 92 L44 101 M86 92 L76 101" stroke="oklch(46% 0.08 250)" stroke-width="6" stroke-linecap="round" />
			<circle cx="45.5" cy="103" r="2" fill="oklch(78% 0.12 80)" />
			<circle cx="74.5" cy="103" r="2" fill="oklch(78% 0.12 80)" />
			<rect x="52" y="108" width="16" height="11" rx="2" fill="oklch(40% 0.08 250)" />
			<path d="M56 113 v-9" stroke="oklch(72% 0.01 250)" stroke-width="3" stroke-linecap="round" />
			<circle cx="56" cy="103" r="3.2" fill="none" stroke="oklch(72% 0.01 250)" stroke-width="2.2" />
		{:else if kind === 'gps-pioneer'}
			<path d="M24 126 C26 104 32 96 46 92 L52 126 Z M96 126 C94 104 88 96 74 92 L68 126 Z" fill="oklch(82% 0.15 98)" />
			<path d="M27 110 h22 M71 110 h22" stroke="oklch(93% 0.01 90)" stroke-width="4" />
		{/if}

		<!-- hoofd -->
		<ellipse cx="41" cy="58" rx="4.5" ry="6.5" fill={c.skin} />
		<ellipse cx="79" cy="58" rx="4.5" ry="6.5" fill={c.skin} />
		<ellipse cx="60" cy="55" rx="19" ry="22.5" fill={c.skin} />

		{#if kind === 'organic-visionary'}
			<path d="M41 57 C42 76 50 81 60 81 C70 81 78 76 79 57 C76 66 71 70 60 70 C49 70 44 66 41 57 Z" fill="oklch(52% 0.05 60)" />
		{/if}

		<!-- gezicht -->
		<circle cx="53" cy="56.5" r="2.1" fill={ink} />
		<circle cx="67" cy="56.5" r="2.1" fill={ink} />
		<path d="M48.5 50.5 q4.5 -2.2 9 0 M62.5 50.5 q4.5 -2.2 9 0" fill="none" stroke={ink} stroke-width="1.8" stroke-linecap="round" />
		<path d="M60 58.5 q-2.4 5 0.8 6" fill="none" stroke="oklch(20% 0.03 50 / 0.35)" stroke-width="1.6" stroke-linecap="round" />
		<path
			d="M54 67 q6 4.6 12 0"
			fill="none"
			stroke={kind === 'organic-visionary' ? 'oklch(92% 0.02 60)' : ink}
			stroke-width="2"
			stroke-linecap="round"
		/>

		<!-- haar en hoofddeksels -->
		{#if kind === 'organic-visionary'}
			<path d="M37.5 49 C35.5 33 48 26 61 26 C75 26 86 33 82.5 49 Z" fill="oklch(42% 0.04 60)" />
			<path d="M36.5 49 Q60 56 83.5 49 L82.5 45.5 Q60 52 37.5 45.5 Z" fill="oklch(34% 0.035 60)" />
		{:else if kind === 'organic-engineer'}
			<path d="M39 48 C38 31 49 24 60 24 C72 24 82 31 81 48 Z" fill="oklch(60% 0.12 48)" />
			<rect x="37.5" y="42" width="45" height="9" rx="4" fill="oklch(52% 0.11 45)" />
			<rect x="46.5" y="52.5" width="12" height="8.5" rx="2.6" fill="oklch(98% 0 0 / 0.25)" stroke={ink} stroke-width="1.9" />
			<rect x="61.5" y="52.5" width="12" height="8.5" rx="2.6" fill="oklch(98% 0 0 / 0.25)" stroke={ink} stroke-width="1.9" />
			<path d="M58.5 56 h3 M46.5 55.5 l-5.5 -1 M73.5 55.5 l5.5 -1" stroke={ink} stroke-width="1.8" stroke-linecap="round" />
		{:else if kind === 'founder-dev'}
			<path d="M40.5 53 C38.5 36 48 28.5 60.5 28.5 C73.5 28.5 82 36 79.5 53 C77.5 44 73 39.5 66.5 39 C59 41.5 51.5 41 46 39.5 C43 43 41.5 48 40.5 53 Z" fill="oklch(76% 0.1 85)" />
			<circle cx="53.5" cy="56.5" r="6" fill="oklch(98% 0 0 / 0.2)" stroke={ink} stroke-width="1.8" />
			<circle cx="66.5" cy="56.5" r="6" fill="oklch(98% 0 0 / 0.2)" stroke={ink} stroke-width="1.8" />
			<path d="M59.5 56 h1 M47.5 55.5 l-6 -1.2 M72.5 55.5 l6 -1.2" stroke={ink} stroke-width="1.8" stroke-linecap="round" />
		{:else if kind === 'grower-mechanic'}
			<path d="M41.5 52 c-1 -5 0 -8 3 -10 l1 9 Z M78.5 52 c1 -5 0 -8 -3 -10 l-1 9 Z" fill="oklch(38% 0.04 50)" />
			<ellipse cx="60" cy="43.5" rx="35" ry="7.5" fill="oklch(80% 0.09 85)" />
			<path d="M44 44 C44 30 50 25 60 25 C70 25 76 30 76 44 Z" fill="oklch(83% 0.09 88)" />
			<rect x="44" y="37" width="32" height="5.5" fill="oklch(52% 0.11 40)" />
			<path d="M28 44.5 q32 6 64 0" fill="none" stroke="oklch(70% 0.08 80)" stroke-width="1.4" />
		{:else if kind === 'gps-pioneer'}
			<path d="M40 49 C39 34 49 27 60 27 C72 27 81 34 80 49 Z" fill="oklch(30% 0.05 145)" />
			<path d="M38 48 Q60 57 82 48 Q85 52 80.5 54.5 Q60 61 39.5 54.5 Q35 52 38 48 Z" fill="oklch(24% 0.04 145)" />
			<path d="M54 28 a6 4.5 0 0 1 12 0 Z" fill="oklch(95% 0.005 145)" />
			<path d="M60 35 c-3 0 -5 2.2 -5 4.8 c0 3.5 5 7.6 5 7.6 s5 -4.1 5 -7.6 c0 -2.6 -2 -4.8 -5 -4.8 Z" fill="oklch(78% 0.14 80)" />
			<circle cx="60" cy="39.8" r="1.7" fill="oklch(30% 0.05 145)" />
		{/if}
	</g>
</svg>

<style>
	.farmer {
		border-radius: 50%;
		flex-shrink: 0;
	}
</style>
