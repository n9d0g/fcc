<script lang="ts">
	import LeadershipCard from '$lib/components/about/leadership/LeadershipCard.svelte'
	import FccLayout from '$lib/components/FccLayout.svelte'

	export let data
	const { title, headData, breadcrumb } = data
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<div
		class="my-16 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
	>
		{#each data.leaders as leader}
			<LeadershipCard
				img={leader.img}
				name={leader.name}
				title={leader.title}
				subministries={leader.subministries}
				sort={leader.sort}
			/>
		{/each}
	</div>
</FccLayout>
