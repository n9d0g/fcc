<script lang="ts">
	import FccLayout from '#lib/components/FccLayout.svelte'
	import Icon from '@iconify/svelte'
	import { enhance, type SubmitFunction } from '$app/forms'
	import { BLOG_LIMITS, POST_STATUS_LABEL } from '#lib/schemas/blog.js'
	import type { ActionData, PageData } from './$types'

	let { data, form }: { data: PageData; form: ActionData } = $props()

	let post = $derived(data.post)

	let pending = $state<'draft' | 'submit' | 'delete' | null>(null)
	// Seeded from the saved post whenever a different post loads. Failed
	// submits don't reload data, so the author's unsaved text is kept.
	let body = $state('')
	let excerpt = $state('')
	$effect.pre(() => {
		body = data.post?.body ?? ''
		excerpt = data.post?.excerpt ?? ''
	})

	const errors = $derived(form?.errors ?? {})
	const locked = $derived(post?.status === 'published')

	const submit: SubmitFunction = ({ submitter, cancel }) => {
		const intent = submitter?.getAttribute('value') ?? 'draft'
		if (
			intent === 'delete' &&
			!confirm('Delete this post? This cannot be undone.')
		) {
			cancel()
			return
		}
		pending = intent as typeof pending
		return async ({ update }) => {
			pending = null
			await update({ reset: false })
		}
	}
</script>

<FccLayout heading={data.post ? 'Edit Post.' : 'New Post.'}>
	<section class="mx-auto max-w-3xl">
		{#if locked && post}
			<div class="card flex flex-col items-center gap-6 p-8 text-center sm:p-12">
				<span class="icon-chip size-14">
					<Icon icon="lucide:lock" class="size-6" />
				</span>
				<p class="max-w-md text-lg">
					This post is published and can no longer be edited. Contact a blog
					reviewer if it needs changes.
				</p>
				<a href="/blog/{post.slug}" class="btn btn-primary">View post</a>
			</div>
		{:else}
			{#if post}
				<p class="text-muted mb-4 text-sm">
					Status: <span class="font-medium text-ink">{POST_STATUS_LABEL[post.status]}</span>
					{#if post.status === 'pending'}
						· Saving changes keeps it in the review queue unless you save it as a
						draft.
					{/if}
				</p>
				{#if post.status === 'rejected' && post.review_note}
					<p
						class="mb-6 rounded-xl border border-warning-300 bg-warning-50 px-4 py-3 text-sm whitespace-pre-line text-warning-900"
					>
						<span class="font-semibold">Reviewer note:</span>
						{post.review_note}
					</p>
				{/if}
			{/if}

			<form
				method="POST"
				action="?/save"
				use:enhance={submit}
				aria-busy={!!pending}
				class="card flex flex-col gap-6 p-5 sm:p-8"
			>
				<label class="label flex flex-col gap-2">
					<span>Title</span>
					<input
						class="input text-lg"
						name="title"
						maxlength={BLOG_LIMITS.title}
						value={form?.values?.title ?? post?.title ?? ''}
						aria-invalid={!!errors.title}
						required
					/>
					{#if errors.title}
						<p class="text-sm text-error-600">{errors.title}</p>
					{/if}
				</label>

				<label class="label flex flex-col gap-2">
					<span>Summary <span class="text-muted">(optional)</span></span>
					<textarea
						class="textarea min-h-20 resize-y"
						name="excerpt"
						rows="2"
						maxlength={BLOG_LIMITS.excerpt}
						placeholder="One or two sentences shown on the blog page. Leave blank to use the start of your post."
						bind:value={excerpt}
					></textarea>
					<div class="flex items-start justify-between gap-4 text-sm">
						<p class="text-error-600">{errors.excerpt ?? ''}</p>
						<p class="text-muted shrink-0 tabular-nums">
							{excerpt.length}/{BLOG_LIMITS.excerpt}
						</p>
					</div>
				</label>

				<label class="label flex flex-col gap-2">
					<span>Post</span>
					<textarea
						class="textarea min-h-96 resize-y leading-relaxed"
						name="body"
						rows="18"
						maxlength={BLOG_LIMITS.body}
						aria-invalid={!!errors.body}
						aria-describedby="body-help"
						bind:value={body}
						required
					></textarea>
					<div class="flex items-start justify-between gap-4 text-sm">
						<p id="body-help" class="text-muted">
							Leave a blank line between paragraphs. Start a line with
							<code>## </code> for a heading or <code>- </code> for a bullet point.
						</p>
						<p class="text-muted shrink-0 tabular-nums">
							{body.length.toLocaleString()}/{BLOG_LIMITS.body.toLocaleString()}
						</p>
					</div>
					{#if errors.body}
						<p class="text-sm text-error-600">{errors.body}</p>
					{/if}
				</label>

				{#if form?.message}
					<p
						class="rounded-xl border border-error-200 bg-error-50 px-4 py-3 text-sm text-error-700"
						role="alert"
					>
						{form.message}
					</p>
				{/if}

				<!-- Save draft comes first so pressing Enter saves rather than deletes -->
				<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
					<button
						class="btn btn-outline"
						name="intent"
						value="draft"
						disabled={!!pending}
					>
						{pending === 'draft' ? 'Saving…' : 'Save draft'}
					</button>
					<button
						class="btn btn-primary"
						name="intent"
						value="submit"
						disabled={!!pending}
					>
						<Icon icon="lucide:send" class="size-4" />
						{pending === 'submit' ? 'Sending…' : 'Submit for approval'}
					</button>
					{#if post}
						<button
							class="btn btn-sm text-error-600 hover:bg-error-50 sm:order-first sm:mr-auto"
							formaction="?/delete"
							formnovalidate
							value="delete"
							disabled={!!pending}
						>
							<Icon icon="lucide:trash-2" class="size-4" />
							{pending === 'delete' ? 'Deleting…' : 'Delete'}
						</button>
					{/if}
				</div>
			</form>
		{/if}
	</section>
</FccLayout>
