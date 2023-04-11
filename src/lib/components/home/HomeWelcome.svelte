<script lang="ts">
	export let links: any
</script>

<section class="container mx-auto my-32 flex h-fit flex-col justify-center gap-8 px-4 md:my-64">
	<h2 class="text-center text-2xl font-bold">Come join us!</h2>
	<p class="unstyled mx-auto text-center text-xl md:max-w-[50rem]">
		We welcome you to our worship services every Sunday morning at 10:30am! Services will be both online (Zoom) and
		in-person. Click the button below to join via Zoom, or join us in-person at
		<a href={links.googleMaps} target="_blank" class="font-bold"> 5225 Orbitor Drive Unit 3, Mississauga, ON. </a>
	</p>
	<div class="flex justify-center">
		<a class="btn variant-filled" href={links.zoom} target="_blank">Zoom Link</a>
	</div>
</section>
