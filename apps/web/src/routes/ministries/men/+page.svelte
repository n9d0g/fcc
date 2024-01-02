<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import cover from '$lib/assets/ministries/men/men-img1.avif'
	import img2 from '$lib/assets/ministries/men/men-img2.jpg'
	import img3 from '$lib/assets/ministries/men/men-img3.jpg'
	import img4 from '$lib/assets/ministries/men/men-img4.jpg'
	import vid1 from '$lib/assets/ministries/men/men-vid1.mp4'
	import vid2 from '$lib/assets/ministries/men/men-vid2.mp4'
	import vid3 from '$lib/assets/ministries/men/men-vid3.mp4'

	export let data
	const { title, breadcrumb, headData } = data
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<h2 class="h2 mb-4 font-bold">Welcome to Our Men's Ministry Gathering!</h2>
	<p class="mb-8">
		At Freedom in Christ Church, we believe in the strength and impact of a
		united community of men dedicated to growing in faith, supporting one
		another, and making a positive difference. Our Men's Ministry Gathering is a
		monthly opportunity for fellowship, spiritual growth, and mutual
		encouragement. Join us every month for an empowering time of connection and
		camaraderie.
	</p>

	<div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
		<div class="flex flex-col gap-1">
			<h3 class="h3 font-bold">Mission:</h3>
			<p>
				Our mission is to cultivate a community of men who are committed to
				living out their faith in all aspects of life. Through our monthly
				gatherings, we aim to strengthen bonds, foster spiritual growth, and
				empower men to be influential leaders in their families, workplaces, and
				communities.
			</p>
		</div>

		<div class="flex flex-col gap-1">
			<h3 class="h3 font-bold">Vision:</h3>
			<p>
				We envision a Men's Ministry that empowers men to be godly leaders,
				husbands, fathers, and friends. Our vision is to create a space where
				men can share their journeys, learn from one another, and be equipped to
				navigate the challenges of life with faith and resilience.
			</p>
		</div>

		<div class="flex flex-col gap-1">
			<h3 class="h3 font-bold">Join Us Every Month:</h3>
			<p>
				We invite you to be a part of our Men's Ministry Gathering, held every
				month at a specified date and time. It's an opportunity to connect with
				other men in the church, share experiences, and grow in your faith
				journey together.
			</p>
		</div>

		<div class="flex flex-col gap-1">
			<h3 class="h3 font-bold">What to Expect:</h3>
			<ul class="list-outside list-disc pl-4">
				<li>
					<span class="font-bold">Fellowship:</span>
					Building meaningful connections with fellow men in the church.
				</li>
				<li>
					<span class="font-bold">Spiritual Growth:</span>
					Engaging in discussions and activities that encourage personal and collective
					spiritual growth.
				</li>
				<li>
					<span class="font-bold">Support and Encouragement:</span>
					Providing a supportive environment to share joys, challenges, and prayer
					requests.
				</li>
				<li>
					<span class="font-bold">Practical Teaching:</span>
					Receiving practical teachings and insights relevant to the unique challenges
					faced by men.
				</li>
				<li>
					<span class="font-bold">Service Opportunities:</span>
					Exploring ways to serve and make a positive impact in the church and community.
				</li>
			</ul>
		</div>
	</div>

	<div class="mb-8 flex flex-col gap-1">
		<h3 class="h3 font-bold">How to Join:</h3>
		<p class="mb-2">
			Whether you're a regular attendee or a first-timer, your presence is
			valued, and we look forward to welcoming you. Feel free to message bro
			<a href="https://www.facebook.com/june.bermudo" class="anchor"
				>June Bermudo</a
			> for more details.
		</p>
		<p>
			Come and be a part of a community where men are empowered to live out
			their faith authentically and purposefully. Join us at our next Men's
			Ministry Gathering and be ready for an enriching time of fellowship,
			growth, and encouragement.
		</p>
	</div>

	<!-- svelte-ignore a11y-img-redundant-alt -->
	<img src={cover} alt="Men's Ministry Cover Photo" class="h-auto w-full" />
	<div
		class="my-8 grid grid-cols-1 justify-center gap-8 align-middle md:grid-cols-3"
	>
		<div class="flex justify-center">
			<!-- svelte-ignore a11y-media-has-caption -->
			<video controls class="flex align-middle">
				<source src={vid1} />
			</video>
		</div>
		<div class="flex justify-center align-middle md:col-span-2">
			<!-- svelte-ignore a11y-media-has-caption -->
			<video controls>
				<source src={vid2} />
			</video>
		</div>
		<div class="flex items-center md:col-span-2">
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<img src={img2} alt="Men's Ministry Photo 2" class="w-full" />
		</div>
		<div class="flex justify-center align-middle">
			<!-- svelte-ignore a11y-media-has-caption -->
			<video controls>
				<source src={vid3} />
			</video>
		</div>
		<div class="flex items-center">
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<img src={img3} alt="Men's Ministry Photo 3" class="w-full" />
		</div>
		<div class="flex items-center md:col-span-2">
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<img src={img4} alt="Men's Ministry Photo 3" class="w-full" />
		</div>
	</div>
</FccLayout>
