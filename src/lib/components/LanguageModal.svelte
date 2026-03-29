<script lang="ts">
  import { browser } from '$app/environment';
  import { setLocale } from '$lib/paraglide/runtime';

  const STORAGE_KEY = 'lang_chosen';
  // Toon de modal alleen als we in de browser zijn én de gebruiker nog geen keuze heeft gemaakt
  let show = browser && !localStorage.getItem(STORAGE_KEY);
  
  // Detecteer de browsertaal als suggestie
  let suggestedLocale = 'en';
  if (browser) {
    suggestedLocale = navigator.language.toLowerCase().startsWith('nl') ? 'nl' : 'en';
  }

  function choose(locale: string) {
    localStorage.setItem(STORAGE_KEY, locale);
    setLocale(locale);
    show = false;
  }
</script>

{#if show}
  <div class="backdrop" role="dialog" aria-modal="true" aria-label="Kies je taal">
    <div class="modal">
      <div class="globe">🌍</div>
      <h2>Kies je taal</h2>
      <p>Choose your preferred language</p>

      <div class="options">
        <button
          class="lang-btn"
          class:suggested={suggestedLocale === 'nl'}
          on:click={() => choose('nl')}
        >
          <span class="flag">🇳🇱</span>
          <span class="label">Nederlands</span>
          {#if suggestedLocale === 'nl'}
            <span class="hint">aanbevolen</span>
          {/if}
        </button>

        <button
          class="lang-btn"
          class:suggested={suggestedLocale === 'en'}
          on:click={() => choose('en')}
        >
          <span class="flag">🇬🇧</span>
          <span class="label">English</span>
          {#if suggestedLocale === 'en'}
            <span class="hint">suggested</span>
          {/if}
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    background: oklch(22% 0.02 145 / 0.55); /* Deep Ink met opacity */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    backdrop-filter: blur(4px);
  }

  .modal {
    background: oklch(98% 0.005 145); /* Off White */
    border-radius: 20px;
    padding: 2.5rem 2rem;
    max-width: 360px;
    width: 90%;
    text-align: center;
    box-shadow: 0 24px 64px rgba(0,0,0,0.25);
  }

  .globe {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  h2 {
    margin: 0 0 0.25rem;
    font-size: 1.4rem;
    color: oklch(22% 0.02 145); /* Deep Ink */
  }

  p {
    color: oklch(42% 0.07 145); /* Shade 500 (Donkerder groen/grijs) */
    margin: 0 0 1.75rem;
    font-size: 0.9rem;
  }

  .options {
    display: flex;
    gap: 1rem;
  }

  .lang-btn {
    flex: 1;
    padding: 1.1rem 0.75rem;
    border: 2px solid oklch(85% 0.01 145); /* Soft Gray */
    border-radius: 14px;
    background: oklch(98% 0.005 145); /* Off White */
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.35rem;
    color: oklch(22% 0.02 145); /* Deep Ink */
  }

  .lang-btn:hover {
    border-color: #386938; /* Emerald Green */
    background: oklch(97% 0.01 145); /* Shade 50 */
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(56,105,56,0.15);
  }

  .lang-btn.suggested {
    border-color: #386938; /* Emerald Green */
    background: #386938; /* Emerald Green */
    color: oklch(98% 0.005 145); /* Off White */
  }

  .lang-btn.suggested:hover {
    background: oklch(28% 0.05 145); /* Shade 700 */
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(56,105,56,0.3);
  }

  .flag {
    font-size: 1.75rem;
  }

  .label {
    font-size: 0.95rem;
    font-weight: 700;
  }

  .hint {
    font-size: 0.65rem;
    font-weight: 500;
    opacity: 0.75;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
</style>