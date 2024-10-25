<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'

	export let data
	const { title, breadcrumb, headData } = data
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<div class="container mx-auto">
		<div>
			<a href="/events/2024/fall-retreat" class="anchor">2024 Fall Retreat</a>
		</div>
	</div>
</FccLayout>
