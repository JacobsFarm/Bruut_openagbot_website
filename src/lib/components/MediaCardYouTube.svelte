<script>
    import { onDestroy } from 'svelte';

    // Props
    export let title;
    export let desc;
    /** YouTube video-id, bijvoorbeeld "JFSSVHmUz9o". */
    export let videoId;
    export let altText = 'YouTube video';
    export let reverse = false;

    // De player wordt pas ingeladen zodra de kaart in beeld komt: dat scheelt
    // ruim een megabyte aan YouTube-scripts bij het openen van de pagina.
    let mounted = false;
    let iframeEl;
    let observer;
    let thumbFailed = false;

    // maxresdefault bestaat niet voor elke video; val dan terug op hqdefault.
    $: thumb = thumbFailed
        ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
        : `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

    // Gedempt autoplay in een loop, zonder verwante video's van andere kanalen.
    // nocookie-domein zodat er geen tracking-cookies worden gezet zolang de
    // bezoeker niet zelf afspeelt.
    $: embedSrc =
        `https://www.youtube-nocookie.com/embed/${videoId}` +
        `?autoplay=1&mute=1&loop=1&playlist=${videoId}` +
        `&controls=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`;

    // YouTube pauzeert niet vanzelf buiten beeld; dat doen we via de iframe-API.
    function command(func) {
        iframeEl?.contentWindow?.postMessage(
            JSON.stringify({ event: 'command', func, args: [] }),
            '*'
        );
    }

    function observeVisibility(node) {
        if (typeof IntersectionObserver === 'undefined') {
            mounted = true;
            return;
        }

        observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (!mounted) mounted = true;
                    else command('playVideo');
                } else if (mounted) {
                    command('pauseVideo');
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
</script>

<div class="media-card" class:reverse>
    <div class="media-text">
        <h3>{title}</h3>
        <p>{desc}</p>
    </div>
    <div class="media-visual">
        <div class="player" use:observeVisibility>
            {#if mounted}
                <iframe
                    bind:this={iframeEl}
                    src={embedSrc}
                    title={altText}
                    frameborder="0"
                    allow="autoplay; encrypted-media; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                ></iframe>
            {:else}
                <!-- Statische poster tot de player nodig is. -->
                <img
                    src={thumb}
                    alt={altText}
                    loading="lazy"
                    on:error={() => (thumbFailed = true)}
                />
                <span class="play-overlay" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </span>
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
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
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
    }

    .player {
        position: relative;
        width: 100%;
        aspect-ratio: 16 / 9;
        min-height: 300px;
        background: oklch(22% 0.02 145); /* Deep Ink neutrals */
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .player iframe,
    .player img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        border: 0;
        display: block;
    }

    .player img {
        object-fit: cover;
    }

    .play-overlay {
        position: relative;
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

    @media (max-width: 768px) {
        .media-card,
        .media-card.reverse {
            flex-direction: column;
        }
        .media-visual {
            width: 100%;
        }
        .media-text {
            padding: 25px;
        }
        .player {
            min-height: 0;
        }
    }
</style>
