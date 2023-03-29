<script lang="ts">
	import { page } from '$app/stores'
	import FccLayout from '$lib/FccLayout.svelte'

	const breadcrumb = [
		{ title: 'Home', href: '/' },
		{ title: 'Error', href: '/error' },
	]
</script>

<FccLayout {breadcrumb} title="FCC | 404">
	<h2>{$page.status}: {$page.error.message}</h2>
</FccLayout>
