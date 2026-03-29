<script>
  // Exporteer variabelen zodat we deze vanuit de parent (page.svelte) kunnen vullen
  export let title = "";
  export let desc = "";
</script>

<div class="feature-card">
  <h2>{title}</h2>
  <p>{desc}</p>
</div>

<style>
  .feature-card {
    background: #ffffff;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    /* Teruggezet naar Emerald Green (#386938) zoals gevraagd */
    border-top: 4px solid #386938; 
    /* Zorgt ervoor dat alle kaarten in een grid even hoog worden */
    height: 100%; 
    box-sizing: border-box;
  }

  h2 {
    color: #386938; /* Emerald Green */
    margin-top: 0;
    font-size: 1.8rem;
    font-family: 'Bebas Kai', sans-serif;
    font-weight: normal;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  p {
    color: oklch(22% 0.02 145); /* Deep Ink */
    line-height: 1.6;
    font-family: 'Roboto', sans-serif;
    margin-bottom: 0;
  }
</style>