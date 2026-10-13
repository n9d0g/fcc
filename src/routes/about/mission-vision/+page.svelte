<script lang="ts">
	import FccLayout from '#lib/components/FccLayout.svelte'
	import Icon from '@iconify/svelte'
	import { church } from '#lib/config/index.js'
	import bibleStudy from '#lib/assets/community/bible-study.jpg'
	import sundayService from '#lib/assets/community/sunday-service.jpg'
	import sundaySchool from '#lib/assets/ministries/sunday-school/sunday-school-prayer.jpg'
	import volunteers from '#lib/assets/events/2026/thanksgiving/dessert-hosts.jpg'

	// Svelte 5 props
	let { data }: { data: any } = $props()
	let title = $derived(data.title)
	let headData = $derived(data.headData)
	let breadcrumb = $derived(data.breadcrumb)
	let missionVision = $derived(data.missionVision)

	// Each phrase of the mission and vision statements, unpacked. Verses are NIV.
	const missionPillars = [
		{
			icon: 'lucide:door-open',
			title: 'Introduce Christ',
			text: 'We want everyone we meet to know Jesus, not just know about Him. Every ministry is an open door for someone to meet Him for the first time.',
			verse: 'Therefore go and make disciples of all nations…',
			reference: 'Matthew 28:19',
		},
		{
			icon: 'lucide:heart-handshake',
			title: 'Represent Christ',
			text: 'How we love our neighbours, families and co-workers should look like Jesus. We aim to carry His character into every part of everyday life.',
			verse:
				"We are therefore Christ's ambassadors, as though God were making his appeal through us.",
			reference: '2 Corinthians 5:20',
		},
		{
			icon: 'lucide:sprout',
			title: 'Nurturing',
			text: 'Faith grows over a lifetime. We walk alongside people at every stage, from first questions to mature, serving disciples.',
			verse:
				'…rooted and built up in him, strengthened in the faith as you were taught, and overflowing with thankfulness.',
			reference: 'Colossians 2:7',
		},
		{
			icon: 'lucide:users-round',
			title: 'Small group-driven',
			text: "Much of church life happens in small circles, in homes and on Zoom, where people study the Bible, pray and genuinely know each other.",
			verse:
				"They devoted themselves to the apostles' teaching and to fellowship, to the breaking of bread and to prayer.",
			reference: 'Acts 2:42',
		},
	]

	const visionPillars = [
		{
			icon: 'lucide:cross',
			title: 'Christ-centred',
			text: 'Jesus is the head of His church. Our worship, teaching and decisions start with Him.',
			verse: 'And he is the head of the body, the church…',
			reference: 'Colossians 1:18',
		},
		{
			icon: 'lucide:flame',
			title: 'Holy Spirit-led',
			text: "We depend on the Spirit's guidance and power, in prayer, in worship and in how we serve.",
			verse: 'Since we live by the Spirit, let us keep in step with the Spirit.',
			reference: 'Galatians 5:25',
		},
		{
			icon: 'lucide:link',
			title: 'Strong relationships',
			text: "We want to be a family, not an audience: people who know, encourage and care for one another through life's seasons.",
			verse: 'By this everyone will know that you are my disciples, if you love one another.',
			reference: 'John 13:35',
		},
		{
			icon: 'lucide:trees',
			title: 'Healthy, reproducing churches',
			text: 'Healthy things grow and multiply. We raise up leaders who will start new groups, ministries and churches.',
			verse:
				'And the things you have heard me say… entrust to reliable people who will also be qualified to teach others.',
			reference: '2 Timothy 2:2',
		},
	]

	const livingItOut = [
		{
			title: 'Small groups',
			text: 'Bible study, prayer and friendship throughout the week, across Mississauga, Brampton and online.',
			href: '/small-groups',
			cta: 'Find a group',
			img: bibleStudy,
			alt: 'An FCC small group studying the Bible together in a home',
		},
		{
			title: 'Sunday worship',
			text: 'We gather every Sunday at 10:30 AM, in person and on Zoom, to worship and hear God’s Word together.',
			href: '/sermons',
			cta: 'Watch a sermon',
			img: sundayService,
			alt: 'The FCC congregation seated for a Sunday worship service',
		},
		{
			title: 'Ministries for every age',
			text: "From Sunday school and youth to young adults, men's and women's ministries, there's a place for everyone.",
			href: '/ministries',
			cta: 'Explore ministries',
			img: sundaySchool,
			alt: 'Children praying together with their teacher in Sunday school',
		},
		{
			title: 'Serving together',
			text: 'FCC is volunteer-led. Every Sunday is made possible by members using their gifts to serve one another.',
			href: '/ministries/sunday-ministries',
			cta: 'See how to serve',
			img: volunteers,
			alt: 'FCC volunteers behind the dessert table they prepared for Thanksgiving',
		},
	]
</script>

