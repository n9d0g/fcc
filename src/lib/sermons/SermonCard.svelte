<script>
	export let title
	export let date
	export let speaker

	const handleSermonClick = () => {
		console.log(title)
	}
</script>

<button
	on:click={handleSermonClick}
	class="bg-slate-100 hover:bg-slate-200 cursor-pointer ease-in-out duration-100"
>
	<h3>{title}</h3>
	<h4>{date}</h4>
	<h4>{speaker}</h4>
</button>
