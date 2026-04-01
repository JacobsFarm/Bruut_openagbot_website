<script>
  import * as m from '$lib/paraglide/messages.js';

  // Importeer de logo's die je hebt genoemd
  // We gaan ervan uit dat deze afbeeldingen zich in src/lib/assets/ bevinden
  import logo1 from '$lib/assets/company logo 1.jpg';
  import logo2 from '$lib/assets/company logo 2.jpg';
  import logo3 from '$lib/assets/company logo 3.jpg';

  // We maken een array van de 3 logo's en herhalen deze om de carrousel te vullen
  // De oorspronkelijke code had 12 items (6 uniek, 2 keer herhaald). 
  // Met jouw 3 logo's herhalen we ze 4 keer om op 12 te komen voor de animatie.
  const initialLogos = [logo1, logo2, logo3];
  
  // Array met logo-paden (nu geïmporteerde objecten)
  const logos = [
    ...initialLogos, // logo1, logo2, logo3
    ...initialLogos, // logo1, logo2, logo3
    ...initialLogos, // logo1, logo2, logo3
    ...initialLogos  // logo1, logo2, logo3
  ];
</script>

<div class="featured-in">
  <h2>{m.front_page_featured_in_title()}</h2>
  <div class="carousel">
    <div class="carousel-track">
      {#each logos as logo}
        <div class="carousel-item">
          <img src={logo} alt="Featured In" />
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .featured-in {
    padding: 3rem 1rem;
    background-color: transparent; /* Past zich aan de achtergrond van de parent aan */
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  h2 {
    color: #386938; /* Dezelfde kleur als de headers op de frontpage */
    font-family: 'Bebas Kai', sans-serif;
    font-size: 2.5rem;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-align: center;
  }

  .carousel {
    width: 100%;
    max-width: 1200px;
    overflow: hidden;
    position: relative;
    mask-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 1) 15%,
      rgba(0, 0, 0, 1) 85%,
      rgba(0, 0, 0, 0) 100%
    );
  }

  .carousel-track {
    display: flex;
    /* De breedte moet de som zijn van alle items */
    /* 12 items, elk met een basisbreedte van 200px en 2rem gap */
    width: calc((200px + 2rem) * 12); 
    gap: 2rem;
    animation: scroll 30s linear infinite;
  }

  .carousel-item {
    width: 200px; /* Vaste breedte voor elk logo */
    height: 80px;  /* Vaste hoogte voor consistentie */
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .carousel-item img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain; /* Zorgt ervoor dat het logo niet vervormt */
    opacity: 0.8; /* Iets minder prominent, wordt 1 op hover */
    transition: opacity 0.3s ease;
  }

  .carousel-item img:hover {
    opacity: 1;
  }

  /* Animatie voor de oneindige loop */
  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      /* We moeten de helft van de track-breedte scrollen */
      transform: translateX(calc(-1 * (200px + 2rem) * 6));
    }
  }

  /* Pauzeer de animatie op hover */
  .carousel:hover .carousel-track {
    animation-play-state: paused;
  }
</style>