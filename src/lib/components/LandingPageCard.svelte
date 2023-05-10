<script lang="ts">
	export let title: string
	export let link: string

	// variables
</script>

<a href={link} class="card card-hover flex items-center justify-center rounded-md p-4 text-center md:h-64">
	<h2 class="h2 text-3xl">{title}</h2>
</a>
