<script lang="ts">
	import { onMount } from 'svelte';
	import { setLocale } from '$lib/paraglide/runtime';

	const STORAGE_KEY = 'lang_chosen';

	let show = $state(false);
	let suggested = $state<'nl' | 'en'>('en');

	onMount(() => {
		try {
			show = !localStorage.getItem(STORAGE_KEY);
		} catch {
			show = false;
		}
		suggested = navigator.language.toLowerCase().startsWith('nl') ? 'nl' : 'en';
	});

	function choose(locale: 'nl' | 'en') {
		try {
			localStorage.setItem(STORAGE_KEY, locale);
		} catch {}
		show = false;
		setLocale(locale);
	}
</script>

{#if show}
	<div class="backdrop">
		<div class="modal" role="dialog" aria-modal="true" aria-labelledby="lang-title">
			<p class="word">Bruut</p>
			<h2 id="lang-title">Kies je taal</h2>
			<p class="sub">Choose your language</p>

			<div class="options">
				<button type="button" class:suggested={suggested === 'nl'} onclick={() => choose('nl')}>
					<span class="label">Nederlands</span>
					{#if suggested === 'nl'}<span class="hint">aanbevolen</span>{/if}
				</button>
				<button type="button" class:suggested={suggested === 'en'} onclick={() => choose('en')}>
					<span class="label">English</span>
					{#if suggested === 'en'}<span class="hint">suggested</span>{/if}
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		z-index: var(--z-dialog);
		display: grid;
		place-items: center;
		padding: 1rem;
		background: oklch(18% 0.03 145 / 0.55);
		backdrop-filter: blur(4px);
	}

	.modal {
		width: min(380px, 100%);
		padding: 2.2rem 1.8rem 1.8rem;
		border-radius: var(--r-lg);
		background: var(--surface);
		box-shadow: var(--shadow-md);
		text-align: center;
	}

	.word {
		font-family: var(--font-display);
		font-size: 2.4rem;
		line-height: 1;
		color: var(--brand-text);
	}

	h2 {
		margin-top: 1rem;
		font-family: var(--font-body);
		font-size: 1.3rem;
		font-weight: 650;
		line-height: 1.3;
	}

	.sub {
		color: var(--ink-3);
		margin-bottom: 1.5rem;
	}

	.options {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.75rem;
	}

	button {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.2rem;
		padding: 1rem 0.5rem;
		border-radius: var(--r-md);
		border: 1.5px solid var(--line-strong);
		background: transparent;
		color: var(--ink);
		cursor: pointer;
		transition:
			border-color 0.2s ease,
			transform 0.2s var(--ease);
	}

	button:hover {
		border-color: var(--ink);
		transform: translateY(-2px);
	}

	button.suggested {
		background: var(--brand);
		border-color: var(--brand);
		color: var(--on-brand);
	}

	.label {
		font-weight: 650;
	}

	.hint {
		font-size: 0.75rem;
		opacity: 0.85;
	}
</style>
