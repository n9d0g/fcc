<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import LandingPageGrid from '$lib/components/LandingPageGrid.svelte'

	export let data
	const { title, breadcrumb, headData } = data
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<section class="flex flex-col gap-4">
		<h2 class="h2 font-bold">Welcome to Our Praise and Worship Ministry!</h2>
		<p>
			At Freedom in Christ Church, we believe that worship is a powerful
			expression of our love and gratitude to God. Our Praise and Worship
			Ministry is at the heart of our community, dedicated to creating an
			atmosphere where individuals can encounter God through music. Whether
			you're an experienced musician or a passionate beginner, we invite you to
			be a part of something truly special.
		</p>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
			<div>
				<h3 class="h3 font-bold">Mission:</h3>
				<p>
					Our mission is to lead the congregation into the presence of God
					through vibrant and authentic worship. We strive to create an
					environment where people can connect with God on a deep and personal
					level, experiencing the transformative power of His love.
				</p>
			</div>
			<div>
				<h3 class="h3 font-bold">Vision:</h3>
				<p>
					We envision a community of worshippers who are not only skilled
					musicians but also individuals deeply committed to a lifestyle of
					worship. Through our music, we aim to inspire, encourage, and uplift
					the spirits of those who gather for worship, fostering a sense of
					unity and connection with God.
				</p>
			</div>
			<div>
				<h3 class="h3 font-bold">Join the Band:</h3>
				<p class="mb-2">
					If you have a passion for worship and a talent for playing musical
					instruments or singing, we invite you to join our Praise and Worship
					Ministry. We have a variety of opportunities for musicians, including
					electric guitar, acoustic guitar, electric drums, electric keyboard,
					cajon, tambourine, and vocals. If you play another instrument, bring
					it and let’s jam together!
				</p>
				<p>
					No matter your skill level, we believe that worship is a collective
					effort, and every contribution is valuable. If you feel called to be a
					part of this ministry, we encourage you to step forward and use your
					gifts to glorify God and bless our church community.
				</p>
			</div>
			<div>
				<h3 class="h3 font-bold">How to Join:</h3>
				<p class="mb-2">
					To join our Praise and Worship Ministry, simply <a
						href="emailto:fcc.church.canada@gmail.com"
						class="anchor">send an email</a
					>
					or
					<a href="https://www.instagram.com/fcc.canada/" class="anchor"
						>message us on our Instragram account</a
					> , expressing your interest. Let us know which instrument you play or
					if you're interested in vocals. We'll be happy to connect with you, provide
					more information, and discuss how you can become a vital part of our worship
					team.
				</p>
				<p>
					Join us as we lift our voices and instruments in harmony, creating an
					atmosphere where God's presence is not only felt but celebrated. We
					look forward to welcoming you into our Praise and Worship family at
					FCC!
				</p>
			</div>
		</div>

		<hr />

		<div>
			<h3 class="h3 mb-4 font-bold">Video links:</h3>
			<div class="flex flex-col gap-2">
				<a href="https://www.youtube.com/watch?v=SoUvmaQCzZk" class="anchor"
					>September 25th, 2022</a
				>
				<a href="https://www.youtube.com/watch?v=fZkakq-GoQk" class="anchor"
					>Thanksgiving 2022</a
				>
				<a href="https://www.youtube.com/watch?v=DiSggV9FXgY" class="anchor"
					>April 9th, 2023</a
				>
				<a href="https://www.youtube.com/watch?v=ySM1UftVWiQ" class="anchor"
					>November 12th, 2023</a
				>
			</div>
		</div>
	</section>
	<LandingPageGrid items={data.landingPageItems} />
</FccLayout>
