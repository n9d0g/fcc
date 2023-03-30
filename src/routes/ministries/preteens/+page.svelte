<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'

	const breadcrumb = [
		{ title: 'Home', href: '/' },
		{ title: 'Ministries', href: '/ministries' },
		{ title: 'Preteens', href: '/ministries/preteens' },
	]
</script>

<FccLayout {breadcrumb} title="FCC | Pre-teens">
	<PageTitle text="FCC Pre-teen's Ministry." />
</FccLayout>
