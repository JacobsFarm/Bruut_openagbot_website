<script>
    import * as m from '$lib/paraglide/messages';
    
    import HighlightBlock from '$lib/components/HighlightBlock.svelte';
    import FeatureCard from '$lib/components/FeatureCard.svelte';
    import InfoWithImage from '$lib/components/InfoWithImage.svelte';
    import MediaCardGif from '$lib/components/MediaCardGif.svelte';
    import MediaCardPicture from '$lib/components/MediaCardPicture.svelte';

    // Importeren van assets uit de projectstructuur
    import buildImg1 from '$lib/assets/robotbuild (1).png';
    import buildImg2 from '$lib/assets/robotbuild (2).png';
    import scadModel from '$lib/assets/front_page_scad_model_robot.png';
    import actionGif from '$lib/assets/frontpage_video1.gif';
</script>

<main>
    <section class="hero-section">
        <HighlightBlock title={m.robotbuild_hero_title()}>
            <p>{m.robotbuild_hero_subtitle()}</p>
            <div class="cta-container">
                <a href="https://github.com/CowCatcherAI/CowCatcherAI" target="_blank" class="btn-primary">
                    {m.robotbuild_cta()}
                </a>
            </div>
        </HighlightBlock>
    </section>

    <section class="tech-showcase">
        <InfoWithImage 
            title={m.robotbuild_chassis_title()} 
            images={[{ src: scadModel, alt: "3D CAD Model van het chassis" }]}
        >
            <p>{m.robotbuild_chassis_desc()}</p>
        </InfoWithImage>
    </section>

    <section class="specs-grid">
        <FeatureCard 
            title={m.robotbuild_drive_title()} 
            desc={m.robotbuild_drive_desc()} 
        />
        <FeatureCard 
            title={m.robotbuild_power_title()} 
            desc={m.robotbuild_power_desc()} 
        />
        <FeatureCard 
            title={m.robotbuild_control_title()} 
            desc={m.robotbuild_control_desc()} 
        />
    </section>

    <section class="build-gallery">
        <MediaCardPicture 
            title={m.robotbuild_chassis_title()} 
            desc={m.robotbuild_chassis_desc()} 
            images={[buildImg1, buildImg2]} 
            altText="Stappen in het bouwproces"
        />
    </section>

    <section class="action-media">
        <MediaCardGif 
            title={m.robotbuild_control_title()} 
            desc={m.robotbuild_control_desc()} 
            gifs={[actionGif]} 
            altText="Besturing in actie" 
        />
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

    .specs-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
    }

    @media (max-width: 768px) {
        main {
            padding: 2rem 1rem;
            gap: 4rem;
        }
    }
</style>