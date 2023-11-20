<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import cover from '$lib/assets/ministries/men/men-img1.avif'
	import img2 from '$lib/assets/ministries/men/men-img2.jpg'
	import img3 from '$lib/assets/ministries/men/men-img3.jpg'
	import img4 from '$lib/assets/ministries/men/men-img4.jpg'
	import vid1 from '$lib/assets/ministries/men/men-vid1.mp4'
	import vid2 from '$lib/assets/ministries/men/men-vid2.mp4'
	import vid3 from '$lib/assets/ministries/men/men-vid3.mp4'

	export let data

	const title = data.title
	const breadcrumb = data.breadcrumb
	const headData = data.headData
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<p class="my-8 text-xl leading-relaxed lg:w-10/12">
		Our various activities, events and meetings are all geared towards helping
		MEN of all ages come together for times of fun, fellowship and teaching with
		the goals of becoming the spiritual leaders God has designed them to be.
		<br />
		<br />
		For more information of these and other upcoming events with the Men's Ministry
		at the Church, please contact Bro June Bermudo!
	</p>
	<!-- svelte-ignore a11y-img-redundant-alt -->
	<img src={cover} alt="Men's Ministry Cover Photo" class="h-auto w-full" />
	<div
		class="my-8 grid grid-cols-1 justify-center gap-8 align-middle md:grid-cols-3"
	>
		<div class="flex justify-center">
			<!-- svelte-ignore a11y-media-has-caption -->
			<video controls class="flex align-middle">
				<source src={vid1} />
			</video>
		</div>
		<div class="flex justify-center align-middle md:col-span-2">
			<!-- svelte-ignore a11y-media-has-caption -->
			<video controls>
				<source src={vid2} />
			</video>
		</div>
		<div class="flex items-center md:col-span-2">
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<img src={img2} alt="Men's Ministry Photo 2" class="w-full" />
		</div>
		<div class="flex justify-center align-middle">
			<!-- svelte-ignore a11y-media-has-caption -->
			<video controls>
				<source src={vid3} />
			</video>
		</div>
		<div class="flex items-center">
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<img src={img3} alt="Men's Ministry Photo 3" class="w-full" />
		</div>
		<div class="flex items-center md:col-span-2">
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<img src={img4} alt="Men's Ministry Photo 3" class="w-full" />
		</div>
	</div>
</FccLayout>
