<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { t, num } from '$lib/i18n';
	import { versions, roundedPrice, pricePerKgf, bestValue } from '$lib/data/versions';
	import { reveal } from '$lib/actions/reveal';
	import DriveDiagram from './DriveDiagram.svelte';

	const maxPull = Math.max(...versions.map((v) => v.pullDryKgf));
	const maxPrice = Math.max(...versions.map((v) => v.priceInclVat));
	const euro = (value: number) => `€ ${num(value)}`;
</script>

<div class="versions">
	<ul class="cards" role="list">
		{#each versions as v, i (v.id)}
			<li class="card" class:best={v.id === bestValue.id} use:reveal={i}>
				<div class="plate-diagram">
					<DriveDiagram version={v} />
					{#if v.id === bestValue.id}
						<span class="chip chip-brand badge">{m.versions_best_value()}</span>
					{/if}
				</div>
				<div class="head">
					<h3 class="display">{v.name}</h3>
				</div>
				<p class="drive">{v.drivenWheels === 4 ? m.versions_driven_4() : m.versions_driven_2()}</p>

				<p class="price">
					<span class="display num">{euro(roundedPrice(v))}</span>
					<span class="price-label">{m.versions_price_label()}</span>
				</p>

				<dl class="specs">
					<div class="spec wide">
						<dt>{m.versions_pull()}</dt>
						<dd class="num">
							<strong>{v.pullDryKgf}</strong> / {v.pullWetKgf} kgf
						</dd>
						<dd class="sub">{m.versions_pull_note()}</dd>
					</div>
					<div class="spec">
						<dt>{m.versions_power()}</dt>
						<dd class="num"><strong>{num(v.powerKw, 1)}</strong> kW</dd>
					</div>
					<div class="spec">
						<dt>{m.versions_mass()}</dt>
						<dd class="num"><strong>{v.massKg}</strong> kg</dd>
					</div>
					<div class="spec">
						<dt>{m.versions_speed()}</dt>
						<dd class="num"><strong>{num(v.vmaxKmh, v.vmaxKmh % 1 ? 1 : 0)}</strong> km/h</dd>
					</div>
					<div class="spec">
						<dt>{m.versions_per_kgf()}</dt>
						<dd class="num"><strong>{euro(Math.round(pricePerKgf(v)))}</strong></dd>
					</div>
				</dl>

				<p class="fit">{t(v.fit)}</p>
			</li>
		{/each}
	</ul>

	<div class="charts" use:reveal>
		<figure class="chart">
			<figcaption>
				<span class="chart-title">{m.versions_chart_pull()}</span>
				<span class="legend">
					<span class="key"><i class="sw dry"></i>{m.versions_legend_dry()}</span>
					<span class="key"><i class="sw wet"></i>{m.versions_legend_wet()}</span>
				</span>
			</figcaption>
			<ul role="list">
				{#each versions as v (v.id)}
					<li>
						<span class="row-label">{v.name}</span>
						<span class="bars">
							<span class="bar dry" style:width="{(v.pullDryKgf / maxPull) * 100}%"></span>
							<span class="bar wet" style:width="{(v.pullWetKgf / maxPull) * 100}%"></span>
						</span>
						<span class="row-value num">{v.pullDryKgf} <small>/ {v.pullWetKgf}</small></span>
					</li>
				{/each}
			</ul>
		</figure>

		<figure class="chart">
			<figcaption>
				<span class="chart-title">{m.versions_chart_price()}</span>
			</figcaption>
			<ul role="list">
				{#each versions as v (v.id)}
					<li>
						<span class="row-label">{v.name}</span>
						<span class="bars">
							<span class="bar price-bar" style:width="{(v.priceInclVat / maxPrice) * 100}%"></span>
						</span>
						<span class="row-value num">{euro(roundedPrice(v))}</span>
					</li>
				{/each}
			</ul>
		</figure>
	</div>

	<p class="footnote">{m.versions_footnote()}</p>
</div>

<style>
	.cards {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 1rem;
	}

	.card {
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
		padding: 1rem 1rem 1.4rem;
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--r-lg);
		box-shadow: var(--shadow-sm);
	}

	.card.best {
		border-color: var(--green-300);
		box-shadow:
			0 0 0 1px var(--green-300),
			var(--shadow-md);
	}

	.plate-diagram {
		position: relative;
		display: grid;
		place-items: center;
		aspect-ratio: 1 / 1;
		padding: 1.2rem 1.6rem;
		background: var(--bg-alt);
		border-radius: var(--r-md);
	}

	.plate-diagram :global(svg) {
		max-height: 100%;
		width: auto;
	}

	.badge {
		position: absolute;
		left: 0.6rem;
		bottom: 0.6rem;
		background: var(--surface);
		box-shadow: var(--shadow-sm);
	}

	.head {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		padding-inline: 0.25rem;
	}

	h3.display {
		font-family: var(--font-display);
		font-weight: 400;
		font-size: 2rem;
		line-height: 1;
	}

	.drive {
		padding-inline: 0.25rem;
		font-size: 0.9rem;
		line-height: 1.45;
		min-height: 2.9em;
		color: var(--ink-3);
		margin-top: -0.55rem;
	}

	.price {
		display: flex;
		flex-direction: column;
		padding-inline: 0.25rem;
	}

	.price .display {
		font-size: 2.6rem;
		line-height: 1;
		color: var(--brand-text);
	}

	.price-label {
		font-size: 0.82rem;
		color: var(--ink-3);
	}

	.specs {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5rem;
		margin: 0;
	}

	.spec {
		padding: 0.6rem 0.7rem;
		background: var(--bg);
		border-radius: 10px;
	}

	.spec.wide {
		grid-column: 1 / -1;
	}

	dt {
		font-size: 0.76rem;
		color: var(--ink-3);
	}

	dd {
		margin: 0.1rem 0 0;
		font-size: 0.95rem;
		color: var(--ink-2);
	}

	dd strong {
		font-size: 1.15rem;
		font-weight: 700;
		color: var(--ink);
	}

	dd.sub {
		margin: 0;
		font-size: 0.74rem;
		color: var(--ink-3);
	}

	.fit {
		margin-top: auto;
		padding-inline: 0.25rem;
		font-size: 0.92rem;
		line-height: 1.5;
		color: var(--ink-2);
	}

	.charts {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin-top: 1rem;
	}

	.chart {
		margin: 0;
		padding: 1.4rem 1.5rem 1.5rem;
		background: var(--bg-alt);
		border-radius: var(--r-lg);
	}

	figcaption {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.5rem 1rem;
		margin-bottom: 1.1rem;
	}

	.chart-title {
		font-weight: 650;
	}

	.legend {
		display: inline-flex;
		gap: 1rem;
		font-size: 0.82rem;
		color: var(--ink-3);
	}

	.key {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
	}

	.sw {
		display: inline-block;
		width: 14px;
		height: 8px;
		border-radius: 3px;
	}

	.sw.dry,
	.bar.dry {
		background: var(--brand);
	}

	.sw.wet,
	.bar.wet {
		background: var(--teal);
	}

	.chart ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0.85rem;
	}

	.chart li {
		display: grid;
		grid-template-columns: 7.2rem 1fr 5.6rem;
		align-items: center;
		gap: 0.75rem;
	}

	.row-label {
		font-size: 0.88rem;
		color: var(--ink-2);
	}

	.bars {
		display: grid;
		gap: 3px;
	}

	.bar {
		display: block;
		height: 12px;
		border-radius: 0 4px 4px 0;
		transform-origin: left;
	}

	.bar.wet {
		height: 6px;
	}

	.price-bar {
		height: 14px;
		background: var(--ink-3);
		opacity: 0.75;
	}

	.row-value {
		text-align: right;
		font-weight: 650;
		font-size: 0.92rem;
	}

	.row-value small {
		font-weight: 400;
		color: var(--ink-3);
	}

	@media (prefers-reduced-motion: no-preference) {
		.charts .bar {
			transform: scaleX(0);
			transition: transform 1.1s var(--ease) 0.2s;
		}

		.charts:global(.is-in) .bar {
			transform: scaleX(1);
		}
	}

	.footnote {
		margin-top: 1rem;
		max-width: 80ch;
		font-size: 0.82rem;
		line-height: 1.55;
		color: var(--ink-3);
	}

	@media (max-width: 1100px) {
		.cards {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 767px) {
		.cards {
			display: flex;
			overflow-x: auto;
			scroll-snap-type: x mandatory;
			margin-inline: calc(var(--gutter) * -1);
			padding: 0.25rem var(--gutter) 1rem;
			scroll-padding-inline: var(--gutter);
		}

		.card {
			flex: 0 0 82%;
			scroll-snap-align: start;
		}

		.charts {
			grid-template-columns: 1fr;
		}

		.chart {
			padding: 1.2rem 1rem;
		}

		.chart li {
			grid-template-columns: 6.4rem 1fr 4.8rem;
			gap: 0.5rem;
		}
	}
</style>
