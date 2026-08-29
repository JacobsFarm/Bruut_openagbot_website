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
    import imgWeeder from '$lib/assets/functions_weeder.jpg';
    import imgGrassMeter from '$lib/assets/functions_grass_meter.jpg';
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

    // Functionaliteiten gegroepeerd per categorie.
    // Zonder eigen afbeelding wordt de fallback robotbuild.png gebruikt.
    const categories = [
        {
            title: m.func_cat_1_title,
            items: [
                { title: m.func_1_title, desc: m.func_1_desc, images: [imgFeedpusher] },
                { title: m.func_2_title, desc: m.func_2_desc, images: [fallbackImg] },
                { title: m.func_3_title, desc: m.func_3_desc, images: [fallbackImg] },
                { title: m.func_4_title, desc: m.func_4_desc, images: [fallbackImg] },
                { title: m.func_5_title, desc: m.func_5_desc, images: [imgFingerWeeder] },
                { title: m.func_6_title, desc: m.func_6_desc, images: [imgSpotspray, imgSpotsprayField] },
                { title: m.func_7_title, desc: m.func_7_desc, images: [fallbackImg] },
                { title: m.func_8_title, desc: m.func_8_desc, images: [imgWeeder] },
                { title: m.func_9_title, desc: m.func_9_desc, images: [fallbackImg] }
            ]
        },
        {
            title: m.func_cat_2_title,
            items: [
                { title: m.func_10_title, desc: m.func_10_desc, images: [imgSicklebar] },
                { title: m.func_11_title, desc: m.func_11_desc, images: [fallbackImg] }
            ]
        },
        {
            title: m.func_cat_3_title,
            items: [
                { title: m.func_12_title, desc: m.func_12_desc, images: [fallbackImg] },
                { title: m.func_13_title, desc: m.func_13_desc, images: [imgFertilizer] },
                { title: m.func_14_title, desc: m.func_14_desc, images: [imgLimeSpreader] }
            ]
        },
        {
            title: m.func_cat_4_title,
            items: [
                { title: m.func_15_title, desc: m.func_15_desc, images: [fallbackImg] },
                { title: m.func_16_title, desc: m.func_16_desc, images: [fallbackImg] },
                { title: m.func_17_title, desc: m.func_17_desc, images: [fallbackImg] }
            ]
        },
        {
            title: m.func_cat_5_title,
            items: [
                { title: m.func_18_title, desc: m.func_18_desc, images: [fallbackImg] },
                { title: m.func_19_title, desc: m.func_19_desc, images: [imgStraw] },
                { title: m.func_20_title, desc: m.func_20_desc, images: [fallbackImg] }
            ]
        },
        {
            title: m.func_cat_6_title,
            items: [
                { title: m.func_21_title, desc: m.func_21_desc, images: [fallbackImg] },
                { title: m.func_22_title, desc: m.func_22_desc, images: [fallbackImg] },
                { title: m.func_23_title, desc: m.func_23_desc, images: [imgSolar] },
                { title: m.func_24_title, desc: m.func_24_desc, images: [fallbackImg] }
            ]
        },
        {
            title: m.func_cat_7_title,
            items: [
                { title: m.func_25_title, desc: m.func_25_desc, images: [fallbackImg] },
                { title: m.func_26_title, desc: m.func_26_desc, images: [imgSeat] },
                { title: m.func_27_title, desc: m.func_27_desc, images: [imgDumper] },
                { title: m.func_28_title, desc: m.func_28_desc, images: [imgHitch] },
                { title: m.func_29_title, desc: m.func_29_desc, images: [fallbackImg] },
                { title: m.func_30_title, desc: m.func_30_desc, images: [fallbackImg] },
                { title: m.func_31_title, desc: m.func_31_desc, images: [fallbackImg] },
                { title: m.func_32_title, desc: m.func_32_desc, images: [fallbackImg] }
            ]
        },
        {
            title: m.func_cat_8_title,
            items: [
                { title: m.func_33_title, desc: m.func_33_desc, images: [imgGrassMeter, imgScanner] },
                { title: m.func_34_title, desc: m.func_34_desc, images: [fallbackImg] }
            ]
        }
    ];
</script>

<main>
    <section class="hero-section">
        <HighlightBlock title={m.func_hero_title()}>
            <p>{m.func_hero_subtitle()}</p>
        </HighlightBlock>
    </section>

    {#each categories as category}
        <section class="category">
            <h2 class="category-title">{category.title()}</h2>
            <div class="functionalities-list">
                {#each category.items as func, i}
                    <MediaCardPicture
                        title={func.title()}
                        desc={func.desc()}
                        images={func.images}
                        reverse={i % 2 !== 0}
                        altText={func.title()}
                    />
                {/each}
            </div>
        </section>
    {/each}
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

    .category {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .category-title {
        margin: 0;
        color: #386938; /* Emerald Green */
        font-family: 'Bebas Kai', sans-serif;
        font-weight: normal;
        font-size: 2rem;
        text-transform: uppercase;
        letter-spacing: 1px;
        padding-bottom: 0.5rem;
        border-bottom: 3px solid oklch(65% 0.16 75); /* Deep Amber */
    }

    .functionalities-list {
        display: flex;
        flex-direction: column;
        gap: 3rem;
    }
</style>
