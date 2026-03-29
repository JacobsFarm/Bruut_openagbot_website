<script>
    import * as m from '$lib/paraglide/messages.js';

    // Componenten importeren
    import MediaCardPicture from '$lib/components/MediaCardPicture.svelte';
    import MediaCardGif from '$lib/components/MediaCardGif.svelte';
    import FeatureCard from '$lib/components/FeatureCard.svelte';
    import HighlightBlock from '$lib/components/HighlightBlock.svelte';

    // Core Assets
    import logo from '$lib/assets/Ai-detector-logo-800x800.jpg';
    import liveViewImg from '$lib/assets/ai_detector_live_view.png';
    import dashboardImg from '$lib/assets/ai_detector_home_page.png';

    // Media assets
    import imageDetectionImg1 from '$lib/assets/ai_detector_pictured_detection.jpg';
    import imageDetectionImg2 from '$lib/assets/ai_detector_pictured_detection-2-896x512.jpg';
    import imageDetectionImg3 from '$lib/assets/ai_detector_pictured_detection-3-896x512.jpg';
    import imageDetectionImg4 from '$lib/assets/ai_detector_pictured_detection-4-896x512.jpg';
    import imageDetectionImg5 from '$lib/assets/ai_detector_pictured_detection-5-896x512.jpg';
    import originalGif from '$lib/assets/ai_detector_video_detection.gif';
    import originalGif2 from '$lib/assets/ai_detector_video_detection-2-896x512.gif';
</script>

<main class="ai-detector-wrapper">
    <header class="hero">
        <img src={logo} alt="AI Detector Logo" class="hero-logo" />
        <div class="hero-text">
            <h1>{m.ai_detector_hero_title()}</h1>
            <p class="subtitle">{m.ai_detector_hero_subtitle()}</p>
            <div class="cta-buttons">
                <a href="https://github.com/ESchouten/ai-detector/releases" class="btn primary">{m.ai_detector_btn_download()}</a>
                <a href="https://github.com/ESchouten/ai-detector" class="btn secondary">{m.ai_detector_btn_github()}</a>
            </div>
        </div>
    </header>

    <HighlightBlock title={m.ai_detector_about_title()}>
        <p>{m.ai_detector_about_p1()}</p>
        <p>{m.ai_detector_about_p2()}</p>
    </HighlightBlock>

    <section class="media-section">
        <h2 class="section-title">{m.ai_detector_media_title()}</h2>
        <div class="media-grid">
            <MediaCardPicture 
                title={m.ai_detector_image_title()}
                desc={m.ai_detector_image_desc()}
                images={[imageDetectionImg1, imageDetectionImg2, imageDetectionImg3, imageDetectionImg4, imageDetectionImg5]}
                altText="Detection output example sequence"
            />

            <MediaCardGif
                title={m.ai_detector_video_title()}
                desc={m.ai_detector_video_desc()}
                gifs={[originalGif, originalGif2]} 
                altText="Animated detection sequence"
                reverse={true} 
            />
        </div>
    </section>

    <section class="features">
        <FeatureCard 
            title={m.ai_detector_feature_local_title()} 
            desc={m.ai_detector_feature_local_desc()} 
        />
        <FeatureCard 
            title={m.ai_detector_feature_network_title()} 
            desc={m.ai_detector_feature_network_desc()} 
        />
        <FeatureCard 
            title={m.ai_detector_feature_custom_title()} 
            desc={m.ai_detector_feature_custom_desc()} 
        />
    </section>

    <section class="how-it-works">
        <h2 class="section-title">{m.ai_detector_how_title()}</h2>
        <div class="split-layout">
            <div class="text-content">
                <h3>{m.ai_detector_step_1_title()}</h3>
                <p>{m.ai_detector_step_1_desc()}</p>
                
                <h3>{m.ai_detector_step_2_title()}</h3>
                <p>{m.ai_detector_step_2_desc()}</p>

                <h3>{m.ai_detector_step_3_title()}</h3>
                <p>{m.ai_detector_step_3_desc()}</p>
            </div>
            <div class="image-content">
                <img src={liveViewImg} alt="Live View Dashboard" class="screenshot" />
                <img src={dashboardImg} alt="Home Page Dashboard" class="screenshot" />
            </div>
        </div>
    </section>

    <section class="installation">
        <h2 class="section-title">{m.ai_detector_install_title()}</h2>
        <p class="center-text">{m.ai_detector_install_desc()}</p>
        <div class="install-options">
            <FeatureCard 
                title={m.ai_detector_install_win_title()} 
                desc={m.ai_detector_install_win_desc()} 
            />
            <FeatureCard 
                title={m.ai_detector_install_docker_title()} 
                desc={m.ai_detector_install_docker_desc()} 
            />
        </div>
    </section>
