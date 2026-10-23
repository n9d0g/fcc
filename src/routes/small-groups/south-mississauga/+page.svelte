<script lang="ts">
	import classGraduation from '#lib/assets/community/class-graduation.jpg'
	import FccLayout from '#lib/components/FccLayout.svelte'
	import SmallGroupPageContent from '#lib/components/small-groups/SmallGroupPageContent.svelte'
	import type { PageGallery } from '#lib/types.js'

	let { data }: { data: { gallery: PageGallery | null; links: typeof import('#lib/config/index.js').links } } =
		$props()
	let gallery = $derived(data.gallery)
	let links = $derived(data.links)
</script>

<FccLayout
	heading="South Mississauga Small Group."
	image={classGraduation}
	imageAlt="FCC members gathered together in the church hall"
	imagePosition="center 45%"
>
	<SmallGroupPageContent
		welcomeTitle="Welcome to the South Mississauga Small Group!"
		welcomeText="Join us for fellowship, prayer, and Bible study as we grow together in faith. Our small group provides a welcoming environment where we can connect with one another, study God's Word, and support each other through life's journey."
		meetingSchedule="Check with the group for schedule"
		meetingLocation="Online via Zoom"
		studyTitle="Bible Study & Discussion"
		studyDescription="Growing together in God's Word"
		howToJoinText="Whether you're new to the area or have been part of our church family for years, you're welcome to join us!"
		contactInfo="For more information please reach out to Bro. Bernard Bersamin for more details."
		zoomLink={links.zoom.link}
		zoomMeetingId={links.zoom.meetingId}
		zoomPasscode={links.zoom.passcode}
		{gallery}
	/>
</FccLayout>
