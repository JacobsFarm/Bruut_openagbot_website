<script>
    import * as m from '$lib/paraglide/messages';
    import HighlightBlock from '$lib/components/HighlightBlock.svelte';
    import MediaCardPicture from '$lib/components/MediaCardPicture.svelte';

    // Fallback afbeelding
    import fallbackImg from '$lib/assets/robotbuild.png';

    // Specifieke Asset Imports
    import imgSicklebar from '$lib/assets/functions_sicklebar_mower.png';
    import imgSpotspray from '$lib/assets/functions_spotspray.png';
    import imgSpotsprayField from '$lib/assets/functions_spotspray_field.png';
    import imgFeedpusher from '$lib/assets/function_feedpsuher.png';
    import imgFertilizer from '$lib/assets/function_fertilize_spreader.png';
    import imgFingerWeeder from '$lib/assets/function_finger_weeder.png';
    import imgLimeSpreader from '$lib/assets/function_lime_spreader.png';
    import imgScanner from '$lib/assets/function_scanner.png';
    import imgSeat from '$lib/assets/function_seat.png';
    import imgSolar from '$lib/assets/function_solarpanel.png';
    import imgStraw from '$lib/assets/function_straw_spreader.png';
    import imgHitch from '$lib/assets/function_tow_hitch.png';
    import imgDumper from '$lib/assets/function_dumper.png';

    // Array met functionaliteiten. De eerste 12 hebben hun eigen afbeelding(en).
    const functionalities = [
        { title: m.func_1_title, desc: m.func_1_desc, images: [imgSicklebar] },
        { title: m.func_2_title, desc: m.func_2_desc, images: [imgSpotspray, imgSpotsprayField] },
        { title: m.func_3_title, desc: m.func_3_desc, images: [imgFeedpusher] },
        { title: m.func_4_title, desc: m.func_4_desc, images: [imgFertilizer] },
        { title: m.func_5_title, desc: m.func_5_desc, images: [imgFingerWeeder] },
        { title: m.func_6_title, desc: m.func_6_desc, images: [imgLimeSpreader] },
        { title: m.func_7_title, desc: m.func_7_desc, images: [imgScanner] },
        { title: m.func_8_title, desc: m.func_8_desc, images: [imgSeat] },
        { title: m.func_9_title, desc: m.func_9_desc, images: [imgSolar] },
        { title: m.func_10_title, desc: m.func_10_desc, images: [imgStraw] },
        { title: m.func_11_title, desc: m.func_11_desc, images: [imgHitch] },
        { title: m.func_12_title, desc: m.func_12_desc, images: [imgDumper] },
        
        // De rest gebruikt de fallback robotbuild.jpg
        { title: m.func_13_title, desc: m.func_13_desc, images: [fallbackImg] },
        { title: m.func_14_title, desc: m.func_14_desc, images: [fallbackImg] },
        { title: m.func_15_title, desc: m.func_15_desc, images: [fallbackImg] },
        { title: m.func_16_title, desc: m.func_16_desc, images: [fallbackImg] },
        { title: m.func_17_title, desc: m.func_17_desc, images: [fallbackImg] },
        { title: m.func_18_title, desc: m.func_18_desc, images: [fallbackImg] },
        { title: m.func_19_title, desc: m.func_19_desc, images: [fallbackImg] },
        { title: m.func_20_title, desc: m.func_20_desc, images: [fallbackImg] },
        { title: m.func_21_title, desc: m.func_21_desc, images: [fallbackImg] },
        { title: m.func_22_title, desc: m.func_22_desc, images: [fallbackImg] },
        { title: m.func_23_title, desc: m.func_23_desc, images: [fallbackImg] },
        { title: m.func_24_title, desc: m.func_24_desc, images: [fallbackImg] },
        { title: m.func_25_title, desc: m.func_25_desc, images: [fallbackImg] },
        { title: m.func_26_title, desc: m.func_26_desc, images: [fallbackImg] },
        { title: m.func_27_title, desc: m.func_27_desc, images: [fallbackImg] },
        { title: m.func_28_title, desc: m.func_28_desc, images: [fallbackImg] },
        { title: m.func_29_title, desc: m.func_29_desc, images: [fallbackImg] }
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
                images={func.images} 
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
        gap: 3rem;
    }
</style>