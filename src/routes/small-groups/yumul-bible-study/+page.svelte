<script lang="ts">
	import FccLayout from '$lib/FccLayout.svelte'
	import PageTitle from '$lib/PageTitle.svelte'

	const breadcrumb = [
		{ title: 'Home', href: '/' },
		{ title: 'Small Groups', href: '/small-groups' },
		{ title: 'Yumul Bible Study', href: '/small-groups/yumul-bible-study' },
	]
</script>

<FccLayout {breadcrumb} title="FCC | Yumul Bible Study">
	<PageTitle text="FCC Yumul Bible Study." />
</FccLayout>
