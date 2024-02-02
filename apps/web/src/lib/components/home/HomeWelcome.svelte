<script lang="ts">
	export let links: any
</script>

<section
	class="container mx-auto flex h-fit flex-col justify-center gap-8 px-4 md:my-64"
>
	<div class=" w-full mt-10 text-white rounded-lg bg-slate-800 p-8">
		<h2
			class="h2 mb-6 text-center text-4xl font-bold"
			data-testid="welcome-header"
		>
			Come join us!
		</h2>
		<p
			class="mx-auto text-center text-2xl tracking-widest md:max-w-[50rem]"
			data-testid="welcome-subheader"
		>
			We welcome you to our worship services:
		</p>
		<ul class="mt-6 rounded-lg border p-4 text-center text-2xl">
			<li>
				every Sunday morning at 10:30am! Services will be both online (Zoom) and
				in-person.
			</li>
			<li>Click the button below to join via Zoom, or join us in-person at</li>
			<li>
				<i class="fa-sharp fa-regular fa-map"></i>
				<br />
				<a href={links.googleMaps} target="_blank" class="anchor font-bold">
					5225 Orbitor Drive Unit 3, Mississauga, ON.
				</a>
			</li>
		</ul>
	</div>
	<div class="flex justify-center">
		<a
			class="bg-surface-200-700-token btn btn-lg border text-black dark:text-white"
			href={links.zoom}
			target="_blank"
			data-testid="welcome-zoom">Zoom Link</a
		>
	</div>
</section>
