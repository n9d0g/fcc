<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import SermonCard from '$lib/components/sermons/SermonCard.svelte'

	// Svelte 5 props
	let { data }: { data: any } = $props()
	let title = $derived(data.title)
	let breadcrumb = $derived(data.breadcrumb)
	let headData = $derived(data.headData)
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<div class="container mx-auto">
		<div class="mb-8">
			<h2 class="h2 mb-3 font-bold">Sessions</h2>
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
				<SermonCard
					title="Session #1"
					date="2024-10-19"
					speaker="Pastor Benji de Jesus"
					youtube="https://www.youtube.com/watch?v=2JmPtLUf6Yk"
					scripture="Psalm 46:1-3"
				/>
				<SermonCard
					title="Session #2"
					date="2024-10-19"
					speaker="Sis Abi De Jesus"
					youtube="https://www.youtube.com/watch?v=Lqst_2y2yWM"
					scripture="Psalm 19:7-10"
				/>
				<SermonCard
					title="Session #3"
					date="2024-10-19"
					speaker="Pastor Benji de Jesus"
					youtube="https://www.youtube.com/watch?v=0m1iPaqZOCw"
					scripture="Romans 8:28"
				/>
				<SermonCard
					title="Session #4"
					date="2024-10-19"
					speaker="Pastor Benji de Jesus"
					youtube="https://www.youtube.com/watch?v=8hg1PEYO9-g"
					scripture="Romans 12:1-2"
				/>
			</div>
		</div>

		<div>
			<h2 class="h2 mb-3 font-bold">Worksheets</h2>

			<div class="flex flex-col gap-2">
				<a
					href="/pdf/2024/fall-retreat/session-1.pdf"
					class="anchor w-fit"
					target="_blank"
				>
					Session #1
				</a>
				<a
					href="/pdf/2024/fall-retreat/session-2.pdf"
					class="anchor w-fit"
					target="_blank"
				>
					Session #2
				</a>
				<a
					href="/pdf/2024/fall-retreat/session-3.pdf"
					class="anchor w-fit"
					target="_blank"
				>
					Session #3
				</a>
				<a
					href="/pdf/2024/fall-retreat/session-4.pdf"
					class="anchor w-fit"
					target="_blank"
				>
					Session #4
				</a>
			</div>
		</div>
	</div>
</FccLayout>
