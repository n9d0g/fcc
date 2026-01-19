<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import MinistryPageContent from '$lib/components/ministries/MinistryPageContent.svelte'

	// Svelte 5 props
	let { data }: { data: any } = $props()
	let title = $derived(data.title)
	let breadcrumb = $derived(data.breadcrumb)
	let headData = $derived(data.headData)
	let gallery = $derived(data.gallery)

	const expectations = [
		{
			emoji: '📖',
			title: 'Bible Studies',
			description:
				'Thought-provoking studies and discussions on relevant topics that resonate with the challenges and opportunities young adults face.',
		},
		{
			emoji: '🌍',
			title: 'Community Involvement',
			description:
				'Opportunities to participate in service projects, outreach events, and community-building activities.',
		},
		{
			emoji: '⛪',
			title: 'Church Engagement',
			description:
				'Active participation in various church activities, events, and worship services, fostering a sense of belonging within the larger church family.',
		},
		{
			emoji: '🤝',
			title: 'Fellowship',
			description:
				'Building authentic friendships with other young adults who share similar values and beliefs.',
		},
		{
			emoji: '🎉',
			title: 'Social Events',
			description:
				'Fun and engaging social events that provide opportunities for relaxation, recreation, and building lasting memories.',
		},
	]
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<MinistryPageContent
		welcomeTitle="Welcome to our Young Adults Community!"
		welcomeDescription="At Freedom in Christ Church, we recognize the unique journey and aspirations of young adults aged 20-35. Our Young Adults Community is a place where individuals in this age group can connect, grow spiritually, and navigate life's challenges together. Join us regularly for engaging gatherings that blend faith, community involvement, and meaningful connections."
		highlight={{ label: 'Ages 20-35', sublabel: 'Young adults welcome!' }}
		mission="Our mission is to create a supportive and vibrant community for young adults, equipping them to thrive spiritually, build authentic relationships, and make a positive impact in both the church and the broader community. Through our regular meetings, we aim to address the unique needs and questions that arise during this pivotal stage of life."
		vision="We envision a Young Adults Ministry where individuals are empowered to live out their faith with relevance and purpose. Our vision includes a community that actively engages in church life, fosters spiritual growth, and embraces opportunities to contribute positively to the world around them."
		{expectations}
		{gallery}
	>
		{#snippet howToJoinContent()}
			<p class="mb-2">
				Whether you're new to the church or looking for a community to connect
				with, your presence is valued, and we look forward to welcoming you.
				Contact Bro
				<a href="https://www.facebook.com/josepaolo.delarosa" class="anchor"
					>JP de la Rosa</a
				> for more details.
			</p>
			<p>
				Come and be a part of a community where young adults are empowered to
				live out their faith authentically, make meaningful connections, and
				contribute to a greater purpose. Join us at our next Young Adults
				gathering for an enriching time of fellowship, growth, and community.
			</p>
		{/snippet}
	</MinistryPageContent>
</FccLayout>
