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
				'Regular and engaging Bible studies tailored to the unique needs and questions of teenagers.',
		},
		{
			emoji: '🌍',
			title: 'Community Involvement',
			description:
				'Opportunities to participate in service projects, outreach events, and make a positive impact in the community.',
		},
		{
			emoji: '⛪',
			title: 'Church Engagement',
			description:
				'Involvement in various church activities, events, and worship services designed to integrate youth into the broader church community.',
		},
		{
			emoji: '🤝',
			title: 'Fellowship',
			description:
				'Building friendships with other teens who share similar values and beliefs.',
		},
		{
			emoji: '🎉',
			title: 'Fun Activities',
			description:
				'Exciting and enjoyable activities that make our gatherings memorable and create a sense of camaraderie.',
		},
	]
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<MinistryPageContent
		welcomeTitle="Welcome to Our Youth Ministry!"
		welcomeDescription="At Freedom in Christ Church, we believe in investing in the vibrant and dynamic potential of our youth. Our Youth Ministry provides a space where teenagers aged 13-19 can gather, connect, and grow in their faith. Join us each month for an exciting blend of spiritual development, community engagement, and lots of fun!"
		highlight={{ label: 'Ages 13-19', sublabel: 'Teenagers welcome!' }}
		mission="Our mission is to empower the youth to develop a strong and authentic relationship with God, fostering a community where they feel valued, supported, and inspired to live out their faith. Through our regular gatherings, we aim to equip teenagers with the tools they need to navigate life's challenges with confidence and grace."
		vision="We envision a Youth Ministry that not only nurtures spiritual growth but also encourages active participation in church and community life. Our goal is to see young people confidently living out their faith, impacting their peers and the world around them."
		{expectations}
		{gallery}
	>
		{#snippet howToJoinContent()}
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
		{/snippet}
	</MinistryPageContent>
</FccLayout>
