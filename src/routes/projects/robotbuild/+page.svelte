<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { base } from '$app/paths';
	import { t } from '$lib/i18n';
	import { reveal } from '$lib/actions/reveal';
	import Emblem from '$lib/components/Emblem.svelte';
	import VersionsCompare from '$lib/components/VersionsCompare.svelte';
	import LoopVideo from '$lib/components/LoopVideo.svelte';
	import YouTubeEmbed from '$lib/components/YouTubeEmbed.svelte';
	import ArrowUpRightIcon from 'phosphor-svelte/lib/ArrowUpRightIcon';
	import SteeringWheelIcon from 'phosphor-svelte/lib/SteeringWheelIcon';
	import NavigationArrowIcon from 'phosphor-svelte/lib/NavigationArrowIcon';
	import CameraIcon from 'phosphor-svelte/lib/CameraIcon';
	import GearSixIcon from 'phosphor-svelte/lib/GearSixIcon';
	import DropIcon from 'phosphor-svelte/lib/DropIcon';
	import PlantIcon from 'phosphor-svelte/lib/PlantIcon';
	import LightningIcon from 'phosphor-svelte/lib/LightningIcon';

	import imgPrototype from '$lib/assets/robotbuild_prototype_field.webp';
	import imgPhoto1 from '$lib/assets/robotbuild.webp';
	import imgPhoto2 from '$lib/assets/robotbuild (2).webp';
	import imgPhoto3 from '$lib/assets/robotbuild (3).webp';
	import imgPhoto4 from '$lib/assets/robotbuild (1).webp';
	import imgPhoto5 from '$lib/assets/robotbuild (5).webp';

	import imgRearRight from '$lib/assets/robot_agbot_rear_right.webp';
	import imgFrontLeft from '$lib/assets/robot_agbot_front_left.webp';
	import imgSide from '$lib/assets/robot_agbot_side.webp';
	import imgTop from '$lib/assets/robot_agbot_top.webp';
	import imgRear from '$lib/assets/robot_agbot_rear.webp';
	import imgXl from '$lib/assets/robot_xl_rear_right.webp';
	import imgSteering from '$lib/assets/robot_agbot_steering_unit.webp';
	import imgCompareSide from '$lib/assets/robot_compare_side.webp';
	import imgCompareTop from '$lib/assets/robot_compare_top.webp';

	import vidDrive from '$lib/assets/video/robot_drive_turn.mp4';
	import posterDrive from '$lib/assets/robot_drive_turn_poster.webp';
	import vidCompare from '$lib/assets/video/robot_compare.mp4';
	import posterCompare from '$lib/assets/robot_compare_poster.webp';

	const photos = [
		{ src: imgPhoto1, caption: m.robotbuild_photo_1 },
		{ src: imgPhoto2, caption: m.robotbuild_photo_2 },
		{ src: imgPhoto3, caption: m.robotbuild_photo_3 },
		{ src: imgPhoto4, caption: m.robotbuild_photo_4 },
		{ src: imgPhoto5, caption: m.robotbuild_photo_5 }
	];

	const views = [
		{ src: imgRearRight, label: { nl: 'Achter rechts', en: 'Rear right' } },
		{ src: imgFrontLeft, label: { nl: 'Voor links', en: 'Front left' } },
		{ src: imgSide, label: { nl: 'Zijkant', en: 'Side' } },
		{ src: imgTop, label: { nl: 'Boven', en: 'Top' } },
		{ src: imgRear, label: { nl: 'Achter', en: 'Rear' } },
		{ src: imgXl, label: { nl: 'Agbot XL', en: 'Agbot XL' } }
	];
	let view = $state(0);

	const specs = [
		{ label: { nl: 'Spoorbreedte × wielbasis', en: 'Track × wheelbase' }, value: { nl: '750 × 1.000 mm', en: '750 × 1,000 mm' } },
		{ label: { nl: 'Buitenmaat b × l × h', en: 'Outer size w × l × h' }, value: { nl: '1.000 × 1.432 × 1.032 mm', en: '1,000 × 1,432 × 1,032 mm' } },
		{ label: { nl: 'Band', en: 'Tyre' }, value: { nl: '4.00-8 tractorprofiel, Ø 430', en: '4.00-8 tractor tread, Ø 430' } },
		{ label: { nl: 'Besturing', en: 'Steering' }, value: { nl: 'Ackermann, NEMA 34 + 5:1', en: 'Ackermann, NEMA 34 + 5:1' } },
		{ label: { nl: 'Draaicirkel', en: 'Turning radius' }, value: { nl: '2,1 m bij 25°', en: '2.1 m at 25°' } },
		{ label: { nl: 'Interferentiecontrole', en: 'Interference check' }, value: { nl: '80 onderdelen, geen overlap', en: '80 parts, no overlap' } }
	];

	const progress = [
		{ icon: SteeringWheelIcon, title: m.robotbuild_steering_title, desc: m.robotbuild_steering_desc },
		{ icon: NavigationArrowIcon, title: m.robotbuild_ardupilot_title, desc: m.robotbuild_ardupilot_desc },
		{ icon: CameraIcon, title: m.robotbuild_vision_title, desc: m.robotbuild_vision_desc },
		{ icon: GearSixIcon, title: m.robotbuild_steppers_title, desc: m.robotbuild_steppers_desc },
		{ icon: DropIcon, title: m.robotbuild_spot_spraying_title, desc: m.robotbuild_spot_spraying_desc },
		{ icon: PlantIcon, title: m.robotbuild_inrow_title, desc: m.robotbuild_inrow_desc }
	];
