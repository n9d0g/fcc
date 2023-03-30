<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'

	const breadcrumb = [
		{ title: 'Home', href: '/' },
		{ title: 'Ministries', href: '/ministies' },
		{ title: 'Young Adults', href: '/ministies/young-adults' },
	]
</script>

<FccLayout {breadcrumb} title="FCC | Young Adults">
	<PageTitle text="FCC Young Adults' Ministry." />
</FccLayout>
