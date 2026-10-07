<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { base } from '$app/paths';
	import { t } from '$lib/i18n';
	import { reveal } from '$lib/actions/reveal';
	import { implementBySlug, implementList, type Shot } from '$lib/data/implements';
	import LoopVideo from '$lib/components/LoopVideo.svelte';
	import ArrowLeftIcon from 'phosphor-svelte/lib/ArrowLeftIcon';
	import ArrowRightIcon from 'phosphor-svelte/lib/ArrowRightIcon';
	import ArrowUpRightIcon from 'phosphor-svelte/lib/ArrowUpRightIcon';
	import CheckIcon from 'phosphor-svelte/lib/CheckIcon';
	import WrenchIcon from 'phosphor-svelte/lib/WrenchIcon';
	import XIcon from 'phosphor-svelte/lib/XIcon';

	let { data } = $props();

	const item = $derived(implementBySlug.get(data.slug)!);
	const next = $derived(implementList[(implementList.indexOf(item) + 1) % implementList.length]);

	let dialog: HTMLDialogElement;
	let shown = $state<Shot | null>(null);

	function open(shot: Shot) {
		shown = shot;
		dialog.showModal();
	}
</script>

<svelte:head>
	<title>{t(item.name)} | Bruut OpenAgbot</title>
	<meta name="description" content={t(item.lead)} />
</svelte:head>

