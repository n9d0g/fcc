<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'

	const breadcrumb = [
		{ title: 'Home', href: '/' },
		{ title: 'Small Groups', href: '/small-groups' },
		{ title: 'Women Chasing God', href: '/small-groups/women-chasing-god' },
	]
</script>

<FccLayout {breadcrumb} title="FCC | Women Chasing God">
	<PageTitle text="FCC Women Chasing God Small Group." />
</FccLayout>
