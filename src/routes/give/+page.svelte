<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import { breadcrumbs } from '$lib/constants'

	const breadcrumb = [breadcrumbs.home, breadcrumbs.give]
</script>

<FccLayout {breadcrumb} title="FCC | Give">
	<PageTitle text="Give." />
</FccLayout>
