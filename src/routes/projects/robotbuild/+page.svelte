<script>
    import * as m from '$lib/paraglide/messages';
    
    import HighlightBlock from '$lib/components/HighlightBlock.svelte';
    import MediaCardGif from '$lib/components/MediaCardGif.svelte';
    import MediaCardPicture from '$lib/components/MediaCardPicture.svelte';

    // Importeren van assets uit de projectstructuur
    import imgModular from '$lib/assets/robotbuild_modulair_build.png';
    import imgHubmotor from '$lib/assets/robotbuild_hubmotor.png';
    import imgMaintenance from '$lib/assets/robotbuild_easy_maintance.png';
    import imgCustomizable from '$lib/assets/robotbuild.png'; // Of robotbuild (3).png indien gewenst
    import actionGif from '$lib/assets/frontpage_video1.gif';
</script>

<main>
    <section class="hero-section">
        <HighlightBlock title={m.robotbuild_hero_title()}>
            <p>{m.robotbuild_hero_subtitle()}</p>
            <div class="cta-container">
                <a href="https://github.com/JacobsFarm/Bruut_OpenAgbot" target="_blank" class="btn-primary">
                    {m.robotbuild_cta()}
                </a>
            </div>
        </HighlightBlock>
    </section>

    <section class="media-gallery">
        <MediaCardPicture 
            title={m.robotbuild_modular_title()} 
            desc={m.robotbuild_modular_desc()} 
            images={[imgModular]} 
            altText="Modulaire opbouw van de robot"
        />

        <MediaCardPicture 
            title={m.robotbuild_hubmotors_title()} 
            desc={m.robotbuild_hubmotors_desc()} 
            images={[imgHubmotor]} 
            altText="Direct drive hubmotors"
        />

        <MediaCardPicture 
            title={m.robotbuild_maintenance_title()} 
            desc={m.robotbuild_maintenance_desc()} 
            images={[imgMaintenance]} 
            altText="Gemakkelijk onderhoud via toegankelijke kasten"
        />

        <MediaCardPicture 
            title={m.robotbuild_customizable_title()} 
            desc={m.robotbuild_customizable_desc()} 
            images={[imgCustomizable]} 
            altText="Open design voor uitbreidingen"
        />

        <MediaCardGif 
            title={m.robotbuild_control_sys_title()} 
            desc={m.robotbuild_control_sys_desc()} 
            gifs={[actionGif]} 
            altText="Besturing en autonome functies in actie" 
        />
    </section>

    <section class="extra-info-grid">
        <div class="info-block">
            <h3>{m.robotbuild_ardupilot_title()}</h3>
            <p>{m.robotbuild_ardupilot_desc()}</p>
        </div>
        
        <div class="info-block">
            <h3>{m.robotbuild_spot_spraying_title()}</h3>
            <p>{m.robotbuild_spot_spraying_desc()}</p>
        </div>
    </section>
</main>

<style>
    main {
        max-width: 1200px;
        margin: 0 auto;
        padding: 4rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 6rem;
    }

    .cta-container {
        margin-top: 2rem;
    }

    .btn-primary {
        display: inline-block;
        padding: 1rem 2rem;
        background-color: #386938; /* Emerald Green */
        color: oklch(98% 0.005 145); /* Off White */
        text-decoration: none;
        border-radius: 8px;
        font-family: 'Bebas Kai', sans-serif;
        font-size: 1.2rem;
        transition: all 0.3s ease;
    }

    .btn-primary:hover {
        background-color: oklch(65% 0.16 75); /* Deep Amber */
        color: oklch(22% 0.02 145); /* Deep Ink */
        transform: translateY(-2px);
    }

    .media-gallery {
        display: flex;
        flex-direction: column;
        gap: 4rem;
    }

    .extra-info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 2rem;
        padding-top: 2rem;
        border-top: 1px solid oklch(85% 0.01 145); /* Subtiele scheidingslijn */
    }

    .info-block {
        background-color: oklch(95% 0.01 145); /* Lichte achtergrond */
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    }

    .info-block h3 {
        font-family: 'Bebas Kai', sans-serif;
        font-size: 1.8rem;
        margin-bottom: 1rem;
        color: #386938; /* Emerald Green accent */
    }

    .info-block p {
        font-size: 1rem;
        line-height: 1.6;
        color: #333;
    }

    @media (max-width: 768px) {
        main {
            padding: 2rem 1rem;
            gap: 4rem;
        }

        .extra-info-grid {
            grid-template-columns: 1fr;
        }
    }
</style>