<script lang="ts">
	export let title: string
	export let link: string

	// variables
</script>

<a href={link} class="card card-hover flex justify-center items-center text-center h-64 rounded-md p-4">
	<h2 class="text-xl">{title}</h2>
</a>
