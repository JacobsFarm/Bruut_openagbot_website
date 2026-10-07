<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { reveal } from '$lib/actions/reveal';
	import FarmerAvatar, { type FarmerKind } from './FarmerAvatar.svelte';

	const members: { name: string; role: string; kind: FarmerKind }[] = [
		{ name: m.front_page_team_member_3_name(), role: m.front_page_team_member_3_role(), kind: 'founder-dev' },
		{ name: m.front_page_team_member_1_name(), role: m.front_page_team_member_1_role(), kind: 'organic-visionary' },
		{ name: m.front_page_team_member_2_name(), role: m.front_page_team_member_2_role(), kind: 'organic-engineer' },
		{ name: m.front_page_team_member_4_name(), role: m.front_page_team_member_4_role(), kind: 'grower-mechanic' },
		{ name: m.front_page_team_member_5_name(), role: m.front_page_team_member_5_role(), kind: 'gps-pioneer' }
	];
</script>

<ul class="team" role="list">
	{#each members as member, i}
		<li use:reveal={i}>
			<FarmerAvatar kind={member.kind} size={112} />
			<span class="name">{member.name.trim()}</span>
			<span class="role">{member.role.trim()}</span>
		</li>
	{/each}
</ul>

<style>
	.team {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		gap: 1rem;
	}

	li {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.35rem;
		padding: 1.6rem 1rem 1.4rem;
		text-align: center;
		border-radius: var(--r-lg);
		background: var(--surface);
		border: 1px solid var(--line);
	}

	li :global(.farmer) {
		margin-bottom: 0.6rem;
	}

	.name {
		font-weight: 650;
		font-size: 1.05rem;
	}

	.role {
		font-size: 0.88rem;
		line-height: 1.45;
		color: var(--ink-3);
	}

	@media (max-width: 1023px) {
		.team {
			display: flex;
			overflow-x: auto;
			scroll-snap-type: x mandatory;
			margin-inline: calc(var(--gutter) * -1);
			padding: 0.25rem var(--gutter) 1rem;
			scroll-padding-inline: var(--gutter);
		}

		li {
			flex: 0 0 min(220px, 62%);
			scroll-snap-align: start;
		}
	}
</style>
