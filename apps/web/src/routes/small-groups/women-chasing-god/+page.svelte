<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'

	export let data
	const { title, breadcrumb, headData, links } = data
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<div class="flex flex-col gap-4">
		<div class="w-fit">
			<a href={links.wcgZoom} target="_blank" class="variant-filled btn">
				Join Zoom Meeting
			</a>
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
