<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import { breadcrumbs, headData } from '$lib/constants'

	export let data

	const breadcrumb = [breadcrumbs.home, breadcrumbs.smallgroups, breadcrumbs.smallgroups.ubs]
</script>

<FccLayout {breadcrumb} headData={data.headData}>
	<PageTitle text="FCC University Bible Study." />
</FccLayout>
