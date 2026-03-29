<script>
  import * as m from '$lib/paraglide/messages';
  import HighlightBlock from '$lib/components/HighlightBlock.svelte';
  import FeatureCard from '$lib/components/FeatureCard.svelte';
</script>

<main>
  <section class="hero-section">
    <HighlightBlock title={m.about_us_title()}>
      <p>{m.about_us_intro()}</p>
    </HighlightBlock>
  </section>

  <section class="features-grid">
    <FeatureCard 
      title={m.about_us_opensource_title()} 
      desc={m.about_us_opensource_text()} 
    />
    <FeatureCard 
      title={m.about_us_independence_title()} 
      desc={m.about_us_independence_text()} 
    />
    <FeatureCard 
      title={m.about_us_reality_title()} 
      desc={m.about_us_reality_text()} 
    />
    <FeatureCard 
      title={m.about_us_community_title()} 
      desc={m.about_us_community_text()} 
    />
  </section>

  <section class="conclusion-section">
    <HighlightBlock title="Klaar om te beginnen?">
      <p>{m.about_us_conclusion()}</p>
      
      <a 
        href="https://github.com/jouw-repo-link" 
        class="github-btn" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        {m.about_us_github_button()} &rarr;
      </a>
    </HighlightBlock>
  </section>
</main>

<style>
  main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 4rem;
  }

  .features-grid {
    display: grid;
    /* Zorgt voor een mooie grid die op mobiel terugvalt naar 1 kolom */
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
  }

  .github-btn {
    display: inline-block;
    margin-top: 1.5rem;
    padding: 0.8rem 1.5rem;
    background: #386938; /* Emerald Green - overgenomen uit je design settings */
    color: #ffffff; /* Off-white */
    text-decoration: none;
    border-radius: 8px;
    font-weight: bold;
    font-family: 'Roboto', sans-serif;
    transition: background 0.2s, color 0.2s, transform 0.2s;
  }

  .github-btn:hover {
    background: oklch(65% 0.16 75); /* Deep Amber */
    color: oklch(22% 0.02 145); /* Deep Ink */
    transform: translateY(-2px);
  }
</style>