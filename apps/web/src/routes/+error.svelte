<script lang="ts">
	import { page } from '$app/stores'
	import FccLayout from '$lib/components/FccLayout.svelte'
	import LandingPageGrid from '$lib/components/LandingPageGrid.svelte'
	import { breadcrumbs } from '$lib/constants'

	const title = $derived(`FCC | ${$page.status}`)
	const breadcrumb = [breadcrumbs.home, breadcrumbs.error]
	const headData = $derived({
		title: `FCC | ${$page.status}`,
		description: 'This page does not exist.',
	})
	const landingPageItems = [
		{ title: 'Home', link: '/' },
		{ title: 'About', link: '/about' },
		{ title: 'Sermons', link: '/sermons' },
		{ title: 'Ministries', link: '/ministries' },
		{ title: 'Small Groups', link: '/small-groups' },
		{ title: 'Give', link: '/give' },
	]
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<section
		class="my-4 flex min-h-[50vh] flex-col items-center justify-center gap-8 text-center"
	>
		<h1 class="h1 text-4xl font-bold md:text-6xl lg:text-9xl">Oops!</h1>
		<h2 class="h2">{$page.error?.message}</h2>
		<p class="p">({$page.status} Error)</p>
		<h3 class="h3">Try one of these pages instead:</h3>
		<div class="w-full">
			<LandingPageGrid items={landingPageItems} />
		</div>
	</section>
</FccLayout>
