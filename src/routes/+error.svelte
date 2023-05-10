<script lang="ts">
	import { page } from '$app/stores'
	import FccLayout from '$lib/components/FccLayout.svelte'
	import { breadcrumbs } from '$lib/constants'

	const breadcrumb = [breadcrumbs.home, breadcrumbs.error]

	const headData = {
		title: 'FCC | 404',
		description: 'This page does not exist.',
	}
</script>

<FccLayout {breadcrumb} {headData}>
	<h2 class="h2">{$page.status}: {$page.error?.message}</h2>
</FccLayout>
