<script>
    import * as m from '$lib/paraglide/messages.js';
    import ProjectCard from '$lib/components/ProjectCard.svelte';
    import FeatureCard from '$lib/components/FeatureCard.svelte';
    import InfoWithImage from '$lib/components/InfoWithImage.svelte';
    import MediaCardGif from '$lib/components/MediaCardGif.svelte';
    import FeaturedIn from '$lib/components/FeaturedIn.svelte';
    // Nieuwe import
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
    import { onMount } from 'svelte';

    // Assets
    import imgRobotBuild from '$lib/assets/front_page_robot_build.png';
    import imgGoal from '$lib/assets/goal_community_driven.png';
    import imgFunctions from '$lib/assets/front_page_functionality.png';
    import imgScad from '$lib/assets/front_page_intro_picture.webp';
    import gifRobot from '$lib/assets/frontpage_video1.gif';

    const statsValue1 = tweened(0, { duration: 2000, easing: cubicOut });
    const statsValue2 = tweened(0, { duration: 2000, easing: cubicOut });
    const statsValue3 = tweened(0, { duration: 2000, easing: cubicOut });
    let statsRef;

    onMount(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                statsValue1.set(100); 
                statsValue2.set(100);   
                statsValue3.set(10);  
                
                observer.disconnect();
            }
        }, { threshold: 0.3 });

        if (statsRef) {
            observer.observe(statsRef);
        }
        return () => observer.disconnect();
    });
</script>

<div class="container">
    <header class="brand-hero">
        <h1>{m.front_page_hero_title()}</h1>
        <h2 class="slogan">{m.front_page_hero_subtitle()}</h2>
        <p class="description">{m.front_page_hero_description()}</p>
    </header>

    <section class="projects-grid">
        <ProjectCard 
            title={m.front_page_project_build_title()} 
            link="/projects/robotbuild" 
            desc={m.front_page_project_build_desc()} 
            logo={imgRobotBuild}
        />
        <ProjectCard 
            title={m.front_page_project_goal_title()}
            link="/projects/goal"
            desc={m.front_page_project_goal_desc()}
            logo={imgGoal}
        />
        <ProjectCard 
            title={m.front_page_project_functions_title()}
            link="/projects/functions"
            desc={m.front_page_project_functions_desc()}
            logo={imgFunctions}
        />
    </section>

    <section class="platform-info">
        <InfoWithImage 
            title={m.front_page_info_platform_title()} 
            images={[{ src: imgScad, alt: 'Concept and design of the robot' }]}
        >
            <p>{m.front_page_info_platform_desc()}</p>
        </InfoWithImage>
    </section>

    <section class="media-showcase">
        <MediaCardGif 
            title={m.front_page_media_title()} 
            desc={m.front_page_media_desc()} 
            gifs={[gifRobot]} 
            altText="The Bruut Field Robot in action" 
        />
        <div class="action-container">
            <a href="/projects/robotbuild" class="btn-primary">See the Build</a>
        </div>
    </section>

    <FeaturedIn />

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

    <section class="stats-section" bind:this={statsRef}>
        <h2>{m.front_page_stats_title()}</h2>
        <p class="stats-subtitle">{m.front_page_stats_subtitle()}</p>
        
        <div class="stats-grid">
            <div class="stat-card">
                <span class="stat-number">{Math.floor($statsValue1)}%</span>
                <span class="stat-label">{m.front_page_stats_label_1()}</span>
            </div>
            <div class="stat-card">
                <span class="stat-number">{Math.floor($statsValue2)}%</span>
                <span class="stat-label">{m.front_page_stats_label_2()}</span>
            </div>
            <div class="stat-card">
                <span class="stat-number">{Math.floor($statsValue3)}+</span>
                <span class="stat-label">{m.front_page_stats_label_3()}</span>
            </div>
        </div>
    </section>

    <footer class="official-links">
        <p>Part of the <a href="https://github.com/jacobsfarm/bruut_openagbot_website">Official Bruut Open Source Project</a></p>
    </footer>
</div>

<style>
    :global(body) {
        background-color: oklch(98% 0.005 145);
        font-family: 'Roboto', sans-serif;
        margin: 0;
        color: oklch(22% 0.02 145);
        overflow-x: hidden;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem 1rem;
        display: flex;
        flex-direction: column;
        gap: 4rem;
    }

    .brand-hero {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
    }

    h1 {
        font-family: 'Bebas Kai', sans-serif;
        font-size: clamp(2.5rem, 8vw, 4.5rem);
        color: #386938; 
        margin-bottom: 1rem;
        text-transform: uppercase;
        line-height: 1;
    }

    .brand-hero .slogan {
        font-size: clamp(1.2rem, 5vw, 1.75rem);
        color: oklch(60% 0.09 195);
        font-weight: 500;
        margin: 0;
    }

    .brand-hero .description {
        font-size: clamp(1rem, 4vw, 1.15rem);
        max-width: 600px;
        margin: 0;
    }

    .projects-grid {
        display: grid;
        gap: 2rem;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
    }

    .action-container {
        display: flex;
        justify-content: center;
        margin-top: 2rem;
    }

    .btn-primary {
        background-color: #386938;
        color: #ffffff;
        padding: 0.8rem 2.5rem;
        border-radius: 8px;
        text-decoration: none;
        font-weight: bold;
        font-size: 1.1rem;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .btn-primary:hover {
        background-color: oklch(65% 0.16 75);
        transform: translateY(-2px);
    }

    .features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
    }

    .stats-section {
        text-align: center;
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 2rem;
    }

    .stat-card {
        background: #ffffff;
        border-radius: 16px;
        padding: 2.5rem 1rem;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
        border-top: 5px solid #386938;
    }

    .stat-number {
        font-family: 'Bebas Kai', sans-serif;
        font-size: 4rem;
        color: #386938;
    }

    .official-links {
        text-align: center;
        border-top: 1px solid oklch(60% 0.09 195);
        padding-top: 2rem;
    }

    .official-links a {
        color: #386938;
        font-weight: bold;
        text-decoration: none;
    }
</style>