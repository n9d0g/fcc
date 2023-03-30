<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'

	const breadcrumb = [
		{ title: 'Home', href: '/' },
		{ title: 'Give', href: '/give' },
	]
</script>

<FccLayout {breadcrumb} title="FCC | Give">
	<PageTitle text="Give." />
</FccLayout>
