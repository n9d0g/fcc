<script lang="ts">
	import { page } from '$app/stores'
	import FccLayout from '$lib/components/FccLayout.svelte'
	import { breadcrumbs } from '$lib/constants'

	const breadcrumb = [breadcrumbs.home, breadcrumbs.error]
</script>

<FccLayout {breadcrumb} title="FCC | 404">
	<h2>{$page.status}: {$page.error?.message}</h2>
</FccLayout>
