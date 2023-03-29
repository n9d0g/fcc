<script lang="ts">
	import FccLayout from '$lib/FccLayout.svelte'
	import PageTitle from '$lib/PageTitle.svelte'

	const breadcrumb = [
		{ title: 'Home', href: '/' },
		{ title: 'Small Groups', href: '/small-groups' },
		{ title: 'University Bible Study', href: '/university-bible-study' },
	]
</script>

<FccLayout {breadcrumb} title="FCC | University Bible Study">
	<PageTitle text="FCC University Bible Study." />
</FccLayout>
