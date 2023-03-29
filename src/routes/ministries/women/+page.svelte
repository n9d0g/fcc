<script lang="ts">
	import FccLayout from '$lib/FccLayout.svelte'
	import PageTitle from '$lib/PageTitle.svelte'

	const breadcrumb = [
		{ title: 'Home', href: '/' },
		{ title: 'Ministries', href: '/ministries' },
		{ title: 'Women', href: '/ministries/women' },
	]
</script>

<FccLayout {breadcrumb} title="FCC | Women">
	<PageTitle text="FCC Women's Ministry." />
</FccLayout>
