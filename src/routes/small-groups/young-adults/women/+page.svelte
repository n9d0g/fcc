<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import { breadcrumbs } from '$lib/constants'

	export let data

	const breadcrumb = [breadcrumbs.home, breadcrumbs.smallgroups, breadcrumbs.sgYA, breadcrumbs.sgYAWomen]
</script>

<FccLayout {breadcrumb} headData={data.headData}>
	<PageTitle text="FCC Young Adults Women's Small Group." />
</FccLayout>
