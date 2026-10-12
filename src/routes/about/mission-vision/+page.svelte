<script lang="ts">
	import FccLayout from '#lib/components/FccLayout.svelte'
	import Icon from '@iconify/svelte'

	// Svelte 5 props
	let { data }: { data: any } = $props()
	let title = $derived(data.title)
	let headData = $derived(data.headData)
	let breadcrumb = $derived(data.breadcrumb)
	let missionVision = $derived(data.missionVision)
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<div class="grid gap-6 md:grid-cols-2">
		<div class="relative isolate overflow-hidden rounded-3xl bg-primary-800 p-8 md:p-12">
			<Icon
				icon="lucide:target"
				class="absolute -right-6 -bottom-6 -z-10 size-48 text-primary-700"
			/>
			<p class="eyebrow text-secondary-300">Our mission</p>
			<p class="mt-5 font-display text-2xl leading-snug text-white md:text-3xl">
				{missionVision.mission}
			</p>
		</div>
		<div class="relative isolate overflow-hidden rounded-3xl border border-secondary-200 bg-secondary-50 p-8 md:p-12">
			<Icon
				icon="lucide:eye"
				class="absolute -right-6 -bottom-6 -z-10 size-48 text-secondary-100"
			/>
			<p class="eyebrow">Our vision</p>
			<p class="mt-5 font-display text-2xl leading-snug text-ink md:text-3xl">
				{missionVision.vision}
			</p>
		</div>
	</div>
</FccLayout>
