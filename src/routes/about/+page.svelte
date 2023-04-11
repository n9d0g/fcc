<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import LandingPageCard from '$lib/components/LandingPageCard.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import { breadcrumbs } from '$lib/constants'

	const breadcrumb = [breadcrumbs.home, breadcrumbs.about]
</script>

<FccLayout {breadcrumb} title="FCC | About">
	<PageTitle text="About FCC." />
	<div class="my-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:my-16 md:grid-cols-3">
		<LandingPageCard title="Beliefs" link="/about/beliefs" />
		<LandingPageCard title="Mission & Vision" link="/about/mission-vision" />
		<LandingPageCard title="Leadership" link="/about/leadership" />
	</div>
</FccLayout>
