<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import LandingPageGrid from '$lib/components/LandingPageGrid.svelte'
	import MinistryPageContent from '$lib/components/ministries/MinistryPageContent.svelte'
	import type { PageLayoutData } from '$lib/types'

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

<FccLayout {title} {breadcrumb} {headData}>
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
				To join our Praise and Worship Ministry, simply <a
					href="emailto:fcc.church.canada@gmail.com"
					class="anchor">send an email</a
				>
				or
				<a href="https://www.instagram.com/fcc.canada/" class="anchor"
					>message us on our Instagram account</a
				>, expressing your interest. Let us know which instrument you play or if
				you're interested in vocals. We'll be happy to connect with you, provide
				more information, and discuss how you can become a vital part of our
				worship team.
			</p>
			<p>
				Join us as we lift our voices and instruments in harmony, creating an
				atmosphere where God's presence is not only felt but celebrated. We look
				forward to welcoming you into our Praise and Worship family at FCC!
			</p>
			<p class="mt-4 opacity-80">
				No matter your skill level, we believe that worship is a collective
				effort, and every contribution is valuable. If you play another
				instrument, bring it and let's jam together!
			</p>
		{/snippet}
	</MinistryPageContent>

	<LandingPageGrid items={data.landingPageItems} />
</FccLayout>
