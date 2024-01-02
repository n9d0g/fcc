<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import LandingPageGrid from '$lib/components/LandingPageGrid.svelte'

	export let data
	const { title, breadcrumb, headData } = data
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<div>
		<p class="mb-4">
			Hello, FCC Sunday School teachers! <br /> We have our first teacher
			training video available for you now! <br /> Please set aside time to
			watch BEFORE your assigned first scheduled Sunday teaching. <br /> Click
			this link to start:
			<a href="http://tinyurl.com/FCCSStraining1" class="anchor">
				http://tinyurl.com/FCCSStraining1
			</a>
		</p>
		<div class="mb-4">
			<p>After watching the workshop, pls click this link for feedback:</p>
			<a href="http://tinyurl.com/SStraining1feedbackform" class="anchor">
				http://tinyurl.com/SStraining1feedbackform
			</a>
		</div>
		<p><span class="font-bold">THANK YOU</span> for your ministry!</p>
	</div>
	<LandingPageGrid items={data.landingPageItems} />
</FccLayout>
