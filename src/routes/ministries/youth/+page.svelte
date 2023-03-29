<script lang="ts">
	import FccLayout from '$lib/FccLayout.svelte'
	import PageTitle from '$lib/PageTitle.svelte'

	const breadcrumb = [
		{ title: 'Home', href: '/' },
		{ title: 'Ministries', href: '/ministries' },
		{ title: 'Youth', href: '/ministries/youth' },
	]
</script>

<FccLayout {breadcrumb} title="FCC | Youth">
	<PageTitle text="FCC Youth's Ministry." />
</FccLayout>
