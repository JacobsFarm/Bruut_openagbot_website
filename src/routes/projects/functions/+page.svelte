<script>
    import * as m from '$lib/paraglide/messages';
    import HighlightBlock from '$lib/components/HighlightBlock.svelte';
    import MediaCardPicture from '$lib/components/MediaCardPicture.svelte';

    // Het pad naar de placeholder afbeelding die je wilde gebruiken
    const placeholderImages = ["/assets/place-holder 875x875.jpg"];

    // Array met alle functionaliteiten gekoppeld aan de Paraglide vertalingen
    const functionalities = [
        { title: m.func_1_title, desc: m.func_1_desc },
        { title: m.func_2_title, desc: m.func_2_desc },
        { title: m.func_3_title, desc: m.func_3_desc },
        { title: m.func_4_title, desc: m.func_4_desc },
        { title: m.func_5_title, desc: m.func_5_desc },
        { title: m.func_6_title, desc: m.func_6_desc },
        { title: m.func_7_title, desc: m.func_7_desc },
        { title: m.func_8_title, desc: m.func_8_desc },
        { title: m.func_9_title, desc: m.func_9_desc },
        { title: m.func_10_title, desc: m.func_10_desc },
        { title: m.func_11_title, desc: m.func_11_desc },
        { title: m.func_12_title, desc: m.func_12_desc },
        { title: m.func_13_title, desc: m.func_13_desc },
        { title: m.func_14_title, desc: m.func_14_desc },
        { title: m.func_15_title, desc: m.func_15_desc },
        { title: m.func_16_title, desc: m.func_16_desc },
        { title: m.func_17_title, desc: m.func_17_desc },
        { title: m.func_18_title, desc: m.func_18_desc },
        { title: m.func_19_title, desc: m.func_19_desc },
        { title: m.func_20_title, desc: m.func_20_desc },
        { title: m.func_21_title, desc: m.func_21_desc },
        { title: m.func_22_title, desc: m.func_22_desc },
        { title: m.func_23_title, desc: m.func_23_desc },
        { title: m.func_24_title, desc: m.func_24_desc },
        { title: m.func_25_title, desc: m.func_25_desc },
        { title: m.func_26_title, desc: m.func_26_desc },
        { title: m.func_27_title, desc: m.func_27_desc },
        { title: m.func_28_title, desc: m.func_28_desc },
        { title: m.func_29_title, desc: m.func_29_desc }
    ];
</script>

<main>
    <section class="hero-section">
        <HighlightBlock title={m.func_hero_title()}>
            <p>{m.func_hero_subtitle()}</p>
        </HighlightBlock>
    </section>

    <section class="functionalities-list">
        {#each functionalities as func, i}
            <MediaCardPicture 
                title={func.title()} 
                desc={func.desc()} 
                images={placeholderImages} 
                reverse={i % 2 !== 0} 
                altText={func.title()}
            />
        {/each}
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

    .functionalities-list {
        display: flex;
        flex-direction: column;
        gap: 3rem; /* Zorgt voor mooie witruimte tussen de kaarten */
    }
</style>