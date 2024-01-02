<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'

	export let data
	const { title, breadcrumb, headData } = data
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<h2 class="h2 mb-4 font-bold">Welcome to Our Women's Ministry Gathering!</h2>
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

	<p>
		Come be a part of our Sunday School family, where we're not just shaping
		minds, but also touching hearts and souls. We look forward to the
		opportunity to guide your child on this exciting journey of faith and
		discovery.
	</p>
</FccLayout>
