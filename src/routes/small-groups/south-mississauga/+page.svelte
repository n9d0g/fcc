<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import { breadcrumbs } from '$lib/constants'

	export let data

	const breadcrumb = [breadcrumbs.home, breadcrumbs.smallgroups, breadcrumbs.southMississauga]
</script>

<FccLayout {breadcrumb} headData={data.headData}>
	<PageTitle text="South Mississauga Small Group." />
</FccLayout>
