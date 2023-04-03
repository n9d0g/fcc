<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import { breadcrumbs } from '$lib/constants'

	const breadcrumb = [breadcrumbs.home, breadcrumbs.smallgroups, breadcrumbs.southMississauga]
</script>

<FccLayout {breadcrumb} title="FCC | South Mississauga SG">
	<PageTitle text="South Mississauga Small Group." />
</FccLayout>
