<script lang="ts">
	import FccLayout from '#lib/components/FccLayout.svelte'
	import praiseTeam from '#lib/assets/ministries/praise/praise-team.jpg'
	import LandingPageGrid from '#lib/components/LandingPageGrid.svelte'
	import MinistryPageContent from '#lib/components/ministries/MinistryPageContent.svelte'
	import type { PageLayoutData } from '#lib/types.js'

	let {
		data,
	}: {
		data: PageLayoutData & {
			gallery: unknown
			landingPageItems: Array<{ title: string; link: string; external?: boolean }>
		}
	} = $props()
	let title = $derived(data.title)
	let breadcrumb = $derived(data.breadcrumb)
	let headData = $derived(data.headData)
	let gallery = $derived(data.gallery)

	const instruments = [
		{ emoji: '🎸', title: 'Guitar', description: 'Electric & Acoustic' },
		{ emoji: '🥁', title: 'Drums', description: 'Electric Drums & Cajon' },
		{ emoji: '🎹', title: 'Keyboard', description: 'Electric Keyboard' },
		{ emoji: '🎤', title: 'Vocals', description: 'Lead & Backup' },
	]
</script>

<FccLayout
	{title}
	{breadcrumb}
	{headData}
	image={praiseTeam}
	imageAlt="Young members of FCC leading worship on stage"
>
	<MinistryPageContent
		welcomeTitle="Welcome to Our Praise and Worship Ministry!"
		welcomeDescription="At Freedom in Christ Church, we believe that worship is a powerful expression of our love and gratitude to God. Our Praise and Worship Ministry is at the heart of our community, dedicated to creating an atmosphere where individuals can encounter God through music. Whether you're an experienced musician or a passionate beginner, we invite you to be a part of something truly special."
		mission="Our mission is to lead the congregation into the presence of God through vibrant and authentic worship. We strive to create an environment where people can connect with God on a deep and personal level, experiencing the transformative power of His love."
		vision="We envision a community of worshippers who are not only skilled musicians but also individuals deeply committed to a lifestyle of worship. Through our music, we aim to inspire, encourage, and uplift the spirits of those who gather for worship, fostering a sense of unity and connection with God."
		expectationsTitle="Join the Band"
		expectations={instruments}
		{gallery}
	>
		{#snippet howToJoinContent()}
			<p class="mb-2">
				To join our Praise and Worship Ministry, <a
					href="/ministries/praise/join"
					class="anchor">send us a request</a
				>
				letting us know which instrument you play or if you're interested in
				vocals. You can also
				<a href="https://www.instagram.com/fcc.canada/" class="anchor"
					>message us on Instagram</a
				>. We'll be happy to connect with you, provide more information, and
				discuss how you can become a vital part of our worship team.
			</p>
			<a href="/ministries/praise/join" class="btn btn-primary mb-6">
				Request to join the team
			</a>
			<p>
				Join us as we lift our voices and instruments in harmony, creating an
				atmosphere where God's presence is not only felt but celebrated. We look
				forward to welcoming you into our Praise and Worship family at FCC!
			</p>
			<p class="mt-4">
				No matter your skill level, we believe that worship is a collective
				effort, and every contribution is valuable. If you play another
				instrument, bring it and let's jam together!
			</p>
		{/snippet}
	</MinistryPageContent>

	<div class="mt-16 md:mt-20">
		<p class="eyebrow">For the team</p>
		<h2 class="h2 mt-3 mb-8">Team resources</h2>
		<LandingPageGrid items={data.landingPageItems} />
	</div>
</FccLayout>
