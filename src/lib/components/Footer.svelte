<script>
  import * as m from '$lib/paraglide/messages.js';
</script>

<footer>
  <div class="footer-inner">
    <div class="footer-left">
      <p class="brand-name">CowCatcherAI</p>
      <p class="tagline">{m.footer_tagline()}</p>
      <div class="divider"></div>
      <p class="mission-text">{m.footer_project_sub()}</p>
      
      <div class="legal-stack">
        <span class="copy">&copy; {new Date().getFullYear()} CowCatcherAI</span>
        <span class="dot-separator">•</span>
        <a class="license" href="https://www.gnu.org/licenses/gpl-3.0.html" target="_blank" rel="noopener noreferrer">
          {m.footer_license()}
        </a>
      </div>
      <p class="made-with">{m.footer_made_with()}</p>
    </div>

    <div class="footer-right">
      <p class="community-label">{m.footer_join_community()}</p>
      
      <p class="community-email">
        <a href="mailto:cowcatcherai@gmail.com">cowcatcherai@gmail.com</a>
      </p>

      <a 
        class="contribute-btn" 
        href="https://github.com/CowCatcherAI/CowCatcherAI" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
        {m.footer_contribute()}
      </a>

      <div class="social-icons">
        <a href="https://www.facebook.com/groups/1765616710830233" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="icon-link">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.932-1.956 1.887v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
        </a>
        <a href="https://web.telegram.org/a/#-1003640103247" target="_blank" rel="noopener noreferrer" aria-label="Telegram" class="icon-link">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
        </a>
        <a href="https://cowcatcherai.com" target="_blank" rel="noopener noreferrer" aria-label="Website" class="icon-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
        </a>
        <a href="https://huggingface.co/spaces/CowcatcherAI/CowCatcherAI" target="_blank" rel="noopener noreferrer" aria-label="Hugging Face" class="icon-link hf-link">
          <svg viewBox="0 0 95 88" fill="none"><path d="M47.2 2C23.3 2 4 21.4 4 45.3c0 16.2 9 30.3 22.3 37.8 4 2.2 8.3 3.7 12.9 4.5 2.6.4 5.2.7 7.9.7 2.5 0 4.9-.2 7.3-.6 4.9-.8 9.5-2.5 13.6-4.9C80.7 75.3 89.4 61.4 89.4 45.3 89.4 21.4 71.1 2 47.2 2z" fill="#FFD21E"/><path d="M30.5 45.2c3.9 0 7-3.1 7-7s-3.1-7-7-7-7 3.1-7 7 3.1 7 7 7zM63.9 45.2c3.9 0 7-3.1 7-7s-3.1-7-7-7-7 3.1-7 7 3.1 7 7 7z" fill="#3B2314"/><path d="M35.5 35.9c.6-1 1.9-1.4 2.9-.8 1 .6 1.3 1.9.7 2.9-.6 1-1.9 1.3-2.9.7-1-.6-1.3-1.8-.7-2.8zM69 35.9c.6-1 1.9-1.4 2.9-.8 1 .6 1.3 1.9.7 2.9-.6 1-1.9 1.3-2.9.7-1-.6-1.3-1.8-.7-2.8z" fill="white"/><path d="M35.3 56.6c2.4-4.4 7.1-7.4 12.4-7.4 5.3 0 10 3 12.4 7.4.5 1-.1 2.2-1.2 2.4-3.5.6-7.4 1-11.2 1-3.8 0-7.7-.4-11.2-1-1.1-.2-1.7-1.4-1.2-2.4z" fill="#3B2314"/><path d="M47.7 59c3.5 0 7-.3 10.2-.9-2.2 3.1-5.8 5.1-9.9 5.1-4.1 0-7.7-2-9.9-5.1 3.2.6 6.1.9 9.6.9z" fill="#FF5C5C"/></svg>
        </a>
      </div>
    </div>
  </div>
</footer>

