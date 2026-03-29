<script>
    import { onMount, onDestroy } from 'svelte';
    import { fade } from 'svelte/transition';

    // Props
    export let title;
    export let desc;
    // Accepteert nu een array van strings in plaats van één string
    export let images = []; 
    export let altText = "Media image sequence";
    export let reverse = false;
    export let autoPlayInterval = 5000; // 5 seconden timer

    // State
    let currentIndex = 0;
    let intervalId;
    let isPaused = false;

    // Computed property om te checken of er meerdere afbeeldingen zijn
    $: hasMultipleImages = images && images.length > 1;

    // Navigatie functies
    function nextImage() {
        if (!hasMultipleImages) return;
        currentIndex = (currentIndex + 1) % images.length;
    }

    function prevImage() {
        if (!hasMultipleImages) return;
        currentIndex = (currentIndex - 1 + images.length) % images.length;
    }

    function goToImage(index) {
        if (!hasMultipleImages) return;
        currentIndex = index;
        resetTimer(); // Reset de timer als de gebruiker handmatig navigeert
    }

    // Timer management
    function startTimer() {
        if (hasMultipleImages && !intervalId) {
            intervalId = setInterval(() => {
                if (!isPaused) {
                    nextImage();
                }
            }, autoPlayInterval);
        }
    }

    function stopTimer() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    function resetTimer() {
        stopTimer();
        startTimer();
    }

    // Pause on hover functionaliteit
    function handleMouseEnter() {
        isPaused = true;
    }

    function handleMouseLeave() {
        isPaused = false;
    }

    // Lifecycle hooks
    onMount(() => {
        startTimer();
    });

    onDestroy(() => {
        stopTimer();
    });
</script>

<div 
    class="media-card" 
    class:reverse 
    on:mouseenter={handleMouseEnter} 
    on:mouseleave={handleMouseLeave}
    role="region"
    aria-label="Image carousel"
>
    <div class="media-text">
        <h3>{title}</h3>
        <p>{desc}</p>
    </div>
    <div class="media-visual">
        <div class="carousel-container">
            {#each images as image, index}
                {#if index === currentIndex}
                    <img 
                        src={image} 
                        alt="{altText} - {index + 1}" 
                        class="media-img" 
                        transition:fade={{ duration: 400 }}
                    />
                {/if}
            {/each}

            {#if hasMultipleImages}
                <div class="carousel-dots" role="tablist" aria-label="Image selection">
                    {#each images as _, index}
                        <button
                            class="dot"
                            class:active={index === currentIndex}
                            on:click={() => goToImage(index)}
                            role="tab"
                            aria-selected={index === currentIndex}
                            aria-label="Go to image {index + 1}"
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

    .media-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
        display: block;
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
        
        /* Standaard staat: Deep Ink met lage opacity */
        background-color: oklch(22% 0.02 145); /* Deep Ink neutrals */
        opacity: 0.4;
    }

    .dot:hover {
        opacity: 0.8;
    }

    .dot.active {
        /* Geselecteerd staat: Gevraagd professioneel Oranje (Deep Amber) */
        background-color: oklch(65% 0.16 75); /* var(--accent) Deep Amber */
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