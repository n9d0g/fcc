<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import { breadcrumbs } from '$lib/constants'

	const breadcrumb = [breadcrumbs.home, breadcrumbs.smallgroups, breadcrumbs.yumul]
</script>

<FccLayout {breadcrumb} title="FCC | Yumul Bible Study">
	<PageTitle text="FCC Yumul Bible Study." />
</FccLayout>
