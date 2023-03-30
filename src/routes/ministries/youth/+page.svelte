<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'

	const breadcrumb = [
		{ title: 'Home', href: '/' },
		{ title: 'Ministries', href: '/ministries' },
		{ title: 'Youth', href: '/ministries/youth' },
	]
</script>

<FccLayout {breadcrumb} title="FCC | Youth">
	<PageTitle text="FCC Youth's Ministry." />
</FccLayout>
