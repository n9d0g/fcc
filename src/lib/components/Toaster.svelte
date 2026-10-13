<script lang="ts">
	import { Toast } from '@skeletonlabs/skeleton-svelte'
	import Icon from '@iconify/svelte'
	import { toaster } from '#lib/stores/toaster.js'

	const icons: Record<string, string> = {
		success: 'lucide:party-popper',
		error: 'lucide:circle-alert',
		info: 'lucide:info',
	}
</script>

<Toast.Group {toaster}>
	{#snippet children(toast)}
		<Toast
			{toast}
			class="card flex w-[min(24rem,calc(100vw-2rem))] items-start gap-3 p-4 shadow-lift"
		>
			<span
				class="icon-chip size-9 shrink-0 {toast.type === 'error'
					? 'bg-error-50 text-error-700'
					: ''}"
			>
				<Icon icon={icons[toast.type ?? 'info'] ?? icons.info} class="size-5" />
			</span>
			<Toast.Message class="min-w-0 flex-1">
				<Toast.Title class="font-semibold text-ink">{toast.title}</Toast.Title>
				{#if toast.description}
					<Toast.Description class="text-muted mt-1 text-sm">
						{toast.description}
					</Toast.Description>
				{/if}
			</Toast.Message>
			<Toast.CloseTrigger
				class="text-muted -m-1 cursor-pointer rounded p-1 hover:text-ink"
				aria-label="Dismiss"
			>
				<Icon icon="lucide:x" class="size-4" />
			</Toast.CloseTrigger>
		</Toast>
	{/snippet}
</Toast.Group>
