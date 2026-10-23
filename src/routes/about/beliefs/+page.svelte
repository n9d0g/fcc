<script lang="ts">
	import { goto } from '$app/navigation'
	import FccLayout from '#lib/components/FccLayout.svelte'
	import Icon from '@iconify/svelte'

	// Svelte 5 props
	let { data }: { data: any } = $props()
	let coreValues = $derived(data.coreValues)
	let statementsOfFaith = $derived(data.statementsOfFaith)
	let fourfoldGospel = $derived(data.fourfoldGospel)
	let history = $derived(data.history)

	const alliancePoints = [
		{
			icon: 'lucide:book-open',
			title: 'A shared statement of faith',
			text: 'We hold the same summary of biblical truth as Alliance churches across Canada.',
		},
		{
			icon: 'lucide:globe',
			title: 'A heart for missions',
			text: 'From its beginning, the Alliance has existed to make Christ known, next door and around the world.',
		},
		{
			icon: 'lucide:handshake',
			title: 'Partnership and accountability',
			text: "We're not on our own. We're joined with like-minded churches for encouragement, accountability and mission.",
		},
	]

	// Accordion state
	let openCoreValue = $state<number | null>(0)
	let openStatement = $state<number | null>(0)

	const toggleCoreValue = (index: number) => {
		openCoreValue = openCoreValue === index ? null : index
	}

	const toggleStatement = (index: number) => {
		openStatement = openStatement === index ? null : index
	}

	const handleComplete = () => {
		goto('/about')
	}
</script>

