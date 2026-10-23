<script lang="ts">
	import { formatCmsDate } from '#lib/utils.js'
	import FccLayout from '#lib/components/FccLayout.svelte'
	import sundaySchool from '#lib/assets/ministries/sunday-school/sunday-school-class.jpg'
	import Icon from '@iconify/svelte'
	import PhotoGallery from '#lib/components/PhotoGallery.svelte'

	let { data }: { data: { tHeaders: string[]; tBody: unknown[]; sundaySchoolLinks: Array<{ section: string }>; gallery: { photos: unknown[] } } } = $props()

	let tHeaders = $derived(data.tHeaders)
	let tBody = $derived(data.tBody)
	let sundaySchoolLinks = $derived(data.sundaySchoolLinks)
	let gallery = $derived(data.gallery)

	let juniorLinks = $derived(
		sundaySchoolLinks?.filter((link) => link.section === 'junior') || []
	)
	let primaryLinks = $derived(
		sundaySchoolLinks?.filter((link) => link.section === 'primary') || []
	)
	const ageGroups = [
		{ label: 'Crawlers/Toddlers', sublabel: 'Ages 1-5' },
		{ label: 'Primary', sublabel: 'Grades 1-3' },
		{ label: 'Junior', sublabel: 'Grades 4-6' },
	]

	const features = [
		{
			emoji: '📖',
			title: 'Interactive Bible Lessons',
			description:
				"Our Sunday School prides itself on providing interactive and age-appropriate Bible lessons that captivate young hearts and minds. From the earliest stages of development to the pre-adolescent years, we believe in fostering a love for God's Word that will last a lifetime.",
		},
		{
			emoji: '🎨',
			title: 'Multifaceted Activities',
			description:
				"At our Sunday School, it's not just about reading and listening; it's about experiencing the joy of worship and learning in a variety of ways. We sing uplifting songs, play engaging games, and unleash creativity through exciting crafts.",
		},
		{
			emoji: '🙏',
			title: 'Empowering Worship',
			description:
				'We understand the importance of nurturing a spirit of worship from a young age. Through age-appropriate activities, we aim to instill a deep sense of reverence and love for God in our young learners.',
		},
		{
			emoji: '💛',
			title: 'Building a Foundation of Love',
			description:
				"Our Sunday School is not just a place for learning; it's a community where children are encouraged to love and support one another. We teach essential values such as kindness, compassion, and friendship.",
		},
		{
			emoji: '👨‍🏫',
			title: 'Passionate Teacher Volunteers',
			description:
				'Our team of dedicated teacher volunteers is passionate about creating a nurturing and educational environment for your children. Each member is committed to helping your child grow spiritually, emotionally, and socially.',
		},
		{
			emoji: '🕐',
			title: 'Convenient Timing',
			description:
				'Join us every Sunday during the sermon time from 11 am to 12 noon. We believe in providing a space for your child to connect with God while you engage in the main worship service.',
		},
	]

	let additionalLinks = $derived(
		sundaySchoolLinks?.filter((link) => link.section === 'additional') || []
	)
</script>

<FccLayout
	heading="FCC Sunday School Ministry."
	image={sundaySchool}
	imageAlt="Children gathered around a table in Sunday school with their teacher"
>
	<div class="space-y-16 md:space-y-20">
		<!-- Welcome -->
		<div class="max-w-3xl">
			<h2 class="h2">Welcome to Our Sunday School Ministry!</h2>
			<p class="lede mt-5">
				Welcome to our vibrant and engaging Sunday School program, where children
				of all ages are invited to embark on an exciting journey of faith, fun,
				and friendship. Our program is designed to cater to the unique needs and
				developmental stages of three distinct age groups:
			</p>
			<div class="mt-8 grid gap-3 sm:grid-cols-3">
				{#each ageGroups as group}
					<div class="rounded-2xl border border-secondary-200 bg-secondary-50 px-5 py-4">
						<p class="font-semibold">{group.label}</p>
						<p class="text-sm text-muted">{group.sublabel}</p>
					</div>
				{/each}
			</div>
		</div>

		<!-- Features -->
		<div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
			{#each features as item}
				<div class="card p-6">
					<span class="icon-chip">{item.emoji}</span>
					<h3 class="h4 mt-5">{item.title}</h3>
					<p class="mt-2 text-muted">{item.description}</p>
				</div>
			{/each}
		</div>

		<!-- Call to Action -->
		<div class="rounded-3xl bg-primary-800 px-8 py-12 text-center md:px-16">
			<p class="mx-auto max-w-3xl font-display text-2xl leading-snug text-white md:text-3xl">
				Come be a part of our Sunday School family, where we're not just shaping
				minds, but also touching hearts and souls.
			</p>
			<p class="mx-auto mt-4 max-w-2xl text-primary-100">
				We look forward to the opportunity to guide your child on this exciting
				journey of faith and discovery.
			</p>
		</div>

		<!-- Resources -->
		<div>
			<p class="eyebrow">For teachers &amp; families</p>
			<h3 class="h2 mt-3">Worksheets &amp; resources</h3>

			<div class="mt-8 grid gap-5 lg:grid-cols-2">
				{#snippet linkList(title: string, links: any[], empty: string)}
					<div class="card p-6">
						<h4 class="h4">{title}</h4>
						{#if links.length > 0}
							<ul class="mt-4 divide-y divide-line">
								{#each links as link}
									<li>
										<a
											href={link.pdfUrl || link.url}
											target={link.openInNewTab ? '_blank' : '_self'}
											class="group flex items-center justify-between gap-3 py-3 font-medium hover:text-primary-700"
										>
											<span class="flex items-center gap-3">
												<Icon icon="lucide:file-text" class="size-4 text-secondary-600" />
												{link.title}
											</span>
											<Icon
												icon="lucide:arrow-up-right"
												class="size-4 text-muted transition group-hover:text-primary-700"
											/>
										</a>
									</li>
								{/each}
							</ul>
						{:else}
							<p class="mt-3 text-muted">{empty}</p>
						{/if}
					</div>
				{/snippet}

				{@render linkList(
					'Junior Worksheets',
					juniorLinks,
					'No Junior Sunday School data available yet! Please check back later (or contact Sis. Joi).'
				)}
				{@render linkList(
					'Primary Worksheets',
					primaryLinks,
					'No Primary Sunday School data available yet! Please check back later (or contact Sis. Joi).'
				)}
				{#if additionalLinks.length > 0}
					{@render linkList('Additional Links', additionalLinks, '')}
				{/if}
			</div>
		</div>

		<!-- Teacher schedule -->
		<div>
			<p class="eyebrow">Teachers</p>
			<h3 class="h2 mt-3 mb-8">Monthly schedule</h3>
			<div class="table-container">
				<table class="table">
					<thead class="sticky-head">
						<tr>
							{#each tHeaders as header, index}
								<th class={index === 0 ? 'sticky-col' : ''}>{header}</th>
							{/each}
						</tr>
					</thead>
					<tbody>
						{#each tBody as month}
							<tr>
								<td class="sticky-col">{formatCmsDate(month.date, 'MMMM')}</td>
								<td class="whitespace-nowrap">{month.crawlersToddlers}</td>
								<td class="whitespace-nowrap">{month.ssYoung}</td>
								<td class="whitespace-nowrap">{month.ssOld}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>

		{#if gallery?.photos}
			<PhotoGallery photos={gallery.photos} />
		{/if}
	</div>
</FccLayout>
