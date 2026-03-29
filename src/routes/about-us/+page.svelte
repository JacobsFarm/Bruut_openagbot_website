<script>
  import * as m from '$lib/paraglide/messages.js';
</script>

<svelte:head>
  <title>{m.about_us_title()} | CowCatcherAI</title>
</svelte:head>

<div class="page-wrapper">
  <header class="hero-section">
    <h1>{m.about_us_title()}</h1>
    <p class="lead-text">{m.about_us_intro()}</p>
  </header>

  <div class="grid-layout">
    <section class="card">
      <h2>{m.about_us_opensource_title()}</h2>
      <p>{m.about_us_opensource_text()}</p>
    </section>

    <section class="card">
      <h2>{m.about_us_team_title()}</h2>
      <p>{m.about_us_team_text()}</p>
    </section>

    <section class="card">
      <h2>{m.about_us_longevity_title()}</h2>
      <p>{m.about_us_longevity_text()}</p>
    </section>

    <section class="card">
      <h2>{m.about_us_independence_title()}</h2>
      <p>{m.about_us_independence_text()}</p>
    </section>

    <section class="card">
      <h2>{m.about_us_reality_title()}</h2>
      <p>{m.about_us_reality_text()}</p>
    </section>

    <section class="card">
      <h2>{m.about_us_contribute_title()}</h2>
      <p>{m.about_us_contribute_text()}</p>
    </section>
  </div>

  <section class="cta-section">
    <p class="cta-text">{m.about_us_conclusion()}</p>
    <a href="https://github.com/CowCatcherAI/CowCatcherAI" target="_blank" rel="noopener noreferrer" class="btn-primary">
      {m.about_us_github_button()}
    </a>
  </section>
</div>

<style>
  /* Base setup vanuit info.json */
  :global(body) {
    background-color: oklch(98% 0.005 145); /* Off-White */
    margin: 0;
  }

  .page-wrapper {
    font-family: 'Roboto', sans-serif;
    color: oklch(22% 0.02 145); /* Deep Ink */
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
  }

  /* Hoofdblok Styling */
  .hero-section {
    text-align: center;
    margin-bottom: 3rem;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.03);
  }

  h1 {
    font-family: 'Bebas Kai', sans-serif;
    color: #386938; /* Emerald Green */
    font-size: 3.5rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-top: 0;
    margin-bottom: 1.5rem;
  }

  .lead-text {
    font-size: 1.25rem;
    line-height: 1.6;
    max-width: 800px;
    margin: 0 auto;
    color: oklch(22% 0.02 145);
  }

  /* Grid Layout voor de 6 blokken */
  .grid-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 3rem;
  }

  @media (min-width: 768px) {
    .grid-layout {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  /* Styling voor de individuele 6 blokken */
  .card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.04);
    height: 100%;
    box-sizing: border-box;
  }

  .card h2 {
    font-family: 'Bebas Kai', sans-serif;
    color: #386938; /* Emerald Green */
    font-size: 2rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 0;
    margin-bottom: 1rem;
    border-bottom: 2px solid oklch(85% 0.01 145); /* Soft Gray border */
    padding-bottom: 0.5rem;
  }

  .card p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin: 0;
  }

  /* Conclusie en Knop */
  .cta-section {
    background-color: oklch(65% 0.16 75); /* Deep Amber - High visibility */
    color: white;
    text-align: center;
    padding: 3rem 2rem;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  .cta-text {
    font-size: 1.3rem;
    font-weight: 500;
    margin: 0;
    max-width: 700px;
  }

  .btn-primary {
    display: inline-block;
    background-color: oklch(22% 0.02 145); /* Deep Ink */
    color: oklch(98% 0.005 145); /* Off-White */
    text-decoration: none;
    padding: 1rem 2.5rem;
    font-family: 'Bebas Kai', sans-serif;
    font-size: 1.5rem;
    letter-spacing: 1px;
    border-radius: 6px;
    transition: background-color 0.2s ease, transform 0.1s ease;
  }

  .btn-primary:hover {
    background-color: #386938; /* Hover state: Emerald Green */
    transform: translateY(-2px);
  }
</style>
