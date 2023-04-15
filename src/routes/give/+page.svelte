<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import { breadcrumbs } from '$lib/constants'

	// server fetching
	export let data

	const links = data.links

	const breadcrumb = [breadcrumbs.home, breadcrumbs.give]
</script>

<FccLayout {breadcrumb} headData={data.headData}>
	<PageTitle text="Generosity is a form of Worship." />
	<div class="my-8 grid grid-cols-1 items-center gap-8 md:grid-cols-2">
		<p class="unstyled my-8 text-center text-xl leading-relaxed" data-testid="give-description">
			At Freedom in Christ Church, we believe in the joy of giving <a
				href={links.verse1}
				target="_blank"
				class="font-bold">(2 Corinthians 9:7)</a
			>. More than being a rule to follow, we give because God is our ultimate provider and gives us everything we need
			to live and do the good work He has called us to do
			<a href={links.verse2} target="_blank" class="font-bold">(2 Corinthians 9:8)</a>. We value the discipline of
			giving our tithes and offerings because it reflects the same faithful, generous and gracious heart of our Father.
		</p>
		<img src={links.pic1} alt="FCC Give" class="h-auto w-full" />
	</div>

	<p
		class="unstyled mx-auto my-8 text-center text-xl leading-relaxed md:max-w-4xl"
		data-testid="give-etransfer-details"
	>
		You can give online by sending an e-transfer to{' '}
		<a href={links.etransfer} class="font-bold">fcc.fcac@gmail.com</a>, or by filling out one of our offering envelopes
		at our Sunday services located at
		<a href={links.googleMaps} target="_blank" class="font-bold"> 5225 Orbitor Drive Unit 3, Mississauga, ON. </a>
	</p>
</FccLayout>
