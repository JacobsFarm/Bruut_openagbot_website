<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { base } from '$app/paths';
	import { reveal } from '$lib/actions/reveal';
	import { channel } from '$lib/youtube';
	import Emblem from '$lib/components/Emblem.svelte';
	import ArrowRightIcon from 'phosphor-svelte/lib/ArrowRightIcon';
	import ArrowUpRightIcon from 'phosphor-svelte/lib/ArrowUpRightIcon';
	import DropSlashIcon from 'phosphor-svelte/lib/DropSlashIcon';
	import CoinsIcon from 'phosphor-svelte/lib/CoinsIcon';
	import HandIcon from 'phosphor-svelte/lib/HandIcon';
	import PlantIcon from 'phosphor-svelte/lib/PlantIcon';

	import imgFrame from '$lib/assets/robotbuild (1).webp';
	import imgRobot from '$lib/assets/functions_grass_meter.webp';
	import imgImplement from '$lib/assets/implement_overseeder_work.webp';

	const story = [
		{ src: imgFrame, plate: false, title: m.goal_story_1_title, desc: m.goal_story_1_desc, alt: m.goal_story_1_alt },
		{ src: imgRobot, plate: false, title: m.goal_story_2_title, desc: m.goal_story_2_desc, alt: m.goal_story_2_alt },
		{ src: imgImplement, plate: true, title: m.goal_story_3_title, desc: m.goal_story_3_desc, alt: m.goal_story_3_alt }
	];

	const problems = [
		{ icon: DropSlashIcon, title: m.goal_problem_1_title, desc: m.goal_problem_1_desc },
		{ icon: CoinsIcon, title: m.goal_problem_2_title, desc: m.goal_problem_2_desc },
		{ icon: HandIcon, title: m.goal_problem_3_title, desc: m.goal_problem_3_desc },
		{ icon: PlantIcon, title: m.goal_problem_4_title, desc: m.goal_problem_4_desc }
	];

	const pillars = [
		{ title: m.goal_feature1_title, desc: m.goal_feature1_desc },
		{ title: m.goal_feature2_title, desc: m.goal_feature2_desc },
		{ title: m.goal_feature3_title, desc: m.goal_feature3_desc }
	];
</script>

<svelte:head>
	<title>{m.goal_meta_title()}</title>
	<meta name="description" content={m.goal_meta_desc()} />
</svelte:head>

<section class="hero">
	<div class="wrap hero-inner">
		<Emblem kind="goal" size={72} />
		<h1>{m.goal_hero_title()}</h1>
		<p class="lead">{m.goal_hero_subtitle()}</p>
	</div>
</section>

