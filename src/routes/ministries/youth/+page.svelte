<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import { breadcrumbs } from '$lib/constants'

	const breadcrumb = [breadcrumbs.home, breadcrumbs.ministries, breadcrumbs.ministriesYouth]
</script>

<FccLayout {breadcrumb} title="FCC | Youth">
	<PageTitle text="FCC Youth's Ministry." />
</FccLayout>
