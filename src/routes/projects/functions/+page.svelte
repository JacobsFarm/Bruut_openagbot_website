<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { base } from '$app/paths';
	import { t } from '$lib/i18n';
	import { reveal } from '$lib/actions/reveal';
	import { implementList, implementByFunction } from '$lib/data/implements';
	import Emblem from '$lib/components/Emblem.svelte';
	import ArrowRightIcon from 'phosphor-svelte/lib/ArrowRightIcon';
	import CubeIcon from 'phosphor-svelte/lib/CubeIcon';
	import CameraIcon from 'phosphor-svelte/lib/CameraIcon';

	import imgHero from '$lib/assets/implement_liquid_work.webp';
	import imgGrassMeter from '$lib/assets/functions_grass_meter.webp';

	// Cartoon per functie, gegenereerd door scripts/generate-function-cartoons.mjs.
	const cartoons = import.meta.glob('/src/lib/assets/function_cartoons/*.svg', {
		eager: true,
		query: '?url',
		import: 'default'
	}) as Record<string, string>;
	const cartoon = (nr: number) => cartoons[`/src/lib/assets/function_cartoons/func_${nr}.svg`];

	const msg = m as unknown as Record<string, () => string>;
	const text = (key: string) => msg[key]?.() ?? '';

	// Volgorde en indeling zoals in messages/*/functions.json.
	const categories = [
		{ id: 1, items: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
		{ id: 2, items: [10, 11] },
		{ id: 3, items: [12, 13, 14, 38] },
		{ id: 4, items: [15, 16, 17] },
		{ id: 5, items: [18, 19, 20] },
		{ id: 6, items: [21, 22, 23, 24, 44] },
		{ id: 7, items: [25, 26, 27, 28, 29, 30, 31, 32] },
		{ id: 8, items: [33, 34, 35] },
		{ id: 9, items: [36, 37, 39, 40, 41, 42, 43] }
	];

	const total = categories.reduce((n, c) => n + c.items.length, 0);

	// Echte foto's gaan voor; anders de render uit FreeCAD; anders de cartoon.
	const photos: Record<number, { src: string; alt: () => string }> = {
		33: { src: imgGrassMeter, alt: m.func_grass_meter_alt }
	};

	let expanded = $state<Record<number, boolean>>({});
</script>

<svelte:head>
	<title>{m.func_meta_title()}</title>
	<meta name="description" content={m.func_meta_desc()} />
</svelte:head>

<section class="hero">
	<div class="wrap hero-grid">
		<div class="hero-copy">
			<Emblem kind="functions" size={64} />
			<h1>{m.func_hero_title()}</h1>
			<p class="lead">{m.func_hero_subtitle()}</p>
			<dl class="stats">
				<div><dt class="display">{total}</dt><dd>{m.func_stat_functions()}</dd></div>
				<div><dt class="display">{categories.length}</dt><dd>{m.func_stat_categories()}</dd></div>
				<div><dt class="display">{implementList.length}</dt><dd>{m.func_stat_freecad()}</dd></div>
			</dl>
		</div>
		<div class="plate hero-plate">
			<img src={imgHero} alt={m.func_hero_alt()} width="1053" height="685" fetchpriority="high" />
		</div>
	</div>
</section>

<section class="section featured" aria-labelledby="featured-title">
	<div class="wrap">
		<header class="sec-head" use:reveal>
			<h2 id="featured-title">{m.func_featured_title()}</h2>
			<p class="lead">{m.func_featured_desc()}</p>
		</header>

		<ul class="featured-grid" role="list">
			{#each implementList as item, i (item.slug)}
				<li class:big={i < 2} use:reveal={i}>
					<a href="{base}/projects/functions/{item.slug}">
						<div class="plate f-plate">
							<img src={item.hero} alt={t(item.name)} loading="lazy" />
						</div>
						<div class="f-body">
							<span class="f-cat">{t(item.category)}</span>
							<h3 class="display">{t(item.name)}</h3>
							<p>{t(item.short)}</p>
							<span class="f-foot">
								{#if item.variants.length > 1}
									<span class="chip">{m.func_variants_count({ count: item.variants.length })}</span>
								{/if}
								{#if item.clips.length}
									<span class="chip">{m.impl_motion_title()}</span>
								{/if}
								<ArrowRightIcon class="f-arrow" size={22} />
							</span>
						</div>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>

<nav class="jump" aria-label={m.func_jump_label()}>
	<div class="wrap jump-row">
		{#each categories as cat}
			<a href="#cat-{cat.id}">{text(`func_cat_${cat.id}_title`)}</a>
		{/each}
	</div>
</nav>

<section class="all" aria-label={m.func_all_title()}>
	<div class="wrap">
		{#each categories as cat}
			<section class="category" id="cat-{cat.id}" aria-labelledby="cat-{cat.id}-title">
				<header class="cat-head" use:reveal>
					<h2 id="cat-{cat.id}-title">{text(`func_cat_${cat.id}_title`)}</h2>
					<span class="count num">{cat.items.length}</span>
				</header>

				<ul class="cards" role="list">
					{#each cat.items as nr, i (nr)}
						{@const impl = implementByFunction.get(nr)}
						{@const photo = photos[nr]}
						{@const title = text(`func_${nr}_title`)}
						<li class="card" use:reveal={i % 3}>
							{#if impl}
								<div class="plate media">
									<img src={impl.hero} alt={t(impl.name)} loading="lazy" />
								</div>
							{:else if photo}
								<div class="media photo">
									<img src={photo.src} alt={photo.alt()} loading="lazy" />
								</div>
							{:else}
								<div class="media art">
									<img src={cartoon(nr)} alt="" loading="lazy" />
								</div>
							{/if}

							<div class="body">
								{#if impl}
									<span class="chip chip-brand"><CubeIcon size={14} weight="bold" />{m.func_badge_freecad()}</span>
								{:else if photo}
									<span class="chip"><CameraIcon size={14} weight="bold" />{m.func_badge_photo()}</span>
								{/if}
								<h3>{title}</h3>
								<p class="desc" class:open={expanded[nr]} id="desc-{nr}">{text(`func_${nr}_desc`)}</p>
								{#if text(`func_${nr}_desc`).length > 230}
									<button
										type="button"
										class="more"
										aria-expanded={!!expanded[nr]}
										aria-controls="desc-{nr}"
										onclick={() => (expanded[nr] = !expanded[nr])}
									>
										{expanded[nr] ? m.func_read_less() : m.func_read_more()}
									</button>
								{/if}
								{#if impl}
									<a class="btn btn-green design-link" href="{base}/projects/functions/{impl.slug}">
										{m.func_view_design()}
										<ArrowRightIcon size={16} weight="bold" />
									</a>
								{/if}
							</div>
						</li>
					{/each}
				</ul>
			</section>
		{/each}
	</div>
</section>

<style>
	.hero {
		padding-block: clamp(2.5rem, 6vw, 4.5rem) clamp(1rem, 3vw, 2rem);
	}

	.hero-grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
		gap: clamp(2rem, 5vw, 4rem);
		align-items: center;
	}

	.hero-copy {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1.3rem;
	}

	.stats {
		display: flex;
		gap: 2.2rem;
		margin: 0.6rem 0 0;
	}

	.stats div {
		display: flex;
		flex-direction: column;
	}

	.stats dt {
		font-size: 2.8rem;
		line-height: 0.95;
		color: var(--brand-text);
	}

	.stats dd {
		margin: 0;
		font-size: 0.9rem;
		color: var(--ink-3);
	}

	.hero-plate {
		aspect-ratio: 4 / 3;
		padding: 1rem;
	}

	/* Uitgelicht */
	.sec-head {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 2.2rem;
	}

	.featured-grid {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(6, minmax(0, 1fr));
		gap: 1rem;
	}

	.featured-grid li {
		grid-column: span 2;
	}

	.featured-grid li.big {
		grid-column: span 3;
	}

	.featured-grid a {
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: 0.6rem;
		border-radius: var(--r-lg);
		border: 1px solid var(--line);
		background: var(--surface);
		color: var(--ink);
		text-decoration: none;
		transition:
			transform 0.35s var(--ease),
			box-shadow 0.35s var(--ease);
	}

	.featured-grid a:hover {
		transform: translateY(-3px);
		box-shadow: var(--shadow-md);
	}

	.f-plate {
		aspect-ratio: 4 / 3;
		padding: 0.8rem;
		border-radius: var(--r-md);
	}

	.big .f-plate {
		aspect-ratio: 16 / 10;
	}

	.f-plate img {
		transition: transform 0.6s var(--ease);
	}

	.featured-grid a:hover .f-plate img {
		transform: scale(1.04);
	}

	.f-body {
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
		flex: 1;
		padding: 1rem 0.8rem 0.6rem;
	}

	.f-cat {
		font-size: 0.82rem;
		color: var(--ink-3);
	}

	.f-body h3 {
		font-size: 2.1rem;
		line-height: 1;
		font-weight: 400;
	}

	.big .f-body h3 {
		font-size: 2.6rem;
	}

	.f-body p {
		color: var(--ink-2);
		font-size: 0.97rem;
	}

	.f-foot {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		margin-top: auto;
		padding-top: 0.6rem;
	}

	.f-foot :global(.f-arrow) {
		margin-left: auto;
		color: var(--ink-3);
		transition:
			transform 0.3s var(--ease),
			color 0.2s ease;
	}

	.featured-grid a:hover :global(.f-arrow) {
		color: var(--brand-text);
		transform: translateX(4px);
	}

	/* Categorie-navigatie */
	.jump {
		position: sticky;
		top: var(--nav-h);
		z-index: calc(var(--z-nav) - 1);
		background: color-mix(in oklch, var(--bg) 90%, transparent);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border-block: 1px solid var(--line);
	}

	.jump-row {
		display: flex;
		gap: 0.4rem;
		overflow-x: auto;
		padding-block: 0.65rem;
		scrollbar-width: none;
	}

	.jump-row::-webkit-scrollbar {
		display: none;
	}

	.jump a {
		flex-shrink: 0;
		padding: 0.42rem 0.9rem;
		border-radius: var(--r-pill);
		border: 1px solid var(--line-strong);
		font-size: 0.88rem;
		font-weight: 550;
		color: var(--ink-2);
		text-decoration: none;
		white-space: nowrap;
		transition:
			border-color 0.2s ease,
			color 0.2s ease;
	}

	.jump a:hover {
		border-color: var(--ink);
		color: var(--ink);
	}

	/* Alle functies */
	.all {
		padding-block: clamp(2.5rem, 5vw, 4rem) clamp(4rem, 8vw, 6rem);
	}

	.category {
		scroll-margin-top: calc(var(--nav-h) + 4rem);
		padding-block: clamp(1.5rem, 3vw, 2.5rem);
	}

	.cat-head {
		display: flex;
		align-items: baseline;
		gap: 0.8rem;
		margin-bottom: 1.4rem;
		padding-bottom: 0.8rem;
		border-bottom: 2px solid var(--ink);
	}

	.cat-head h2 {
		font-size: clamp(2rem, 3.6vw, 2.8rem);
	}

	.count {
		font-weight: 650;
		color: var(--ink-3);
	}

	.cards {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
	}

	.card {
		display: flex;
		flex-direction: column;
		border-radius: var(--r-lg);
		border: 1px solid var(--line);
		background: var(--surface);
		overflow: hidden;
	}

	.media {
		aspect-ratio: 16 / 10;
		border-radius: 0;
	}

	.media.plate {
		padding: 0.8rem;
	}

	.media.photo img,
	.media.art img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.body {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.55rem;
		flex: 1;
		padding: 1.1rem 1.2rem 1.3rem;
	}

	.body h3 {
		font-size: 1.08rem;
	}

	.desc {
		font-size: 0.95rem;
		line-height: 1.55;
		color: var(--ink-2);
		display: -webkit-box;
		-webkit-line-clamp: 5;
		line-clamp: 5;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.desc.open {
		display: block;
		-webkit-line-clamp: unset;
		line-clamp: unset;
	}

	.more {
		padding: 0;
		border: 0;
		background: none;
		color: var(--brand-text);
		font: 600 0.9rem/1.4 var(--font-body);
		cursor: pointer;
		text-decoration: underline;
		text-underline-offset: 0.2em;
	}

	.design-link {
		margin-top: auto;
		min-height: 42px;
		padding: 0.55rem 1.05rem;
		font-size: 0.92rem;
	}

	@media (max-width: 1100px) {
		.cards {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.featured-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.featured-grid li,
		.featured-grid li.big {
			grid-column: span 1;
		}

		.featured-grid li:first-child {
			grid-column: 1 / -1;
		}
	}

	@media (max-width: 767px) {
		.hero-grid {
			grid-template-columns: minmax(0, 1fr);
		}

		.cards,
		.featured-grid {
			grid-template-columns: minmax(0, 1fr);
		}

		.featured-grid li:first-child {
			grid-column: auto;
		}
	}
</style>
