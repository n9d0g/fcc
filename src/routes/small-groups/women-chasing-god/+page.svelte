<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import { breadcrumbs, links } from '$lib/constants'

	export let data

	const breadcrumb = [breadcrumbs.home, breadcrumbs.smallgroups, breadcrumbs.smallgroups.womenChasingGod]
</script>

<FccLayout {breadcrumb} headData={data.headData}>
	<PageTitle text="FCC Women Chasing God Small Group." />

	<div class="flex flex-col gap-4">
		<div class="w-fit">
			<a href={links.wcgZoom} target="_blank" class="btn variant-filled"> Join Zoom Meeting </a>
		</div>
		<p>Meeting ID: <span class="font-bold"> 849 4940 9295 </span></p>
	</div>

	<div class="my-8">
		<p>Every Saturday:</p>
		<p>Toronto/Connecticut: 9:30AM</p>
		<p>UK: 2:30PM</p>
		<p>Manila: 9:30PM</p>
	</div>
</FccLayout>
