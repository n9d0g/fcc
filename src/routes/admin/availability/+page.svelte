<script lang="ts">
	import FccLayout from '#lib/components/FccLayout.svelte'
	import { formatSunday } from '#lib/schemas/worship-availability.js'
	import { roleLabel } from '#lib/schemas/worship-team.js'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()

	let title = $derived(data.title)
	let breadcrumb = $derived(data.breadcrumb)
	let headData = $derived(data.headData)
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<section>
		<p class="eyebrow">Upcoming</p>
		<h2 class="h2 mt-3 mb-6">Who can't serve</h2>

		{#if data.sundays.length}
			<ul class="space-y-4">
				{#each data.sundays as { sunday, members } (sunday)}
					<li class="card flex flex-col gap-3 p-5 sm:flex-row sm:items-start">
						<p class="w-44 shrink-0 font-semibold text-ink">
							{formatSunday(sunday)}
						</p>
						<ul class="min-w-0 flex-1 space-y-2">
							{#each members as m (m.email)}
								<li class="text-sm">
									<a href="mailto:{m.email}" class="anchor font-medium">
										{m.full_name}
									</a>
									<span class="text-muted">
										· {m.roles.map(roleLabel).join(', ')}
									</span>
								</li>
							{/each}
						</ul>
					</li>
				{/each}
			</ul>
		{:else}
			<p class="text-muted">Everyone is available for the upcoming Sundays. 🎉</p>
		{/if}
	</section>
</FccLayout>
