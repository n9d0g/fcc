<script lang="ts">
	export let text: string
	export let link: string
</script>

<a href={link} class="flex w-32 btn hover:variant-filled-surface h-10 btn-icon bg-transparent p-4 "
	>{text}</a
>
