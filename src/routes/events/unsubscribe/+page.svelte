<script lang="ts">
	import FccLayout from '#lib/components/FccLayout.svelte'
	import Icon from '@iconify/svelte'
	import { enhance } from '$app/forms'
	import type { ActionData, PageData } from './$types'

	let { data, form }: { data: PageData; form: ActionData } = $props()

	let pending = $state(false)
	const done = $derived(!!form && 'unsubscribed' in form)
</script>

<svelte:head><meta name="robots" content="noindex" /></svelte:head>

<FccLayout title={data.title} breadcrumb={data.breadcrumb} headData={data.headData}>
	<div class="card mx-auto flex max-w-xl flex-col items-center gap-6 p-8 text-center sm:p-12">
		<span class="icon-chip size-14">
			<Icon icon={done || data.alreadyUnsubscribed ? 'lucide:bell-off' : 'lucide:bell'} class="size-6" />
		</span>

		{#if done || data.alreadyUnsubscribed}
			<p class="max-w-md text-lg">
				You've been unsubscribed{data.email ? ` (${data.email})` : ''}. You won't get
				any more event emails from us.
			</p>
			<a href="/events" class="btn btn-outline">Back to events</a>
		{:else if data.email}
			<p class="max-w-md text-lg">
				Stop getting emails about new FCC events at <strong>{data.email}</strong>?
			</p>
			<form
				method="POST"
				use:enhance={() => {
					pending = true
					return async ({ update }) => {
						pending = false
						await update()
					}
				}}
			>
				<input type="hidden" name="token" value={data.token} />
				<button class="btn btn-primary" disabled={pending}>
					{pending ? 'Unsubscribing…' : 'Unsubscribe'}
				</button>
			</form>
			{#if form && 'message' in form}
				<p class="text-sm text-error-600" role="alert">{form.message}</p>
			{/if}
		{:else}
			<p class="max-w-md text-lg">
				That unsubscribe link isn't valid. If you keep getting emails you don't want,
				please <a href="/contact" class="anchor">contact us</a>.
			</p>
		{/if}
	</div>
</FccLayout>
