<script>
    import * as m from '$lib/paraglide/messages';

    import HighlightBlock from '$lib/components/HighlightBlock.svelte';
    import FeatureCard from '$lib/components/FeatureCard.svelte';
    import InfoWithImage from '$lib/components/InfoWithImage.svelte';
    import MediaCardGif from '$lib/components/MediaCardGif.svelte';
    import ProjectCard from '$lib/components/ProjectCard.svelte';

    // Importeren van assets
    import imgScad from '$lib/assets/front_page_scad_model_robot.png';
    import gifRobot from '$lib/assets/frontpage_video1.gif';
    import placeholderLogo from '$lib/assets/place-holder 875x875.jpg';
</script>

<main>
    <section class="hero">
        <HighlightBlock title={m.front_page_hero_title()}>
            <p>{m.front_page_hero_subtitle()}</p>
            <a href="/projects/goal" class="btn">{m.front_page_cta_button()}</a>
        </HighlightBlock>
    </section>

    <section class="projects-grid">
        <ProjectCard 
            title={m.front_page_project_build_title()} 
            link="/projects/robotbuild" 
            desc={m.front_page_project_build_desc()} 
            logo={placeholderLogo}
        />
        <ProjectCard 
            title={m.front_page_project_goal_title()}
            link="/projects/goal"
            desc={m.front_page_project_goal_desc()}
            logo={placeholderLogo}
        />
        <ProjectCard 
            title={m.front_page_project_functions_title()}
            link="/projects/functions"
            desc={m.front_page_project_functions_desc()}
            logo={placeholderLogo}
        />
    </section>

    <section class="media-showcase">
        <MediaCardGif 
            title={m.front_page_media_title()} 
            desc={m.front_page_media_desc()} 
            gifs={[gifRobot]} 
            altText="De Bruut Veldrobot in actie" 
        />
    </section>

    <section class="features">
        <FeatureCard 
            title={m.front_page_feature_1_title()} 
            desc={m.front_page_feature_1_desc()} 
        />
        <FeatureCard 
            title={m.front_page_feature_2_title()} 
            desc={m.front_page_feature_2_desc()} 
        />
        <FeatureCard 
            title={m.front_page_feature_3_title()} 
            desc={m.front_page_feature_3_desc()} 
        />
    </section>

    <section class="platform-info">
        <InfoWithImage 
            title={m.front_page_info_platform_title()} 
            images={[{ src: imgScad, alt: 'Concept en ontwerp van de robot' }]}
        >
            <p>{m.front_page_info_platform_desc()}</p>
        </InfoWithImage>
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

    /* Grid voor de Project Kaarten */
    .projects-grid {
        display: grid;
        gap: 1.5rem;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
        margin-top: 2rem;
    }

    @media (min-width: 768px) {
        .projects-grid {
            gap: 2rem;
        }
    }

    /* Specifieke styling voor ProjectCard root (optioneel, afhankelijk van hoe je globale stijlen zijn ingesteld) */
    :global(.project-card) {
        border-top: 5px solid #386938; /* Emerald Green */
        transition: transform 0.3s ease, border-color 0.3s ease;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    @media (hover: hover) {
        :global(.project-card:hover) {
            border-color: oklch(65% 0.16 75); /* Deep Amber */
            transform: translateY(-10px);
        }
    }

    /* Grid voor de Features */
    .features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        align-items: stretch;
    }

    /* Styling voor de call-to-action knop binnen HighlightBlock */
    .btn {
        display: inline-block;
        margin-top: 1.5rem;
        padding: 0.8rem 1.5rem;
        background: #386938; /* Emerald Green */
        color: #ffffff;
        text-decoration: none;
        border-radius: 8px;
        font-weight: bold;
        transition: background 0.2s, color 0.2s, transform 0.2s;
    }

    .btn:hover {
        background: oklch(65% 0.16 75); /* Deep Amber */
        color: oklch(22% 0.02 145); /* Deep Ink */
        transform: translateY(-2px);
    }
</style>