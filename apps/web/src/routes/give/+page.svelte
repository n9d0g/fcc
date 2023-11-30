<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'

	export let data
	const { title, breadcrumb, headData, links } = data
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<section>
		<div class="my-8 grid grid-cols-1 items-center gap-8 md:grid-cols-2">
			<p
				class="my-8 text-center text-xl leading-relaxed"
				data-testid="give-description"
			>
				At Freedom in Christ Church, we believe in the joy of giving <a
					href={links.verse1}
					target="_blank"
					class="font-bold">(2 Corinthians 9:7)</a
				>. More than being a rule to follow, we give because God is our ultimate
				provider and gives us everything we need to live and do the good work He
				has called us to do
				<a href={links.verse2} target="_blank" class="anchor font-bold"
					>(2 Corinthians 9:8)</a
				>. We value the discipline of giving our tithes and offerings because it
				reflects the same faithful, generous and gracious heart of our Father.
			</p>
			<img src={links.pic1} alt="FCC Give" class="h-auto w-full" />
		</div>
	</section>

	<section>
		<div class="my-8 grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2">
			<div class="card flex flex-col items-center justify-center p-4 text-2xl">
				<p class="text-center">Online e-transfer:</p>
				<div>
					<a href={links.etransfer} class="anchor font-bold"
						>fcc.fcac@gmail.com</a
					>
				</div>
			</div>
			<div class="card flex flex-col items-center justify-center p-4 text-2xl">
				<p class="flex flex-col py-4 text-center">
					Filling out an offering envelope at our weekly services located at:
					<a href={links.googleMaps} target="_blank" class="anchor font-bold">
						5225 Orbitor Drive Unit 3, Mississauga, ON.
					</a>
				</p>
			</div>
		</div>
	</section>
</FccLayout>
