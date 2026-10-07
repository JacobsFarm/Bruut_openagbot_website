<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import LanguageModal from '$lib/components/LanguageModal.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<meta name="theme-color" content="#386938" />
</svelte:head>

<LanguageModal />

<div class="shell">
	<Navbar />
	<main id="main">
		{@render children()}
	</main>
	<Footer />
</div>

<style>
	.shell {
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
	}

	main {
		flex: 1;
	}
</style>
