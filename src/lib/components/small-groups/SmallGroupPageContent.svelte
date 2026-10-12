<script lang="ts">
	import Icon from '@iconify/svelte'
	import PhotoGallery from '#lib/components/PhotoGallery.svelte'
	import type { GalleryPhoto } from '#lib/types.js'

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

<div class="space-y-14">
	<div class="grid gap-10 lg:grid-cols-12 lg:gap-14">
		<!-- Welcome -->
		<div class="lg:col-span-7">
			<h2 class="h2">{welcomeTitle}</h2>
			<p class="lede mt-5">{welcomeText}</p>

			<div class="mt-8 grid gap-4 sm:grid-cols-2">
				<div class="card p-6">
					<span class="icon-chip">
						<Icon icon="lucide:calendar-days" class="size-5" />
					</span>
					<p class="eyebrow mt-5">When we meet</p>
					<p class="mt-2 font-semibold">{meetingSchedule}</p>
					<p class="text-muted">{meetingLocation}</p>
				</div>
				<div class="card p-6">
					<span class="icon-chip">
						<Icon icon="lucide:book-open" class="size-5" />
					</span>
					<p class="eyebrow mt-5">What we study</p>
					<p class="mt-2 font-semibold">{studyTitle}</p>
					<p class="text-muted">{studyDescription}</p>
				</div>
			</div>
		</div>

		<!-- Zoom + join -->
		<aside class="space-y-4 lg:col-span-5">
			<div class="rounded-3xl bg-primary-800 p-7 text-primary-100">
				<span
					class="flex size-11 items-center justify-center rounded-xl bg-white/10 text-secondary-200"
				>
					<Icon icon="lucide:video" class="size-5" />
				</span>
				<p class="mt-5 font-display text-2xl font-semibold text-white">
					Join on Zoom
				</p>
				<dl class="mt-4 space-y-1 text-sm">
					<div class="flex gap-2">
						<dt class="text-primary-300">Meeting ID</dt>
						<dd class="font-semibold text-white">{zoomMeetingId}</dd>
					</div>
					<div class="flex gap-2">
						<dt class="text-primary-300">Passcode</dt>
						<dd class="font-semibold text-white">{zoomPasscode}</dd>
					</div>
				</dl>
				<a
					href={zoomLink}
					target="_blank"
					rel="noopener noreferrer"
					class="btn btn-light mt-6 w-full"
				>
					Open Zoom meeting
					<Icon icon="lucide:arrow-up-right" class="size-4" />
				</a>
			</div>

			<div class="card p-7">
				<h3 class="h4">How to join</h3>
				<p class="mt-3 text-muted">{howToJoinText}</p>
				<p class="mt-3 text-muted">{contactInfo}</p>
			</div>
		</aside>
	</div>

	{#if gallery?.photos}
		<PhotoGallery photos={gallery.photos} />
	{/if}
</div>
