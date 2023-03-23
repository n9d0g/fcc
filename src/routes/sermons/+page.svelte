<script>
	import SermonCard from '$lib/sermons/SermonCard.svelte'
	import PageTitle from '$lib/PageTitle.svelte'
	import FccLayout from '$lib/FccLayout.svelte'
</script>

<FccLayout title="FCC | Sermons">
	<PageTitle text="Sermons." />
	<div class="grid gap-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		<SermonCard title="title 1" date="date 1" speaker="speaker 1" />
		<SermonCard title="title 2" date="date 2" speaker="speaker 2" />
		<SermonCard title="title 3" date="date 3" speaker="speaker 3" />
	</div>
</FccLayout>
