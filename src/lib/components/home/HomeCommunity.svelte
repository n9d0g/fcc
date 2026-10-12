<script lang="ts">
	import Icon from '@iconify/svelte'
	import bibleStudy from '#lib/assets/community/bible-study.jpg'
	import women from '#lib/assets/community/women-fellowship.jpg'
	import men from '#lib/assets/community/men-ministry.jpg'
	import youth from '#lib/assets/community/youth-retreat.jpg'
	import youngAdults from '#lib/assets/community/young-adults.jpg'

	const groups = [
		{
			title: 'Small Groups',
			blurb: 'Bible study and prayer in homes and on Zoom throughout the week.',
			href: '/small-groups',
			img: bibleStudy,
			alt: 'An FCC small group studying the Bible together in a home',
			feature: true,
		},
		{
			title: 'Women',
			href: '/ministries/women',
			img: women,
			alt: 'Women of FCC at a fellowship lunch',
		},
		{
			title: 'Men',
			href: '/ministries/men',
			img: men,
			alt: "FCC men's ministry at a summer gathering",
		},
		{
			title: 'Youth',
			href: '/ministries/youth',
			img: youth,
			alt: 'FCC youth on a fall outing',
		},
		{
			title: 'Young Adults',
			href: '/ministries/young-adults',
			img: youngAdults,
			alt: 'FCC young adults at an evening hangout',
		},
	]
</script>

<section class="section">
	<div class="wrap">
		<div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
			<div class="max-w-2xl">
				<p class="eyebrow">Life together</p>
				<h2 class="h2 mt-3">Faith grows best in community.</h2>
				<p class="lede mt-4">
					From Sunday mornings to living rooms across the GTA, there's a place for
					you to connect, serve and grow.
				</p>
			</div>
			<a href="/ministries" class="btn btn-outline shrink-0 self-start md:self-auto">
				All ministries
				<Icon icon="lucide:arrow-right" class="size-4" />
			</a>
		</div>

		<div
			class="mt-10 grid auto-rows-[13rem] grid-cols-2 gap-4 md:auto-rows-[15rem] lg:grid-cols-4"
		>
			{#each groups as group}
				<a
					href={group.href}
					class="group relative isolate overflow-hidden rounded-3xl bg-primary-900 shadow-soft {group.feature
						? 'col-span-2 row-span-2'
						: ''}"
					data-sveltekit-preload-data="hover"
				>
					<img
						src={group.img}
						alt={group.alt}
						loading="lazy"
						class="absolute inset-0 -z-10 size-full object-cover transition-transform duration-700 group-hover:scale-105"
					/>
					<div
						class="absolute inset-0 -z-10 bg-gradient-to-t from-primary-950/85 via-primary-950/20 to-transparent"
					></div>
					<div class="flex h-full flex-col justify-end p-5 md:p-6">
						<div class="flex items-end justify-between gap-3">
							<div>
								<h3
									class="font-display font-semibold text-white {group.feature
										? 'text-3xl'
										: 'text-xl'}"
								>
									{group.title}
								</h3>
								{#if group.blurb}
									<p class="mt-2 max-w-sm text-white/80">{group.blurb}</p>
								{/if}
							</div>
							<span
								class="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition group-hover:bg-white group-hover:text-primary-800"
							>
								<Icon icon="lucide:arrow-up-right" class="size-4" />
							</span>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>
