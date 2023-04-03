<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import { breadcrumbs } from '$lib/constants'

	const breadcrumb = [breadcrumbs.home, breadcrumbs.about, breadcrumbs.missionVision]
</script>

<FccLayout {breadcrumb} title="FCC | Mission & Vision">
	<PageTitle text="Our Mission & Vision." />
</FccLayout>
