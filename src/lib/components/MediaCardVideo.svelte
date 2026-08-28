<script>
    import { fade } from 'svelte/transition';
    import { onDestroy } from 'svelte';

    // Props
    export let title;
    export let desc;
    // Accepteert een pad (string) of een object per video:
    // { webm, mp4, poster } zodat de browser de lichtste variant kiest
    export let videos = [];
    export let altText = "Video sequence";
    export let reverse = false;
    // Fallback poster wanneer een video er zelf geen meegeeft
    export let poster = null;

    // State
    let currentIndex = 0;
    let videoEl;
    let isPaused = false;
    // Onthoudt of de bezoeker zelf gepauzeerd heeft; dan niet automatisch hervatten
    let pausedByUser = false;
    let observer;

    // Normaliseer de props naar { webm, mp4, poster }
    $: sources = (videos ?? []).map((v) =>
        typeof v === 'string' ? { mp4: v, poster } : { poster, ...v }
    );

    // Computed property om te checken of er meerdere videos zijn
    $: hasMultipleVideos = sources.length > 1;

    // Speel alleen af zolang de kaart in beeld is: scheelt data en batterij
    function observeVisibility(node) {
        // Staat de kaart al in beeld bij het laden? Dan meteen starten.
        const rect = node.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
            node.play().then(() => (isPaused = false)).catch(() => {});
        }

        if (typeof IntersectionObserver === 'undefined') return;

        observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (!pausedByUser) {
                        node.play().then(() => (isPaused = false)).catch(() => {});
                    }
                } else if (!node.paused) {
                    node.pause();
                }
            },
            { threshold: 0.25 }
        );
        observer.observe(node);

        return {
            destroy() {
                observer?.disconnect();
                observer = null;
            }
        };
    }

    onDestroy(() => observer?.disconnect());

    // Navigatie functie (handmatig)
    function goToVideo(index) {
        if (!hasMultipleVideos) return;
        currentIndex = index;
        isPaused = false;
        pausedByUser = false;
    }

    // Klik op de video: pauzeren of hervatten
    function togglePlay() {
        if (!videoEl) return;
        if (videoEl.paused) {
            videoEl.play().catch(() => {});
            isPaused = false;
            pausedByUser = false;
        } else {
            videoEl.pause();
            isPaused = true;
            pausedByUser = true;
        }
    }
</script>

<div
    class="media-card"
    class:reverse
    role="region"
    aria-label="Video carousel"
>
    <div class="media-text">
        <h3>{title}</h3>
        <p>{desc}</p>
    </div>
    <div class="media-visual">
        <div class="carousel-container">
            {#each sources as source, index}
                {#if index === currentIndex}
                    <button
                        class="video-button"
                        on:click={togglePlay}
                        aria-label={isPaused ? "Play video" : "Pause video"}
                        transition:fade={{ duration: 400 }}
                    >
                        <!-- svelte-ignore a11y-media-has-caption -->
                        <video
                            bind:this={videoEl}
                            use:observeVisibility
                            poster={source.poster}
                            class="media-video"
                            aria-label="{altText} - {index + 1}"
                            muted
                            loop
                            playsinline
                            preload="none"
                        >
                            {#if source.webm}
                                <source src={source.webm} type="video/webm" />
                            {/if}
                            {#if source.mp4}
                                <source src={source.mp4} type="video/mp4" />
                            {/if}
                        </video>
                        {#if isPaused}
                            <span class="play-overlay" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </span>
                        {/if}
                    </button>
                {/if}
            {/each}

            {#if hasMultipleVideos}
                <div class="carousel-dots" role="tablist" aria-label="Video selection">
                    {#each sources as _, index}
                        <button
                            class="dot"
                            class:active={index === currentIndex}
                            on:click={() => goToVideo(index)}
                            role="tab"
                            aria-selected={index === currentIndex}
                            aria-label="Go to video {index + 1}"
                        ></button>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    .media-card {
        display: flex;
        align-items: center;
        background: #ffffff; /* var(--card-bg) */
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }

    .media-card.reverse {
        flex-direction: row-reverse;
    }

    .media-text {
        flex: 1;
        padding: 40px;
    }

    .media-text h3 {
        font-size: 1.8rem;
        color: #386938; /* var(--primary) Emerald Green */
        margin-top: 0;
        margin-bottom: 15px;
    }

    .media-visual {
        flex: 1;
        display: flex;
        width: 100%;
        position: relative;
    }

    .carousel-container {
        width: 100%;
        height: 100%;
        min-height: 300px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .video-button {
        background: none;
        border: none;
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
        display: flex;
        cursor: pointer;
        position: absolute; /* Zorgt dat het perfect in de container past */
        top: 0;
        left: 0;
    }

    .media-video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: opacity 0.2s ease;
    }

    .video-button:active .media-video {
        opacity: 0.8;
    }

    /* Play-icoon wanneer de video gepauzeerd is */
    .play-overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 64px;
        height: 64px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.45);
        color: #ffffff;
        pointer-events: none;
    }

    .play-overlay svg {
        width: 32px;
        height: 32px;
        margin-left: 3px;
    }

    /* Styling voor de stipjes */
    .carousel-dots {
        position: absolute;
        bottom: 15px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 10px;
        background: rgba(0, 0, 0, 0.3);
        padding: 8px 12px;
        border-radius: 20px;
        z-index: 10;
    }

    .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: 2px solid transparent;
        cursor: pointer;
        padding: 0;
        transition: all 0.3s ease;
        background-color: oklch(22% 0.02 145); /* Deep Ink neutrals */
        opacity: 0.4;
    }

    .dot:hover {
        opacity: 0.8;
    }

    .dot.active {
        background-color: oklch(65% 0.16 75); /* Deep Amber */
        opacity: 1;
        transform: scale(1.2);
    }

    @media (max-width: 768px) {
        .media-card, .media-card.reverse {
            flex-direction: column;
        }
        .media-visual { width: 100%; }
        .media-text { padding: 25px; }
        .carousel-container { min-height: 250px; }
    }
</style>