{#snippet pillar(p: (typeof missionPillars)[number])}
	<li class="card flex h-full flex-col gap-4 p-6">
		<span class="icon-chip"><Icon icon={p.icon} class="size-5" /></span>
		<h3 class="h4">{p.title}</h3>
		<p class="text-muted flex-1">{p.text}</p>
		<blockquote class="border-l-2 border-secondary-300 pl-4 text-sm">
			<p class="italic">“{p.verse}”</p>
			<cite class="text-muted mt-1 block text-xs not-italic">{p.reference}</cite>
		</blockquote>
	</li>
{/snippet}

<FccLayout
	{title}
	{breadcrumb}
	{headData}
	image={bibleStudy}
	imageAlt="An FCC small group studying the Bible together in a home"
	intro="Everything we do flows from two statements: why we exist, and where we believe God is leading us."
>
	<div class="space-y-20 md:space-y-28">
		<!-- The statements themselves -->
		<div class="grid gap-6 md:grid-cols-2">
			<div class="relative isolate overflow-hidden rounded-3xl bg-primary-800 p-8 md:p-12">
				<Icon
					icon="lucide:target"
					class="absolute -right-6 -bottom-6 -z-10 size-48 text-primary-700"
				/>
				<p class="eyebrow text-secondary-300">Our mission · Why we exist</p>
				<p class="mt-5 font-display text-2xl leading-snug text-white md:text-3xl">
					{missionVision.mission}
				</p>
			</div>
			<div
				class="relative isolate overflow-hidden rounded-3xl border border-secondary-200 bg-secondary-50 p-8 md:p-12"
			>
				<Icon
					icon="lucide:eye"
					class="absolute -right-6 -bottom-6 -z-10 size-48 text-secondary-100"
				/>
				<p class="eyebrow">Our vision · Where we're going</p>
				<p class="mt-5 font-display text-2xl leading-snug text-ink md:text-3xl">
					{missionVision.vision}
				</p>
			</div>
		</div>

		<!-- Mission, unpacked -->
		<section aria-labelledby="mission-unpacked">
			<div class="max-w-2xl">
				<p class="eyebrow">Our mission, unpacked</p>
				<h2 id="mission-unpacked" class="h2 mt-3">What we're here to do</h2>
				<p class="lede mt-4">
					Our mission is short, but every phrase matters. Here's what it means for
					the way we live as a church.
				</p>
			</div>
			<ul class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{#each missionPillars as p (p.title)}
					{@render pillar(p)}
				{/each}
			</ul>
		</section>

		<!-- Vision, unpacked -->
		<section aria-labelledby="vision-unpacked">
			<div class="max-w-2xl">
				<p class="eyebrow">Our vision, unpacked</p>
				<h2 id="vision-unpacked" class="h2 mt-3">The church we're becoming</h2>
				<p class="lede mt-4">
					Our vision describes the kind of community we're praying and working
					toward.
				</p>
			</div>
			<ul class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{#each visionPillars as p (p.title)}
					{@render pillar(p)}
				{/each}
			</ul>
		</section>

		<!-- Where it happens -->
		<section aria-labelledby="living-it-out">
			<div class="max-w-2xl">
				<p class="eyebrow">Living it out</p>
				<h2 id="living-it-out" class="h2 mt-3">Where the mission happens</h2>
				<p class="lede mt-4">
					Our mission isn't just words on a page. Here's where you'll see it at
					Freedom in Christ Church each week.
				</p>
			</div>
			<ul class="mt-10 grid gap-6 md:grid-cols-2">
				{#each livingItOut as item (item.title)}
					<li class="card group relative flex flex-col overflow-hidden sm:flex-row">
						<img
							src={item.img}
							alt={item.alt}
							class="aspect-video w-full object-cover sm:aspect-auto sm:w-2/5"
							loading="lazy"
						/>
						<div class="flex flex-1 flex-col gap-3 p-6">
							<h3 class="h4">{item.title}</h3>
							<p class="text-muted flex-1 text-sm">{item.text}</p>
							<a
								href={item.href}
								class="anchor inline-flex items-center gap-1.5 text-sm font-semibold after:absolute after:inset-0"
								data-sveltekit-preload-data="hover"
							>
								{item.cta}
								<Icon
									icon="lucide:arrow-right"
									class="size-4 transition group-hover:translate-x-0.5"
								/>
							</a>
						</div>
					</li>
				{/each}
			</ul>
		</section>

		<!-- Rooted in -->
		<section
			class="grid items-center gap-8 rounded-3xl border border-line bg-surface-100/70 p-8 md:grid-cols-5 md:p-12"
			aria-labelledby="rooted-in"
		>
			<div class="md:col-span-3">
				<p class="eyebrow">Rooted in Scripture</p>
				<h2 id="rooted-in" class="h3 mt-3">Built on what we believe</h2>
				<p class="text-muted mt-4">
					Our mission and vision grow out of our statement of faith and the core
					values we share as an Alliance church, starting with the glory of God,
					the authority of the Bible and a life centred on Christ.
				</p>
			</div>
			<div class="flex flex-col gap-3 md:col-span-2 md:items-end">
				<a href="/about/beliefs" class="btn btn-primary w-full md:w-auto">
					<Icon icon="lucide:book-open" class="size-4" />
					Read our beliefs
				</a>
				<a href="/about/leadership" class="btn btn-outline w-full md:w-auto">
					<Icon icon="lucide:users" class="size-4" />
					Meet our leaders
				</a>
			</div>
		</section>

		<!-- Invitation -->
		<section
			class="relative isolate overflow-hidden rounded-3xl bg-primary-900 p-8 text-center text-white md:p-16"
			aria-labelledby="come-and-see"
		>
			<Icon
				icon="lucide:heart-handshake"
				class="absolute -top-10 -left-10 -z-10 size-56 text-primary-800"
			/>
			<p class="eyebrow text-secondary-300">Come and see</p>
			<h2 id="come-and-see" class="h2 mx-auto mt-3 max-w-2xl text-white">
				Be part of what God is doing here
			</h2>
			<p class="mx-auto mt-4 max-w-xl text-primary-100">
				Join us any Sunday at 10:30 AM at {church.address.street},
				{church.address.city}, or online on Zoom. Come as you are.
			</p>
			<div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
				<a href="/contact" class="btn btn-lg bg-white text-primary-900 hover:bg-primary-50">
					Plan your visit
				</a>
				<a
					href="/small-groups"
					class="btn btn-lg border border-white/40 text-white hover:bg-white/10"
				>
					Find a small group
				</a>
			</div>
		</section>
	</div>
</FccLayout>
