<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'

	export let data
	const { title, breadcrumb, headData } = data
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<h2 class="h2 mb-4 font-bold">Welcome to Our Women's Ministry Gathering!</h2>
	<p class="mb-8">
		At Freedom in Christ Church, we celebrate the strength, wisdom, and beauty
		that women bring to our community. Our Women's Ministry Gathering is a
		monthly opportunity for women to come together, share life's journey, and
		grow in faith and friendship. Join us each month for a warm and inviting
		time of connection and sisterhood.
	</p>

	<div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
		<div class="flex flex-col gap-1">
			<h3 class="h3 font-bold">Mission:</h3>
			<p>
				Our mission is to create a vibrant and supportive community where women
				can thrive in their faith, deepen their relationships with one another,
				and find encouragement for the unique challenges they face. Through our
				monthly gatherings, we aim to empower women to live out their faith in
				every area of life.
			</p>
		</div>

		<div class="flex flex-col gap-1">
			<h3 class="h3 font-bold">Vision:</h3>
			<p>
				We envision a Women's Ministry that nurtures a sense of belonging,
				fosters spiritual growth, and equips women to be confident and
				compassionate influencers in their families, workplaces, and
				communities.
			</p>
		</div>

		<div class="flex flex-col gap-1">
			<h3 class="h3 font-bold">Join Us Every Month:</h3>
			<p>
				We extend a warm invitation to you to be a part of our Women's Ministry
				Gathering, held every month at a specified date and time. It's an
				opportunity to connect with other women in the church, share stories,
				and build lasting friendships.
			</p>
		</div>

		<div class="flex flex-col gap-1">
			<h3 class="h3 font-bold">What to Expect:</h3>
			<ul class="list-outside list-disc pl-4">
				<li>
					<span class="font-bold">Fellowship:</span>
					Building meaningful connections with fellow women in the church.
				</li>
				<li>
					<span class="font-bold">Spiritual Growth:</span>
					Engaging in discussions, studies, and activities that encourage personal
					and collective spiritual growth.
				</li>
				<li>
					<span class="font-bold">Support and Encouragement:</span>
					Providing a safe space to share joys, challenges, and prayer requests.
				</li>
				<li>
					<span class="font-bold">Practical Teaching:</span>
					Receiving practical teachings and insights relevant to the diverse roles
					women play in life.
				</li>
				<li>
					<span class="font-bold">Service Opportunities:</span>
					Exploring ways to serve and make a positive impact in the church and community.
				</li>
			</ul>
		</div>
	</div>

	<div class="flex flex-col gap-1">
		<h3 class="h3 font-bold">How to Join:</h3>
		<p class="mb-2">
			Whether you're a regular attendee or a first-timer, your presence is
			cherished, and we look forward to welcoming you. For more details, please
			feel free to contact Sis
			<a href="https://www.facebook.com/omarcelinozarate" class="anchor"
				>Olive Zarate</a
			>.
		</p>
		<p>
			Come and be a part of a community where women are empowered to embrace
			their identity, grow in faith, and support one another through life's
			journey. Join us at our next Women's Ministry Gathering for a delightful
			time of fellowship, growth, and encouragement.
		</p>
	</div>
</FccLayout>
