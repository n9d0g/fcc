<script lang="ts">
	import { page } from '$app/state'
	import FccLayout from '#lib/components/FccLayout.svelte'
	import LandingPageGrid from '#lib/components/LandingPageGrid.svelte'
	import { breadcrumbs } from '#lib/config/index.js'

	const title = $derived(`FCC | ${page.status}`)
	const breadcrumb = [breadcrumbs.home, breadcrumbs.error]
	const headData = $derived({
		title: `FCC | ${page.status}`,
		description: 'This page does not exist.',
	})
	const landingPageItems = [
		{ title: 'Home', link: '/', icon: 'lucide:home' },
		{ title: 'About', link: '/about', icon: 'lucide:info' },
		{ title: 'Sermons', link: '/sermons', icon: 'lucide:play' },
		{ title: 'Ministries', link: '/ministries', icon: 'lucide:heart-handshake' },
		{ title: 'Small Groups', link: '/small-groups', icon: 'lucide:users' },
		{ title: 'Give', link: '/give', icon: 'lucide:gift' },
	]
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<section class="flex flex-col items-center gap-6 py-6 text-center">
		<p class="font-display text-8xl font-semibold text-secondary-300 md:text-9xl">
			{page.status}
		</p>
		<h2 class="h2">Oops! {page.error?.message}</h2>
		<p class="lede max-w-xl">
			We couldn't find what you were looking for. Try one of these pages instead:
		</p>
	</section>
	<div class="mt-10">
		<LandingPageGrid items={landingPageItems} />
	</div>
</FccLayout>
