<script>
	import PraiseScheduleHeader from '$lib/ministries/praise/PraiseScheduleHeader.svelte'
	import PraiseScheduleRow from '$lib/ministries/praise/PraiseScheduleRow.svelte'
	import praiseData from '$lib/ministries/praise/praise.json'
</script>

<svelte:head>
	<title>FCC | Praise Schedule</title>
</svelte:head>

<section class="container mx-auto flex justify-center">
	<h1 class="text-3xl font-bold py-36">praise schedule</h1>
</section>

<section class="container mx-auto grid grid-cols-9">
	<PraiseScheduleHeader />
	{#each praiseData as row}
		<PraiseScheduleRow
			date={row.date}
			lead={row.lead}
			guitar={row.guitar}
			piano={row.keys}
			bass={row.bass}
			drums={row.drums}
			backup={row.backup}
			soundAv={row.av}
			details="details"
		/>
	{/each}
</section>
