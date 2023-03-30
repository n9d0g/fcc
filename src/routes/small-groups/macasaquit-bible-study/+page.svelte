<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'

	const breadcrumb = [
		{ title: 'Home', href: '/' },
		{ title: 'Small Groups', href: '/small-groups' },
		{ title: 'Macasaquit Bible Study', href: '/small-groups/macasaquit-bible-study' },
	]
</script>

<FccLayout {breadcrumb} title="FCC | Macasaquit Bible Study">
	<PageTitle text="Macasaquit Bible Study." />
</FccLayout>
