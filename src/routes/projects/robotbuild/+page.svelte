<script>
    import * as m from '$lib/paraglide/messages';
    import { base } from '$app/paths';

    import HighlightBlock from '$lib/components/HighlightBlock.svelte';
    import MediaCardVideo from '$lib/components/MediaCardVideo.svelte';
    import MediaCardPicture from '$lib/components/MediaCardPicture.svelte';

    // Importeren van assets uit de projectstructuur
    import imgModular from '$lib/assets/robotbuild_modulair_build.png';
    import imgHubmotor from '$lib/assets/robotbuild_hubmotor.png';
    import imgMaintenance from '$lib/assets/robotbuild_easy_maintance.png';
    import imgCustomizable from '$lib/assets/robotbuild.png'; // Of robotbuild (3).png indien gewenst
    import actionVideoWebm from '$lib/assets/front_page_video_2_720.webm';
    import actionVideoMp4 from '$lib/assets/front_page_video_2_720.mp4';
    import actionVideoPoster from '$lib/assets/front_page_video_2_poster.jpg';

    // Foto van het werkende prototype in het veld
    import imgPrototype from '$lib/assets/robotbuild_prototype_field.jpg';

    // OpenSCAD-renders van het huidige ontwerp
    import imgAssembly2wd from '$lib/assets/robotbuild_assembly_2wd.png';
    import imgAssembly2wdSide from '$lib/assets/robotbuild_assembly_2wd_side.png';
    import imgAssembly4wd from '$lib/assets/robotbuild_assembly_4wd.png';
    import imgAssembly4wdSide from '$lib/assets/robotbuild_assembly_4wd_side.png';
    import imgChassisFrame from '$lib/assets/robotbuild_chassis_frame.png';
    import imgWheelUnit from '$lib/assets/robotbuild_wheel_unit.png';
    import imgCasterWheel from '$lib/assets/robotbuild_caster_wheel.png';
    import imgBracketIso from '$lib/assets/robotbuild_wheel_bracket_iso.png';
    import imgBracketFront from '$lib/assets/robotbuild_wheel_bracket_front.png';
    import imgBracketTop from '$lib/assets/robotbuild_wheel_bracket_top.png';
    import imgPartSidePlate from '$lib/assets/robotbuild_part_side_plate.png';
    import imgPartTopPlate from '$lib/assets/robotbuild_part_top_plate.png';
    import imgPartAxleBracket from '$lib/assets/robotbuild_part_axle_bracket.png';

    // Losse onderdelen die uit plaatstaal worden gesneden.
    const cutParts = [
        { src: imgPartSidePlate, label: m.robotbuild_part_side_plate() },
        { src: imgPartTopPlate, label: m.robotbuild_part_top_plate() },
        { src: imgPartAxleBracket, label: m.robotbuild_part_axle_bracket() },
        { src: imgBracketIso, label: m.robotbuild_part_bracket_iso() },
        { src: imgBracketFront, label: m.robotbuild_part_bracket_front() },
        { src: imgBracketTop, label: m.robotbuild_part_bracket_top() }
    ];
</script>

