<script lang="ts">
	import { format, addDays } from 'date-fns'
	import FccLayout from '$lib/components/FccLayout.svelte'

	export let data
	const { tHeaders, tBody, title, breadcrumb, headData, sundaySchoolData } =
		data

	const jrSundaySchoolData = sundaySchoolData.filter(
		(item: any) => item.class === 'Junior'
	)
	const primarySundaySchoolData = sundaySchoolData.filter(
		(item: any) => item.class === 'Primary'
	)
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<h2 class="h2 mb-4 font-bold">Welcome to Our Sunday School Ministry!</h2>
	<p class="mb-8">
		Welcome to our vibrant and engaging Sunday School program, where children of
		all ages are invited to embark on an exciting journey of faith, fun, and
		friendship. Our program is designed to cater to the unique needs and
		developmental stages of three distinct age groups: Crawlers/Toddlers (ages
		1-5), Primary (grades 1-3), and Junior (grades 4-6).
	</p>

	<div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
		<div class="flex flex-col gap-1">
			<h3 class="h3 font-bold">Interactive Bible Lessons:</h3>
			<p>
				Our Sunday School prides itself on providing interactive and
				age-appropriate Bible lessons that captivate young hearts and minds.
				From the earliest stages of development to the pre-adolescent years, we
				believe in fostering a love for God's Word that will last a lifetime.
			</p>
		</div>

		<div class="flex flex-col gap-1">
			<h3 class="h3 font-bold">Multifaceted Activities:</h3>
			<p>
				At our Sunday School, it's not just about reading and listening; it's
				about experiencing the joy of worship and learning in a variety of ways.
				We sing uplifting songs, play engaging games, and unleash creativity
				through exciting crafts. Our goal is to make every Sunday a memorable
				and enriching experience for your child.
			</p>
		</div>

		<div class="flex flex-col gap-1">
			<h3 class="h3 font-bold">Empowering Worship:</h3>
			<p>
				We understand the importance of nurturing a spirit of worship from a
				young age. Through age-appropriate activities, we aim to instill a deep
				sense of reverence and love for God in our young learners, fostering a
				foundation for a lifelong relationship with Him.
			</p>
		</div>

		<div class="flex flex-col gap-1">
			<h3 class="h3 font-bold">Building a Foundation of Love:</h3>
			<p>
				Our Sunday School is not just a place for learning; it's a community
				where children are encouraged to love and support one another. We teach
				essential values such as kindness, compassion, and friendship, creating
				a positive environment for spiritual growth.
			</p>
		</div>

		<div class="flex flex-col gap-1">
			<h3 class="h3 font-bold">Passionate Teacher Volunteers:</h3>
			<p>
				Our team of dedicated teacher volunteers is passionate about creating a
				nurturing and educational environment for your children. Each member is
				committed to helping your child grow spiritually, emotionally, and
				socially.
			</p>
		</div>

		<div class="flex flex-col gap-1">
			<h3 class="h3 font-bold">Convenient Timing:</h3>
			<p class="mb-2">
				Join us every Sunday during the sermon time from 11 am to 12 noon. We
				believe in providing a space for your child to connect with God while
				you engage in the main worship service.
			</p>
		</div>
	</div>

	<div class="mb-8">
		<p>
			Come be a part of our Sunday School family, where we're not just shaping
			minds, but also touching hearts and souls. We look forward to the
			opportunity to guide your child on this exciting journey of faith and
			discovery.
		</p>
	</div>

	<div class="mb-8">
		<h3 class="h3 my-4 font-bold">PDFs</h3>

		<div class="mb-8">
			<h5 class="h5 mb-4 font-bold">Junior Material</h5>
			{#if jrSundaySchoolData.length > 0}
				{#each jrSundaySchoolData as item}
					<div class="flex flex-col gap-4 lg:mb-4 lg:flex-row">
						<a
							href={item.lessonPlanPdf}
							target="_blank"
							class="variant-filled btn"
						>
							Junior Lesson Plans ({format(new Date(item.date), 'MMM')})
						</a>
						<a
							href={item.worksheetPdf}
							target="_blank"
							class="variant-filled btn"
						>
							Junior Worksheets ({format(new Date(item.date), 'MMM')})
						</a>
					</div>
				{/each}
			{:else}
				<p>
					No Junior Sunday School data available yet! Please check back later
					(or contact Sis. Joi).
				</p>
			{/if}
		</div>

		<div class="mb-8">
			<h5 class="h5 mb-4 font-bold">Primary Material</h5>
			{#if primarySundaySchoolData.length > 0}
				<div class="flex flex-col gap-4 lg:flex-row">
					{#each primarySundaySchoolData as item}
						<a
							href={item.lessonPlanPdf}
							target="_blank"
							class="variant-filled btn"
						>
							Primary Lesson Plans
						</a>
						<a
							href={item.worksheetPdf}
							target="_blank"
							class="variant-filled btn"
						>
							Primary Worksheets
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

	<div>
		<h3 class="h3 mb-4 font-bold">Additional Links</h3>

		<div class="mb-8 flex flex-col gap-4 lg:flex-row lg:flex-wrap">
			<a
				href="/pdf/2025/sunday-school/sunday-school-lessons.pdf"
				target="_blank"
				class="variant-filled btn"
			>
				2025 Sunday School Lessons
			</a>
			<a
				href="https://youtu.be/uzr1XAhw2TY"
				target="_blank"
				class="variant-filled btn"
			>
				Sunday School Orientation Video
			</a>
			<a
				href="https://www.youtube.com/watch?v=ONs-2yg76kM"
				target="_blank"
				class="variant-filled btn"
			>
				Sunday School Teacher Training Session 1
			</a>
			<a
				href="http://tinyurl.com/SStraining1feedbackform"
				target="_blank"
				class="variant-filled btn"
			>
				SS Video Training Session 1 Feedback Form
			</a>
		</div>
	</div>

	<div class="table-container relative">
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
</FccLayout>
