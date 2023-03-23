<script lang="ts">
	export let text: string
	export let link: string
</script>

<a href={link} class="flex w-32 btn hover:variant-soft h-8 btn-icon !bg-transparent p-4 ">{text}</a>
