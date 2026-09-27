<script>
    import * as m from '$lib/paraglide/messages';
    import HighlightBlock from '$lib/components/HighlightBlock.svelte';
    import MediaCardPicture from '$lib/components/MediaCardPicture.svelte';

    // Specifieke Asset Imports
    import imgSicklebar from '$lib/assets/functions_sicklebar_mower.webp';
    import imgSpotspray from '$lib/assets/functions_spotspray.webp';
    import imgSpotsprayField from '$lib/assets/functions_spotspray_field.webp';
    import imgWeeder from '$lib/assets/functions_weeder.webp';
    import imgGrassMeter from '$lib/assets/functions_grass_meter.webp';
    import imgFeedpusher from '$lib/assets/function_feedpsuher.webp';
    import imgFertilizer from '$lib/assets/function_fertilize_spreader.webp';
    import imgFingerWeeder from '$lib/assets/function_finger_weeder.webp';
    import imgLimeSpreader from '$lib/assets/function_lime_spreader.webp';
    import imgScanner from '$lib/assets/function_scanner.webp';
    import imgSeat from '$lib/assets/function_seat.webp';
    import imgSolar from '$lib/assets/function_solarpanel.webp';
    import imgStraw from '$lib/assets/function_straw_spreader.webp';
    import imgHitch from '$lib/assets/function_tow_hitch.webp';
    import imgDumper from '$lib/assets/function_dumper.webp';
    import imgLiquidFertilizer from '$lib/assets/function_liquid_fertilizer.webp';

    // Cartoon per functie, gegenereerd door scripts/generate-function-cartoons.mjs.
    const cartoons = import.meta.glob('/src/lib/assets/function_cartoons/*.svg', {
        eager: true,
        query: '?url',
        import: 'default'
    });
    const cartoon = (nr) => cartoons[`/src/lib/assets/function_cartoons/func_${nr}.svg`];

    // Functionaliteiten gegroepeerd per categorie. Heeft een functie een echte
    // foto, dan komt die eerst en de cartoon daarna; anders alleen de cartoon.
    const categories = [
        {
            title: m.func_cat_1_title,
            items: [
                { title: m.func_1_title, desc: m.func_1_desc, images: [imgFeedpusher, cartoon(1)] },
                { title: m.func_2_title, desc: m.func_2_desc, images: [cartoon(2)] },
                { title: m.func_3_title, desc: m.func_3_desc, images: [cartoon(3)] },
                { title: m.func_4_title, desc: m.func_4_desc, images: [cartoon(4)] },
                { title: m.func_5_title, desc: m.func_5_desc, images: [imgFingerWeeder, cartoon(5)] },
                { title: m.func_6_title, desc: m.func_6_desc, images: [imgSpotspray, imgSpotsprayField, cartoon(6)] },
                { title: m.func_7_title, desc: m.func_7_desc, images: [cartoon(7)] },
                { title: m.func_8_title, desc: m.func_8_desc, images: [imgWeeder, cartoon(8)] },
                { title: m.func_9_title, desc: m.func_9_desc, images: [cartoon(9)] }
            ]
        },
        {
            title: m.func_cat_2_title,
            items: [
                { title: m.func_10_title, desc: m.func_10_desc, images: [imgSicklebar, cartoon(10)] },
                { title: m.func_11_title, desc: m.func_11_desc, images: [cartoon(11)] }
            ]
        },
        {
            title: m.func_cat_3_title,
            items: [
                { title: m.func_12_title, desc: m.func_12_desc, images: [cartoon(12)] },
                { title: m.func_13_title, desc: m.func_13_desc, images: [imgFertilizer, cartoon(13)] },
                { title: m.func_14_title, desc: m.func_14_desc, images: [imgLimeSpreader, cartoon(14)] },
                { title: m.func_38_title, desc: m.func_38_desc, images: [imgLiquidFertilizer, cartoon(38)] }
            ]
        },
        {
            title: m.func_cat_4_title,
            items: [
                { title: m.func_15_title, desc: m.func_15_desc, images: [cartoon(15)] },
                { title: m.func_16_title, desc: m.func_16_desc, images: [cartoon(16)] },
                { title: m.func_17_title, desc: m.func_17_desc, images: [cartoon(17)] }
            ]
        },
        {
            title: m.func_cat_5_title,
            items: [
                { title: m.func_18_title, desc: m.func_18_desc, images: [cartoon(18)] },
                { title: m.func_19_title, desc: m.func_19_desc, images: [imgStraw, cartoon(19)] },
                { title: m.func_20_title, desc: m.func_20_desc, images: [cartoon(20)] }
            ]
        },
        {
            title: m.func_cat_6_title,
            items: [
                { title: m.func_21_title, desc: m.func_21_desc, images: [cartoon(21)] },
                { title: m.func_22_title, desc: m.func_22_desc, images: [cartoon(22)] },
                { title: m.func_23_title, desc: m.func_23_desc, images: [imgSolar, cartoon(23)] },
                { title: m.func_24_title, desc: m.func_24_desc, images: [cartoon(24)] },
                { title: m.func_44_title, desc: m.func_44_desc, images: [cartoon(44)] }
            ]
        },
        {
            title: m.func_cat_7_title,
            items: [
                { title: m.func_25_title, desc: m.func_25_desc, images: [cartoon(25)] },
                { title: m.func_26_title, desc: m.func_26_desc, images: [imgSeat, cartoon(26)] },
                { title: m.func_27_title, desc: m.func_27_desc, images: [imgDumper, cartoon(27)] },
                { title: m.func_28_title, desc: m.func_28_desc, images: [imgHitch, cartoon(28)] },
                { title: m.func_29_title, desc: m.func_29_desc, images: [cartoon(29)] },
                { title: m.func_30_title, desc: m.func_30_desc, images: [cartoon(30)] },
                { title: m.func_31_title, desc: m.func_31_desc, images: [cartoon(31)] },
                { title: m.func_32_title, desc: m.func_32_desc, images: [cartoon(32)] }
            ]
        },
        {
            title: m.func_cat_8_title,
            items: [
                { title: m.func_33_title, desc: m.func_33_desc, images: [imgGrassMeter, imgScanner, cartoon(33)] },
                { title: m.func_34_title, desc: m.func_34_desc, images: [cartoon(34)] },
                { title: m.func_35_title, desc: m.func_35_desc, images: [cartoon(35)] }
            ]
        },
        {
            title: m.func_cat_9_title,
            items: [
                { title: m.func_36_title, desc: m.func_36_desc, images: [cartoon(36)] },
                { title: m.func_37_title, desc: m.func_37_desc, images: [cartoon(37)] },
                { title: m.func_39_title, desc: m.func_39_desc, images: [cartoon(39)] },
                { title: m.func_40_title, desc: m.func_40_desc, images: [cartoon(40)] },
                { title: m.func_41_title, desc: m.func_41_desc, images: [cartoon(41)] },
                { title: m.func_42_title, desc: m.func_42_desc, images: [cartoon(42)] },
                { title: m.func_43_title, desc: m.func_43_desc, images: [cartoon(43)] }
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
