<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import SmallGroupPageContent from '$lib/components/small-groups/SmallGroupPageContent.svelte'
	import type { PageGallery, PageLayoutData } from '$lib/types'

	let { data }: { data: PageLayoutData & { gallery: PageGallery | null; links: typeof import('$lib/config').links } } =
		$props()
	let title = $derived(data.title)
	let breadcrumb = $derived(data.breadcrumb)
	let headData = $derived(data.headData)
	let gallery = $derived(data.gallery)
	let links = $derived(data.links)
</script>

<FccLayout {title} {breadcrumb} {headData}>
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
