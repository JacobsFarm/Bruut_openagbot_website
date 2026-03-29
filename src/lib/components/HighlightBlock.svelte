<script>
  // Exporteer de titel zodat we die kunnen meegeven
  export let title = "";
</script>

<section class="highlight-block">
  {#if title}
    <h2>{title}</h2>
  {/if}
  
  <div class="content">
    <slot />
  </div>
</section>

<style>
  .highlight-block {
    max-width: 800px;
    margin: 0 auto 60px;
    text-align: center;
    background: #ffffff;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    /* Deep Amber linkerrand (accent) */
    border-left: 5px solid oklch(65% 0.16 75); 
  }

  h2 {
    color: #386938; /* Emerald Green */
    font-size: 2rem;
    margin-top: 0;
    font-family: 'Bebas Kai', sans-serif;
    font-weight: normal;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  /* Zorgt ervoor dat alle paragrafen die in de slot vallen de juiste kleur hebben */
  .content :global(p) {
    color: oklch(22% 0.02 145); /* Deep Ink */
    line-height: 1.6;
    font-family: 'Roboto', sans-serif;
  }
</style>