<script lang="ts">
	import FccLayout from '$lib/FccLayout.svelte'
	import PageTitle from '$lib/PageTitle.svelte'

	const breadcrumb = [
		{ title: 'Home', href: '/' },
		{ title: 'Small Groups', href: '/small-groups' },
		{ title: 'Young Adults', href: '/small-groups/young-adults' },
		{ title: 'Women', href: '/small-groups/young-adults/women' },
	]
</script>

<FccLayout {breadcrumb} title="FCC | Young Adults - Women">
	<PageTitle text="FCC Young Adults Women's Small Group." />
</FccLayout>
