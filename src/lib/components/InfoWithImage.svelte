<script>
    // In Svelte 5 halen we props op met de $props() rune
    let { 
        title = "", 
        images = [], 
        reverse = false,
        children // <-- Nieuwe prop voor Svelte 5 in plaats van <slot>
    } = $props();

    // $state() zorgt ervoor dat de UI update als de index verandert
    let currentIndex = $state(0); 

    // $derived() berekent automatisch of er navigatie nodig is
    let showNavigation = $derived(images.length > 1);

    function goToImage(index) {
        currentIndex = index;
    }
</script>

<section class="info-grid {reverse ? 'reverse' : ''}">
    <div class="content-col">
        {#if title}
            <h2>{title}</h2>
        {/if}
        <div class="custom-card">
            {#if children}
                {@render children()}
            {/if}
        </div>
    </div>
    
    <div class="image-col">
        <div class="slider-container">
            {#each images as img, i}
                <div class="slide {i === currentIndex ? 'active' : ''}">
                    <img src={img.src} alt={img.alt} class="img-fluid" />
                </div>
            {/each}
        </div>

        {#if showNavigation}
            <div class="dots-container">
                {#each images as _, i}
                    <button
                        type="button"
                        class="dot {i === currentIndex ? 'active' : ''}"
                        aria-label="Go to image {i + 1}"
                        onclick={() => goToImage(i)}
                    ></button>
                {/each}
            </div>
        {/if}
    </div>
</section>

<style>
    .info-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        align-items: center; /* Garandeert verticale uitlijning */
        margin-bottom: 3rem;
    }

    /* Omdraaien van de kolommen als 'reverse' true is */
    .info-grid.reverse .content-col {
        order: 2;
    }
    .info-grid.reverse .image-col {
        order: 1;
    }

    h2 {
        font-family: var(--font-heading, 'Bebas Kai', sans-serif);
        color: var(--primary, #386938);
        font-size: 2rem;
        margin-top: 0;
        padding-bottom: 0.5rem;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: normal;
    }

    .custom-card {
        background: var(--card-bg, #ffffff);
        padding: 25px;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        border-top: 4px solid var(--primary, #386938);
        box-sizing: border-box;
    }

    /* CSS voor de afbeeldingen-slider */
    .image-col {
        position: relative; 
        border-radius: 12px;
        overflow: hidden; 
        box-shadow: 0 6px 12px rgba(0,0,0,0.1);
    }

    .slider-container {
        display: flex;
        width: 100%;
    }

    .slide {
        display: none; 
        width: 100%;
        flex-shrink: 0;
    }

    .slide.active {
        display: block; 
    }

    .img-fluid {
        width: 100%;
        height: auto;
        display: block;
        border-radius: inherit; 
    }

    /* CSS voor de dot-navigatie */
    .dots-container {
        position: absolute;
        bottom: 15px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 8px;
        z-index: 2; 
    }

    .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.6);
        border: none;
        padding: 0;
        cursor: pointer;
        transition: background-color 0.2s, transform 0.2s;
    }

    .dot:hover {
        background-color: rgba(255, 255, 255, 0.9);
        transform: scale(1.1);
    }

    .dot.active {
        background-color: var(--accent-amber); 
        transform: scale(1.1);
    }

    /* Mobiele weergave */
    @media (max-width: 768px) {
        .info-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
        }
        .info-grid.reverse .content-col { order: 1; }
        .info-grid.reverse .image-col { order: 2; }
    }
</style>