<section class="section story">
	<div class="wrap">
		<header class="sec-head" use:reveal>
			<h2>{m.goal_story_title()}</h2>
			<p class="lead">{m.goal_story_desc()}</p>
		</header>
		<ol class="steps" role="list">
			{#each story as step, i}
				<li use:reveal={i}>
					{#if step.plate}
						<div class="plate media"><img src={step.src} alt={step.alt()} loading="lazy" /></div>
					{:else}
						<div class="media photo"><img src={step.src} alt={step.alt()} loading="lazy" /></div>
					{/if}
					<h3 class="display">{step.title()}</h3>
					<p>{step.desc()}</p>
				</li>
			{/each}
		</ol>
	</div>
</section>

<section class="section problems">
	<div class="wrap">
		<h2 use:reveal>{m.goal_problems_title()}</h2>
		<ul class="problem-grid" role="list">
			{#each problems as p, i}
				{@const Icon = p.icon}
				<li use:reveal={i % 2}>
					<span class="p-icon"><Icon size={28} /></span>
					<h3>{p.title()}</h3>
					<p>{p.desc()}</p>
				</li>
			{/each}
		</ul>
		<a class="link-arrow" href="{base}/projects/functions">
			{m.goal_problem_link()}
			<ArrowRightIcon size={18} weight="bold" />
		</a>
	</div>
</section>

<section class="section pillars">
	<div class="wrap">
		<h2 use:reveal>{m.goal_pillars_title()}</h2>
		<ul class="pillar-list" role="list">
			{#each pillars as pillar, i}
				<li use:reveal={i}>
					<h3 class="display">{pillar.title()}</h3>
					<p>{pillar.desc()}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<section class="section cta-section">
	<div class="wrap">
		<div class="cta" use:reveal>
			<div>
				<h2>{m.goal_cta_title()}</h2>
				<p class="lead">{m.goal_cta_desc()}</p>
			</div>
			<div class="cta-actions">
				<a class="btn btn-primary" href="https://github.com/JacobsFarm/Bruut_OpenAgbot" target="_blank" rel="noopener noreferrer">
					{m.goal_cta_github()}
					<ArrowUpRightIcon size={18} weight="bold" />
				</a>
				<a class="btn btn-ghost" href={channel.url} target="_blank" rel="noopener noreferrer">{m.goal_cta_youtube()}</a>
			</div>
		</div>
	</div>
</section>

<style>
	.hero {
		padding-block: clamp(3.5rem, 8vw, 6rem) clamp(1rem, 3vw, 2rem);
	}

	.hero-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.4rem;
		text-align: center;
	}

	.hero-inner h1 {
		max-width: 16ch;
		font-size: clamp(3.2rem, 7vw, 6rem);
	}

	.hero-inner .lead {
		max-width: 56ch;
	}

	.sec-head {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 2.2rem;
	}

	/* Verhaal */
	.steps {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1.2rem;
		counter-reset: step;
	}

	.steps li {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.media {
		aspect-ratio: 4 / 3;
		border-radius: var(--r-lg);
		overflow: hidden;
		margin-bottom: 0.6rem;
	}

	.media.plate {
		padding: 1rem;
	}

	.media.photo img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.steps h3 {
		font-size: 2.2rem;
		font-weight: 400;
		line-height: 1;
	}

	.steps p {
		color: var(--ink-2);
		max-width: 40ch;
	}

	/* Problemen */
	.problems {
		background: var(--bg-alt);
	}

	.problems h2 {
		margin-bottom: 2.2rem;
	}

	.problem-grid {
		list-style: none;
		margin: 0 0 2rem;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
	}

	.problem-grid li {
		display: grid;
		grid-template-columns: 56px 1fr;
		grid-template-rows: auto 1fr;
		column-gap: 1.2rem;
		row-gap: 0.4rem;
		padding: 1.6rem;
		border-radius: var(--r-lg);
		background: var(--surface);
	}

	.p-icon {
		grid-row: 1 / span 2;
		display: grid;
		place-items: center;
		width: 56px;
		height: 56px;
		border-radius: 16px;
		background: var(--brand);
		color: var(--on-brand);
	}

	.problem-grid h3 {
		font-size: 1.25rem;
	}

	.problem-grid p {
		color: var(--ink-2);
	}

	/* Pijlers */
	.pillars h2 {
		margin-bottom: 1.5rem;
	}

	.pillar-list {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.pillar-list li {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
		gap: 1rem 3rem;
		align-items: baseline;
		padding-block: 1.8rem;
		border-top: 1px solid var(--line-strong);
	}

	.pillar-list li:last-child {
		border-bottom: 1px solid var(--line-strong);
	}

	.pillar-list h3 {
		font-size: clamp(2.2rem, 4vw, 3.4rem);
		font-weight: 400;
		line-height: 1;
		color: var(--brand-text);
	}

	.pillar-list p {
		color: var(--ink-2);
		font-size: 1.08rem;
		max-width: 52ch;
	}

	/* Oproep */
	.cta-section {
		padding-top: 0;
	}

	.cta {
		display: grid;
		grid-template-columns: minmax(0, 1.4fr) auto;
		align-items: end;
		gap: 2rem 3rem;
		padding: clamp(2rem, 5vw, 3.5rem);
		border-radius: var(--r-lg);
		background: var(--brand-soft);
	}

	.cta > div:first-child {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.cta-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	@media (max-width: 1023px) {
		.steps {
			grid-template-columns: 1fr 1fr;
		}

		.steps li:last-child {
			grid-column: 1 / -1;
		}

		.cta {
			grid-template-columns: minmax(0, 1fr);
		}
	}

	@media (max-width: 767px) {
		.steps,
		.problem-grid {
			grid-template-columns: minmax(0, 1fr);
		}

		.pillar-list li {
			grid-template-columns: minmax(0, 1fr);
		}

		.problem-grid li {
			grid-template-columns: minmax(0, 1fr);
		}

		.p-icon {
			grid-row: auto;
			margin-bottom: 0.4rem;
		}
	}
</style>
