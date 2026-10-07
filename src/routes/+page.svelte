<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { base } from '$app/paths';
	import { t } from '$lib/i18n';
	import { reveal } from '$lib/actions/reveal';
	import { channel, videos } from '$lib/youtube';
	import { implementList, implementsRepo } from '$lib/data/implements';
	import ArrowRightIcon from 'phosphor-svelte/lib/ArrowRightIcon';
	import ArrowUpRightIcon from 'phosphor-svelte/lib/ArrowUpRightIcon';

	import Emblem from '$lib/components/Emblem.svelte';
	import VersionsCompare from '$lib/components/VersionsCompare.svelte';
	import AnimationCarousel, { type Slide } from '$lib/components/AnimationCarousel.svelte';
	import TeamGrid from '$lib/components/TeamGrid.svelte';
	import VideoCard from '$lib/components/VideoCard.svelte';

	import imgHero from '$lib/assets/robotbuild_prototype_field_2.webp';
	import imgHeroCad from '$lib/assets/robot_agbot_rear_right.webp';
	import imgOrigin from '$lib/assets/front_page_intro_picture.webp';
	import imgWorkshop from '$lib/assets/robotbuild (3).webp';
	import imgLiquid from '$lib/assets/implement_liquid_work.webp';
	import imgFeed from '$lib/assets/implement_feedpusher_work.webp';
	import imgOverseeder from '$lib/assets/implement_overseeder_work.webp';

	import vidRobot from '$lib/assets/video/robot_drive_turn.mp4';
	import posterRobot from '$lib/assets/robot_drive_turn_poster.webp';
	import vidFeed from '$lib/assets/video/implement_feedpusher_clean.mp4';
	import posterFeed from '$lib/assets/implement_feedpusher_clean_poster.webp';
	import vidLiquid from '$lib/assets/video/implement_liquid_adv.mp4';
	import posterLiquid from '$lib/assets/implement_liquid_adv_poster.webp';
	import vidDock from '$lib/assets/video/implement_dockweed.mp4';
	import posterDock from '$lib/assets/implement_dockweed_poster.webp';

	const bySlug = (slug: string) => implementList.find((i) => i.slug === slug)!;

	const slides: Slide[] = [
		{
			src: vidFeed,
			poster: posterFeed,
			title: t(bySlug('feed-pusher').name),
			text: t(bySlug('feed-pusher').short),
			href: '/projects/functions/feed-pusher'
		},
		{
			src: vidLiquid,
			poster: posterLiquid,
			title: t(bySlug('liquid-fertilizer').name),
			text: t(bySlug('liquid-fertilizer').short),
			href: '/projects/functions/liquid-fertilizer'
		},
		{
			src: vidDock,
			poster: posterDock,
			title: t(bySlug('dock-weed-drill').name),
			text: t(bySlug('dock-weed-drill').short),
			href: '/projects/functions/dock-weed-drill',
			ratio: '8 / 5'
		},
		{
			src: vidRobot,
			poster: posterRobot,
			title: m.front_page_slide_robot_title(),
			text: m.front_page_slide_robot_text(),
			href: '/projects/robotbuild'
		}
	];

	const facts = [
		{ value: '100%', label: m.front_page_fact_1() },
		{ value: '48-60 V', label: m.front_page_fact_2() },
		{ value: '4', label: m.front_page_fact_3() },
		{ value: '44', label: m.front_page_fact_4() }
	];

	const latestVideos = videos.slice(0, 3);
</script>

<svelte:head>
	<title>{m.front_page_meta_title()}</title>
	<meta name="description" content={m.front_page_meta_desc()} />
</svelte:head>

