<script lang="ts">
	import { addDays } from 'date-fns'

	export let banner: App.Banner

	const eventDate = addDays(new Date(banner.date), 1)
	const datePassed = eventDate > new Date()
</script>

{#if datePassed}
	<div class="bg-surface-100-800-token w-full">
		<div class="container mx-auto py-4 text-center">
			<p class="text-xs font-bold md:text-base">
				{#each banner.body[0].children as child}
					{#if child.marks.length > 0}
						<a class="anchor" href={banner.body[0].markDefs[0].href}>
							{child.text}
						</a>
					{:else}
						{child.text}
					{/if}
				{/each}
			</p>
		</div>
	</div>
{/if}
