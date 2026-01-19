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
			emoji: '🤝',
			title: 'Fellowship',
			description:
				'Building meaningful connections with fellow women in the church.',
		},
		{
			emoji: '📖',
			title: 'Spiritual Growth',
			description:
				'Engaging in discussions, studies, and activities that encourage personal and collective spiritual growth.',
		},
		{
			emoji: '💜',
			title: 'Support & Encouragement',
			description:
				'Providing a safe space to share joys, challenges, and prayer requests.',
		},
		{
			emoji: '📚',
			title: 'Practical Teaching',
			description:
				'Receiving practical teachings and insights relevant to the diverse roles women play in life.',
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
				'Connect with other women in the church, share stories, and build lasting friendships.',
		},
	]
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<MinistryPageContent
		welcomeTitle="Welcome to Our Women's Ministry Gathering!"
		welcomeDescription="At Freedom in Christ Church, we celebrate the strength, wisdom, and beauty that women bring to our community. Our Women's Ministry Gathering is a monthly opportunity for women to come together, share life's journey, and grow in faith and friendship. Join us each month for a warm and inviting time of connection and sisterhood."
		mission="Our mission is to create a vibrant and supportive community where women can thrive in their faith, deepen their relationships with one another, and find encouragement for the unique challenges they face. Through our monthly gatherings, we aim to empower women to live out their faith in every area of life."
		vision="We envision a Women's Ministry that nurtures a sense of belonging, fosters spiritual growth, and equips women to be confident and compassionate influencers in their families, workplaces, and communities."
		{expectations}
		{gallery}
	>
		{#snippet howToJoinContent()}
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
		{/snippet}
	</MinistryPageContent>
</FccLayout>