</main>

<style>
    :root {
        --primary: #386938; /* Emerald Green */
        --primary-hover: oklch(28% 0.05 145);
        --accent: oklch(65% 0.16 75); /* Deep Amber */
        --text-main: oklch(22% 0.02 145); /* Deep Ink */
        --bg-color: oklch(98% 0.005 145); /* Off White */
        --card-bg: #ffffff;
    }

    .ai-detector-wrapper {
        font-family: 'Roboto', sans-serif;
        color: var(--text-main);
        background-color: var(--bg-color);
        line-height: 1.6;
        padding: 0 20px 60px;
    }

    h1, h2, h3, .btn {
        font-family: 'Bebas Kai', sans-serif;
        font-weight: normal;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .section-title {
        font-size: 2.5rem;
        text-align: center;
        color: var(--primary);
        margin-bottom: 40px;
    }

    .center-text {
        text-align: center;
        max-width: 600px;
        margin: 0 auto 30px;
    }

    /* Hero Section */
    .hero {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 60px 0 40px;
    }

    .hero-logo {
        max-width: 250px;
        border-radius: 20px;
        margin-bottom: 20px;
    }

    .hero h1 {
        font-size: 3.5rem;
        color: var(--primary);
        margin: 0;
    }

    .subtitle {
        font-size: 1.2rem;
        max-width: 600px;
        margin: 10px auto 30px;
        font-weight: 500;
    }

    /* Buttons */
    .cta-buttons {
        display: flex;
        gap: 15px;
        justify-content: center;
    }

    .btn {
        padding: 12px 24px;
        font-size: 1.2rem;
        text-decoration: none;
        border-radius: 6px;
        transition: background 0.2s ease;
    }

    .btn.primary {
        background-color: var(--primary);
        color: white;
    }

    .btn.primary:hover {
        background-color: var(--primary-hover);
    }

    .btn.secondary {
        background-color: transparent;
        border: 2px solid var(--primary);
        color: var(--primary);
    }

    .btn.secondary:hover {
        background-color: var(--primary);
        color: white;
    }

    /* Media Cards */
    .media-section {
        max-width: 1000px;
        margin: 60px auto;
    }

    .media-grid {
        display: flex;
        flex-direction: column;
        gap: 40px;
    }

    /* Zorgt voor de juiste layout van de FeatureCards (zowel per 3 als per 2) */
    .features, .install-options {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 20px;
        max-width: 1000px;
        margin: 60px auto;
    }

    /* Split Layout for How it Works */
    .how-it-works, .installation {
        max-width: 1000px;
        margin: 60px auto;
    }

    .split-layout {
        display: flex;
        flex-wrap: wrap;
        gap: 40px;
        align-items: center;
    }

    .text-content {
        flex: 1;
        min-width: 300px;
    }

    .text-content h3 {
        font-size: 1.5rem;
        color: var(--accent);
        margin-bottom: 5px;
    }

    .image-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 20px;
        min-width: 300px;
    }

    .screenshot {
        width: 100%;
        border-radius: 10px;
        box-shadow: 0 6px 12px rgba(0,0,0,0.1);
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
        .hero h1 { 
            font-size: 2.5rem;
        }
        .cta-buttons { 
            flex-direction: column;
        }
    }
</style>