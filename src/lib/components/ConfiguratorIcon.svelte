<script lang="ts">
  // Kleine cartoonpictogrammen voor de vakjes op de rollen, één per optie-id.
  let { id }: { id: string } = $props();
</script>

<svg viewBox="0 0 48 48" aria-hidden="true" class="icon">
  {#if id === 'fixed_hub' || id === 'steer_hub' || id === 'steer_plain'}
    <circle cx="24" cy="28" r="15" class="tire" />
    <circle cx="24" cy="28" r="11.5" class="tread" />
    {#if id === 'steer_plain'}
      <circle cx="24" cy="28" r="7" class="rim" />
      <circle cx="24" cy="28" r="2" class="ink" />
    {:else}
      <circle cx="24" cy="28" r="8" class="amber" />
      <path d="M25.5 22.5 L21 29 H24.5 L22.5 33.5 L27.5 27 H24 Z" class="bolt" />
    {/if}
    {#if id !== 'fixed_hub'}
      <path d="M11 9 A 16 6 0 0 0 37 9" class="arc" />
      <path d="M37 9 l-5 -1.5 l2.5 4.5 z" class="arc-head" />
    {/if}
  {:else if id === 'big_hub' || id === 'big_steer_hub'}
    {@const cy = id === 'big_hub' ? 25 : 28}
    {@const r = id === 'big_hub' ? 22 : 19}
    <circle cx="24" {cy} {r} class="tire" />
    <circle cx="24" {cy} r={r - 4} class="tread big" />
    <circle cx="24" {cy} r={r * 0.62} class="amber" />
    <path transform="translate(24 {cy}) scale(1.4) translate(-24.5 -28)" d="M25.5 22.5 L21 29 H24.5 L22.5 33.5 L27.5 27 H24 Z" class="bolt" />
    {#if id === 'big_steer_hub'}
      <path d="M8 7 A 17 5 0 0 0 40 7" class="arc" />
      <path d="M40 7 l-5 -1.5 l2.5 4.5 z" class="arc-head" />
    {/if}
  {:else if id === 'tracks'}
    <rect x="3" y="18" width="42" height="22" rx="11" class="tire" />
    <rect x="5.5" y="20.5" width="37" height="17" rx="8.5" class="links" />
    <circle cx="13" cy="29" r="6" class="amber" />
    <circle cx="35" cy="29" r="6" class="rim" />
    <circle cx="24" cy="32" r="3.5" class="rim" />
    <rect x="11" y="8" width="4" height="10" class="metal" />
    <rect x="33" y="8" width="4" height="10" class="metal" />
    <rect x="6" y="5" width="36" height="5" rx="1" class="beam" />
  {:else if id === 'caster'}
    <rect x="15" y="5" width="18" height="5" rx="2" class="metal" />
    <path d="M21 10 L27 10 L22 27 L16 27 Z" class="metal" />
    <circle cx="19" cy="32" r="11" class="tire" />
    <circle cx="19" cy="32" r="4.5" class="rim" />
    <path d="M30 18 a 9 4 0 1 0 -1 5" class="arc thin" />
  {:else if id === 'standard'}
    <rect x="3" y="20" width="42" height="9" rx="1.5" class="beam" />
    {#each [8, 16, 24, 32, 40] as x (x)}<circle cx={x} cy="24.5" r="1.8" class="hole" />{/each}
  {:else if id === 'raised'}
    <!-- vooraanzicht: boog over de breedte, gewas eronder -->
    <path d="M24 44 V20" class="stem" />
    <path d="M24 30 Q 31 24 34 29 Q 29 32 24 30 M24 24 Q 17 18 14 23 Q 19 26 24 24" class="leaf" />
    <path d="M8 34 V22 Q24 -2 40 22 V34" class="beam-line" />
    <circle cx="8" cy="39" r="5" class="tire" />
    <circle cx="40" cy="39" r="5" class="tire" />
  {:else if id === 'lowered'}
    <path d="M3 12 H13 L19 32 H29 L35 12 H45" class="beam-line" />
    <rect x="20" y="22" width="12" height="5" rx="2.5" class="seat" />
    <rect x="17" y="10" width="5" height="15" rx="2.5" class="seat" />
    <path d="M17 44 h14" class="dim" />
  {:else if id === 'side_high'}
    <path d="M3 34 H12 L14 10 H34 L36 34 H45" class="beam-line" />
    <path d="M24 14 V24" class="chain" />
    <path d="M20 24 H28 M21 24 v8 M24 24 v9 M27 24 v8" class="tines" />
  {:else if id === 'rtk'}
    <rect x="22" y="26" width="4" height="16" class="metal" />
    <path d="M13 27 Q 24 12 35 27 Z" class="dome" />
    <path d="M17 12 Q 24 6 31 12 M13 8 Q 24 0 35 8" class="signal" />
  {:else if id === 'camera'}
    <rect x="4" y="18" width="22" height="15" rx="3" class="ink" />
    <circle cx="26" cy="25.5" r="5" class="lens" />
    <path d="M30 22 L40 16 V36 L30 30 Z" class="cone" />
    <circle cx="42" cy="14" r="3" class="person" />
    <path d="M42 17 V30" class="person-line" />
  {:else if id === 'lidar'}
    <ellipse cx="24" cy="30" rx="20" ry="7" class="ring" />
    <ellipse cx="24" cy="30" rx="12" ry="4" class="ring" />
    <rect x="18" y="18" width="12" height="12" rx="2" class="ink" />
    <rect x="19" y="21" width="10" height="3" class="laser" />
    <path d="M18 18 Q 24 13 30 18 Z" class="ink" />
  {:else if id === 'joystick'}
    <rect x="6" y="24" width="36" height="17" rx="8" class="ink" />
    <path d="M24 24 V12" class="stick" />
    <circle cx="24" cy="10" r="5" class="knob" />
    <circle cx="13" cy="32" r="2.5" class="amber" />
    <circle cx="35" cy="32" r="2.5" class="teal" />
  {:else if id === 'swap'}
    {#each [4, 18, 32] as x (x)}
      <path d="M{x + 3} 18 v-4 h6 v4" class="handle" />
      <rect x={x} y="18" width="12" height="20" rx="2" class="battery" />
      <rect x={x + 3} y="30" width="6" height="4" class="led" />
    {/each}
  {:else if id === 'big'}
    <rect x="12" y="10" width="7" height="4" class="ink" />
    <rect x="29" y="10" width="7" height="4" class="ink" />
    <rect x="6" y="14" width="36" height="26" rx="4" class="battery" />
    {#each [11, 19, 27] as x (x)}<rect {x} y="30" width="6" height="6" class="led" />{/each}
    <path d="M26 16.5 L20.5 24 H24.5 L22 29 L28 22 H24 Z" class="bolt" />
  {:else if id === 'plug'}
    <path d="M22 34 Q 22 44 10 44" class="cable" />
    <rect x="14" y="16" width="16" height="18" rx="4" class="ink" />
    <path d="M18 16 V7 M26 16 V7" class="prong" />
    <path d="M38 12 L33 20 H37 L34 27" class="spark" />
  {:else if id === 'solar'}
    <circle cx="12" cy="11" r="6" class="sun" />
    <path d="M12 1 v3 M2 11 h3 M5 4 l2 2 M19 4 l-2 2" class="rays" />
    <path d="M14 22 H44 L38 38 H4 Z" class="panel" />
    <path d="M24 22 L18 38 M34 22 L28 38 M9 30 H41" class="cells" />
  {:else if id === 'generator'}
    <path d="M9 18 V12 H37 V18" class="handle" />
    <rect x="6" y="18" width="34" height="22" rx="3" class="gen" />
    <path d="M12 24 h12 M12 29 h12 M12 34 h12" class="grille" />
    <circle cx="32" cy="29" r="4" class="ink" />
    <circle cx="42" cy="12" r="3" class="puff" />
    <circle cx="45" cy="5" r="2.3" class="puff" />
  {/if}
</svg>

<style>
  .icon {
    overflow: visible;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .icon :global(*) {
    stroke: #1f2a22;
    stroke-width: 2;
  }
  .tire { fill: #33383a; }
  .tread { fill: none; stroke: #6b7470 !important; stroke-dasharray: 3 3; stroke-width: 1.5 !important; }
  .rim { fill: #dfe5df; }
  .tread.big { stroke-dasharray: 5 3; stroke-width: 3 !important; }
  .links { fill: none; stroke: #6b7470 !important; stroke-dasharray: 2 3; stroke-width: 1.5 !important; }
  .stem { stroke: #2f6b2a !important; stroke-width: 2.5 !important; }
  .leaf { fill: #6bb04f; stroke: #2f6b2a !important; stroke-width: 1.2 !important; }
  .seat { fill: #5b6360; stroke-width: 1.5 !important; }
  .amber { fill: #e0a02c; }
  .teal { fill: #2f9a9e; }
  .bolt { fill: #fffdf5; stroke-width: 1 !important; }
  .ink { fill: #2c3e2c; }
  .metal { fill: #b9c3bc; }
  .arc { fill: none; stroke: #2f9a9e !important; stroke-width: 2.5 !important; }
  .arc.thin { stroke-width: 2 !important; }
  .arc-head { fill: #2f9a9e; stroke: #2f9a9e !important; stroke-width: 1 !important; }
  .beam { fill: #4a544e; }
  .hole { fill: #c7cfc9; stroke: none !important; }
  .beam-line { fill: none; stroke: #4a544e !important; stroke-width: 6 !important; }
  .dim { fill: none; stroke: #e0a02c !important; stroke-width: 2.5 !important; }
  .chain { fill: none; stroke-dasharray: 2 2; }
  .tines { fill: none; stroke: #c0492b !important; stroke-width: 2.5 !important; }
  .dome { fill: #f4f6f4; }
  .signal { fill: none; stroke: #2f9a9e !important; }
  .lens { fill: #7fc4d6; }
  .cone { fill: rgba(224, 160, 44, 0.35); stroke: none !important; }
  .person { fill: #e0a02c; }
  .person-line { stroke-width: 3 !important; }
  .ring { fill: none; stroke: #c0492b !important; stroke-dasharray: 3 2; }
  .laser { fill: #c0492b; stroke: none !important; }
  .stick { stroke-width: 3.5 !important; }
  .knob { fill: #c0492b; }
  .handle { fill: none; stroke-width: 2.5 !important; }
  .battery { fill: #f08a2c; }
  .led { fill: #6fcf6f; stroke-width: 1 !important; }
  .cable { fill: none; stroke-width: 3 !important; }
  .prong { stroke-width: 3 !important; }
  .spark { fill: none; stroke: #e0a02c !important; stroke-width: 2.5 !important; }
  .sun { fill: #f6c945; }
  .rays { stroke: #e0a02c !important; }
  .panel { fill: #2d4a7a; }
  .cells { stroke: #8fb3e6 !important; stroke-width: 1.2 !important; }
  .gen { fill: #f6c945; }
  .grille { stroke-width: 1.8 !important; }
  .puff { fill: #d6dbd8; stroke: #9aa39e !important; stroke-width: 1 !important; }
</style>