<!-- Hero -->
<section class="hero">
	<div class="wrap hero-grid">
		<div class="hero-copy">
			<span class="eyebrow">{m.front_page_hero_eyebrow()}</span>
			<h1>{m.front_page_hero_title()}</h1>
			<p class="lead">{m.front_page_hero_desc()}</p>
			<div class="actions">
				<a class="btn btn-primary" href="{base}/projects/functions">
					{m.front_page_hero_cta_primary()}
					<ArrowRightIcon size={18} weight="bold" />
				</a>
				<a class="btn btn-ghost" href="{base}/projects/robotbuild">{m.front_page_hero_cta_secondary()}</a>
			</div>
		</div>

		<figure class="hero-media">
			<div class="photo">
				<img src={imgHero} alt={m.front_page_hero_alt()} width="1600" height="1205" fetchpriority="high" />
			</div>
			<div class="plate inset">
				<img src={imgHeroCad} alt={m.front_page_hero_cad_alt()} width="739" height="646" />
			</div>
			<figcaption>{m.front_page_hero_caption()}</figcaption>
		</figure>
	</div>
</section>

<!-- Kerngetallen -->
<section class="facts" aria-label={m.front_page_facts_label()}>
	<ul class="wrap facts-row" role="list">
		{#each facts as fact, i}
			<li use:reveal={i}>
				<span class="display fact-value">{fact.value}</span>
				<span class="fact-label">{fact.label}</span>
			</li>
		{/each}
	</ul>
</section>

<!-- Ingangen -->
<section class="section start">
	<div class="wrap">
		<h2 use:reveal>{m.front_page_start_title()}</h2>

		<div class="bento">
			<a class="cell cell-functions" href="{base}/projects/functions" use:reveal>
				<div class="cell-top">
					<Emblem kind="functions" size={60} />
					<ArrowUpRightIcon class="cell-arrow" size={24} />
				</div>
				<h3>{m.nav_functions()}</h3>
				<p>{m.front_page_card_functions()}</p>
				<div class="strip" aria-hidden="true">
					{#each [imgLiquid, imgFeed, imgOverseeder] as src}
						<div class="plate"><img {src} alt="" loading="lazy" /></div>
					{/each}
				</div>
			</a>

			<a class="cell cell-build" href="{base}/projects/robotbuild" use:reveal={1}>
				<div class="cell-text">
					<div class="cell-top">
						<Emblem kind="build" size={52} />
						<ArrowUpRightIcon class="cell-arrow" size={24} />
					</div>
					<h3>{m.nav_build()}</h3>
					<p>{m.front_page_card_build()}</p>
				</div>
				<img class="cell-photo" src={imgWorkshop} alt={m.front_page_card_build_alt()} loading="lazy" />
			</a>

			<a class="cell cell-goal" href="{base}/projects/goal" use:reveal={2}>
				<div class="cell-top">
					<Emblem kind="goal" size={52} />
					<ArrowUpRightIcon class="cell-arrow" size={24} />
				</div>
				<h3>{m.nav_goal()}</h3>
				<p>{m.front_page_card_goal()}</p>
			</a>

			<a class="cell cell-config" href="{base}/projects/configurator" use:reveal={3}>
				<div class="cell-top">
					<Emblem kind="configurator" size={52} />
					<ArrowUpRightIcon class="cell-arrow" size={24} />
				</div>
				<h3>{m.nav_configurator()}</h3>
				<p>{m.front_page_card_configurator()}</p>
			</a>
		</div>
	</div>
</section>

<!-- Vier versies -->
<section class="section versions-section" id="versies">
	<div class="wrap">
		<header class="sec-head" use:reveal>
			<h2>{m.front_page_versions_title()}</h2>
			<p class="lead">{m.front_page_versions_desc()}</p>
		</header>
		<VersionsCompare />
		<a class="link-arrow more" href="{base}/projects/robotbuild#versies">
			{m.front_page_versions_more()}
			<ArrowRightIcon size={18} weight="bold" />
		</a>
	</div>
</section>

<!-- Aanbouwdelen -->
<section class="section implements">
	<div class="wrap impl-grid">
		<div class="impl-media" use:reveal>
			<AnimationCarousel {slides} />
		</div>

		<div class="impl-copy">
			<span class="eyebrow" use:reveal>{m.front_page_impl_eyebrow()}</span>
			<h2 use:reveal>{m.front_page_impl_title()}</h2>
			<p class="lead" use:reveal>{m.front_page_impl_desc()}</p>

			<ul class="impl-list" role="list">
				{#each implementList as item, i (item.slug)}
					<li use:reveal={i}>
						<a href="{base}/projects/functions/{item.slug}">
							<span class="plate thumb"><img src={item.hero} alt="" loading="lazy" /></span>
							<span class="impl-text">
								<strong>{t(item.name)}</strong>
								<span>{t(item.short)}</span>
							</span>
							<ArrowRightIcon class="impl-arrow" size={20} />
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<!-- Oorsprong -->
<section class="section origin">
	<div class="wrap origin-grid">
		<figure class="origin-photo" use:reveal>
			<img src={imgOrigin} alt={m.front_page_origin_alt()} loading="lazy" width="1920" height="1280" />
		</figure>
		<div class="origin-copy">
			<h2 use:reveal>{m.front_page_origin_title()}</h2>
			<p class="lead" use:reveal>{m.front_page_origin_p1()}</p>
			<p use:reveal>{m.front_page_origin_p2()}</p>
			<a class="link-arrow" href="{base}/projects/goal" use:reveal>
				{m.front_page_origin_cta()}
				<ArrowRightIcon size={18} weight="bold" />
			</a>
		</div>
	</div>
</section>

<!-- Team -->
<section class="section team-section">
	<div class="wrap">
		<header class="sec-head" use:reveal>
			<h2>{m.front_page_team_title()}</h2>
			<p class="lead">{m.front_page_team_desc()}</p>
		</header>
		<TeamGrid />
	</div>
</section>

<!-- YouTube -->
{#if latestVideos.length > 0}
	<section class="section youtube">
		<div class="wrap">
			<header class="yt-head">
				<div use:reveal>
					<h2>{m.front_page_youtube_title()}</h2>
					<p class="lead">{m.front_page_youtube_desc()}</p>
				</div>
				<div class="yt-actions" use:reveal={1}>
					<a class="btn btn-green" href="{base}/videos">{m.front_page_youtube_cta()}</a>
					<a class="btn btn-ghost" href={channel.subscribeUrl} target="_blank" rel="noopener noreferrer">
						{m.front_page_youtube_subscribe()}
					</a>
				</div>
			</header>
			<div class="yt-grid">
				{#each latestVideos as video, i (video.id)}
					<div use:reveal={i}>
						<VideoCard {video} latest={i === 0} />
					</div>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- Meedoen -->
<section class="section join-section">
	<div class="wrap">
		<div class="join" use:reveal>
			<div>
				<h2>{m.front_page_join_title()}</h2>
				<p class="lead">{m.front_page_join_desc()}</p>
			</div>
			<div class="join-actions">
				<a class="btn btn-primary" href={implementsRepo} target="_blank" rel="noopener noreferrer">
					{m.front_page_join_cta_github()}
					<ArrowUpRightIcon size={18} weight="bold" />
				</a>
				<a class="btn btn-ghost" href="mailto:info@projectbruut.nl?subject=Partner%20Bruut">{m.front_page_join_cta_partner()}</a>
			</div>
		</div>
	</div>
</section>

<style>
	/* Hero */
	.hero {
		padding-block: clamp(2.5rem, 6vw, 5rem) clamp(3rem, 6vw, 4.5rem);
	}

	.hero-grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1.08fr);
		align-items: center;
		gap: clamp(2rem, 5vw, 4.5rem);
	}

	.hero-copy {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1.4rem;
	}

	.hero-copy h1 {
		font-size: clamp(3.2rem, 5.4vw, 5.2rem);
		color: var(--ink);
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 0.4rem;
	}

	.hero-media {
		position: relative;
		margin: 0;
		padding-bottom: 2.6rem;
	}

	.photo {
		border-radius: var(--r-lg);
		overflow: hidden;
		box-shadow: var(--shadow-md);
	}

	.photo img {
		width: 100%;
		aspect-ratio: 4 / 3.2;
		object-fit: cover;
	}

	.inset {
		position: absolute;
		left: -2.2rem;
		bottom: 0.4rem;
		width: 36%;
		aspect-ratio: 1 / 0.9;
		padding: 0.6rem;
		border: 4px solid var(--bg);
		box-shadow: var(--shadow-md);
	}

	.hero-media figcaption {
		position: absolute;
		left: calc(36% - 0.8rem);
		right: 0;
		bottom: 0;
		padding-left: 1rem;
		font-size: 0.85rem;
		line-height: 1.4;
		color: var(--ink-3);
	}

	/* Feiten */
	.facts {
		border-block: 1px solid var(--line);
		background: var(--bg-alt);
	}

	.facts-row {
		list-style: none;
		margin-block: 0;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
	}

	.facts-row li {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		padding: 1.8rem 1.5rem 1.8rem 0;
	}

	.facts-row li + li {
		padding-left: 1.5rem;
		border-left: 1px solid var(--line);
	}

	.fact-value {
		font-size: clamp(2.6rem, 4vw, 3.4rem);
		line-height: 0.9;
		color: var(--brand-text);
	}

	.fact-label {
		font-size: 0.95rem;
		color: var(--ink-2);
		max-width: 26ch;
	}

	/* Bento */
	.start h2 {
		margin-bottom: 2rem;
	}

	.bento {
		display: grid;
		grid-template-columns: 1.25fr 1fr;
		grid-template-rows: repeat(3, auto);
		gap: 1rem;
	}

	.cell {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		padding: clamp(1.4rem, 2.4vw, 2rem);
		border-radius: var(--r-lg);
		border: 1px solid var(--line);
		background: var(--surface);
		color: var(--ink);
		text-decoration: none;
		overflow: hidden;
		transition:
			transform 0.35s var(--ease),
			box-shadow 0.35s var(--ease),
			border-color 0.2s ease;
	}

	.cell:hover {
		transform: translateY(-3px);
		box-shadow: var(--shadow-md);
		border-color: var(--line-strong);
	}

	.cell h3 {
		font-family: var(--font-display);
		font-weight: 400;
		font-size: clamp(2rem, 3vw, 2.6rem);
		line-height: 1;
		margin-top: 0.6rem;
	}

	.cell p {
		color: var(--ink-2);
		max-width: 44ch;
	}

	.cell-top {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}

	.cell :global(.cell-arrow) {
		color: var(--ink-3);
		transition:
			transform 0.3s var(--ease),
			color 0.2s ease;
	}

	.cell:hover :global(.cell-arrow) {
		color: var(--brand-text);
		transform: translate(3px, -3px);
	}

	.cell-functions {
		grid-row: 1 / span 3;
	}

	.cell-functions h3 {
		font-size: clamp(2.6rem, 4vw, 3.6rem);
	}

	.strip {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.6rem;
		margin-top: auto;
		padding-top: 1.5rem;
	}

	.strip .plate {
		aspect-ratio: 4 / 3;
		padding: 0.6rem;
		border-radius: var(--r-md);
	}

	.strip .plate:first-child {
		grid-column: 1 / -1;
		aspect-ratio: 16 / 8;
	}

	.cell-build {
		flex-direction: row;
		gap: 1.2rem;
		padding-right: 0;
		padding-block: 0;
	}

	.cell-build .cell-text {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		flex: 1;
		padding-block: clamp(1.4rem, 2.4vw, 2rem);
	}

	.cell-photo {
		width: 38%;
		object-fit: cover;
		align-self: stretch;
	}

	.cell-goal {
		background: var(--brand-soft);
		border-color: transparent;
	}

	.cell-config {
		background-color: var(--bg-alt);
		background-image: radial-gradient(circle, var(--line-strong) 1.6px, transparent 2px);
		background-size: 22px 22px;
		background-position: right -11px top -11px;
	}

	/* Versies */
	.sec-head {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 2.4rem;
	}

	.versions-section {
		padding-top: 0;
	}

	.more {
		margin-top: 1.4rem;
	}

	/* Aanbouwdelen */
	.implements {
		background: var(--bg-alt);
	}

	.impl-grid {
		display: grid;
		grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
		gap: clamp(2rem, 5vw, 4.5rem);
		align-items: start;
	}

	.impl-copy {
		display: flex;
		flex-direction: column;
		gap: 1.1rem;
	}

	.impl-list {
		list-style: none;
		margin: 0.6rem 0 0;
		padding: 0;
		display: grid;
		gap: 0.5rem;
	}

	.impl-list a {
		display: grid;
		grid-template-columns: 72px 1fr auto;
		align-items: center;
		gap: 1rem;
		padding: 0.55rem 1rem 0.55rem 0.55rem;
		border-radius: var(--r-md);
		background: var(--surface);
		color: var(--ink);
		text-decoration: none;
		transition:
			transform 0.3s var(--ease),
			box-shadow 0.3s var(--ease);
	}

	.impl-list a:hover {
		transform: translateX(4px);
		box-shadow: var(--shadow-md);
	}

	.thumb {
		width: 72px;
		height: 60px;
		padding: 4px;
		border-radius: 10px;
	}

	.impl-text {
		display: flex;
		flex-direction: column;
		line-height: 1.35;
	}

	.impl-text span {
		font-size: 0.9rem;
		color: var(--ink-3);
	}

	.impl-list :global(.impl-arrow) {
		color: var(--ink-3);
	}

	.impl-list a:hover :global(.impl-arrow) {
		color: var(--brand-text);
	}

	/* Oorsprong */
	.origin-grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		gap: clamp(2rem, 5vw, 5rem);
		align-items: center;
	}

	.origin-photo {
		margin: 0;
		border-radius: var(--r-lg);
		overflow: hidden;
	}

	.origin-photo img {
		width: 100%;
		aspect-ratio: 5 / 4;
		object-fit: cover;
		object-position: 60% 50%;
	}

	.origin-copy {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1.2rem;
	}

	.origin-copy p:not(.lead) {
		color: var(--ink-2);
		max-width: 60ch;
	}

	/* Team */
	.team-section {
		padding-top: 0;
	}

	/* YouTube */
	.youtube {
		border-top: 1px solid var(--line);
	}

	.yt-head {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 1.5rem 3rem;
		margin-bottom: 2.4rem;
	}

	.yt-head > div:first-child {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.yt-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		flex-shrink: 0;
	}

	.yt-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1.25rem;
	}

	/* Meedoen */
	.join-section {
		padding-top: 0;
	}

	.join {
		display: grid;
		grid-template-columns: minmax(0, 1.4fr) auto;
		align-items: end;
		gap: 2rem 3rem;
		padding: clamp(2rem, 5vw, 3.5rem);
		border-radius: var(--r-lg);
		background: var(--brand-soft);
	}

	.join > div:first-child {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.join-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	/* Responsief */
	@media (max-width: 1023px) {
		.hero-grid,
		.impl-grid,
		.origin-grid {
			grid-template-columns: minmax(0, 1fr);
		}

		.hero-grid {
			min-height: 0;
		}

		.hero-media {
			margin-inline: 0 0;
		}

		.inset {
			left: 1rem;
		}

		.hero-media figcaption {
			left: calc(36% + 1.6rem);
		}

		.bento {
			grid-template-columns: 1fr 1fr;
		}

		.cell-functions {
			grid-column: 1 / -1;
			grid-row: auto;
		}

		.cell-build {
			grid-column: 1 / -1;
		}

		.yt-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.yt-head,
		.join {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
		}
	}

	@media (max-width: 767px) {
		.facts-row {
			grid-template-columns: 1fr 1fr;
		}

		.facts-row li {
			padding: 1.3rem 1rem 1.3rem 0;
		}

		.facts-row li:nth-child(odd) {
			padding-left: 0;
			border-left: 0;
		}

		.facts-row li:nth-child(n + 3) {
			border-top: 1px solid var(--line);
		}

		.bento {
			grid-template-columns: minmax(0, 1fr);
		}

		.cell-build {
			flex-direction: column;
			padding: 0;
		}

		.cell-build .cell-text {
			padding: 1.4rem 1.4rem 0;
		}

		.cell-photo {
			width: 100%;
			aspect-ratio: 16 / 9;
		}

		.yt-grid {
			grid-template-columns: minmax(0, 1fr);
		}

		.inset {
			width: 42%;
			left: 0.75rem;
		}

		.hero-media figcaption {
			position: static;
			padding: 0.75rem 0 0 calc(42% + 1.5rem);
			min-height: 3rem;
		}

		.hero-media {
			padding-bottom: 0;
		}
	}
</style>
