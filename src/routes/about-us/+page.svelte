<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { reveal } from '$lib/actions/reveal';
	import TeamGrid from '$lib/components/TeamGrid.svelte';
	import ArrowUpRightIcon from 'phosphor-svelte/lib/ArrowUpRightIcon';
	import imgWorkshop from '$lib/assets/robotbuild (5).webp';

	const principles = [
		{ title: m.about_us_opensource_title, text: m.about_us_opensource_text },
		{ title: m.about_us_independence_title, text: m.about_us_independence_text },
		{ title: m.about_us_reality_title, text: m.about_us_reality_text },
		{ title: m.about_us_community_title, text: m.about_us_community_text }
	];
</script>

<svelte:head>
	<title>{m.about_us_meta_title()}</title>
	<meta name="description" content={m.about_us_meta_desc()} />
</svelte:head>

<section class="hero">
	<div class="wrap hero-grid">
		<div class="hero-copy">
			<h1>{m.about_us_title()}</h1>
			<p class="lead">{m.about_us_intro()}</p>
		</div>
		<figure class="hero-photo">
			<img src={imgWorkshop} alt={m.about_us_photo_alt()} width="1600" height="1205" fetchpriority="high" />
		</figure>
	</div>
</section>

<section class="section principles">
	<div class="wrap">
		<h2 use:reveal>{m.about_us_principles_title()}</h2>
		<ul class="grid" role="list">
			{#each principles as p, i}
				<li use:reveal={i % 2}>
					<h3 class="display">{p.title()}</h3>
					<p>{p.text()}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<section class="section team">
	<div class="wrap">
		<h2 use:reveal>{m.about_us_team_title()}</h2>
		<TeamGrid />
	</div>
</section>

<section class="section end">
	<div class="wrap">
		<div class="cta" use:reveal>
			<div>
				<h2>{m.about_us_conclusion_title()}</h2>
				<p class="lead">{m.about_us_conclusion()}</p>
			</div>
			<a class="btn btn-primary" href="https://github.com/JacobsFarm/Bruut_OpenAgbot" target="_blank" rel="noopener noreferrer">
				{m.about_us_github_button()}
				<ArrowUpRightIcon size={18} weight="bold" />
			</a>
		</div>
	</div>
</section>

<style>
	.hero {
		padding-block: clamp(2.5rem, 6vw, 4.5rem) clamp(1rem, 3vw, 2rem);
	}

	.hero-grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		gap: clamp(2rem, 5vw, 4rem);
		align-items: center;
	}

	.hero-copy {
		display: flex;
		flex-direction: column;
		gap: 1.3rem;
	}

	.hero-photo {
		margin: 0;
		border-radius: var(--r-lg);
		overflow: hidden;
	}

	.hero-photo img {
		width: 100%;
		aspect-ratio: 4 / 3;
		object-fit: cover;
	}

	h2 {
		margin-bottom: 2rem;
	}

	.grid {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 2.5rem 3.5rem;
	}

	.grid li {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		padding-top: 1.4rem;
		border-top: 2px solid var(--ink);
	}

	.grid h3 {
		font-size: clamp(2rem, 3.4vw, 2.8rem);
		font-weight: 400;
		line-height: 1;
	}

	.grid p {
		color: var(--ink-2);
		max-width: 56ch;
	}

	.team {
		padding-top: 0;
	}

	.end {
		padding-top: 0;
	}

	.cta {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		justify-content: space-between;
		gap: 2rem;
		padding: clamp(2rem, 5vw, 3.5rem);
		border-radius: var(--r-lg);
		background: var(--brand-soft);
	}

	.cta > div {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.cta h2 {
		margin: 0;
	}

	@media (max-width: 1023px) {
		.hero-grid {
			grid-template-columns: minmax(0, 1fr);
		}
	}

	@media (max-width: 767px) {
		.grid {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
