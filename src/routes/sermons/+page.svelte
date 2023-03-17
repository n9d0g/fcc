<script>
	import SermonCard from '../../lib/sermons/SermonCard.svelte'
</script>

<svelte:head>
	<title>FCC | Sermons</title>
</svelte:head>

<section class="container mx-auto py-36 text-center">
	<h1 class="text-3xl font-bold">sermons page</h1>
</section>

<section class="container mx-auto">
	<div class="grid gap-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		<SermonCard title="title" date="date" speaker="speaker" />
		<SermonCard title="title" date="date" speaker="speaker" />
		<SermonCard title="title" date="date" speaker="speaker" />
		<SermonCard title="title" date="date" speaker="speaker" />
		<SermonCard title="title" date="date" speaker="speaker" />
		<SermonCard title="title" date="date" speaker="speaker" />
		<SermonCard title="title" date="date" speaker="speaker" />
		<SermonCard title="title" date="date" speaker="speaker" />
		<SermonCard title="title" date="date" speaker="speaker" />
		<SermonCard title="title" date="date" speaker="speaker" />
		<SermonCard title="title" date="date" speaker="speaker" />
		<SermonCard title="title" date="date" speaker="speaker" />
		<SermonCard title="title" date="date" speaker="speaker" />
	</div>
</section>
