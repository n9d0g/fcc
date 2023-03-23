<script lang="ts">
	export let title: string
	export let link: string
</script>

<a href={link} class="card card-hover flex justify-center items-center h-64 rounded-md">
	<h2 class="text-xl">{title}</h2>
</a>
