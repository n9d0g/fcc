<script lang="ts">
	import FccLayout from '#lib/components/FccLayout.svelte'
	import SermonCard from '#lib/components/sermons/SermonCard.svelte'
</script>

<FccLayout heading="FCC Fall Retreat 2024">
	<div class="space-y-16">
		<div>
			<h2 class="h2 mb-8">Sessions</h2>
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
			<h2 class="h2 mb-8">Worksheets</h2>

			<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
				<a
					href="/pdf/2024/fall-retreat/session-1.pdf"
					class="card card-hover flex items-center gap-3 p-4 font-medium"
					target="_blank"
				>
					<span class="icon-chip size-9 text-base">📄</span>
					Session #1 worksheet
				</a>
				<a
					href="/pdf/2024/fall-retreat/session-2.pdf"
					class="card card-hover flex items-center gap-3 p-4 font-medium"
					target="_blank"
				>
					<span class="icon-chip size-9 text-base">📄</span>
					Session #2 worksheet
				</a>
				<a
					href="/pdf/2024/fall-retreat/session-3.pdf"
					class="card card-hover flex items-center gap-3 p-4 font-medium"
					target="_blank"
				>
					<span class="icon-chip size-9 text-base">📄</span>
					Session #3 worksheet
				</a>
				<a
					href="/pdf/2024/fall-retreat/session-4.pdf"
					class="card card-hover flex items-center gap-3 p-4 font-medium"
					target="_blank"
				>
					<span class="icon-chip size-9 text-base">📄</span>
					Session #4 worksheet
				</a>
			</div>
		</div>
	</div>
</FccLayout>
