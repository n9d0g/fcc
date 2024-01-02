<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'

	export let data
	const { title, breadcrumb, headData, lesson } = data
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<div class="mb-8 flex flex-col gap-2">
		<p><span class="font-bold">Teacher:</span> {lesson.teacher}</p>
		<p><span class="font-bold">Assistant:</span> {lesson.assistant}</p>
		<p><span class="font-bold">Title:</span> {lesson.title}</p>
		<p><span class="font-bold">Objective:</span> {lesson.objective}</p>
		<p><span class="font-bold">Memory Verse:</span> {lesson.memoryVerse}</p>
		<a href={lesson.biblePassage} class="anchor w-fit">Bible Passage Link</a>
	</div>

	<h3 class="h3 mb-2 font-bold">Lesson Plan</h3>
	<div class="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
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

	<div class="flex flex-col gap-2">
		<a href={lesson.worksheet} class="anchor w-fit">Suggested Worksheet</a>
		<a href={lesson.craft} class="anchor w-fit">Suggested Activity</a>
		<a href={lesson.video} class="anchor w-fit">Suggested Video</a>
		<a href={lesson.song} class="anchor mb-8 w-fit">Suggested Action Song</a>
		<p><span class="font-bold">Homework:</span> {lesson.homework}</p>
	</div>
</FccLayout>
