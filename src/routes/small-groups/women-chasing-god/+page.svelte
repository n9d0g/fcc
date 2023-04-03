<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import { breadcrumbs } from '$lib/constants'

	const breadcrumb = [breadcrumbs.home, breadcrumbs.smallgroups, breadcrumbs.womenChasingGod]
</script>

<FccLayout {breadcrumb} title="FCC | Women Chasing God">
	<PageTitle text="FCC Women Chasing God Small Group." />
</FccLayout>
