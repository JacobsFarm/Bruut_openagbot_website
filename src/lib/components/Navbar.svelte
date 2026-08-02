<script lang="ts">
  import * as m from '$lib/paraglide/messages.js';
  import { base } from '$app/paths';
  import { getLocale, setLocale } from '$lib/paraglide/runtime';

  let isOpen = false;

  function toggleMenu() {
    isOpen = !isOpen;
  }

  function closeMenu() {
    isOpen = false;
  }

  $: currentLocale = getLocale();
</script>

<nav>
  <div class="logo">BRUUT</div>

  <button
    class="hamburger"
    on:click={toggleMenu}
    aria-label="Toggle navigation"
    aria-expanded={isOpen}
  >
    <span class="bar" class:open={isOpen}></span>
    <span class="bar" class:open={isOpen}></span>
    <span class="bar" class:open={isOpen}></span>
  </button>

  <div class="links" class:open={isOpen}>
    <a href="{base}/" on:click={closeMenu}>{m.nav_home()}</a>
    <a href="{base}/videos" class="nav-videos" on:click={closeMenu}>
      <svg class="yt-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path
          d="M23 12s0-3.9-.5-5.8c-.3-1-1.1-1.8-2.1-2.1C18.5 3.6 12 3.6 12 3.6s-6.5 0-8.4.5c-1 .3-1.8 1.1-2.1 2.1C1 8.1 1 12 1 12s0 3.9.5 5.8c.3 1 1.1 1.8 2.1 2.1 1.9.5 8.4.5 8.4.5s6.5 0 8.4-.5c1-.3 1.8-1.1 2.1-2.1.5-1.9.5-5.8.5-5.8zM9.9 15.6V8.4l5.4 3.6-5.4 3.6z"
        />
      </svg>
      {m.nav_videos()}
    </a>
    <a href="{base}/about-us" on:click={closeMenu}>{m.nav_about()}</a>

    <a href="{base}/projects/robotbuild" class="mobile-only" on:click={closeMenu}>Robot Build</a>
    <a href="{base}/projects/goal" class="mobile-only" on:click={closeMenu}>Goal</a>
    <a href="{base}/projects/functions" class="mobile-only" on:click={closeMenu}>Functions</a>

    <div class="lang-switcher">
      <button
        class:active={currentLocale === 'nl'}
        on:click={() => { setLocale('nl'); closeMenu(); }}
        aria-label="Schakel naar Nederlands"
      >
        🇳🇱 NL
      </button>
      <button
        class:active={currentLocale === 'en'}
        on:click={() => { setLocale('en'); closeMenu(); }}
        aria-label="Switch to English"
      >
        🇬🇧 EN
      </button>
    </div>
  </div>
</nav>

<style>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: #386938; /* Emerald Green */
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    position: relative;
    z-index: 100;
    font-family: 'Roboto', sans-serif;
  }

  .logo {
    color: oklch(98% 0.005 145); /* Off White */
    font-family: 'Bebas Kai', 'Bebas Neue', sans-serif;
    font-weight: 800;
    font-size: 1.5rem;
    letter-spacing: 1px;
  }

  .links {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }

  a {
    text-decoration: none;
    color: oklch(98% 0.005 145); /* Off White */
    font-weight: bold;
    transition: all 0.2s ease;
  }

  a:hover {
    color: oklch(65% 0.16 75); /* Deep Amber */
  }

  .mobile-only {
    display: none;
  }

  .nav-videos {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }

  .yt-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    transition: color 0.2s ease;
  }

  .nav-videos:hover .yt-icon {
    color: oklch(65% 0.16 75); /* Deep Amber */
  }

  .lang-switcher {
    display: flex;
    gap: 0.3rem;
    align-items: center;
    margin-left: 0.5rem;
    padding-left: 1rem;
    border-left: 1px solid oklch(85% 0.01 145 / 0.4); /* Soft Gray met opacity */
  }

  .lang-switcher button {
    background: transparent;
    border: 1px solid transparent;
    color: oklch(98% 0.005 145); /* Off White */
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    border-radius: 5px;
    transition: all 0.2s ease;
  }

  .lang-switcher button:hover {
    color: oklch(65% 0.16 75); /* Deep Amber */
    border-color: oklch(85% 0.01 145 / 0.4);
  }

  .lang-switcher button.active {
    color: oklch(65% 0.16 75); /* Deep Amber */
    border-color: oklch(65% 0.16 75); /* Deep Amber */
    background: rgba(255, 255, 255, 0.1);
  }

  .hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  .bar {
    width: 25px;
    height: 3px;
    background-color: oklch(98% 0.005 145); /* Off White */
    border-radius: 2px;
    transition: all 0.3s ease-in-out;
  }

  @media (max-width: 768px) {
    .hamburger {
      display: flex;
    }

    .bar.open:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }
    .bar.open:nth-child(2) {
      opacity: 0;
    }
    .bar.open:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }

    .links {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: #386938; /* Emerald Green */
      flex-direction: column;
      align-items: flex-start;
      gap: 0;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-in-out;
      box-shadow: 0 4px 6px rgba(0,0,0,0.15);
    }

    .links.open {
      max-height: 500px;
    }

    .links a {
      padding: 1rem 2rem;
      width: 100%;
      border-top: 1px solid oklch(85% 0.01 145 / 0.2); /* Soft Gray met opacity */
    }

    .mobile-only {
      display: block;
    }

    .lang-switcher {
      border-left: none;
      border-top: 1px solid oklch(85% 0.01 145 / 0.2);
      margin-left: 0;
      padding: 0.75rem 2rem;
      width: 100%;
      justify-content: flex-start;
    }
  }
</style>