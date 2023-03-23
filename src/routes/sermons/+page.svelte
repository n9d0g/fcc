<script lang="ts">
	import SermonCard from '$lib/sermons/SermonCard.svelte'
	import PageTitle from '$lib/PageTitle.svelte'
	import FccLayout from '$lib/FccLayout.svelte'

	import type { PageData } from './$types'
	export let data: PageData
</script>

<FccLayout title="FCC | Sermons">
	<PageTitle text="Sermons." />
	<div class="grid gap-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		{#each data.sermons as sermon}
			<SermonCard
				title={sermon.title}
				date={sermon.date}
				speaker={sermon.speaker}
				scripture={sermon.scripture}
				youtube={sermon.youtube}
			/>
		{/each}
	</div>
</FccLayout>
