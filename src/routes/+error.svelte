<script>
	import { page } from '$app/stores'
	import FccLayout from '$lib/FccLayout.svelte'
	import PageTitle from '$lib/PageTitle.svelte'
</script>

<FccLayout title="FCC | 404">
	<h2>{$page.status}: {$page.error.message}</h2>
</FccLayout>
