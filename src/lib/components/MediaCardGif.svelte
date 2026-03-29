<script>
    import { fade } from 'svelte/transition';

    // Props
    export let title;
    export let desc;
    // Accepteert nu een array van GIF paden
    export let gifs = []; 
    export let altText = "Animated sequence";
    export let reverse = false;

    // State
    let currentIndex = 0;
    // Gebruik een timestamp om de actieve GIF te herstarten
    let timestamp = new Date().getTime(); 

    // Computed property om te checken of er meerdere GIFs zijn
    $: hasMultipleGifs = gifs && gifs.length > 1;

    // Navigatie functie (handmatig)
    function goToGif(index) {
        if (!hasMultipleGifs) return;
        currentIndex = index;
        restartGif(); // Start de nieuwe GIF netjes vanaf het begin
    }

    // Herlaadt de huidige GIF zodat deze opnieuw start
    function restartGif() {
        timestamp = new Date().getTime();
    }
</script>

<div 
    class="media-card" 
    class:reverse 
    role="region" 
    aria-label="GIF carousel"
>
    <div class="media-text">
        <h3>{title}</h3>
        <p>{desc}</p>
    </div>
    <div class="media-visual">
        <div class="carousel-container">
            {#each gifs as gif, index}
                {#if index === currentIndex}
                    <button 
                        class="gif-button" 
                        on:mouseenter={restartGif}
                        on:click={restartGif}
                        aria-label="Restart detection animation"
                        transition:fade={{ duration: 400 }}
                    >
                        <img 
                            src="{gif}?t={timestamp}" 
                            alt="{altText} - {index + 1}" 
                            class="media-img interactive-gif" 
                        />
                    </button>
                {/if}
            {/each}

            {#if hasMultipleGifs}
                <div class="carousel-dots" role="tablist" aria-label="GIF selection">
                    {#each gifs as _, index}
                        <button
                            class="dot"
                            class:active={index === currentIndex}
                            on:click={() => goToGif(index)}
                            role="tab"
                            aria-selected={index === currentIndex}
                            aria-label="Go to GIF {index + 1}"
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

    .gif-button {
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

    .media-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }

    .interactive-gif {
        transition: opacity 0.2s ease;
    }

    .gif-button:active .interactive-gif {
        opacity: 0.8;
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