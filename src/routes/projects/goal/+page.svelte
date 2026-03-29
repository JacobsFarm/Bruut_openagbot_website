<script>
    import * as m from '$lib/paraglide/messages';
    
    import HighlightBlock from '$lib/components/HighlightBlock.svelte';
    import FeatureCard from '$lib/components/FeatureCard.svelte';
    import InfoWithImage from '$lib/components/InfoWithImage.svelte';
    import MediaCardGif from '$lib/components/MediaCardGif.svelte';

    // Gebruik de placeholder afbeeldingen uit de assets of static map
    import placeholderImg from '$lib/assets/place-holder 875x875.jpg';
</script>

<main>
    <section class="hero-section">
        <HighlightBlock title={m.goal_hero_title()}>
            <p>{m.goal_hero_subtitle()}</p>
            <div class="cta-wrapper">
                <a href="/about-us" class="btn-primary">{m.goal_cta()}</a>
            </div>
        </HighlightBlock>
    </section>

    <section class="vision-showcase">
        <InfoWithImage 
            title={m.goal_info_title()} 
            images={[{ src: placeholderImg, alt: "Visie illustratie" }]}
        >
            <p>{m.goal_info_desc()}</p>
        </InfoWithImage>
    </section>

    <section class="benefits-grid">
        <FeatureCard 
            title={m.goal_feature1_title()} 
            desc={m.goal_feature1_desc()} 
        />
        <FeatureCard 
            title={m.goal_feature2_title()} 
            desc={m.goal_feature2_desc()} 
        />
        <FeatureCard 
            title={m.goal_feature3_title()} 
            desc={m.goal_feature3_desc()} 
        />
    </section>

    <section class="community-media">
        <MediaCardGif 
            title={m.goal_feature1_title()} 
            desc={m.goal_feature1_desc()}
            gifs={[placeholderImg]} 
            altText="Community samenwerking"
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

    /* Styling voor de CTA knop in het HighlightBlock */
    .cta-wrapper {
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
        letter-spacing: 1px;
        transition: all 0.3s ease;
    }

    .btn-primary:hover {
        background-color: oklch(65% 0.16 75); /* Deep Amber */
        color: oklch(22% 0.02 145); /* Deep Ink */
        transform: translateY(-2px);
    }

    .benefits-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
    }

    .community-media {
        width: 100%;
    }

    @media (max-width: 768px) {
        main {
            padding: 2rem 1rem;
            gap: 4rem;
        }
    }
</style>