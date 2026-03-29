<script>
    import * as m from '$lib/paraglide/messages.js';
    
    // Herbruikbare componenten
    import HighlightBlock from '$lib/components/HighlightBlock.svelte';
    import InfoWithImage from '$lib/components/InfoWithImage.svelte'; 

    // Assets importeren
    import logo from '$lib/assets/calvingcatcher-logo-875x-875.jpg';
    import calvingcatcher1 from '$lib/assets/calvingcatcher_1.jpg';
    import calvingcatcher2 from '$lib/assets/calvingcatcher_2.jpg';
    import calvingcatcher3 from '$lib/assets/calvingcatcher_3.jpg';
    import calvingcatcher4 from '$lib/assets/calvingcatcher_4.jpg';
</script>

<div class="page-wrapper">
    <header class="hero">
        <img src={logo} alt="CalvingCatcher AI Logo" class="hero-logo" />
        <div class="hero-text">
            <h1>{m.calvingcatcher_title()}</h1>
            <p class="subtitle"><strong>{m.calvingcatcher_subtitle()}</strong></p>
            <p class="hero-desc">{m.calvingcatcher_hero_description()}</p>
        </div>
    </header>

    <InfoWithImage 
        title={m.calvingcatcher_basics_title()} 
        images={[
            { src: calvingcatcher1, alt: "Calving monitoring basics" },
            { src: calvingcatcher4, alt: "Hardware Setup / The Basics" }
        ]}
    >
        <ul>
            <li>{m.calvingcatcher_basics_monitoring()}</li>
            <li>{m.calvingcatcher_basics_ai()}</li>
            <li>{m.calvingcatcher_basics_alerts()}</li>
            <li>{m.calvingcatcher_basics_non_intrusive()}</li>
            <li>{m.calvingcatcher_basics_local()}</li>
        </ul>
    </InfoWithImage>

    <HighlightBlock title={m.calvingcatcher_smart_title()}>
        <p>{m.calvingcatcher_smart_learned()}</p>
        <p>{m.calvingcatcher_smart_confidence()}</p>
    </HighlightBlock>

    <InfoWithImage 
        title={m.calvingcatcher_practice_title()} 
        images={[{ src: calvingcatcher2, alt: "AI analysis of calving" }]}
        reverse={true}
    >
        <ul>
            <li>{m.calvingcatcher_practice_continuous()}</li>
            <li>{m.calvingcatcher_practice_analysis()}</li>
            <li>{m.calvingcatcher_practice_detection()}</li>
            <li>{m.calvingcatcher_practice_perfect_shot()}</li>
            <li>{m.calvingcatcher_practice_notification()}</li>
        </ul>
    </InfoWithImage>

    <section>
        <h2>{m.calvingcatcher_control_title()}</h2>
        <div class="custom-card">
            <p>{m.calvingcatcher_control_tool()}</p>
            <p>{m.calvingcatcher_control_id()}</p>
            <p>{m.calvingcatcher_control_physical()}</p>
            <p>{m.calvingcatcher_control_eyes()}</p>
        </div>
        
        <div class="workflow-box">
             {m.calvingcatcher_workflow_title()}: {m.calvingcatcher_workflow_step1()} &rarr;
             {m.calvingcatcher_workflow_step2()} &rarr; {m.calvingcatcher_workflow_step3()} &rarr; {m.calvingcatcher_workflow_step4()} &rarr; {m.calvingcatcher_workflow_step5()}
        </div>
    </section>

    <InfoWithImage 
        title={m.calvingcatcher_value_title()} 
        images={[{ src: calvingcatcher3, alt: "Insights and value" }]}
    >
        <ul>
            <li>{m.calvingcatcher_value_constant()}</li>
            <li>{m.calvingcatcher_value_night()}</li>
            <li>{m.calvingcatcher_value_fast()}</li>
            <li>{m.calvingcatcher_value_precision()}</li>
        </ul>
    </InfoWithImage>

    <section class="stacked-sections">
        <h2>{m.calvingcatcher_privacy_title()}</h2>
        <div class="custom-card">
            <ul>
                <li>{m.calvingcatcher_privacy_local()}</li>
                <li>{m.calvingcatcher_privacy_req()}</li>
                <li>{m.calvingcatcher_privacy_platforms()}</li>
                <li>{m.calvingcatcher_privacy_storage()}</li>
                <li>{m.calvingcatcher_privacy_improvement()}</li>
            </ul>
        </div>

        <h2>{m.calvingcatcher_needs_title()}</h2>
        <div class="custom-card">
            <ul>
                <li>{m.calvingcatcher_needs_pc()}</li>
                <li>{m.calvingcatcher_needs_camera()}</li>
                <li>{m.calvingcatcher_needs_switch()}</li>
                <li>{m.calvingcatcher_needs_cable()}</li>
                <li>{m.calvingcatcher_needs_internet()}</li>
            </ul>
        </div>

        <h2>{m.calvingcatcher_provide_title()}</h2>
        <div class="custom-card">
            <ul>
                <li>{m.calvingcatcher_provide_model()}</li>
                <li>{m.calvingcatcher_provide_privacy()}</li>
                <li>{m.calvingcatcher_provide_os()}</li>
            </ul>
        </div>
    </section>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Kai&family=Roboto:wght@300;400;700&display=swap');

    :global(body) {
        --primary: #386938; 
        --primary-hover: oklch(28% 0.05 145);
        --accent-amber: oklch(65% 0.16 75); 
        --accent-teal: oklch(60% 0.09 195); 
        --bg-color: oklch(98% 0.005 145); 
        --text-main: oklch(22% 0.02 145); 
        --card-bg: #ffffff;
        --soft-gray: oklch(85% 0.01 145);
        --font-heading: 'Bebas Kai', sans-serif;
        --font-body: 'Roboto', sans-serif;
        
        background-color: var(--bg-color);
        color: var(--text-main);
        font-family: var(--font-body);
        margin: 0;
        padding: 0;
        line-height: 1.6;
    }

    .page-wrapper { max-width: 1200px; margin: 0 auto; padding: 1.5rem 2rem 4rem; }

    h1, h2, h3 { 
        font-family: var(--font-heading); 
        color: var(--primary);
        text-transform: uppercase; 
        letter-spacing: 1px; 
        font-weight: normal;
    }

    h2 { font-size: 2rem; margin-top: 2.5rem; padding-bottom: 0.5rem; }
    
    .hero { 
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        margin-bottom: 3rem; 
        padding: 4rem 2rem 3rem; 
        background-color: var(--card-bg); 
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        border-bottom: 5px solid var(--accent-amber);
    }

    .hero-logo {
        max-width: 250px;
        border-radius: 20px;
        margin-bottom: 20px;
    }
    
    .hero h1 { font-size: 3.5rem; margin: 0; }
    .hero .subtitle { color: var(--accent-teal); font-size: 1.3rem; margin-top: 5px; }
    .hero-desc { font-size: 1.1rem; max-width: 800px; margin: 1.5rem auto 0; }
    
    /* Sectie voor de gestapelde kaarten. Neemt de breedte van de pagina aan */
    .stacked-sections {
        margin-bottom: 3rem;
    }
    
    .custom-card { 
        background: var(--card-bg);
        padding: 25px; 
        border-radius: 12px; 
        box-shadow: 0 4px 6px rgba(0,0,0,0.05); 
        margin-bottom: 1.5rem; 
        border-top: 4px solid var(--primary); 
        box-sizing: border-box;
    }
    
    .workflow-box { 
        background: var(--accent-amber);
        color: var(--text-main); 
        padding: 2rem; 
        border-radius: 12px; 
        font-weight: bold; 
        text-align: center; 
        margin: 2.5rem 0; 
        font-size: 1.25rem; 
        box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    }
    
    ul { list-style-type: square; padding-left: 1.5rem; margin: 0; }
    li { margin-bottom: 0.75rem; color: var(--text-main); }
    
    .img-fluid { width: 100%; height: auto; border-radius: 12px; box-shadow: 0 6px 12px rgba(0,0,0,0.1); display: block; }
    
    @media (max-width: 768px) {
        .hero h1 { font-size: 2.5rem; }
    }
</style>