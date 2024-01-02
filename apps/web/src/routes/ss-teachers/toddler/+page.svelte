<script lang="ts">
	import { goto } from '$app/navigation'
	import FccLayout from '$lib/components/FccLayout.svelte'

	export let data
	const { title, breadcrumb, headData, lessons } = data

	const handleLessonClick = (date: string) => {
		goto(`/ss-teachers/toddler/${date}`)
	}
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<div class="table-container relative h-[60vh]">
		<table class="table table-interactive table-compact overflow-scroll">
			<thead>
				<tr class="bg-surface-200-700-token sticky top-0 z-10">
					<th>Date</th>
					<th>Teacher</th>
					<th>Assistant</th>
					<th>Lesson Title</th>
				</tr>
			</thead>
			<tbody>
				{#each lessons as lesson}
					<tr on:click={() => handleLessonClick(lesson.date)}>
						<td>{lesson.date}</td>
						<td>{lesson.teacher}</td>
						<td>{lesson.assistant}</td>
						<td>{lesson.title}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</FccLayout>
