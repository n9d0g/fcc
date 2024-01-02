<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'

	export let data
	const { title, breadcrumb, headData, lesson } = data
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<p>Teacher: {lesson.teacher}</p>
	<p>Assistant: {lesson.assistant}</p>
	<p>Title: {lesson.title}</p>
	<p>Objective: {lesson.objective}</p>
	<p>Memory Verse: {lesson.memoryVerse}</p>
	<a href={lesson.biblePassage} class="anchor w-fit">Bible Passage Link</a>
	<h3 class="h3 font-bold">Lesson Plan</h3>
	<div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
		<p class="flex flex-col">
			<span class="font-bold">Introduction:</span>
			{lesson.introduction}
		</p>
		<p class="flex flex-col">
			<span class="font-bold">Storytelling:</span>
			{lesson.storytelling}
		</p>
		<p class="flex flex-col">
			<span class="font-bold">Discussion:</span>
			{lesson.discussion}
		</p>
		<p class="flex flex-col">
			<span class="font-bold">Activity:</span>
			{lesson.activity}
		</p>
	</div>

	<a href={lesson.worksheet} class="anchor">Suggested Worksheet</a>
	<a href={lesson.activity} class="anchor">Suggested Activity</a>
	<a href={lesson.video} class="anchor">Suggested Video</a>
	<a href={lesson.song} class="anchor">Suggested Action Song</a>
	<p>Homework: {lesson.homework}</p>
</FccLayout>
