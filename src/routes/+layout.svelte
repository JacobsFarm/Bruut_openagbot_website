<script>
    import Navbar from '$lib/components/Navbar.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import LanguageModal from '$lib/components/LanguageModal.svelte';
</script>

<LanguageModal />

<Navbar />

<main>
  <slot />
</main>

<Footer />

<style>
  :global(body) {
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f9fbf9;
    color: #2c3e2c;
  }

  main {
    max-width: 1100px;
    margin: 0 auto;
    padding: 3rem 2rem;
    min-height: 80vh;
  }

  :global(h1) {
    color: #386938;
  }
</style>
