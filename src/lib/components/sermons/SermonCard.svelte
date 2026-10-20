<script lang="ts">
	import Icon from '@iconify/svelte'
	import { formatCmsDate, getYoutubeId } from '#lib/utils.js'
	import { openSermonModal } from '#lib/stores/modalStore.svelte.js'

	// Svelte 5 props
	let {
		title,
		date,
		speaker,
		scripture,
		youtube,
	}: {
		title: string
		date: string
		speaker: string
		scripture: string
		youtube: string
	} = $props()

	// Derived values
	const youtubeId = $derived(getYoutubeId(youtube))
	const maxResUrl = $derived(
		`https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`
	)
	const fallbackUrl = $derived(
		`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`
	)
	let thumbImg = $state('')

	$effect(() => {
		thumbImg = maxResUrl
	})
	const formattedDate = $derived(formatCmsDate(date))

	const handleSermonClick = () => {
		openSermonModal({ title, date, speaker, scripture, youtube })
	}
</script>

<button
	onclick={handleSermonClick}
	class="group card card-hover flex cursor-pointer flex-col overflow-hidden text-left"
>
	<div class="relative aspect-video w-full overflow-hidden bg-surface-200">
		<img
			src={thumbImg}
			alt=""
			loading="lazy"
			class="size-full object-cover transition-transform duration-500 group-hover:scale-105"
			onerror={() => {
				thumbImg = fallbackUrl
			}}
			onload={(e) => {
				const img = e.currentTarget
				if (img.naturalWidth <= 120) thumbImg = fallbackUrl
			}}
		/>
		<span
			class="absolute inset-0 flex items-center justify-center bg-primary-950/0 transition-colors group-hover:bg-primary-950/30"
			aria-hidden="true"
		>
			<span
				class="flex size-14 scale-90 items-center justify-center rounded-full bg-white/95 text-primary-800 opacity-0 shadow-lg transition-all group-hover:scale-100 group-hover:opacity-100"
			>
				<Icon icon="lucide:play" class="ml-0.5 size-6" />
			</span>
		</span>
	</div>
	<div class="flex flex-1 flex-col gap-3 p-5">
		<p class="text-xs font-semibold tracking-wider text-secondary-700 uppercase">
			{formattedDate}
		</p>
		<h3 class="font-display text-xl leading-snug font-semibold">{title}</h3>
		<div class="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-sm text-muted">
			<span class="inline-flex items-center gap-1.5">
				<Icon icon="lucide:user-round" class="size-3.5" />
				{speaker}
			</span>
			{#if scripture}
				<span class="inline-flex items-center gap-1.5">
					<Icon icon="lucide:book-open" class="size-3.5" />
					{scripture}
				</span>
			{/if}
		</div>
	</div>
</button>
