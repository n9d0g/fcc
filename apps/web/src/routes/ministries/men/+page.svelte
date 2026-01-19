<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import MinistryPageContent from '$lib/components/ministries/MinistryPageContent.svelte'
	import cover from '$lib/assets/ministries/men/men-img1.avif'
	import img2 from '$lib/assets/ministries/men/men-img2.jpg'
	import img3 from '$lib/assets/ministries/men/men-img3.jpg'
	import img4 from '$lib/assets/ministries/men/men-img4.jpg'
	import vid1 from '$lib/assets/ministries/men/men-vid1.mp4'
	import vid2 from '$lib/assets/ministries/men/men-vid2.mp4'
	import vid3 from '$lib/assets/ministries/men/men-vid3.mp4'

	// Svelte 5 props
	let { data }: { data: any } = $props()
	let title = $derived(data.title)
	let breadcrumb = $derived(data.breadcrumb)
	let headData = $derived(data.headData)
	let gallery = $derived(data.gallery)

	const expectations = [
		{
			emoji: '🤝',
			title: 'Fellowship',
			description:
				'Building meaningful connections with fellow men in the church.',
		},
		{
			emoji: '📖',
			title: 'Spiritual Growth',
			description:
				'Engaging in discussions and activities that encourage personal and collective spiritual growth.',
		},
		{
			emoji: '💪',
			title: 'Support & Encouragement',
			description:
				'Providing a supportive environment to share joys, challenges, and prayer requests.',
		},
		{
			emoji: '📚',
			title: 'Practical Teaching',
			description:
				'Receiving practical teachings and insights relevant to the unique challenges faced by men.',
		},
		{
			emoji: '🙌',
			title: 'Service Opportunities',
			description:
				'Exploring ways to serve and make a positive impact in the church and community.',
		},
		{
			emoji: '📅',
			title: 'Join Us Every Month',
			description:
				'Connect with other men in the church, share experiences, and grow in your faith journey together.',
		},
	]
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<MinistryPageContent
		welcomeTitle="Welcome to Our Men's Ministry Gathering!"
		welcomeDescription="At Freedom in Christ Church, we believe in the strength and impact of a united community of men dedicated to growing in faith, supporting one another, and making a positive difference. Our Men's Ministry Gathering is a monthly opportunity for fellowship, spiritual growth, and mutual encouragement. Join us every month for an empowering time of connection and camaraderie."
		mission="Our mission is to cultivate a community of men who are committed to living out their faith in all aspects of life. Through our monthly gatherings, we aim to strengthen bonds, foster spiritual growth, and empower men to be influential leaders in their families, workplaces, and communities."
		vision="We envision a Men's Ministry that empowers men to be godly leaders, husbands, fathers, and friends. Our vision is to create a space where men can share their journeys, learn from one another, and be equipped to navigate the challenges of life with faith and resilience."
		{expectations}
		{gallery}
		galleryTitle="More Photos"
	>
		{#snippet howToJoinContent()}
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
		{/snippet}

		{#snippet customContent()}
			<!-- svelte-ignore a11y_img_redundant_alt -->
			<img src={cover} alt="Men's Ministry Cover Photo" class="h-auto w-full" />
			<div
				class="my-8 grid grid-cols-1 justify-center gap-8 align-middle md:grid-cols-3"
			>
				<div class="flex justify-center">
					<!-- svelte-ignore a11y_media_has_caption -->
					<video controls class="flex align-middle">
						<source src={vid1} />
					</video>
				</div>
				<div class="flex justify-center align-middle md:col-span-2">
					<!-- svelte-ignore a11y_media_has_caption -->
					<video controls>
						<source src={vid2} />
					</video>
				</div>
				<div class="flex items-center md:col-span-2">
					<!-- svelte-ignore a11y_img_redundant_alt -->
					<img src={img2} alt="Men's Ministry Photo 2" class="w-full" />
				</div>
				<div class="flex justify-center align-middle">
					<!-- svelte-ignore a11y_media_has_caption -->
					<video controls>
						<source src={vid3} />
					</video>
				</div>
				<div class="flex items-center">
					<!-- svelte-ignore a11y_img_redundant_alt -->
					<img src={img3} alt="Men's Ministry Photo 3" class="w-full" />
				</div>
				<div class="flex items-center md:col-span-2">
					<!-- svelte-ignore a11y_img_redundant_alt -->
					<img src={img4} alt="Men's Ministry Photo 4" class="w-full" />
				</div>
			</div>
		{/snippet}
	</MinistryPageContent>
</FccLayout>
