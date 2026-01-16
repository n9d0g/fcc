<script lang="ts">
	import { format, addDays } from 'date-fns'
	import FccLayout from '$lib/components/FccLayout.svelte'

	export let data
	const {
		tHeaders,
		tBody,
		title,
		breadcrumb,
		headData,
		sundaySchoolData,
		sundaySchoolLinks,
		gallery,
	} = data

	const juniorLinks =
		sundaySchoolLinks?.filter((link: any) => link.section === 'junior') || []
	const primaryLinks =
		sundaySchoolLinks?.filter((link: any) => link.section === 'primary') || []
	const additionalLinks =
		sundaySchoolLinks?.filter((link: any) => link.section === 'additional') ||
		[]
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<!-- Welcome Hero Section -->
	<div class="mb-10">
		<h2 class="h2 mb-4 font-bold">Welcome to Our Sunday School Ministry!</h2>
		<p class="mb-6 text-lg">
			Welcome to our vibrant and engaging Sunday School program, where children
			of all ages are invited to embark on an exciting journey of faith, fun,
			and friendship. Our program is designed to cater to the unique needs and
			developmental stages of three distinct age groups:
		</p>
		<div class="grid gap-3 sm:grid-cols-3">
			<div class="flex items-center gap-3">
				<span class="text-primary-400 text-2xl">●</span>
				<div>
					<p class="font-semibold">Crawlers/Toddlers</p>
					<p class="text-sm opacity-70">Ages 1-5</p>
				</div>
			</div>
			<div class="flex items-center gap-3">
				<span class="text-primary-400 text-2xl">●</span>
				<div>
					<p class="font-semibold">Primary</p>
					<p class="text-sm opacity-70">Grades 1-3</p>
				</div>
			</div>
			<div class="flex items-center gap-3">
				<span class="text-primary-400 text-2xl">●</span>
				<div>
					<p class="font-semibold">Junior</p>
					<p class="text-sm opacity-70">Grades 4-6</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Features Grid -->
	<div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		<div class="card variant-ghost-surface p-5">
			<div class="mb-3 flex items-center gap-3">
				<span
					class="variant-filled-primary flex h-10 w-10 items-center justify-center rounded-full text-xl"
				>
					📖
				</span>
				<h3 class="h4 font-bold">Interactive Bible Lessons</h3>
			</div>
			<p class="opacity-80">
				Our Sunday School prides itself on providing interactive and
				age-appropriate Bible lessons that captivate young hearts and minds.
				From the earliest stages of development to the pre-adolescent years, we
				believe in fostering a love for God's Word that will last a lifetime.
			</p>
		</div>

		<div class="card variant-ghost-surface p-5">
			<div class="mb-3 flex items-center gap-3">
				<span
					class="variant-filled-primary flex h-10 w-10 items-center justify-center rounded-full text-xl"
				>
					🎨
				</span>
				<h3 class="h4 font-bold">Multifaceted Activities</h3>
			</div>
			<p class="opacity-80">
				At our Sunday School, it's not just about reading and listening; it's
				about experiencing the joy of worship and learning in a variety of ways.
				We sing uplifting songs, play engaging games, and unleash creativity
				through exciting crafts.
			</p>
		</div>

		<div class="card variant-ghost-surface p-5">
			<div class="mb-3 flex items-center gap-3">
				<span
					class="variant-filled-primary flex h-10 w-10 items-center justify-center rounded-full text-xl"
				>
					🙏
				</span>
				<h3 class="h4 font-bold">Empowering Worship</h3>
			</div>
			<p class="opacity-80">
				We understand the importance of nurturing a spirit of worship from a
				young age. Through age-appropriate activities, we aim to instill a deep
				sense of reverence and love for God in our young learners.
			</p>
		</div>

		<div class="card variant-ghost-surface p-5">
			<div class="mb-3 flex items-center gap-3">
				<span
					class="variant-filled-primary flex h-10 w-10 items-center justify-center rounded-full text-xl"
				>
					💛
				</span>
				<h3 class="h4 font-bold">Building a Foundation of Love</h3>
			</div>
			<p class="opacity-80">
				Our Sunday School is not just a place for learning; it's a community
				where children are encouraged to love and support one another. We teach
				essential values such as kindness, compassion, and friendship.
			</p>
		</div>

		<div class="card variant-ghost-surface p-5">
			<div class="mb-3 flex items-center gap-3">
				<span
					class="variant-filled-primary flex h-10 w-10 items-center justify-center rounded-full text-xl"
				>
					👨‍🏫
				</span>
				<h3 class="h4 font-bold">Passionate Teacher Volunteers</h3>
			</div>
			<p class="opacity-80">
				Our team of dedicated teacher volunteers is passionate about creating a
				nurturing and educational environment for your children. Each member is
				committed to helping your child grow spiritually, emotionally, and
				socially.
			</p>
		</div>

		<div class="card variant-ghost-surface p-5">
			<div class="mb-3 flex items-center gap-3">
				<span
					class="variant-filled-primary flex h-10 w-10 items-center justify-center rounded-full text-xl"
				>
					🕐
				</span>
				<h3 class="h4 font-bold">Convenient Timing</h3>
			</div>
			<p class="opacity-80">
				Join us every Sunday during the sermon time from 11 am to 12 noon. We
				believe in providing a space for your child to connect with God while
				you engage in the main worship service.
			</p>
		</div>
	</div>

	<!-- Call to Action -->
	<div
		class="card variant-soft-secondary mx-auto mb-8 max-w-2xl p-6 text-center"
	>
		<p class=" text-lg">
			Come be a part of our Sunday School family, where we're not just shaping
			minds, but also touching hearts and souls. We look forward to the
			opportunity to guide your child on this exciting journey of faith and
			discovery.
		</p>
	</div>

	<div class="mb-8">
		<h3 class="h3 my-4 font-bold">PDFs</h3>

		<div class="mb-8">
			<h5 class="h5 mb-4 font-bold">Junior Worksheets</h5>
			{#if juniorLinks.length > 0}
				<div class="flex flex-col gap-4 lg:flex-row lg:flex-wrap">
					{#each juniorLinks as link}
						<a
							href={link.pdfUrl || link.url}
							target={link.openInNewTab ? '_blank' : '_self'}
							class="variant-filled btn"
						>
							{link.title}
						</a>
					{/each}
				</div>
			{:else}
				<p>
					No Junior Sunday School data available yet! Please check back later
					(or contact Sis. Joi).
				</p>
			{/if}
		</div>

		<div class="mb-8">
			<h5 class="h5 mb-4 font-bold">Primary Worksheets</h5>
			{#if primaryLinks.length > 0}
				<div class="flex flex-col gap-4 lg:flex-row lg:flex-wrap">
					{#each primaryLinks as link}
						<a
							href={link.pdfUrl || link.url}
							target={link.openInNewTab ? '_blank' : '_self'}
							class="variant-filled btn"
						>
							{link.title}
						</a>
					{/each}
				</div>
			{:else}
				<p>
					No Primary Sunday School data available yet! Please check back later
					(or contact Sis. Joi).
				</p>
			{/if}
		</div>
	</div>

	{#if additionalLinks.length > 0}
		<div>
			<h3 class="h3 mb-4 font-bold">Additional Links</h3>

			<div class="mb-8 flex flex-col gap-4 lg:flex-row lg:flex-wrap">
				{#each additionalLinks as link}
					<a
						href={link.pdfUrl || link.url}
						target={link.openInNewTab ? '_blank' : '_self'}
						class="variant-filled btn"
					>
						{link.title}
					</a>
				{/each}
			</div>
		</div>
	{/if}

	<div class="table-container relative mb-8">
		<!-- skeleton table -->
		<table class="relative table overflow-scroll">
			<thead>
				<tr class="variant-filled-secondary sticky top-0 z-10">
					{#each tHeaders as header, index}
						{#if index === 0}
							<th
								class="variant-filled-secondary max-lg:table-cell-fit sticky left-0 z-30 w-6 p-3 text-left font-bold"
							>
								{header}
							</th>
						{:else}
							<th class="max-lg:table-cell-fit w-6 p-3 text-left font-bold">
								{header}
							</th>
						{/if}
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each tBody as month}
					<tr class="text-center">
						<td
							class="bg-surface-200-700-token max-lg:table-cell-fit sticky left-0 w-6 pl-3 text-left font-bold"
						>
							{format(addDays(new Date(month.date), 1), 'MMMM')}
						</td>
						<td
							class="max-lg:table-cell-fit w-6 whitespace-nowrap pl-3 text-left"
						>
							{month.crawlersToddlers}
						</td>
						<td
							class="max-lg:table-cell-fit w-6 whitespace-nowrap pl-3 text-left"
						>
							{month.ssYoung}
						</td>
						<td
							class="max-lg:table-cell-fit w-6 whitespace-nowrap pl-3 text-left"
						>
							{month.ssOld}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<!-- Photo Gallery -->
	{#if gallery?.photos && gallery.photos.length > 0}
		<div>
			<h3 class="h3 mb-4 font-bold">Photo Gallery</h3>
			<div
				class="grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
			>
				{#each gallery.photos as photo, index}
					<div
						class="overflow-hidden rounded-lg {index === 0
							? 'col-span-2 row-span-2'
							: index === 3
								? 'col-span-2'
								: index === 6
									? 'row-span-2'
									: ''}"
					>
						<img
							src={photo.url}
							alt={photo.alt || 'Gallery photo'}
							class="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
						/>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</FccLayout>