<style>
  footer {
    background: oklch(22% 0.02 145); /* Deep Ink */
    border-top: 4px solid #386938; /* Emerald Green */
    margin-top: 5rem;
    font-family: 'Roboto', sans-serif;
  }

  .footer-inner {
    max-width: 1100px;
    margin: 0 auto;
    /* Minder padding boven en onder voor een compactere look */
    padding: 2.5rem 2rem 2.5rem 2rem; 
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: 2rem;
  }

  /* ── LEFT ── */
  .footer-left {
    display: flex;
    flex-direction: column;
    gap: 0.35rem; /* Strakkere gaps */
    max-width: 500px;
  }

  .brand-name {
    font-family: 'Bebas Kai', 'Bebas Neue', sans-serif;
    font-size: 2.2rem;
    letter-spacing: 0.08em;
    color: oklch(65% 0.16 75); /* Deep Amber */
    margin: 0;
  }

  .tagline {
    color: oklch(98% 0.005 145); /* Off White */
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0;
  }

  .divider {
    width: 60px;
    height: 3px;
    background: #386938; /* Emerald Green */
    border-radius: 3px;
    margin: 0.5rem 0; /* Minder margin */
  }

  .mission-text {
    color: oklch(85% 0.01 145); /* Soft Gray */
    font-size: 0.95rem;
    line-height: 1.4;
    margin: 0;
  }

  /* Nieuwe stijlen voor de legal en made-with tekst onderaan links */
  .legal-stack {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;
    font-size: 0.85rem;
    color: oklch(85% 0.01 145); /* Soft Gray */
  }

  .dot-separator {
    color: oklch(42% 0.07 145); 
  }

  .license {
    color: oklch(85% 0.01 145);
    text-decoration: none;
    transition: color 0.2s;
  }

  .license:hover {
    color: oklch(65% 0.16 75); /* Deep Amber */
    text-decoration: underline;
  }

  .made-with {
    font-size: 0.8rem;
    color: oklch(60% 0.09 195); /* Muted Teal */
    margin: 0.25rem 0 0 0;
  }

  /* ── RIGHT ── */
  .footer-right {
    display: flex;
    flex-direction: column;
    align-items: center; /* Zorgt dat alles netjes gecentreerd in een kolom staat, zoals op je foto */
    gap: 0.5rem; /* Dichter op elkaar */
  }

  .community-label {
    font-family: 'Bebas Kai', 'Bebas Neue', sans-serif;
    font-size: 1.6rem;
    letter-spacing: 0.06em;
    color: oklch(98% 0.005 145); /* Off White */
    margin: 0 0 0.25rem 0;
  }

  .community-email {
    margin: 0;
  }

  .community-email a {
    color: oklch(60% 0.09 195); /* Muted Teal */
    font-size: 0.95rem;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.2s;
  }

  .community-email a:hover {
    color: oklch(65% 0.16 75); /* Deep Amber */
  }

  /* Contribute Button */
  .contribute-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: transparent;
    border: 2px solid oklch(65% 0.16 75); /* Deep Amber */
    color: oklch(65% 0.16 75);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.9rem;
    text-decoration: none;
    transition: all 0.2s ease;
    margin: 0.5rem 0; /* Minder afstand boven en onder */
  }

  .contribute-btn:hover {
    background: oklch(65% 0.16 75); /* Deep Amber */
    color: oklch(22% 0.02 145); /* Deep Ink (Donker) */
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 210, 30, 0.2);
  }

  /* Icons row */
  .social-icons {
    display: flex;
    gap: 1rem; /* Gaps iets strakker */
    align-items: center;
  }

  .icon-link {
    color: oklch(85% 0.01 145); /* Soft Gray */
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s, transform 0.2s;
  }

  .icon-link:hover {
    color: oklch(60% 0.09 195); /* Muted Teal */
    transform: translateY(-3px);
  }

  .icon-link svg {
    width: 24px; /* Ietsje kleiner voor compactere look */
    height: 24px;
  }

  .hf-link svg {
    width: 28px;
    height: 28px;
  }

  /* ── Mobile ── */
  @media (max-width: 768px) {
    .footer-inner {
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 2.5rem 1.5rem;
    }

    .footer-left {
      align-items: center;
    }

    .legal-stack {
      justify-content: center;
    }

    .footer-right {
      margin-top: 1.5rem;
    }
  }
</style>