<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import { breadcrumbs } from '$lib/constants'

	const breadcrumb = [breadcrumbs.home, breadcrumbs.smallgroups, breadcrumbs.ubs]
</script>

<FccLayout {breadcrumb} title="FCC | University Bible Study">
	<PageTitle text="FCC University Bible Study." />
</FccLayout>
