<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { base } from '$app/paths';
	import { channel } from '$lib/youtube';
	import { implementsRepo } from '$lib/data/implements';

	const year = new Date().getFullYear();
</script>

<footer class="footer">
	<div class="wrap grid">
		<div class="brand-col">
			<a class="brand" href="{base}/">Bruut</a>
			<p>{m.footer_tagline()}</p>
		</div>

		<nav aria-label={m.footer_section_project()}>
			<h2>{m.footer_section_project()}</h2>
			<a href="{base}/projects/functions">{m.nav_functions()}</a>
			<a href="{base}/projects/robotbuild">{m.nav_build()}</a>
			<a href="{base}/projects/goal">{m.nav_goal()}</a>
			<a href="{base}/projects/configurator">{m.nav_configurator()}</a>
			<a href="{base}/about-us">{m.nav_about()}</a>
		</nav>

		<nav aria-label={m.footer_section_open()}>
			<h2>{m.footer_section_open()}</h2>
			<a href="https://github.com/JacobsFarm/Bruut_OpenAgbot" target="_blank" rel="noopener noreferrer">{m.footer_link_github()}</a>
			<a href={implementsRepo} target="_blank" rel="noopener noreferrer">{m.footer_link_implements()}</a>
			<a href={channel.url} target="_blank" rel="noopener noreferrer">{m.footer_link_youtube()}</a>
			<a href="{base}/videos">{m.nav_videos()}</a>
		</nav>

		<div>
			<h2>{m.footer_section_connect()}</h2>
			<a href="mailto:info@projectbruut.nl">info@projectbruut.nl</a>
			<p class="small">{m.footer_contact_note()}</p>
		</div>
	</div>

	<div class="wrap bottom">
		<p>© {year} {m.footer_copyright()}</p>
		<p>{m.footer_license()}</p>
	</div>
</footer>

<style>
	.footer {
		margin-top: auto;
		background: var(--green-900);
		color: oklch(86% 0.015 145);
		padding-top: clamp(3.5rem, 7vw, 5.5rem);
	}

	.grid {
		display: grid;
		grid-template-columns: 1.6fr 1fr 1fr 1.2fr;
		gap: 2.5rem;
	}

	.brand {
		font-family: var(--font-display);
		font-size: 3.4rem;
		line-height: 1;
		color: oklch(97% 0.01 145);
		text-decoration: none;
	}

	.brand-col p {
		margin-top: 0.75rem;
		max-width: 34ch;
		color: oklch(80% 0.02 145);
	}

	h2 {
		font-family: var(--font-body);
		font-size: 0.82rem;
		font-weight: 650;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: oklch(72% 0.06 145);
		margin-bottom: 1rem;
	}

	nav,
	.grid > div:last-child {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.55rem;
	}

	a {
		color: oklch(94% 0.01 145);
		text-decoration: none;
	}

	nav a:hover,
	.grid a:hover {
		color: var(--amber);
	}

	.small {
		font-size: 0.88rem;
		color: oklch(76% 0.02 145);
		max-width: 30ch;
	}

	.bottom {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 0.5rem 2rem;
		margin-top: 3.5rem;
		padding-block: 1.4rem 1.8rem;
		border-top: 1px solid oklch(32% 0.03 145);
		font-size: 0.85rem;
		color: oklch(72% 0.02 145);
	}

	@media (max-width: 900px) {
		.grid {
			grid-template-columns: 1fr 1fr;
		}

		.brand-col {
			grid-column: 1 / -1;
		}
	}

	@media (max-width: 480px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>
