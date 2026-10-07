<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { getLocale, setLocale } from '$lib/paraglide/runtime';
	import GithubLogoIcon from 'phosphor-svelte/lib/GithubLogoIcon';
	import ListIcon from 'phosphor-svelte/lib/ListIcon';
	import XIcon from 'phosphor-svelte/lib/XIcon';

	let open = $state(false);
	const locale = getLocale();

	const links = [
		{ href: '/projects/functions', label: m.nav_functions },
		{ href: '/projects/robotbuild', label: m.nav_build },
		{ href: '/projects/goal', label: m.nav_goal },
		{ href: '/projects/configurator', label: m.nav_configurator },
		{ href: '/videos', label: m.nav_videos },
		{ href: '/about-us', label: m.nav_about }
	];

	const current = $derived(page.url.pathname.replace(base, '') || '/');
	const isActive = (href: string) => current === href || current.startsWith(href + '/');

	function chooseLocale(next: 'nl' | 'en') {
		try {
			localStorage.setItem('lang_chosen', next);
		} catch {}
		setLocale(next);
	}

	$effect(() => {
		current;
		open = false;
	});
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && (open = false)} />

<header class="nav" class:open>
	<div class="bar wrap">
		<a class="brand" href="{base}/" aria-label="Bruut OpenAgbot, home">
			<span class="word">Bruut</span>
			<span class="sub">OpenAgbot</span>
		</a>

		<nav class="links" aria-label={m.nav_main()}>
			{#each links as link}
				<a href="{base}{link.href}" class:active={isActive(link.href)} aria-current={isActive(link.href) ? 'page' : undefined}>
					{link.label()}
				</a>
			{/each}
		</nav>

		<div class="tools">
			<div class="lang" role="group" aria-label={m.nav_language()}>
				<button type="button" class:on={locale === 'nl'} aria-pressed={locale === 'nl'} onclick={() => chooseLocale('nl')}>NL</button>
				<button type="button" class:on={locale === 'en'} aria-pressed={locale === 'en'} onclick={() => chooseLocale('en')}>EN</button>
			</div>
			<a class="gh" href="https://github.com/JacobsFarm/Bruut_OpenAgbot" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
				<GithubLogoIcon size={22} weight="regular" />
			</a>
			<button
				type="button"
				class="burger"
				aria-expanded={open}
				aria-controls="mobile-menu"
				aria-label={open ? m.nav_close() : m.nav_menu()}
				onclick={() => (open = !open)}
			>
				{#if open}<XIcon size={24} />{:else}<ListIcon size={24} />{/if}
			</button>
		</div>
	</div>

	<div class="sheet" id="mobile-menu" hidden={!open}>
		<nav class="wrap" aria-label={m.nav_main()}>
			<a href="{base}/" class:active={current === '/'}>{m.nav_home()}</a>
			{#each links as link}
				<a href="{base}{link.href}" class:active={isActive(link.href)}>{link.label()}</a>
			{/each}
		</nav>
	</div>
</header>

<style>
	.nav {
		position: sticky;
		top: 0;
		z-index: var(--z-nav);
		background: color-mix(in oklch, var(--bg) 86%, transparent);
		backdrop-filter: saturate(1.4) blur(14px);
		-webkit-backdrop-filter: saturate(1.4) blur(14px);
		border-bottom: 1px solid var(--line);
	}

	@media (prefers-reduced-transparency: reduce) {
		.nav {
			background: var(--bg);
			backdrop-filter: none;
		}
	}

	.bar {
		display: flex;
		align-items: center;
		gap: 2rem;
		height: var(--nav-h);
	}

	.brand {
		display: inline-flex;
		align-items: baseline;
		gap: 0.45rem;
		text-decoration: none;
		color: var(--brand-text);
		flex-shrink: 0;
	}

	.word {
		font-family: var(--font-display);
		font-size: 2rem;
		line-height: 1;
		letter-spacing: 0.03em;
	}

	.sub {
		font-size: 0.78rem;
		font-weight: 600;
		letter-spacing: 0.04em;
		color: var(--ink-3);
	}

	.links {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		margin-inline: auto;
	}

	.links a {
		position: relative;
		padding: 0.5rem 0.75rem;
		border-radius: var(--r-pill);
		font-size: 0.95rem;
		font-weight: 550;
		color: var(--ink-2);
		text-decoration: none;
		white-space: nowrap;
		transition:
			color 0.2s ease,
			background-color 0.2s ease;
	}

	.links a:hover {
		color: var(--ink);
		background: var(--bg-alt);
	}

	.links a.active {
		color: var(--brand-text);
	}

	.links a.active::after {
		content: '';
		position: absolute;
		left: 0.75rem;
		right: 0.75rem;
		bottom: 0.15rem;
		height: 2px;
		border-radius: 2px;
		background: var(--amber);
	}

	.tools {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		flex-shrink: 0;
	}

	.lang {
		display: inline-flex;
		padding: 3px;
		border-radius: var(--r-pill);
		background: var(--bg-alt);
	}

	.lang button {
		min-width: 38px;
		height: 30px;
		padding: 0 0.6rem;
		border: 0;
		border-radius: var(--r-pill);
		background: transparent;
		color: var(--ink-3);
		font: 650 0.78rem/1 var(--font-body);
		letter-spacing: 0.04em;
		cursor: pointer;
	}

	.lang button.on {
		background: var(--surface);
		color: var(--ink);
		box-shadow: var(--shadow-sm);
	}

	.gh,
	.burger {
		display: grid;
		place-items: center;
		width: 42px;
		height: 42px;
		border-radius: var(--r-pill);
		color: var(--ink-2);
		background: transparent;
		border: 0;
		cursor: pointer;
	}

	.gh:hover,
	.burger:hover {
		color: var(--ink);
		background: var(--bg-alt);
	}

	.burger {
		display: none;
	}

	.sheet {
		border-top: 1px solid var(--line);
		background: var(--bg);
	}

	.sheet nav {
		display: grid;
		padding-block: 0.75rem 1.5rem;
	}

	.sheet a {
		padding: 0.85rem 0;
		font-family: var(--font-display);
		font-size: 1.9rem;
		line-height: 1;
		color: var(--ink);
		text-decoration: none;
		border-bottom: 1px solid var(--line);
	}

	.sheet a:last-child {
		border-bottom: 0;
	}

	.sheet a.active {
		color: var(--brand-text);
	}

	@media (max-width: 1120px) {
		.links {
			display: none;
		}

		.tools {
			margin-left: auto;
		}

		.burger {
			display: grid;
		}
	}

	@media (min-width: 1121px) {
		.sheet {
			display: none;
		}
	}
</style>
