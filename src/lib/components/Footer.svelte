<script>
    import * as m from '$lib/paraglide/messages';
    
    // Bereken het huidige jaar automatisch
    const currentYear = new Date().getFullYear();
</script>

<footer>
    <div class="footer-content">
        <div class="footer-brand">
            <a href="/" class="logo">BRUUT</a>
            <p class="tagline">{m.footer_tagline()}</p>
        </div>

        <div class="footer-links">
            <div class="link-group">
                <h3>{m.footer_section_links()}</h3>
                <a href="/">{m.nav_home()}</a>
                <a href="/about-us">{m.nav_about()}</a>
                <a href="/projects/goal">Goal</a>
            </div>
            <div class="link-group">
                <h3>{m.footer_section_connect()}</h3>
                <a href="https://github.com/JacobsFarm/Bruut_OpenAgbot" target="_blank" rel="noopener noreferrer">
                    {m.footer_link_github()}
                </a>
                <a href="mailto:info@projectbruut.nl">{m.footer_link_contact()}</a>
            </div>
        </div>
    </div>

    <div class="footer-bottom">
        <p>
            {@html m.footer_copyright({ year: currentYear })}
        </p>
    </div>
</footer>

<style>
    footer {
        background-color: #386938; /* Emerald Green */
        color: oklch(98% 0.005 145); /* Off White */
        padding: 4rem 2rem 1rem;
        margin-top: auto; /* Zorgt dat footer onderaan blijft bij korte pagina's */
        font-family: 'Roboto', sans-serif;
    }

    .footer-content {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        gap: 3rem;
        flex-wrap: wrap;
    }

    /* Brand Sectie */
    .footer-brand {
        flex: 1 1 300px;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .logo {
        font-family: 'Bebas Kai', sans-serif;
        font-size: 2.5rem;
        font-weight: bold;
        text-decoration: none;
        color: oklch(98% 0.005 145); /* Off White */
        letter-spacing: 2px;
        transition: color 0.3s ease;
    }

    .logo:hover {
        color: oklch(65% 0.16 75); /* Deep Amber */
    }

    .tagline {
        font-size: 1rem;
        opacity: 0.9;
        max-width: 320px;
        line-height: 1.5;
    }

    /* Links Sectie */
    .footer-links {
        display: flex;
        gap: 4rem;
        flex-wrap: wrap;
    }

    .link-group {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .link-group h3 {
        font-family: 'Bebas Kai', sans-serif;
        font-size: 1.3rem;
        letter-spacing: 1px;
        margin-bottom: 0.5rem;
        color: oklch(65% 0.16 75); /* Deep Amber */
    }

    .link-group a {
        text-decoration: none;
        color: oklch(98% 0.005 145); /* Off White */
        font-size: 0.95rem;
        transition: color 0.2s ease, transform 0.2s ease;
        display: inline-block;
    }

    .link-group a:hover {
        color: oklch(65% 0.16 75); /* Deep Amber */
        transform: translateX(3px);
    }

    /* Bottom Bar */
    .footer-bottom {
        max-width: 1200px;
        margin: 3rem auto 0;
        padding-top: 1.5rem;
        border-top: 1px solid oklch(98% 0.005 145 / 0.2); /* Soft White divider */
        text-align: center;
        font-size: 0.85rem;
        opacity: 0.7;
    }

    @media (max-width: 768px) {
        footer {
            padding: 3rem 1.5rem 1rem;
        }
        .footer-content {
            flex-direction: column;
            gap: 2rem;
        }
        .footer-links {
            gap: 2rem;
            justify-content: space-between;
            width: 100%;
        }
    }
</style>