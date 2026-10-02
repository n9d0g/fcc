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
		welcomeTitle="Welcome to Golden Girls!"
		welcomeText="Join our vibrant community of women as we gather together in faith, friendship, and fellowship. Our group provides a welcoming space where we can encourage one another, share wisdom, and grow deeper in our walk with the Lord through Bible study and prayer."
		meetingSchedule="TBD"
		meetingLocation="Online via Zoom"
		studyTitle="Bible Study & Discussion"
		studyDescription="Growing together in God's Word"
		howToJoinText="Whether you're new to Bible study or have been studying for years, you're welcome to join us! We'd love to have you be a part of our community."
		contactInfo="For more information, please reach out to Sister Ivy Metal or visit us on a Sunday service."
		zoomLink={links.zoom.link}
		zoomMeetingId={links.zoom.meetingId}
		zoomPasscode={links.zoom.passcode}
		{gallery}
	/>
</FccLayout>