<article>
	<section class="hero">
		<div class="wrap">
			<a class="back" href="{base}/projects/functions">
				<ArrowLeftIcon size={16} weight="bold" />
				{m.impl_back()}
			</a>

			<div class="hero-grid">
				<div class="hero-copy">
					<span class="eyebrow">{t(item.category)}</span>
					<h1>{t(item.name)}</h1>
					<p class="lead">{t(item.lead)}</p>
					<div class="chips">
						<span class="chip chip-brand">{m.impl_status()}</span>
						{#if item.variants.length > 1}
							<span class="chip">{m.func_variants_count({ count: item.variants.length })}</span>
						{/if}
					</div>
					<a class="btn btn-primary" href={item.repoPath} target="_blank" rel="noopener noreferrer">
						{m.impl_github()}
						<ArrowUpRightIcon size={18} weight="bold" />
					</a>
				</div>
				<div class="plate hero-plate">
					<img src={item.hero} alt={t(item.name)} fetchpriority="high" />
				</div>
			</div>
		</div>
	</section>

	<section class="section figures" aria-labelledby="figures-title">
		<div class="wrap">
			<h2 id="figures-title" class="visually-hidden">{m.impl_figures_title()}</h2>
			<dl class="fig-grid">
				{#each item.figures as fig, i}
					<div class="fig" use:reveal={i % 3}>
						<dt>{t(fig.label)}</dt>
						<dd class="fig-value num">{t(fig.value)}</dd>
						{#if fig.note}<dd class="note">{t(fig.note)}</dd>{/if}
					</div>
				{/each}
			</dl>
		</div>
	</section>

	{#if item.clips.length || item.chart}
		<section class="section motion">
			<div class="wrap">
				<h2 use:reveal>{item.clips.length ? m.impl_motion_title() : m.impl_chart_title()}</h2>
				<div class="motion-grid" class:single={item.clips.length + (item.chart ? 1 : 0) === 1}>
					{#each item.clips as clip}
						<figure use:reveal>
							<LoopVideo src={clip.src} poster={clip.poster} label={t(clip.caption)} ratio={item.slug === 'dock-weed-drill' ? '8 / 5' : '3 / 2'} />
							<figcaption>{t(clip.caption)}</figcaption>
						</figure>
					{/each}
					{#if item.chart}
						<figure use:reveal>
							<button type="button" class="plate chart" onclick={() => open(item.chart!)} aria-label={m.ui_enlarge({ caption: t(item.chart.caption) })}>
								<img src={item.chart.src} alt={t(item.chart.caption)} loading="lazy" />
							</button>
							<figcaption>{t(item.chart.caption)}</figcaption>
						</figure>
					{/if}
				</div>
			</div>
		</section>
	{/if}

	<section class="section how">
		<div class="wrap">
			<h2 use:reveal>{m.impl_how_title()}</h2>
			<ol class="steps" role="list">
				{#each item.steps as step, i}
					<li use:reveal={i}>
						<h3 class="display">{t(step.title)}</h3>
						<p>{t(step.body)}</p>
					</li>
				{/each}
			</ol>
		</div>
	</section>

	{#if item.variants.length}
		<section class="section variants">
			<div class="wrap">
				<h2 use:reveal>{m.impl_variants_title()}</h2>
				<div class="variant-grid" style:--cols={item.variants.length}>
					{#each item.variants as variant, i}
						<article class="variant" use:reveal={i}>
							<div class="plate v-plate">
								<img src={variant.image} alt={t(variant.name)} loading="lazy" />
							</div>
							<h3 class="display">{t(variant.name)}</h3>
							<ul role="list">
								{#each variant.points as point}
									<li><CheckIcon size={16} weight="bold" />{t(point)}</li>
								{/each}
							</ul>
							{#if variant.price}<p class="price">{t(variant.price)}</p>{/if}
						</article>
					{/each}
				</div>
			</div>
		</section>
	{/if}

	<section class="section calcs">
		<div class="wrap">
			<header class="sec-head" use:reveal>
				<h2>{m.impl_calcs_title()}</h2>
				<p class="lead">{m.impl_calcs_desc()}</p>
			</header>
			<div class="calc-grid">
				{#each item.calcs as group, i}
					<section class="calc" use:reveal={i}>
						<h3>{t(group.title)}</h3>
						{#if group.formula}<p class="formula">{group.formula}</p>{/if}
						<dl>
							{#each group.rows as row}
								<div>
									<dt>{t(row.label)}</dt>
									<dd class="num">{t(row.value)}</dd>
								</div>
							{/each}
						</dl>
						{#if group.note}<p class="calc-note">{t(group.note)}</p>{/if}
					</section>
				{/each}
			</div>

			<div class="robot" use:reveal>
				<h3>{m.impl_robot_title()}</h3>
				<ul role="list">
					{#each item.onRobot as line}
						<li><WrenchIcon size={18} />{t(line)}</li>
					{/each}
				</ul>
			</div>
		</div>
	</section>

	{#if item.gallery.length}
		<section class="section gallery">
			<div class="wrap">
				<h2 use:reveal>{m.impl_gallery_title()}</h2>
				<ul class="shots" role="list" style:--gcols={item.gallery.length % 3 === 0 ? 3 : 2}>
					{#each item.gallery as shot, i}
						<li use:reveal={i % 3}>
							<button type="button" class="plate shot" onclick={() => open(shot)} aria-label={m.ui_enlarge({ caption: t(shot.caption) })}>
								<img src={shot.src} alt={t(shot.caption)} loading="lazy" />
							</button>
							<p>{t(shot.caption)}</p>
						</li>
					{/each}
				</ul>
			</div>
		</section>
	{/if}

	<section class="section next-section">
		<div class="wrap">
			<div class="next" use:reveal>
				<div class="next-copy">
					<h2>{m.impl_cta_title()}</h2>
					<p class="lead">{m.impl_cta_desc()}</p>
				</div>
				<a class="next-card" href="{base}/projects/functions/{next.slug}">
					<span class="plate next-plate"><img src={next.hero} alt="" loading="lazy" /></span>
					<span class="next-text">
						<span class="muted">{m.impl_next()}</span>
						<strong class="display">{t(next.name)}</strong>
					</span>
					<ArrowRightIcon size={22} weight="bold" />
				</a>
			</div>
		</div>
	</section>
</article>

<dialog bind:this={dialog} class="lightbox" onclose={() => (shown = null)} onclick={(e) => e.target === dialog && dialog.close()}>
	{#if shown}
		<figure>
			<div class="plate lb-plate"><img src={shown.src} alt={t(shown.caption)} /></div>
			<figcaption>{t(shown.caption)}</figcaption>
		</figure>
	{/if}
	<button type="button" class="lb-close" onclick={() => dialog.close()} aria-label={m.ui_close()}>
		<XIcon size={22} weight="bold" />
	</button>
</dialog>

<style>
	.hero {
		padding-block: clamp(1.5rem, 4vw, 2.5rem) clamp(1rem, 3vw, 2rem);
	}

	.back {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.92rem;
		font-weight: 600;
		color: var(--ink-3);
		text-decoration: none;
		margin-bottom: clamp(1.5rem, 4vw, 2.5rem);
	}

	.back:hover {
		color: var(--ink);
	}

	.hero-grid {
		display: grid;
		grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
		gap: clamp(2rem, 5vw, 4rem);
		align-items: center;
	}

	.hero-copy {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1.2rem;
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.hero-plate {
		aspect-ratio: 4 / 3;
		padding: clamp(1rem, 3vw, 2rem);
	}

	/* Kerngetallen */
	.figures {
		padding-block: clamp(2rem, 4vw, 3rem);
	}

	.fig-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		margin: 0;
		border-top: 2px solid var(--ink);
	}

	.fig {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		padding: 1.4rem 1.4rem 1.6rem 0;
		border-bottom: 1px solid var(--line);
	}

	.fig:not(:nth-child(3n + 1)) {
		padding-left: 1.4rem;
		border-left: 1px solid var(--line);
	}

	.fig dt {
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--ink-2);
	}

	.fig dd {
		margin: 0;
	}

	.fig-value {
		font-size: clamp(1.9rem, 3.2vw, 2.7rem);
		font-weight: 700;
		letter-spacing: -0.025em;
		line-height: 1.1;
		color: var(--brand-text);
		margin-top: 0.35rem !important;
	}

	.fig .note {
		font-size: 0.88rem;
		color: var(--ink-3);
	}

	/* Beweging */
	.motion {
		background: var(--bg-alt);
	}

	.motion h2,
	.how h2,
	.variants h2,
	.gallery h2 {
		margin-bottom: 2rem;
	}

	.motion-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1.25rem;
	}

	.motion-grid.single {
		grid-template-columns: minmax(0, 860px);
	}

	.motion-grid figure {
		margin: 0;
	}

	.motion-grid:not(.single) figure:last-child:nth-child(odd) {
		grid-column: 1 / -1;
		width: min(100%, 860px);
		justify-self: center;
	}

	figcaption {
		margin-top: 0.75rem;
		font-size: 0.92rem;
		color: var(--ink-3);
	}

	.chart {
		display: block;
		width: 100%;
		padding: 1rem;
		border: 0;
		cursor: zoom-in;
	}

	/* Werking */
	.steps {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 1.5rem;
	}

	.steps li {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		padding-top: 1.2rem;
		border-top: 2px solid var(--line-strong);
	}

	.steps li:first-child {
		border-top-color: var(--amber);
	}

	.steps h3 {
		font-size: 2rem;
		font-weight: 400;
		line-height: 1;
	}

	.steps p {
		color: var(--ink-2);
		font-size: 0.98rem;
	}

	/* Uitvoeringen */
	.variants {
		padding-top: 0;
	}

	.variant-grid {
		display: grid;
		grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
		gap: 1rem;
	}

	.variant {
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
		padding: 0.6rem 0.6rem 1.4rem;
		border-radius: var(--r-lg);
		border: 1px solid var(--line);
		background: var(--surface);
	}

	.v-plate {
		aspect-ratio: 4 / 3;
		padding: 1rem;
		border-radius: var(--r-md);
	}

	.variant h3 {
		font-size: 2rem;
		font-weight: 400;
		line-height: 1;
		padding-inline: 0.7rem;
	}

	.variant ul {
		list-style: none;
		margin: 0;
		padding: 0 0.7rem;
		display: grid;
		gap: 0.45rem;
	}

	.variant li {
		display: grid;
		grid-template-columns: 16px 1fr;
		gap: 0.6rem;
		align-items: start;
		font-size: 0.95rem;
		color: var(--ink-2);
	}

	.variant li :global(svg) {
		margin-top: 0.3rem;
		color: var(--brand-text);
	}

	.price {
		margin-top: auto;
		padding: 0.8rem 0.7rem 0;
		font-weight: 650;
	}

	/* Berekeningen */
	.calcs {
		background: var(--bg-alt);
	}

	.sec-head {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 2.2rem;
	}

	.calc-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
		gap: 1rem;
	}

	.calc {
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
		padding: 1.5rem;
		border-radius: var(--r-lg);
		background: var(--surface);
	}

	.formula {
		padding: 0.7rem 0.9rem;
		border-radius: 10px;
		background: var(--brand-soft);
		color: var(--brand-text);
		font: 600 1rem/1.4 ui-monospace, 'Cascadia Mono', 'Consolas', monospace;
	}

	.calc dl {
		margin: 0;
		display: grid;
		gap: 0.7rem;
	}

	.calc dl div {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 1rem;
	}

	.calc dt {
		font-size: 0.93rem;
		color: var(--ink-2);
	}

	.calc dd {
		margin: 0;
		font-weight: 700;
		text-align: right;
		white-space: nowrap;
	}

	.calc-note {
		margin-top: auto;
		padding-top: 0.6rem;
		font-size: 0.86rem;
		color: var(--ink-3);
	}

	.robot {
		margin-top: 1rem;
		padding: 1.5rem;
		border-radius: var(--r-lg);
		border: 1.5px dashed var(--line-strong);
	}

	.robot h3 {
		margin-bottom: 0.9rem;
	}

	.robot ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
		gap: 0.8rem 2rem;
	}

	.robot li {
		display: grid;
		grid-template-columns: 18px 1fr;
		gap: 0.7rem;
		color: var(--ink-2);
		font-size: 0.97rem;
	}

	.robot li :global(svg) {
		margin-top: 0.25rem;
		color: var(--brand-text);
	}

	/* Galerij */
	.shots {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(var(--gcols, 3), minmax(0, 1fr));
		gap: 1.2rem 1rem;
	}

	.shot {
		display: block;
		width: 100%;
		aspect-ratio: 4 / 3;
		padding: 0.8rem;
		border: 0;
		cursor: zoom-in;
	}

	.shot img {
		transition: transform 0.6s var(--ease);
	}

	.shot:hover img {
		transform: scale(1.04);
	}

	.shots p {
		margin-top: 0.6rem;
		font-size: 0.9rem;
		color: var(--ink-3);
	}

	/* Volgende */
	.next-section {
		padding-top: 0;
	}

	.next {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		gap: 2rem 3rem;
		align-items: center;
		padding: clamp(1.8rem, 4vw, 3rem);
		border-radius: var(--r-lg);
		background: var(--brand-soft);
	}

	.next-copy {
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
	}

	.next-card {
		display: grid;
		grid-template-columns: 120px 1fr auto;
		align-items: center;
		gap: 1.2rem;
		padding: 0.7rem 1.4rem 0.7rem 0.7rem;
		border-radius: var(--r-lg);
		background: var(--surface);
		color: var(--ink);
		text-decoration: none;
		transition:
			transform 0.3s var(--ease),
			box-shadow 0.3s var(--ease);
	}

	.next-card:hover {
		transform: translateY(-3px);
		box-shadow: var(--shadow-md);
	}

	.next-plate {
		width: 120px;
		height: 96px;
		padding: 0.4rem;
		border-radius: var(--r-md);
	}

	.next-text {
		display: flex;
		flex-direction: column;
	}

	.next-text .muted {
		font-size: 0.85rem;
	}

	.next-text strong {
		font-weight: 400;
		font-size: 2rem;
		line-height: 1;
	}

	/* Lightbox */
	.lightbox {
		width: min(1200px, 94vw);
		max-height: 92dvh;
		padding: 1rem;
		border: 0;
		border-radius: var(--r-lg);
		background: var(--surface);
		color: var(--ink);
	}

	.lightbox::backdrop {
		background: oklch(15% 0.02 145 / 0.78);
		backdrop-filter: blur(4px);
	}

	.lightbox figure {
		margin: 0;
	}

	.lb-plate {
		max-height: calc(92dvh - 6rem);
		padding: 1rem;
		display: grid;
		place-items: center;
	}

	.lb-plate img {
		max-height: calc(92dvh - 8rem);
		width: auto;
	}

	.lb-close {
		position: absolute;
		top: 1.6rem;
		right: 1.6rem;
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
		border-radius: var(--r-pill);
		border: 0;
		background: oklch(22% 0.02 145 / 0.78);
		color: oklch(98% 0.005 145);
		cursor: pointer;
	}

	@media (max-width: 1023px) {
		.hero-grid,
		.next {
			grid-template-columns: minmax(0, 1fr);
		}

		.steps {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 2rem 1.5rem;
		}

		.variant-grid {
			grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
		}
	}

	@media (max-width: 767px) {
		.fig-grid {
			grid-template-columns: 1fr 1fr;
		}

		.fig:not(:nth-child(3n + 1)) {
			padding-left: 0;
			border-left: 0;
		}

		.fig {
			padding: 1.1rem 0.8rem 1.2rem 0;
		}

		.fig:nth-child(even) {
			padding-left: 1rem;
			border-left: 1px solid var(--line);
		}

		.motion-grid,
		.shots,
		.steps {
			grid-template-columns: minmax(0, 1fr);
		}

		.next-card {
			grid-template-columns: 84px minmax(0, 1fr) auto;
			gap: 0.9rem;
			padding-right: 1rem;
		}

		.next-text strong {
			font-size: 1.6rem;
			overflow-wrap: anywhere;
		}

		.next-plate {
			width: 84px;
			height: 70px;
		}
	}
</style>
