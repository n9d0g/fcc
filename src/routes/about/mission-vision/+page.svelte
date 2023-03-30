<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'

	const breadcrumb = [
		{ title: 'Home', href: '/' },
		{ title: 'About', href: '/about' },
		{ title: 'Mission & Vision', href: '/mission-vision' },
	]
</script>

<FccLayout {breadcrumb} title="FCC | Mission & Vision">
	<PageTitle text="Our Mission & Vision." />
</FccLayout>
