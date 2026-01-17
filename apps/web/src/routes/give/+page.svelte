<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import Icon from '@iconify/svelte'

	// Svelte 5 props
	let { data }: { data: any } = $props()
	const { title, breadcrumb, headData, links } = data
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<!-- Hero Section -->
	<section class="my-12">
		<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
			<div class="order-2 lg:order-1">
				<p
					class="dark:text-surface-300 mb-6 text-lg leading-relaxed text-gray-600"
					data-testid="give-description"
				>
					At Freedom in Christ Church, we believe in the joy of giving.
					<a href={links.verse1} target="_blank" class="anchor font-semibold"
						>(2 Corinthians 9:7)</a
					>
				</p>
				<p
					class="dark:text-surface-300 mb-6 text-lg leading-relaxed text-gray-600"
				>
					More than being a rule to follow, we give because God is our ultimate
					provider and gives us everything we need to live and do the good work
					He has called us to do.
					<a href={links.verse2} target="_blank" class="anchor font-semibold"
						>(2 Corinthians 9:8)</a
					>
				</p>
				<p class="dark:text-surface-300 text-lg leading-relaxed text-gray-600">
					We value the discipline of giving our tithes and offerings because it
					reflects the same faithful, generous and gracious heart of our Father.
				</p>
			</div>
			<div class="order-1 lg:order-2">
				<img
					src={links.pic1}
					alt="FCC Give"
					class="h-auto w-full rounded-2xl shadow-lg"
				/>
			</div>
		</div>
	</section>

	<!-- Giving Options -->
	<section class="my-16">
		<h3 class="mb-8 text-center text-2xl font-bold">Ways to Give</h3>
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			<!-- E-Transfer Card -->
			<div class="card p-8 transition-all hover:shadow-xl">
				<div>
					<div
						class="bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400 mb-4 flex h-14 w-14 items-center justify-center rounded-full"
					>
						<Icon icon="lucide:smartphone" class="h-7 w-7" />
					</div>
					<h4 class="mb-2 text-xl font-bold">Online E-Transfer</h4>
					<p class="dark:text-surface-300 mb-4 text-gray-600">
						Send your offering directly through your bank's e-transfer service.
					</p>
					<a
						href={links.etransfer}
						class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 inline-flex items-center gap-2 text-lg font-semibold transition-colors"
					>
						<Icon icon="lucide:mail" class="h-5 w-5" />
						fcc.fcac@gmail.com
					</a>
				</div>
			</div>

			<!-- In-Person Card -->
			<div class="card p-8 transition-all hover:shadow-xl">
				<div>
					<div
						class="bg-secondary-100 text-secondary-600 dark:bg-secondary-900/50 dark:text-secondary-400 mb-4 flex h-14 w-14 items-center justify-center rounded-full"
					>
						<Icon icon="lucide:church" class="h-7 w-7" />
					</div>
					<h4 class="mb-2 text-xl font-bold">In-Person Offering</h4>
					<p class="dark:text-surface-300 mb-4 text-gray-600">
						Fill out an offering envelope at our weekly Sunday services.
					</p>
					<a
						href={links.googleMaps}
						target="_blank"
						class="text-secondary-600 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-300 inline-flex items-center gap-2 text-lg font-semibold transition-colors"
					>
						<Icon icon="lucide:map-pin" class="h-5 w-5" />
						5225 Orbitor Drive Unit 3, Mississauga
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- Scripture Quote -->
	<section class="my-16">
		<div
			class="from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl bg-gradient-to-br p-8 text-center md:p-12"
		>
			<Icon
				icon="lucide:quote"
				class="text-primary-400 dark:text-primary-500 mx-auto mb-4 h-10 w-10"
			/>
			<blockquote
				class="dark:text-surface-200 text-xl leading-relaxed text-gray-700 italic md:text-2xl"
			>
				"Each of you should give what you have decided in your heart to give,
				not reluctantly or under compulsion, for God loves a cheerful giver."
			</blockquote>
			<cite
				class="text-primary-600 dark:text-primary-400 mt-4 block font-semibold"
			>
				— 2 Corinthians 9:7 (NIV)
			</cite>
		</div>
	</section>
</FccLayout>
