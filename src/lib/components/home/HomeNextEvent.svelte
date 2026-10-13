<script lang="ts">
	import Icon from '@iconify/svelte'
	import { links } from '#lib/config/index.js'

	// Svelte 5 props
	let { pageInfo }: { pageInfo: { invite: string } } = $props()
</script>

<section class="section">
	<div class="wrap">
		<div
			class="grid items-center gap-10 overflow-hidden rounded-[2rem] bg-primary-800 p-6 text-white sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14"
		>
			<div class="order-2 lg:order-1">
				<p class="eyebrow text-secondary-300">Coming up</p>
				<h2 class="h2 mt-3 text-white" data-testid="nextevent-header">
					Next Event
				</h2>
				<p class="mt-4 max-w-md text-lg text-primary-100">
					Here's what's happening next at FCC. Join us in person or tap the invite
					to hop on Zoom.
				</p>
				<div class="mt-8 flex flex-wrap gap-3">
					<a class="btn btn-light btn-lg" href="/events">
						<Icon icon="lucide:calendar" class="size-4" />
						View event calendar
					</a>
					<a
						class="btn btn-glass btn-lg"
						href={links.zoom.link}
						target="_blank"
						rel="noopener noreferrer"
					>
						<Icon icon="lucide:video" class="size-4" />
						Join on Zoom
					</a>
				</div>
			</div>

			<a
				class="order-1 block lg:order-2"
				href={links.zoom.link}
				target="_blank"
				rel="noopener noreferrer"
				data-testid="nextevent-zoom"
				aria-label="Open the event on Zoom"
			>
				<img
					class="mx-auto h-auto max-h-[70vh] w-auto rounded-2xl shadow-2xl ring-1 ring-white/10 transition-transform duration-300 hover:-rotate-1 hover:scale-[1.02]"
					src={pageInfo.invite}
					alt="Invitation for the next FCC event"
					loading="lazy"
				/>
			</a>
		</div>
	</div>
</section>
