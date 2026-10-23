<script lang="ts">
	import FccLayout from '#lib/components/FccLayout.svelte'
	import Icon from '@iconify/svelte'
	import community from '#lib/assets/community/men-ministry.jpg'

	// Svelte 5 props
	let { data }: { data: any } = $props()
	let links = $derived(data.links)
</script>

<FccLayout heading="Generosity is a form of Worship.">
	<!-- Intro -->
	<section class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
		<div class="order-2 space-y-5 lg:order-1">
			<p class="lede" data-testid="give-description">
				At Freedom in Christ Church, we believe in the joy of giving.
				<a href={links.verse1} target="_blank" class="anchor whitespace-nowrap"
					>(2 Corinthians 9:7)</a
				>
			</p>
			<p class="lede">
				More than being a rule to follow, we give because God is our ultimate
				provider and gives us everything we need to live and do the good work He
				has called us to do.
				<a href={links.verse2} target="_blank" class="anchor whitespace-nowrap"
					>(2 Corinthians 9:8)</a
				>
			</p>
			<p class="lede">
				We value the discipline of giving our tithes and offerings because it
				reflects the same faithful, generous and gracious heart of our Father.
			</p>
		</div>
		<figure class="relative isolate order-1 lg:order-2">
			<img
				src={community}
				alt="Members of FCC's men's ministry gathered together at a summer fellowship"
				class="aspect-4/3 w-full rounded-3xl object-cover shadow-lift"
			/>
			<div
				class="absolute -bottom-3 -left-3 -z-10 size-full rounded-3xl bg-secondary-100"
				aria-hidden="true"
			></div>
		</figure>
	</section>

	<!-- Giving Options -->
	<section class="mt-20">
		<p class="eyebrow">Ways to give</p>
		<h2 class="h2 mt-3">Two simple ways to give</h2>
		<div class="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
			<div class="card p-8">
				<span class="icon-chip">
					<Icon icon="lucide:smartphone" class="size-5" />
				</span>
				<h3 class="h3 mt-5">Online e-Transfer</h3>
				<p class="mt-2 text-muted">
					Send your offering directly through your bank's e-transfer service.
				</p>
				<a href={links.etransfer} class="btn btn-primary mt-6">
					<Icon icon="lucide:mail" class="size-4" />
					fcc.fcac@gmail.com
				</a>
			</div>

			<div class="card p-8">
				<span class="icon-chip">
					<Icon icon="lucide:church" class="size-5" />
				</span>
				<h3 class="h3 mt-5">In-person offering</h3>
				<p class="mt-2 text-muted">
					Fill out an offering envelope at our weekly Sunday services.
				</p>
				<a
					href={links.googleMaps}
					target="_blank"
					rel="noopener noreferrer"
					class="btn btn-outline mt-6 whitespace-normal"
				>
					<Icon icon="lucide:map-pin" class="size-4 shrink-0" />
					5225 Orbitor Drive Unit 3, Mississauga
				</a>
			</div>
		</div>
	</section>

	<!-- Scripture Quote -->
	<section class="mt-20">
		<figure
			class="relative isolate overflow-hidden rounded-3xl bg-primary-800 px-8 py-14 text-center md:px-16 md:py-20"
		>
			<Icon
				icon="lucide:quote"
				class="absolute top-6 left-6 -z-10 size-28 text-primary-700"
			/>
			<blockquote
				class="mx-auto max-w-3xl font-display text-2xl leading-snug text-white md:text-3xl"
			>
				"Each of you should give what you have decided in your heart to give, not
				reluctantly or under compulsion, for God loves a cheerful giver."
			</blockquote>
			<figcaption class="eyebrow mt-6 text-secondary-300">
				2 Corinthians 9:7 (NIV)
			</figcaption>
		</figure>
	</section>
</FccLayout>
