<script lang="ts">
	export let title: string
	export let date: string
	export let speaker: string

	const handleSermonClick = () => {
		console.log(title)
	}
</script>

<button
	on:click={handleSermonClick}
	class="card card-hover flex flex-col justify-start items-start p-4"
>
	<header class="card-header">{title}</header>
	<section class="p-4">{date}</section>
	<footer class="card-footer">{speaker}</footer>
</button>
