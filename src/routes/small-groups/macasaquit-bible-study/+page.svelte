<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import { breadcrumbs } from '$lib/constants'

	const breadcrumb = [breadcrumbs.home, breadcrumbs.smallgroups, breadcrumbs.macasaquit]
</script>

<FccLayout {breadcrumb} title="FCC | Macasaquit Bible Study">
	<PageTitle text="Macasaquit Bible Study." />
</FccLayout>
