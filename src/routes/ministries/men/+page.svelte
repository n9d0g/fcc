<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import { breadcrumbs } from '$lib/constants'
	import cover from '$lib/assets/ministries/men/men-img1.jpg'
	import vid1 from '$lib/assets/ministries/men/men-vid1.mp4'
	import vid2 from '$lib/assets/ministries/men/men-vid2.mp4'

	export let data

	const breadcrumb = [breadcrumbs.home, breadcrumbs.ministries, breadcrumbs.ministriesMen]
</script>

<FccLayout {breadcrumb} headData={data.headData}>
	<PageTitle text="FCC Men's Ministry." />
	<p class="unstyled my-8 text-center text-xl leading-relaxed">
		Our various activities, events and meetings are all geared towards helping MEN of all ages come together for times
		of fun, fellowship and teaching with the goals of becoming the spiritual leaders God has designed them to be.
		<br />
		For more information of these and other upcoming events with the Men's Ministry at the Church, please contact Bro June
		Bermudo!
	</p>
	<!-- svelte-ignore a11y-img-redundant-alt -->
	<img src={cover} alt="Men's Ministry Cover Photo" class="h-auto w-full" />
	<div class="my-8 grid grid-cols-2 justify-center align-middle">
		<div>
			<!-- svelte-ignore a11y-media-has-caption -->
			<video controls class="flex align-middle">
				<source src={vid1} />
			</video>
		</div>
		<div class="flex align-middle">
			<!-- svelte-ignore a11y-media-has-caption -->
			<video controls>
				<source src={vid2} />
			</video>
		</div>
	</div>
</FccLayout>
