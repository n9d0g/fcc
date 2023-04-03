<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import { breadcrumbs } from '$lib/constants'

	const breadcrumb = [breadcrumbs.home, breadcrumbs.ministries, breadcrumbs.ministriesWomen]
</script>

<FccLayout {breadcrumb} title="FCC | Women">
	<PageTitle text="FCC Women's Ministry." />
</FccLayout>
