<script>
    import * as m from '$lib/paraglide/messages';
    
    import HighlightBlock from '$lib/components/HighlightBlock.svelte';
    import FeatureCard from '$lib/components/FeatureCard.svelte';
    import InfoWithImage from '$lib/components/InfoWithImage.svelte';
    import MediaCardGif from '$lib/components/MediaCardGif.svelte';

    // Importeer de specifieke afbeeldingen uit de assets map [cite: 115]
    import imgBaseToFrame from '$lib/assets/goal_from_base_to_frame.png';
    import imgCommunityDriven from '$lib/assets/goal_community_driven.png';
    import placeholderImg from '$lib/assets/place-holder 875x875.jpg';
</script>

<main>
    <section class="hero-section">
        <HighlightBlock title={m.goal_hero_title()}>
            <p>{m.goal_hero_subtitle()}</p>
            </HighlightBlock>
    </section>

    <section class="vision-showcase">
        <InfoWithImage 
            title={m.goal_info_title()} 
            images={[{ src: imgBaseToFrame, alt: "Van basisframe naar eigen toepassing" }]}
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
            gifs={[imgCommunityDriven]} 
            altText="Community samenwerking aan de Bruut robot"
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