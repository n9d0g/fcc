<script lang="ts">
	import FccLayout from '$lib/FccLayout.svelte'
	import PageTitle from '$lib/PageTitle.svelte'

	const breadcrumb = [
		{ title: 'Home', href: '/' },
		{ title: 'Give', href: '/give' },
	]
</script>

<FccLayout {breadcrumb} title="FCC | Give">
	<PageTitle text="Give." />
</FccLayout>
