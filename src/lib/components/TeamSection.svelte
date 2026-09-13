<script>
    import * as m from '$lib/paraglide/messages.js';
    import { onMount } from 'svelte';

    // Nog geen foto's van de teamleden: we tonen een anoniem avatar-icoon.
    // Zodra er portretten zijn kan hier per lid een `photo` bij.
    const members = [
        { name: m.front_page_team_member_1_name(), role: m.front_page_team_member_1_role() },
        { name: m.front_page_team_member_2_name(), role: m.front_page_team_member_2_role() },
        { name: m.front_page_team_member_3_name(), role: m.front_page_team_member_3_role() },
        { name: m.front_page_team_member_4_name(), role: m.front_page_team_member_4_role() },
        { name: m.front_page_team_member_5_name(), role: m.front_page_team_member_5_role() }
    ];

    let track;
    // De pijlen verschijnen alleen als de rij breder is dan het scherm.
    let overflowing = false;
    let atStart = true;
    let atEnd = false;

    function updateState() {
        if (!track) return;
        const max = track.scrollWidth - track.clientWidth;
        overflowing = max > 1;
        atStart = track.scrollLeft <= 1;
        atEnd = track.scrollLeft >= max - 1;
    }

    function scrollByCard(direction) {
        if (!track) return;
        const card = track.querySelector('.team-member');
        const step = card ? card.offsetWidth + 40 : track.clientWidth * 0.8;
        track.scrollBy({ left: direction * step, behavior: 'smooth' });
    }

    onMount(() => {
        updateState();
        const observer = new ResizeObserver(updateState);
        observer.observe(track);
        return () => observer.disconnect();
    });
</script>

<div class="team">
    <h2>{m.front_page_team_title()}</h2>
    <p class="team-desc">{m.front_page_team_desc()}</p>

    <div class="carousel" class:is-overflowing={overflowing}>
        {#if overflowing}
            <button
                type="button"
                class="nav prev"
                on:click={() => scrollByCard(-1)}
                disabled={atStart}
                aria-label={m.front_page_team_prev()}
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                    <path d="M15 5l-7 7 7 7" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
        {/if}

        <ul class="team-track" bind:this={track} on:scroll={updateState}>
            {#each members as member}
                <li class="team-member">
                    <div class="avatar" aria-hidden="true">
                        <svg viewBox="0 0 48 48" fill="currentColor">
                            <circle cx="24" cy="17" r="8" />
                            <path d="M24 28c-8.3 0-15 5.4-15 12v2h30v-2c0-6.6-6.7-12-15-12z" />
                        </svg>
                    </div>
                    <span class="member-name">{member.name}</span>
                    <span class="member-role">{member.role}</span>
                </li>
            {/each}
        </ul>

        {#if overflowing}
            <button
                type="button"
                class="nav next"
                on:click={() => scrollByCard(1)}
                disabled={atEnd}
                aria-label={m.front_page_team_next()}
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                    <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
        {/if}
    </div>
</div>

<style>
    .team {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        text-align: center;
    }

    h2 {
        font-family: 'Bebas Kai', sans-serif;
        font-size: clamp(1.75rem, 5vw, 2.5rem);
        text-transform: uppercase;
        letter-spacing: 1px;
        color: #386938;
        margin: 0;
    }

    .team-desc {
        max-width: 700px;
        margin: 0;
        line-height: 1.7;
    }

    .carousel {
        position: relative;
        width: 100%;
        margin-top: 1.5rem;
    }

    /* Vervaagde randen en ruimte voor de pijlen zodra de rij niet in één keer past */
    .carousel.is-overflowing .team-track {
        padding-inline: 3.25rem;
        mask-image: linear-gradient(
            to right,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 1) 10%,
            rgba(0, 0, 0, 1) 90%,
            rgba(0, 0, 0, 0) 100%
        );
    }

    .team-track {
        list-style: none;
        margin: 0;
        padding: 0.5rem 0;
        display: flex;
        flex-wrap: nowrap; /* alle leden blijven op één lijn */
        justify-content: center;
        justify-content: safe center;
        align-items: flex-start;
        gap: 2.5rem;
        overflow-x: auto;
        overscroll-behavior-x: contain;
        scroll-snap-type: x mandatory;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none;
    }

    .team-track::-webkit-scrollbar {
        display: none;
    }

    .team-member {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.6rem;
        flex: 0 0 150px;
        scroll-snap-align: center;
    }

    .avatar {
        width: 110px;
        height: 110px;
        border-radius: 50%;
        background: #ffffff;
        border: 3px solid #386938;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
        display: flex;
        align-items: center;
        justify-content: center;
        color: oklch(75% 0.03 145);
        transition: transform 0.3s ease, border-color 0.3s ease;
    }

    .team-member:hover .avatar {
        transform: translateY(-4px);
        border-color: oklch(65% 0.16 75); /* Deep Amber */
    }

    .avatar svg {
        width: 62%;
        height: 62%;
        margin-top: 8%; /* icoon optisch centreren in de cirkel */
    }

    .member-name {
        font-weight: 700;
        font-size: 1rem;
        color: oklch(22% 0.02 145);
        line-height: 1.2;
    }

    .member-role {
        font-size: 0.9rem;
        color: oklch(45% 0.02 145);
        line-height: 1.35;
    }

    .nav {
        position: absolute;
        top: 65px; /* op ooghoogte van de cirkels */
        transform: translateY(-50%);
        z-index: 2;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 2px solid #386938;
        background: #ffffff;
        color: #386938;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        transition: background-color 0.3s ease, color 0.3s ease, opacity 0.3s ease;
    }

    .nav:hover:not(:disabled) {
        background: #386938;
        color: #ffffff;
    }

    .nav:disabled {
        opacity: 0.3;
        cursor: default;
    }

    .nav svg {
        width: 20px;
        height: 20px;
    }

    .prev {
        left: 0;
    }

    .next {
        right: 0;
    }

    @media (max-width: 768px) {
        .team-track {
            gap: 1.5rem;
        }

        .team-member {
            flex-basis: 120px;
        }

        .avatar {
            width: 88px;
            height: 88px;
        }

        .nav {
            top: 55px;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .team-member:hover .avatar {
            transform: none;
        }

        .nav {
            transition: none;
        }
    }
</style>
