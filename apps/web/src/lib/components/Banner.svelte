<script lang="ts">
	import { addDays } from 'date-fns'

	export let banner: App.Banner

	const estDate = addDays(new Date(banner.date), 1)
	const datePassed = estDate < new Date()
</script>

{#if !datePassed}
	<div class="bg-surface-100-800-token w-full">
		<div class="container mx-auto py-4 text-center">
			<p class="font-bold">
				{banner.bannerText}
			</p>
		</div>
	</div>
{/if}
