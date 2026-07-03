<script lang="ts">
	import PhotoGallery from '$lib/components/PhotoGallery.svelte'
	import type { GalleryPhoto } from '$lib/types'

	let {
		welcomeTitle,
		welcomeText,
		meetingSchedule,
		meetingLocation,
		studyTitle,
		studyDescription,
		howToJoinText,
		contactInfo,
		zoomLink,
		zoomMeetingId,
		zoomPasscode,
		gallery,
	}: {
		welcomeTitle: string
		welcomeText: string
		meetingSchedule: string
		meetingLocation: string
		studyTitle: string
		studyDescription: string
		howToJoinText: string
		contactInfo: string
		zoomLink: string
		zoomMeetingId: string
		zoomPasscode: string
		gallery?: { photos: GalleryPhoto[] } | null
	} = $props()
</script>

<div class="mb-8">
	<h2 class="h2 mb-4 font-bold">{welcomeTitle}</h2>
	<p class="text-lg">{welcomeText}</p>
</div>

<div class="card mb-8 bg-white p-5 dark:bg-surface-800">
	<div class="flex flex-wrap items-center gap-4">
		<div class="flex items-center gap-3">
			<span
				class="preset-filled-primary-500 flex h-10 w-10 items-center justify-center rounded-full text-xl"
			>
				💻
			</span>
			<div>
				<p class="font-semibold">Zoom Meeting</p>
				<p class="text-sm opacity-70">
					Meeting ID: {zoomMeetingId} | Passcode: {zoomPasscode}
				</p>
			</div>
		</div>
		<a href={zoomLink} target="_blank" rel="noopener noreferrer" class="preset-filled btn">
			Join Zoom Meeting
		</a>
	</div>
</div>

<div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
	<div class="card bg-white p-5 dark:bg-surface-800">
		<div class="mb-3 flex items-center gap-3">
			<span
				class="preset-filled-primary-500 flex h-10 w-10 items-center justify-center rounded-full text-xl"
			>
				📅
			</span>
			<h3 class="h4 font-bold">When We Meet</h3>
		</div>
		<div class="flex flex-col gap-1 opacity-80">
			<p class="font-semibold">{meetingSchedule}</p>
			<p>{meetingLocation}</p>
		</div>
	</div>

	<div class="card bg-white p-5 dark:bg-surface-800">
		<div class="mb-3 flex items-center gap-3">
			<span
				class="preset-filled-primary-500 flex h-10 w-10 items-center justify-center rounded-full text-xl"
			>
				📖
			</span>
			<h3 class="h4 font-bold">What We Study</h3>
		</div>
		<div class="flex flex-col gap-1 opacity-80">
			<p class="font-semibold">{studyTitle}</p>
			<p>{studyDescription}</p>
		</div>
	</div>
</div>

<div class="card mb-8 bg-white p-6 dark:bg-surface-800">
	<h3 class="h3 mb-3 font-bold">How to Join</h3>
	<p class="mb-2">{howToJoinText}</p>
	<p>{contactInfo}</p>
</div>

{#if gallery?.photos}
	<PhotoGallery photos={gallery.photos} />
{/if}
