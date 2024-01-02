<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'

	export let data
	const { title, breadcrumb, headData } = data
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<h2 class="h2 mb-4 font-bold">Welcome to Our Youth Ministry!</h2>
	<p class="mb-8">
		At Freedom in Christ Church, we believe in investing in the vibrant and
		dynamic potential of our youth. Our Youth Ministry provides a space where
		teenagers aged 13-19 can gather, connect, and grow in their faith. Join us
		each month for an exciting blend of spiritual development, community
		engagement, and lots of fun!
	</p>

	<div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
		<div class="flex flex-col gap-1">
			<h3 class="h3 font-bold">Mission:</h3>
			<p>
				Our mission is to empower the youth to develop a strong and authentic
				relationship with God, fostering a community where they feel valued,
				supported, and inspired to live out their faith. Through our regular
				gatherings, we aim to equip teenagers with the tools they need to
				navigate life's challenges with confidence and grace.
			</p>
		</div>

		<div class="flex flex-col gap-1">
			<h3 class="h3 font-bold">Vision:</h3>
			<p>
				We envision a Youth Ministry that not only nurtures spiritual growth but
				also encourages active participation in church and community life. Our
				goal is to see young people confidently living out their faith,
				impacting their peers and the world around them.
			</p>
		</div>

		<div class="flex flex-col gap-1">
			<h3 class="h3 font-bold">Join Us!</h3>
			<p>
				We invite teenagers aged 13-19 to join our Youth Ministry, held at
				specified dates and times each month. It's an opportunity to connect
				with peers, engage in exciting activities, and delve into meaningful
				discussions about faith and life.
			</p>
		</div>

		<div class="flex flex-col gap-1">
			<h3 class="h3 font-bold">What to Expect:</h3>
			<ul class="list-outside list-disc pl-4">
				<li>
					<span class="font-bold">Bible Studies:</span>
					Regular and engaging Bible studies tailored to the unique needs and questions
					of teenagers.
				</li>
				<li>
					<span class="font-bold">Community Involvement:</span>
					Opportunities to participate in service projects, outreach events, and
					make a positive impact in the community.
				</li>
				<li>
					<span class="font-bold">Church Engagement:</span>
					Involvement in various church activities, events, and worship services
					designed to integrate youth into the broader church community.
				</li>
				<li>
					<span class="font-bold">Fellowship:</span>
					Building friendships with other teens who share similar values and beliefs.
				</li>
				<li>
					<span class="font-bold">Fun Activities:</span>
					Exciting and enjoyable activities that make our gatherings memorable and
					create a sense of camaraderie.
				</li>
			</ul>
		</div>
	</div>

	<div class="flex flex-col gap-1">
		<h3 class="h3 font-bold">How to Join:</h3>
		<p class="mb-2">
			Whether you're a regular attendee or a newcomer, your presence is eagerly
			anticipated, and we look forward to welcoming you. Contact Sis
			<a href="https://www.facebook.com/raquel.quiambao.1" class="anchor"
				>Raquel Quiambao</a
			> for more details.
		</p>
		<p>
			Come and be a part of a community where the energy and passion of youth
			are celebrated, and where faith becomes a vibrant and transformative
			journey. Join us at our next Youth Ministry for an inspiring time of
			growth, connection, and fun.
		</p>
	</div>
</FccLayout>