{#snippet accordion(
	items: Array<{ title: string; text: string }>,
	open: number | null,
	toggle: (_index: number) => void
)}
	<div class="card divide-y divide-line overflow-hidden">
		{#each items as item, index}
			<div>
				<button
					onclick={() => toggle(index)}
					aria-expanded={open === index}
					class="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-paper"
				>
					<span class="font-semibold">{item.title}</span>
					<span
						class="flex size-8 shrink-0 items-center justify-center rounded-full transition {open ===
						index
							? 'rotate-180 bg-primary-700 text-white'
							: 'bg-surface-100'}"
					>
						<Icon icon="lucide:chevron-down" class="size-4" />
					</span>
				</button>
				{#if open === index}
					<div class="px-6 pb-6">
						<p class="text-lg leading-relaxed text-muted">{item.text}</p>
					</div>
				{/if}
			</div>
		{/each}
	</div>
{/snippet}

<FccLayout
	heading="Our Beliefs."
	intro="The convictions that shape how we worship, serve and live together."
>
	<div class="space-y-20 md:space-y-28">
		<!-- An Alliance church -->
		<section
			class="grid gap-10 lg:grid-cols-12 lg:gap-14"
			aria-labelledby="alliance-church"
		>
			<div class="lg:col-span-6">
				<p class="eyebrow">Our family of churches</p>
				<h2 id="alliance-church" class="h2 mt-3">We're an Alliance church</h2>
				<div class="mt-5 space-y-4 text-lg leading-relaxed text-muted">
					<p>
						Freedom in Christ Church belongs to The Christian and Missionary
						Alliance, a family of churches with roots right here in Canada. Its
						founder, A. B. Simpson, grew up in Ontario and was ordained a
						Presbyterian minister in Hamilton before starting the movement that
						became the Alliance.
					</p>
					<p>
						Being part of the Alliance shapes who we are. It gives us a clear
						centre, Jesus Christ, and a clear purpose: to know Him fully and to
						make Him known. We're a volunteer-led church, but we never serve
						alone.
					</p>
				</div>
			</div>
			<ul class="grid gap-4 lg:col-span-6">
				{#each alliancePoints as point (point.title)}
					<li class="card flex gap-4 p-5">
						<span class="icon-chip shrink-0">
							<Icon icon={point.icon} class="size-5" />
						</span>
						<div>
							<h3 class="font-semibold">{point.title}</h3>
							<p class="text-muted mt-1 text-sm">{point.text}</p>
						</div>
					</li>
				{/each}
			</ul>
		</section>

		<!-- Fourfold Gospel -->
		<section aria-labelledby="fourfold-gospel">
			<div class="max-w-2xl">
				<p class="eyebrow">At the heart of the Alliance</p>
				<h2 id="fourfold-gospel" class="h2 mt-3">The Fourfold Gospel</h2>
				<p class="lede mt-4">
					A. B. Simpson summed up the Gospel in four words about Jesus. More than a
					century later, they're still at the centre of every Alliance church,
					including ours.
				</p>
			</div>
			<ul class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{#each fourfoldGospel as item (item.title)}
					<li class="card flex h-full flex-col gap-4 p-6">
						<span class="icon-chip"><Icon icon={item.icon} class="size-5" /></span>
						<h3 class="h4">
							<span class="text-muted block text-sm font-normal">Jesus is our</span>
							{item.title}
						</h3>
						<p class="text-muted flex-1">{item.text}</p>
						<p class="text-xs font-medium text-secondary-700">{item.reference}</p>
					</li>
				{/each}
			</ul>
		</section>

		<!-- Core values and statement of faith -->
		<div class="grid gap-14 lg:grid-cols-12">
			<div class="lg:col-span-4">
				<div class="lg:sticky lg:top-28">
					<p class="eyebrow">What we believe</p>
					<p class="lede mt-3">
						Our core values describe the kind of church we want to be. Our
						statement of faith summarizes the truths we hold in common with Alliance
						churches across Canada.
					</p>
					<button onclick={handleComplete} class="btn btn-outline mt-6">
						<Icon icon="lucide:arrow-left" class="size-4" />
						Back to About
					</button>
				</div>
			</div>

			<div class="space-y-14 lg:col-span-8">
				<section>
					<h2 class="h2 mb-6">Our Core Values</h2>
					{@render accordion(coreValues, openCoreValue, toggleCoreValue)}
				</section>

				<section>
					<h2 class="h2 mb-6">Statement of Faith</h2>
					{@render accordion(statementsOfFaith, openStatement, toggleStatement)}
				</section>
			</div>
		</div>

		<!-- History -->
		<section aria-labelledby="alliance-history">
			<div class="max-w-2xl">
				<p class="eyebrow">Our roots</p>
				<h2 id="alliance-history" class="h2 mt-3">How the Alliance began</h2>
				<p class="lede mt-4">
					The Alliance didn't start as a denomination. It started as a movement of
					ordinary believers who wanted to know Jesus more deeply and to tell the
					world about Him.
				</p>
			</div>

			<ol class="relative mt-12 space-y-10 border-l-2 border-line pl-8 md:ml-4">
				{#each history as event (event.year)}
					<li class="relative">
						<span
							class="absolute top-1 -left-[2.6rem] size-4 rounded-full border-4 border-paper bg-secondary-500"
							aria-hidden="true"
						></span>
						<p class="font-display text-2xl font-semibold text-secondary-700">
							{event.year}
						</p>
						<h3 class="h4 mt-1">{event.title}</h3>
						<p class="text-muted mt-2 max-w-2xl leading-relaxed">{event.text}</p>
					</li>
				{/each}
			</ol>
		</section>

		<!-- Simpson quote and next steps -->
		<section
			class="relative isolate overflow-hidden rounded-3xl bg-primary-900 p-8 text-white md:p-16"
			aria-labelledby="beliefs-next"
		>
			<Icon
				icon="lucide:quote"
				class="absolute -top-6 -right-6 -z-10 size-56 text-primary-800"
			/>
			<figure class="max-w-3xl">
				<blockquote
					class="font-display text-2xl leading-snug text-white md:text-4xl"
				>
					“Once it was the blessing, now it is the Lord.”
				</blockquote>
				<figcaption class="mt-4 text-primary-200">
					A. B. Simpson, from his hymn <cite>Himself</cite>
				</figcaption>
			</figure>
			<p class="mt-8 max-w-2xl text-primary-100">
				That line captures the Alliance at its best: not chasing experiences, but
				Jesus Himself. We'd love for you to discover Him with us.
			</p>
			<h2 id="beliefs-next" class="sr-only">Next steps</h2>
			<div class="mt-8 flex flex-col gap-3 sm:flex-row">
				<a
					href="/about/mission-vision"
					class="btn btn-lg bg-white text-primary-900 hover:bg-primary-50"
				>
					Our mission &amp; vision
				</a>
				<a
					href="/contact"
					class="btn btn-lg border border-white/40 text-white hover:bg-white/10"
				>
					Plan your visit
				</a>
			</div>
		</section>
	</div>
</FccLayout>
