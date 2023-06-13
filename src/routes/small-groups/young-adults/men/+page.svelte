<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import { breadcrumbs } from '$lib/constants'

	// server fetching
	export let data

	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.smallgroups,
		breadcrumbs.smallgroups.ya,
		breadcrumbs.smallgroups.ya.men,
	]
</script>

<FccLayout {breadcrumb} headData={data.headData}>
	<PageTitle text="FCC Young Adults Men's Small Group." />
</FccLayout>