<main>
    <section class="hero-section">
        <HighlightBlock title={m.robotbuild_hero_title()}>
            <p>{m.robotbuild_hero_subtitle()}</p>
            <div class="cta-container">
                <a href="https://github.com/JacobsFarm/Bruut_OpenAgbot" target="_blank" rel="noopener noreferrer" class="btn-primary">
                    {m.robotbuild_cta()}
                </a>
            </div>
        </HighlightBlock>
    </section>

    <!-- Het echte prototype: laat meteen zien waar alle tekeningen toe leiden. -->
    <section class="prototype">
        <figure>
            <img src={imgPrototype} alt={m.robotbuild_prototype_alt()} />
        </figure>
        <div class="prototype-text">
            <h2>{m.robotbuild_prototype_title()}</h2>
            <p>{m.robotbuild_prototype_desc()}</p>
            <ul class="spec-list">
                <li>{m.robotbuild_prototype_spec_1()}</li>
                <li>{m.robotbuild_prototype_spec_2()}</li>
                <li>{m.robotbuild_prototype_spec_3()}</li>
                <li>{m.robotbuild_prototype_spec_4()}</li>
            </ul>
        </div>
    </section>

    <!-- Aandrijfvarianten: dezelfde basis, twee configuraties. -->
    <section class="drive-section">
        <div class="section-head">
            <h2>{m.robotbuild_drive_title()}</h2>
            <p>{m.robotbuild_drive_desc()}</p>
        </div>

        <div class="drive-grid">
            <article class="drive-card">
                <div class="drive-images">
                    <img src={imgAssembly2wd} alt={m.robotbuild_drive_2wd_title()} />
                    <img src={imgAssembly2wdSide} alt={m.robotbuild_drive_2wd_title()} />
                </div>
                <h3>{m.robotbuild_drive_2wd_title()}</h3>
                <p>{m.robotbuild_drive_2wd_desc()}</p>
            </article>

            <article class="drive-card">
                <div class="drive-images">
                    <img src={imgAssembly4wd} alt={m.robotbuild_drive_4wd_title()} />
                    <img src={imgAssembly4wdSide} alt={m.robotbuild_drive_4wd_title()} />
                </div>
                <h3>{m.robotbuild_drive_4wd_title()}</h3>
                <p>{m.robotbuild_drive_4wd_desc()}</p>
            </article>
        </div>
    </section>

    <!-- Chassis en wielunit: de twee bouwstenen van het frame. -->
    <section class="build-blocks">
        <article class="block">
            <img src={imgChassisFrame} alt={m.robotbuild_frame_title()} />
            <div class="block-text">
                <h3>{m.robotbuild_frame_title()}</h3>
                <p>{m.robotbuild_frame_desc()}</p>
            </div>
        </article>

        <article class="block">
            <img src={imgWheelUnit} alt={m.robotbuild_wheelunit_title()} />
            <div class="block-text">
                <h3>{m.robotbuild_wheelunit_title()}</h3>
                <p>{m.robotbuild_wheelunit_desc()}</p>
            </div>
        </article>

        <article class="block">
            <img src={imgCasterWheel} alt={m.robotbuild_caster_title()} />
            <div class="block-text">
                <h3>{m.robotbuild_caster_title()}</h3>
                <p>{m.robotbuild_caster_desc()}</p>
            </div>
        </article>
    </section>

    <!-- Snijdelen: dit is wat er daadwerkelijk naar de lasersnijder gaat. -->
    <section class="parts-section">
        <div class="section-head">
            <h2>{m.robotbuild_parts_title()}</h2>
            <p>{m.robotbuild_parts_desc()}</p>
        </div>

        <div class="parts-grid">
            {#each cutParts as part (part.label)}
                <figure class="part">
                    <img src={part.src} alt={part.label} loading="lazy" />
                    <figcaption>{part.label}</figcaption>
                </figure>
            {/each}
        </div>
    </section>

    <section class="media-gallery">
        <MediaCardPicture
            title={m.robotbuild_modular_title()}
            desc={m.robotbuild_modular_desc()}
            images={[imgModular]}
            altText="Modulaire opbouw van de robot"
        />

        <MediaCardPicture
            title={m.robotbuild_hubmotors_title()}
            desc={m.robotbuild_hubmotors_desc()}
            images={[imgHubmotor]}
            altText="Direct drive hubmotors"
        />

        <MediaCardPicture
            title={m.robotbuild_maintenance_title()}
            desc={m.robotbuild_maintenance_desc()}
            images={[imgMaintenance]}
            altText="Gemakkelijk onderhoud via toegankelijke kasten"
        />

        <MediaCardPicture
            title={m.robotbuild_customizable_title()}
            desc={m.robotbuild_customizable_desc()}
            images={[imgCustomizable]}
            altText="Open design voor uitbreidingen"
        />

        <MediaCardVideo
            title={m.robotbuild_control_sys_title()}
            desc={m.robotbuild_control_sys_desc()}
            videos={[{ webm: actionVideoWebm, mp4: actionVideoMp4, poster: actionVideoPoster }]}
            altText="Besturing en autonome functies in actie"
        />
    </section>

    <!-- Wat er op dit moment daadwerkelijk getest wordt; te volgen op YouTube. -->
    <section class="progress-section">
        <div class="section-head">
            <h2>{m.robotbuild_progress_title()}</h2>
            <p>{m.robotbuild_progress_desc()}</p>
        </div>

        <div class="extra-info-grid">
            <div class="info-block">
                <h3>{m.robotbuild_steering_title()}</h3>
                <p>{m.robotbuild_steering_desc()}</p>
            </div>

            <div class="info-block">
                <h3>{m.robotbuild_ardupilot_title()}</h3>
                <p>{m.robotbuild_ardupilot_desc()}</p>
            </div>

            <div class="info-block">
                <h3>{m.robotbuild_vision_title()}</h3>
                <p>{m.robotbuild_vision_desc()}</p>
            </div>

            <div class="info-block">
                <h3>{m.robotbuild_steppers_title()}</h3>
                <p>{m.robotbuild_steppers_desc()}</p>
            </div>

            <div class="info-block">
                <h3>{m.robotbuild_spot_spraying_title()}</h3>
                <p>{m.robotbuild_spot_spraying_desc()}</p>
            </div>

            <div class="info-block">
                <h3>{m.robotbuild_inrow_title()}</h3>
                <p>{m.robotbuild_inrow_desc()}</p>
            </div>
        </div>

        <div class="videos-cta">
            <p>{m.robotbuild_videos_cta_desc()}</p>
            <a href="{base}/videos" class="btn-primary">{m.robotbuild_videos_cta_button()}</a>
        </div>
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

    .cta-container {
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
        transition: all 0.3s ease;
    }

    .btn-primary:hover {
        background-color: oklch(65% 0.16 75); /* Deep Amber */
        color: oklch(22% 0.02 145); /* Deep Ink */
        transform: translateY(-2px);
    }

    /* Gedeelde sectiekop */
    .section-head {
        text-align: center;
        max-width: 780px;
        margin: 0 auto 2.5rem;
    }

    .section-head h2,
    .prototype-text h2 {
        font-family: 'Bebas Kai', sans-serif;
        font-size: 2rem;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: #386938; /* Emerald Green */
        margin: 0 0 0.75rem;
        font-weight: normal;
    }

    .section-head p {
        margin: 0;
        line-height: 1.7;
        color: oklch(35% 0.02 145);
    }

    /* ---------- Prototype ---------- */

    .prototype {
        display: grid;
        grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
        gap: 3rem;
        align-items: center;
    }

    .prototype figure {
        margin: 0;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }

    .prototype img {
        width: 100%;
        height: auto;
        display: block;
    }

    .prototype-text p {
        line-height: 1.7;
        margin: 0 0 1.25rem;
    }

    .spec-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
    }

    .spec-list li {
        display: flex;
        gap: 0.65rem;
        line-height: 1.5;
    }

    .spec-list li::before {
        content: '';
        width: 8px;
        height: 8px;
        margin-top: 0.5rem;
        border-radius: 50%;
        background: oklch(65% 0.16 75); /* Deep Amber */
        flex-shrink: 0;
    }

    /* ---------- Aandrijfvarianten ---------- */

    .drive-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr));
        gap: 2rem;
    }

    .drive-card {
        background: #ffffff;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
        border-top: 4px solid #386938;
    }

    .drive-images {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.75rem;
        margin-bottom: 1.25rem;
    }

    /* CAD-renders hebben veel witruimte: 'contain' zodat er niets wegvalt. */
    .drive-images img {
        width: 100%;
        aspect-ratio: 3 / 2;
        object-fit: contain;
        background: oklch(97% 0.015 100); /* zelfde tint als de render-achtergrond */
        border-radius: 8px;
        display: block;
    }

    .drive-card h3 {
        font-family: 'Bebas Kai', sans-serif;
        font-size: 1.6rem;
        color: #386938;
        margin: 0 0 0.6rem;
        letter-spacing: 0.5px;
    }

    .drive-card p {
        margin: 0;
        line-height: 1.6;
        color: #333;
    }

    /* ---------- Bouwblokken ---------- */

    .build-blocks {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
        gap: 2rem;
    }

    .block {
        background: #ffffff;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
        display: flex;
        flex-direction: column;
    }

    .block img {
        width: 100%;
        aspect-ratio: 3 / 2;
        object-fit: contain;
        background: oklch(97% 0.015 100);
        display: block;
    }

    .block-text {
        padding: 1.5rem;
    }

    .block-text h3 {
        font-family: 'Bebas Kai', sans-serif;
        font-size: 1.5rem;
        color: #386938;
        margin: 0 0 0.6rem;
        letter-spacing: 0.5px;
    }

    .block-text p {
        margin: 0;
        line-height: 1.6;
        color: #333;
    }

    /* ---------- Snijdelen ---------- */

    .parts-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
        gap: 1.5rem;
    }

    .part {
        margin: 0;
        background: #ffffff;
        border: 1px solid oklch(85% 0.01 145); /* Soft Gray */
        border-radius: 12px;
        overflow: hidden;
        transition: border-color 0.3s ease, transform 0.3s ease;
    }

    .part:hover {
        border-color: oklch(65% 0.16 75); /* Deep Amber */
        transform: translateY(-4px);
    }

    .part img {
        width: 100%;
        aspect-ratio: 4 / 3;
        object-fit: contain;
        background: oklch(97% 0.015 100);
        display: block;
    }

    .part figcaption {
        padding: 0.85rem 1rem;
        font-size: 0.9rem;
        font-weight: 600;
        color: oklch(30% 0.02 145);
        text-align: center;
        border-top: 1px solid oklch(90% 0.01 145);
    }

    /* ---------- Bestaande gallerij ---------- */

    .media-gallery {
        display: flex;
        flex-direction: column;
        gap: 4rem;
    }

    /* ---------- Voortgang ---------- */

    .extra-info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
        gap: 2rem;
    }

    .info-block {
        background-color: oklch(95% 0.01 145); /* Lichte achtergrond */
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    }

    .info-block h3 {
        font-family: 'Bebas Kai', sans-serif;
        font-size: 1.8rem;
        margin-bottom: 1rem;
        margin-top: 0;
        color: #386938; /* Emerald Green accent */
        font-weight: normal;
        letter-spacing: 0.5px;
    }

    .info-block p {
        font-size: 1rem;
        line-height: 1.6;
        color: #333;
        margin: 0;
    }

    .videos-cta {
        margin-top: 3rem;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.25rem;
    }

    .videos-cta p {
        max-width: 600px;
        margin: 0;
        line-height: 1.7;
        color: oklch(35% 0.02 145);
    }

    @media (max-width: 900px) {
        .prototype {
            grid-template-columns: 1fr;
            gap: 2rem;
        }
    }

    @media (max-width: 768px) {
        main {
            padding: 2rem 1rem;
            gap: 4rem;
        }

        .extra-info-grid {
            grid-template-columns: 1fr;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .btn-primary:hover,
        .part:hover {
            transform: none;
        }
    }
</style>
