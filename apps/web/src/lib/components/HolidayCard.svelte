<script lang="ts">
	export let holidayTitle = 'Holiday Title'
	export let holidayDate = 'YYYY-MM-DD'

	// Function to get the day of the week from a given date
	function getDayOfWeek(date: string) {
		const days = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
		]
		const dayIndex = new Date(date).getDay()
		return days[dayIndex]
	}
</script>

{#if getDayOfWeek(holidayDate) === 'Sunday'}
	<div
		class="m-2 flex flex-col items-center justify-center rounded-2xl border bg-slate-700 p-4"
	>
		<h2 class="text-2xl">{holidayTitle}</h2>
		<p>Date: {holidayDate}</p>
		<p>Day: {getDayOfWeek(holidayDate)}</p>
	</div>
{/if}
