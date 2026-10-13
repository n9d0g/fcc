<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms'
	import { toaster } from '#lib/stores/toaster.js'
	import { BLOG_LIMITS, type BlogPostStatus } from '#lib/schemas/blog.js'

	// Admin publish / reject / unpublish buttons for one post. Posts to the
	// publish, reject and unpublish actions of the page it's rendered on.
	let {
		id,
		status,
		action = '',
	}: {
		id: string
		status: BlogPostStatus
		/** Path prefix for the actions, e.g. "/blog/my-post" */
		action?: string
	} = $props()

	let busy = $state(false)
	let rejecting = $state(false)

	const messages: Record<string, string> = {
		published: 'Post published',
		rejected: 'Sent back to the author',
		draft: 'Post unpublished',
	}

	const submit: SubmitFunction = () => {
		busy = true
		return async ({ result, update }) => {
			busy = false
			await update()
			if (result.type === 'success') {
				rejecting = false
				toaster.success({
					title: messages[String(result.data?.status)] ?? 'Saved',
				})
			} else if (result.type === 'failure') {
				toaster.error({
					title: String(result.data?.message ?? 'Something went wrong.'),
				})
			}
		}
	}
</script>

<div class="flex flex-col gap-3">
	<div class="flex flex-wrap gap-2">
		{#if status === 'published'}
			<form method="POST" action="{action}?/unpublish" use:enhance={submit}>
				<input type="hidden" name="id" value={id} />
				<button class="btn btn-sm btn-outline" disabled={busy}>Unpublish</button>
			</form>
		{:else}
			<form method="POST" action="{action}?/publish" use:enhance={submit}>
				<input type="hidden" name="id" value={id} />
				<button class="btn btn-sm btn-primary" disabled={busy}>Publish</button>
			</form>
			{#if status !== 'rejected'}
				<button
					type="button"
					class="btn btn-sm btn-outline"
					disabled={busy}
					onclick={() => (rejecting = !rejecting)}
					aria-expanded={rejecting}
				>
					Request changes
				</button>
			{/if}
		{/if}
	</div>

	{#if rejecting}
		<form
			method="POST"
			action="{action}?/reject"
			use:enhance={submit}
			class="flex flex-col gap-2"
		>
			<input type="hidden" name="id" value={id} />
			<label class="label flex flex-col gap-1 text-sm">
				<span>Note for the author <span class="text-muted">(optional)</span></span>
				<textarea
					class="textarea min-h-20 text-sm"
					name="note"
					maxlength={BLOG_LIMITS.reviewNote}
					placeholder="What should they change?"
				></textarea>
			</label>
			<button class="btn btn-sm btn-outline self-start" disabled={busy}>
				Send back to author
			</button>
		</form>
	{/if}
</div>
