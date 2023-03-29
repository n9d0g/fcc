<script lang="ts">
	import FccLayout from '$lib/FccLayout.svelte'
	import PageTitle from '$lib/PageTitle.svelte'

	const breadcrumb = [
		{ title: 'Home', href: '/' },
		{ title: 'Small Groups', href: '/small-groups' },
		{ title: 'South Mississauga', href: '/small-groups/south-mississauga' },
	]
</script>

<FccLayout {breadcrumb} title="FCC | South Mississauga SG">
	<PageTitle text="South Mississauga Small Group." />
</FccLayout>
