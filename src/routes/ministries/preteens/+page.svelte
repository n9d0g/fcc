<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import { breadcrumbs } from '$lib/constants'

	const breadcrumb = [breadcrumbs.home, breadcrumbs.ministries, breadcrumbs.preteens]
</script>

<FccLayout {breadcrumb} title="FCC | Pre-teens">
	<PageTitle text="FCC Pre-teen's Ministry." />
</FccLayout>
