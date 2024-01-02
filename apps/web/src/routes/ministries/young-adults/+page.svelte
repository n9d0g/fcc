<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'

	export let data
	const { title, breadcrumb, headData } = data
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<h2 class="h2 mb-4 font-bold">Welcome to our Young Adults Community!</h2>
	<p class="mb-8">
		At Freedom in Christ Church, we recognize the unique journey and aspirations
		of young adults aged 20-35. Our Young Adults Community is a place where
		individuals in this age group can connect, grow spiritually, and navigate
		life's challenges together. Join us regularly for engaging gatherings that
		blend faith, community involvement, and meaningful connections.
	</p>

	<div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
		<div class="flex flex-col gap-1">
			<h3 class="h3 font-bold">Mission:</h3>
			<p>
				Our mission is to create a supportive and vibrant community for young
				adults, equipping them to thrive spiritually, build authentic
				relationships, and make a positive impact in both the church and the
				broader community. Through our regular meetings, we aim to address the
				unique needs and questions that arise during this pivotal stage of life.
			</p>
		</div>

		<div class="flex flex-col gap-1">
			<h3 class="h3 font-bold">Vision:</h3>
			<p>
				We envision a Young Adults Ministry where individuals are empowered to
				live out their faith with relevance and purpose. Our vision includes a
				community that actively engages in church life, fosters spiritual
				growth, and embraces opportunities to contribute positively to the world
				around them.
			</p>
		</div>

		<div class="flex flex-col gap-1">
			<h3 class="h3 font-bold">Join Us Regularly:</h3>
			<p>
				We invite young adults aged 20-35 to join our community regularly at our
				specified meeting times. These gatherings provide a space to connect
				with peers, explore faith together, and engage in activities that foster
				personal and collective growth.
			</p>
		</div>

		<div class="flex flex-col gap-1">
			<h3 class="h3 font-bold">What to Expect:</h3>
			<ul class="list-outside list-disc pl-4">
				<li>
					<span class="font-bold">Bible Studies and Discussions:</span>
					Thought-provoking studies and discussions on relevant topics that resonate
					with the challenges and opportunities young adults face.
				</li>
				<li>
					<span class="font-bold">Community Involvement:</span>
					Opportunities to participate in service projects, outreach initiatives,
					and activities that make a positive impact in the community.
				</li>
				<li>
					<span class="font-bold">Church Engagement:</span>
					Integration into various church activities, worship services, and events
					designed to connect young adults with the broader church family.
				</li>
				<li>
					<span class="font-bold">Fellowship:</span>
					Building meaningful connections and friendships with other young adults
					who share similar values and aspirations.
				</li>
				<li>
					<span class="font-bold">Career and Life Transitions Support:</span>
					Navigating the complexities of career and life transitions with the support
					of a community facing similar challenges.
				</li>
			</ul>
		</div>
	</div>

	<div class="flex flex-col gap-1">
		<h3 class="h3 font-bold">How to Join:</h3>
		<p class="mb-2">
			To be part of our Young Adults Community, check the church calendar or
			announcements for the specific date and time of our regular gatherings.
			Whether you're a consistent participant or considering joining for the
			first time, your presence is valued, and we look forward to welcoming you.
			Contact sis
			<a href="https://www.facebook.com/lardinore" class="anchor">Noreen</a> for
			more details.
		</p>
		<p>
			Come and be a part of a community where the energy, questions, and dreams
			of young adulthood are celebrated. Join us at our next gathering for a
			time of meaningful connection, spiritual exploration, and the support you
			need on your journey.
		</p>
	</div>
</FccLayout>
