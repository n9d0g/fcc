<script lang="ts">
	import FccLayout from '#lib/components/FccLayout.svelte'
	import Icon from '@iconify/svelte'
	import { enhance, type SubmitFunction } from '$app/forms'
	import { page } from '$app/state'
	import { afterNavigate, replaceState } from '$app/navigation'
	import { toaster } from '#lib/stores/toaster.js'
	import { BLOG_LIMITS, POST_STATUS_LABEL } from '#lib/schemas/blog.js'
	import { format } from 'date-fns'
	import type { ActionData, PageData } from './$types'

	let { data, form }: { data: PageData; form: ActionData } = $props()

	let title = $derived(data.title)
	let breadcrumb = $derived(data.breadcrumb)
	let headData = $derived(data.headData)
	let request = $derived(data.request)

	let pending = $state(false)
	let message = $state('')

	const errors = $derived(form?.errors ?? {})
	const values = $derived(form?.values)

	const badge = {
		draft: 'bg-surface-200 text-muted',
		pending: 'bg-warning-100 text-warning-800',
		published: 'bg-success-100 text-success-800',
		rejected: 'bg-error-100 text-error-800',
	} as const

	// The editor redirects here with ?saved=draft|submitted|deleted. afterNavigate
	// (not $effect) so the shallow replaceState below can't re-trigger it.
	afterNavigate(({ to }) => {
		if (!to) return
		const saved = to.url.searchParams.get('saved')
		if (!saved) return
		const toasts: Record<string, { title: string; description?: string }> = {
			draft: { title: 'Draft saved' },
			submitted: {
				title: 'Sent for approval',
				description: "We'll let you know once it's been reviewed.",
			},
			deleted: { title: 'Post deleted' },
		}
		if (toasts[saved]) toaster.success(toasts[saved])
		const url = new URL(to.url)
		url.searchParams.delete('saved')
		replaceState(url, page.state)
	})

	const submit: SubmitFunction = () => {
		pending = true
		return async ({ result, update }) => {
			pending = false
			await update({ reset: false })
			if (result.type === 'success') {
				toaster.success({
					title: 'Request sent!',
					description: "We'll let you know once you can start writing.",
				})
			}
		}
	}
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<section class="mx-auto max-w-3xl">
		{#if request?.status === 'approved'}
			<div class="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
				<p class="lede">Your posts</p>
				<a href="/blog/write/new" class="btn btn-primary">
					<Icon icon="lucide:plus" class="size-4" />
					New post
				</a>
			</div>

			{#if data.posts.length}
				<ul class="space-y-4">
					{#each data.posts as post (post.id)}
						<li class="card flex flex-col gap-3 p-5 sm:flex-row sm:items-start">
							<div class="min-w-0 flex-1 space-y-1">
								<div class="flex flex-wrap items-center gap-2">
									<a href="/blog/{post.slug}" class="font-semibold text-ink hover:underline">
										{post.title}
									</a>
									<span class="rounded-full px-2 py-0.5 text-xs font-medium {badge[post.status]}">
										{POST_STATUS_LABEL[post.status]}
									</span>
								</div>
								<p class="text-muted text-xs">
									{post.published_at
										? `Published ${format(new Date(post.published_at), 'MMM d, yyyy')}`
										: `Last edited ${format(new Date(post.updated_at), 'MMM d, yyyy')}`}
								</p>
								{#if post.status === 'rejected' && post.review_note}
									<p class="text-sm whitespace-pre-line">
										<span class="font-medium">Reviewer note:</span>
										{post.review_note}
									</p>
								{/if}
							</div>
							{#if post.status !== 'published'}
								<a href="/blog/write/{post.id}" class="btn btn-sm btn-outline shrink-0">
									<Icon icon="lucide:pencil" class="size-4" />
									Edit
								</a>
							{/if}
						</li>
					{/each}
				</ul>
			{:else}
				<div class="card flex flex-col items-center gap-4 p-10 text-center">
					<span class="icon-chip size-14">
						<Icon icon="lucide:notebook-pen" class="size-6" />
					</span>
					<p class="text-lg">You haven't written anything yet.</p>
					<a href="/blog/write/new" class="btn btn-primary">Write your first post</a>
				</div>
			{/if}
		{:else if request}
			<div class="card flex flex-col items-center gap-6 p-8 text-center sm:p-12" role="status">
				<span class="icon-chip size-14">
					<Icon
						icon={request.status === 'pending' ? 'lucide:hourglass' : 'lucide:mail'}
						class="size-6"
					/>
				</span>
				<div class="space-y-2">
					<h2 class="h3">
						{request.status === 'pending'
							? 'Your request is in!'
							: "We weren't able to approve your request"}
					</h2>
					<p class="text-muted max-w-md">
						{request.status === 'pending'
							? "Our leaders will review it soon. Once you're approved, you can start writing here."
							: 'Please reach out to us and we would be glad to talk about it.'}
					</p>
				</div>
				<a
					href={request.status === 'pending' ? '/blog' : '/contact'}
					class="btn btn-outline"
				>
					{request.status === 'pending' ? 'Back to the blog' : 'Contact us'}
				</a>
			</div>
		{:else}
			<p class="lede mb-8">
				Share a testimony, a devotional or what God has been teaching you. Request
				access below; once a leader approves it, you can start writing. Every
				post is reviewed before it's published.
			</p>

			<form
				method="POST"
				action="?/requestAccess"
				use:enhance={submit}
				aria-busy={pending}
				class="card flex flex-col gap-6 p-5 sm:p-8"
			>
				<label class="label flex flex-col gap-2">
					<span>Your name</span>
					<input
						class="input"
						name="fullName"
						autocomplete="name"
						placeholder="Shown as the author on your posts"
						maxlength={BLOG_LIMITS.fullName}
						value={values?.fullName ?? data.displayName}
						aria-invalid={!!errors.fullName}
						required
					/>
					{#if errors.fullName}
						<p class="text-sm text-error-600">{errors.fullName}</p>
					{/if}
				</label>

				<label class="label flex flex-col gap-2">
					<span>
						What would you like to write about?
						<span class="text-muted">(optional)</span>
					</span>
					<textarea
						class="textarea min-h-28 resize-y"
						name="message"
						rows="4"
						maxlength={BLOG_LIMITS.message}
						bind:value={message}
					></textarea>
					<div class="flex items-start justify-between gap-4 text-sm">
						<p class="text-error-600">{errors.message ?? ''}</p>
						<p class="text-muted shrink-0 tabular-nums">
							{message.length}/{BLOG_LIMITS.message}
						</p>
					</div>
				</label>

				{#if form?.message}
					<p
						class="rounded-xl border border-error-200 bg-error-50 px-4 py-3 text-sm text-error-700"
						role="alert"
					>
						{form.message}
					</p>
				{/if}

				<button type="submit" class="btn btn-primary btn-lg sm:self-end" disabled={pending}>
					{pending ? 'Sending…' : 'Request access'}
				</button>
			</form>
		{/if}
	</section>
</FccLayout>
