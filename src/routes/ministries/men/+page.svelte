<script lang="ts">
	import FccLayout from '$lib/FccLayout.svelte'
	import PageTitle from '$lib/PageTitle.svelte'

	const breadcrumb = [
		{ title: 'Home', href: '/' },
		{ title: 'Ministries', href: '/ministries' },
		{ title: 'Men', href: '/ministries/men' },
	]
</script>

<FccLayout {breadcrumb} title="FCC | Men">
	<PageTitle text="FCC Men's Ministry." />
</FccLayout>