</script>

<svelte:head>
	<title>{m.robotbuild_meta_title()}</title>
	<meta name="description" content={m.robotbuild_meta_desc()} />
</svelte:head>

<section class="hero">
	<div class="wrap hero-grid">
		<div class="hero-copy">
			<Emblem kind="build" size={64} />
			<h1>{m.robotbuild_hero_title()}</h1>
			<p class="lead">{m.robotbuild_hero_subtitle()}</p>
			<div class="actions">
				<a class="btn btn-primary" href="https://github.com/JacobsFarm/Bruut_OpenAgbot" target="_blank" rel="noopener noreferrer">
					{m.robotbuild_cta()}
					<ArrowUpRightIcon size={18} weight="bold" />
				</a>
				<a class="btn btn-ghost" href="#versies">{m.robotbuild_cta_versions()}</a>
			</div>
		</div>
		<figure class="hero-photo">
			<img src={imgPrototype} alt={m.robotbuild_prototype_alt()} width="1280" height="720" fetchpriority="high" />
		</figure>
	</div>
</section>

<section class="section workshop">
	<div class="wrap">
		<header class="sec-head" use:reveal>
			<h2>{m.robotbuild_workshop_title()}</h2>
			<p class="lead">{m.robotbuild_workshop_desc()}</p>
		</header>
	</div>
	<ul class="photo-row" role="list">
		{#each photos as photo, i}
			<li use:reveal={i}>
				<img src={photo.src} alt={photo.caption()} loading="lazy" />
				<p>{photo.caption()}</p>
			</li>
		{/each}
	</ul>
</section>

<section class="section cad">
	<div class="wrap cad-grid">
		<div class="cad-viewer" use:reveal>
			<div class="plate cad-plate">
				{#key view}
					<img src={views[view].src} alt="{m.robotbuild_cad_title()}: {t(views[view].label)}" />
				{/key}
			</div>
			<div class="view-tabs" role="group" aria-label={m.robotbuild_cad_views()}>
				{#each views as v, i}
					<button type="button" class:on={i === view} aria-pressed={i === view} onclick={() => (view = i)}>
						<span class="plate tab-plate"><img src={v.src} alt="" loading="lazy" /></span>
						<span>{t(v.label)}</span>
					</button>
				{/each}
			</div>
		</div>
		<div class="cad-copy">
			<h2 use:reveal>{m.robotbuild_cad_title()}</h2>
			<p class="lead" use:reveal>{m.robotbuild_cad_desc()}</p>
			<dl class="specs" use:reveal>
				{#each specs as spec}
					<div>
						<dt>{t(spec.label)}</dt>
						<dd>{t(spec.value)}</dd>
					</div>
				{/each}
			</dl>
		</div>
	</div>
</section>

<section class="section blocks">
	<div class="wrap">
		<h2 use:reveal>{m.robotbuild_blocks_title()}</h2>
		<div class="bento">
			<article class="cell cell-video" use:reveal>
				<LoopVideo src={vidDrive} poster={posterDrive} label={m.robotbuild_steer_title()} />
				<div class="cell-text">
					<h3>{m.robotbuild_steer_title()}</h3>
					<p>{m.robotbuild_steer_desc()}</p>
				</div>
			</article>

			<article class="cell" use:reveal={1}>
				<div class="plate cell-plate"><img src={imgTop} alt="" loading="lazy" /></div>
				<h3>{m.robotbuild_frame_title()}</h3>
				<p>{m.robotbuild_frame_desc()}</p>
			</article>

			<article class="cell" use:reveal={0}>
				<div class="plate cell-plate"><img src={imgSide} alt="" loading="lazy" /></div>
				<h3>{m.robotbuild_wheelunit_title()}</h3>
				<p>{m.robotbuild_wheelunit_desc()}</p>
			</article>

			<article class="cell" use:reveal={1}>
				<div class="plate cell-plate"><img src={imgSteering} alt="" loading="lazy" class="cover" /></div>
				<h3>{m.robotbuild_steerhead_title()}</h3>
				<p>{m.robotbuild_steerhead_desc()}</p>
			</article>

			<article class="cell cell-power" use:reveal={2}>
				<LightningIcon size={40} weight="duotone" />
				<h3>{m.robotbuild_maintenance_title()}</h3>
				<p>{m.robotbuild_maintenance_desc()}</p>
			</article>

			<article class="cell cell-laser" use:reveal>
				<p class="display laser-value">€ 214</p>
				<div>
					<h3>{m.robotbuild_laser_label()}</h3>
					<p>{m.robotbuild_laser_desc()}</p>
				</div>
			</article>
		</div>
	</div>
</section>

<section class="section versions" id="versies">
	<div class="wrap">
		<header class="sec-head" use:reveal>
			<h2>{m.robotbuild_versions_title()}</h2>
			<p class="lead">{m.robotbuild_versions_desc()}</p>
		</header>
		<VersionsCompare />

		<div class="compare">
			<figure class="compare-video" use:reveal>
				<LoopVideo src={vidCompare} poster={posterCompare} label={m.robotbuild_compare_video()} ratio="88 / 54" />
				<figcaption>{m.robotbuild_compare_video()}</figcaption>
			</figure>
			<figure use:reveal={1}>
				<div class="plate compare-plate"><img src={imgCompareSide} alt={m.robotbuild_compare_side()} loading="lazy" /></div>
				<figcaption>{m.robotbuild_compare_side()}</figcaption>
			</figure>
			<figure use:reveal={2}>
				<div class="plate compare-plate"><img src={imgCompareTop} alt={m.robotbuild_compare_top()} loading="lazy" /></div>
				<figcaption>{m.robotbuild_compare_top()}</figcaption>
			</figure>
		</div>
	</div>
</section>

<section class="section progress">
	<div class="wrap">
		<header class="sec-head" use:reveal>
			<h2>{m.robotbuild_progress_title()}</h2>
			<p class="lead">{m.robotbuild_progress_desc()}</p>
		</header>
		<ul class="progress-grid" role="list">
			{#each progress as item, i}
				{@const Icon = item.icon}
				<li use:reveal={i % 2}>
					<span class="p-icon"><Icon size={26} /></span>
					<div>
						<h3>{item.title()}</h3>
						<p>{item.desc()}</p>
					</div>
				</li>
			{/each}
		</ul>

		<div class="action" use:reveal>
			<YouTubeEmbed id="JFSSVHmUz9o" label={m.robotbuild_play_video()} />
			<div class="action-copy">
				<h3 class="display">{m.robotbuild_action_title()}</h3>
				<p>{m.robotbuild_videos_cta_desc()}</p>
				<a class="btn btn-green" href="{base}/videos">{m.robotbuild_videos_cta_button()}</a>
			</div>
		</div>
	</div>
</section>

<style>
	.hero {
		padding-block: clamp(2.5rem, 6vw, 4.5rem) clamp(1rem, 3vw, 2rem);
	}

	.hero-grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
		gap: clamp(2rem, 5vw, 4rem);
		align-items: center;
	}

	.hero-copy {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1.3rem;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.hero-photo {
		margin: 0;
		border-radius: var(--r-lg);
		overflow: hidden;
		box-shadow: var(--shadow-md);
	}

	.hero-photo img {
		width: 100%;
		aspect-ratio: 16 / 10;
		object-fit: cover;
	}

	.sec-head {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 2.2rem;
	}

	/* Werkplaats */
	.photo-row {
		list-style: none;
		margin: 0;
		display: flex;
		gap: 1rem;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		scrollbar-width: thin;
		scrollbar-color: var(--line-strong) transparent;
		padding: 0 max(var(--gutter), calc((100vw - var(--wrap)) / 2 + var(--gutter))) 1rem;
		scroll-padding-inline: max(var(--gutter), calc((100vw - var(--wrap)) / 2 + var(--gutter)));
	}

	.photo-row li {
		flex: 0 0 clamp(260px, 32vw, 440px);
		scroll-snap-align: start;
	}

	.photo-row img {
		width: 100%;
		aspect-ratio: 4 / 3;
		object-fit: cover;
		border-radius: var(--r-lg);
	}

	.photo-row p {
		margin-top: 0.6rem;
		font-size: 0.9rem;
		color: var(--ink-3);
	}

	/* CAD */
	.cad {
		background: var(--bg-alt);
	}

	.cad-grid {
		display: grid;
		grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
		gap: clamp(2rem, 5vw, 4rem);
		align-items: center;
	}

	.cad-plate {
		aspect-ratio: 4 / 3;
		padding: clamp(1rem, 3vw, 2.5rem);
		background: var(--plate);
	}

	.view-tabs {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: 0.5rem;
		margin-top: 0.75rem;
	}

	.view-tabs button {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.35rem;
		padding: 0.35rem 0.35rem 0.5rem;
		border-radius: var(--r-md);
		border: 1.5px solid transparent;
		background: var(--surface);
		color: var(--ink-3);
		font: 550 0.8rem/1.2 var(--font-body);
		cursor: pointer;
		transition: border-color 0.2s ease;
	}

	.view-tabs button.on {
		border-color: var(--brand);
		color: var(--ink);
	}

	.tab-plate {
		width: 100%;
		aspect-ratio: 4 / 3;
		padding: 0.25rem;
		border-radius: 8px;
	}

	.cad-copy {
		display: flex;
		flex-direction: column;
		gap: 1.2rem;
	}

	.specs {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.6rem;
		margin: 0.4rem 0 0;
	}

	.specs div {
		padding: 0.8rem 0.9rem;
		border-radius: var(--r-md);
		background: var(--surface);
	}

	.specs dt {
		font-size: 0.8rem;
		color: var(--ink-3);
	}

	.specs dd {
		margin: 0.15rem 0 0;
		font-weight: 650;
		font-size: 0.97rem;
	}

	/* Bouwstenen */
	.blocks h2 {
		margin-bottom: 2rem;
	}

	.bento {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
	}

	.cell {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		padding: 0.6rem 0.6rem 1.4rem;
		border-radius: var(--r-lg);
		border: 1px solid var(--line);
		background: var(--surface);
	}

	.cell h3,
	.cell p {
		padding-inline: 0.8rem;
	}

	.cell h3 {
		margin-top: 0.4rem;
	}

	.cell p {
		color: var(--ink-2);
		font-size: 0.97rem;
	}

	.cell-plate {
		aspect-ratio: 16 / 10;
		padding: 1rem;
		border-radius: var(--r-md);
	}

	.cell-plate img.cover {
		object-fit: cover;
	}

	.cell-plate:has(.cover) {
		padding: 0;
	}

	.cell-video {
		grid-column: span 2;
		display: grid;
		grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
		align-items: center;
		gap: 1rem;
		padding: 0.6rem;
	}

	.cell-video .cell-text {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.cell-power {
		justify-content: flex-end;
		padding: 1.6rem 0.8rem 1.4rem;
		background: var(--brand-soft);
		border-color: transparent;
		color: var(--brand-text);
	}

	.cell-power :global(svg) {
		margin-left: 0.8rem;
		margin-bottom: auto;
	}

	.cell-power h3 {
		color: var(--ink);
	}

	.cell-laser {
		grid-column: 1 / -1;
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		gap: 1rem 2.5rem;
		padding: clamp(1.4rem, 3vw, 2.2rem);
		background-color: var(--bg-alt);
		background-image: radial-gradient(circle, var(--line-strong) 1.6px, transparent 2px);
		background-size: 22px 22px;
		border-color: transparent;
	}

	.cell-laser h3,
	.cell-laser p {
		padding-inline: 0;
	}

	.laser-value {
		font-size: clamp(3.6rem, 7vw, 5.5rem);
		line-height: 0.9;
		color: var(--brand-text);
		padding: 0 !important;
	}

	/* Versies */
	.versions {
		border-top: 1px solid var(--line);
	}

	.compare {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
		margin-top: 2.5rem;
	}

	.compare figure {
		margin: 0;
	}

	.compare-plate {
		aspect-ratio: 88 / 54;
	}

	.compare-plate img {
		object-fit: cover;
	}

	figcaption {
		margin-top: 0.6rem;
		font-size: 0.9rem;
		color: var(--ink-3);
	}

	/* Voortgang */
	.progress-grid {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 2rem 3rem;
	}

	.progress-grid li {
		display: grid;
		grid-template-columns: 52px 1fr;
		gap: 1.1rem;
		align-items: start;
	}

	.p-icon {
		display: grid;
		place-items: center;
		width: 52px;
		height: 52px;
		border-radius: 14px;
		background: var(--brand-soft);
		color: var(--brand-text);
	}

	.progress-grid h3 {
		margin-bottom: 0.35rem;
	}

	.progress-grid p {
		color: var(--ink-2);
		font-size: 0.98rem;
	}

	.action {
		display: grid;
		grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
		gap: 2rem 3rem;
		align-items: center;
		margin-top: clamp(3rem, 6vw, 4.5rem);
	}

	.action-copy {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1rem;
	}

	.action-copy h3 {
		font-size: clamp(2.2rem, 4vw, 3rem);
		font-weight: 400;
		line-height: 1;
	}

	.action-copy p {
		color: var(--ink-2);
	}

	@media (max-width: 1023px) {
		.hero-grid,
		.cad-grid,
		.action {
			grid-template-columns: minmax(0, 1fr);
		}

		.bento {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.cell-video {
			grid-column: 1 / -1;
		}

		.compare {
			grid-template-columns: 1fr 1fr;
		}

		.compare-video {
			grid-column: 1 / -1;
		}
	}

	@media (max-width: 767px) {
		.bento,
		.compare,
		.progress-grid {
			grid-template-columns: minmax(0, 1fr);
		}

		.cell-video {
			grid-template-columns: minmax(0, 1fr);
		}

		.cell-video .cell-text {
			padding-bottom: 0.8rem;
		}

		.cell-laser {
			grid-template-columns: minmax(0, 1fr);
		}

		.specs {
			grid-template-columns: minmax(0, 1fr);
		}

		.view-tabs {
			grid-template-columns: repeat(6, minmax(56px, 1fr));
			overflow-x: auto;
		}
	}
</style>
