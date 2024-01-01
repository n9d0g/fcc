<script lang="ts">
	import { goto } from '$app/navigation'
	import FccLayout from '$lib/components/FccLayout.svelte'

	export let data
	const { title, breadcrumb, headData, lessons } = data

	const handleLessonClick = (date: string) => {
		goto(`/sunday-school/toddler/${date}`)
	}
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<div class="table-container">
		<table class="table-interactive table-compact table">
			<thead>
				<tr>
					<th>date</th>
					<th>teacher</th>
					<th>lesson title</th>
				</tr>
			</thead>
			<tbody>
				{#each lessons as lesson}
					<tr on:click={() => handleLessonClick(lesson.date)}>
						<td>{lesson.date}</td>
						<td>{lesson.teacher}</td>
						<td>{lesson.title}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</FccLayout>
