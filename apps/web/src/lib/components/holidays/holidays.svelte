<script>
	import HolidayCard from '$lib/components/HolidayCard.svelte'
</script>

<h1 class="my-4 text-4xl">FCC Sunday Specials</h1>
<div
	class="grid rounded-2xl bg-slate-800 p-4 shadow-md shadow-white sm:grid-cols-4"
>
	<!-- January -->
	<HolidayCard holidayTitle="New Year's Day" holidayDate="2024-01-01" />

	<!-- February -->
	<HolidayCard holidayTitle="Family Day" holidayDate="2024-02-19" />

	<!-- March -->
	<HolidayCard holidayTitle="St. Patrick's Day" holidayDate="2024-03-17" />

	<!-- April -->
	<HolidayCard holidayTitle="Good Friday" holidayDate="2024-04-19" />

	<!-- May -->
	<HolidayCard holidayTitle="Victoria Day" holidayDate="2024-05-20" />

	<!-- June -->
	<HolidayCard holidayTitle="Canada Day" holidayDate="2024-07-01" />

	<!-- July -->
	<HolidayCard holidayTitle="Labor Day" holidayDate="2024-09-02" />

	<!-- August -->
	<HolidayCard holidayTitle="Thanksgiving Day" holidayDate="2024-10-14" />

	<!-- September -->
	<HolidayCard holidayTitle="Remembrance Day" holidayDate="2024-11-11" />

	<!-- October -->
	<HolidayCard holidayTitle="Christmas Day" holidayDate="2024-12-25" />

	<!-- November -->
	<HolidayCard holidayTitle="Boxing Day" holidayDate="2024-12-26" />

	<!-- December -->
	<!-- Add holidays for December as needed -->
</div>
