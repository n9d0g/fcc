<script lang="ts">
	import FccLayout from '#lib/components/FccLayout.svelte'
	import PostReview from '#lib/components/blog/PostReview.svelte'
	import { enhance, type SubmitFunction } from '$app/forms'
	import { toaster } from '#lib/stores/toaster.js'
	import { postExcerpt } from '#lib/schemas/blog.js'
	import { format } from 'date-fns'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()

	let busyId = $state<string | null>(null)

	const pendingAuthors = $derived(data.authors.filter((a) => a.status === 'pending'))
	const reviewedAuthors = $derived(data.authors.filter((a) => a.status !== 'pending'))
	const pendingPosts = $derived(data.posts.filter((p) => p.status === 'pending'))
	const publishedPosts = $derived(data.posts.filter((p) => p.status === 'published'))

	const badge = {
		pending: 'bg-warning-100 text-warning-800',
		approved: 'bg-success-100 text-success-800',
		rejected: 'bg-surface-200 text-muted',
	} as const

	const authorSubmit =
		(id: string, name: string): SubmitFunction =>
		() => {
			busyId = id
			return async ({ result, update }) => {
				busyId = null
				await update()
				if (result.type === 'success') {
					const approved = result.data?.status === 'approved'
					toaster.success({
						title: approved ? `${name} can now write` : `${name} declined`,
					})
				} else if (result.type === 'failure') {
					toaster.error({
						title: String(result.data?.message ?? 'Something went wrong.'),
					})
				}
			}
		}
</script>

{#snippet authorCard(a: PageData['authors'][number])}
	<li class="card flex flex-col gap-4 p-5 sm:flex-row sm:items-start">
		<div class="min-w-0 flex-1 space-y-1">
			<div class="flex flex-wrap items-center gap-2">
				<span class="font-semibold text-ink">{a.full_name}</span>
				<span class="rounded-full px-2 py-0.5 text-xs font-medium capitalize {badge[a.status]}">
					{a.status}
				</span>
			</div>
			<a href="mailto:{a.email}" class="anchor text-sm">{a.email}</a>
			{#if a.message}
				<p class="text-muted text-sm whitespace-pre-line">{a.message}</p>
			{/if}
			<p class="text-muted text-xs">
				Requested {format(new Date(a.created_at), 'MMM d, yyyy')}
			</p>
		</div>
		<div class="flex shrink-0 gap-2">
			{#if a.status !== 'approved'}
				<form method="POST" action="?/approveAuthor" use:enhance={authorSubmit(a.id, a.full_name)}>
					<input type="hidden" name="id" value={a.id} />
					<button class="btn btn-sm btn-primary" disabled={busyId === a.id}>Approve</button>
				</form>
			{/if}
			{#if a.status !== 'rejected'}
				<form method="POST" action="?/rejectAuthor" use:enhance={authorSubmit(a.id, a.full_name)}>
					<input type="hidden" name="id" value={a.id} />
					<button class="btn btn-sm btn-outline" disabled={busyId === a.id}>
						{a.status === 'approved' ? 'Revoke' : 'Decline'}
					</button>
				</form>
			{/if}
		</div>
	</li>
{/snippet}

{#snippet postCard(p: PageData['posts'][number])}
	<li class="card flex flex-col gap-4 p-5">
		<div class="space-y-1">
			<a href="/blog/{p.slug}" class="font-semibold text-ink hover:underline">{p.title}</a>
			<p class="text-sm">By {p.author_name}</p>
			<p class="text-muted line-clamp-2 text-sm">{postExcerpt(p)}</p>
			<p class="text-muted text-xs">
				{p.status === 'published' && p.published_at
					? `Published ${format(new Date(p.published_at), 'MMM d, yyyy')}`
					: p.submitted_at
						? `Submitted ${format(new Date(p.submitted_at), 'MMM d, yyyy')}`
						: ''}
			</p>
		</div>
		<PostReview id={p.id} status={p.status} />
	</li>
{/snippet}

<FccLayout heading="Blog Approvals.">
	<section class="space-y-12">
		<div>
			<p class="eyebrow">Needs review</p>
			<h2 class="h2 mt-3 mb-6">Posts ({pendingPosts.length})</h2>
			{#if pendingPosts.length}
				<ul class="space-y-4">
					{#each pendingPosts as p (p.id)}
						{@render postCard(p)}
					{/each}
				</ul>
			{:else}
				<p class="text-muted">No posts waiting for approval. 🎉</p>
			{/if}
		</div>

		<div>
			<p class="eyebrow">Needs review</p>
			<h2 class="h2 mt-3 mb-6">Author requests ({pendingAuthors.length})</h2>
			{#if pendingAuthors.length}
				<ul class="space-y-4">
					{#each pendingAuthors as a (a.id)}
						{@render authorCard(a)}
					{/each}
				</ul>
			{:else}
				<p class="text-muted">No pending author requests.</p>
			{/if}
		</div>

		{#if publishedPosts.length}
			<div>
				<p class="eyebrow">Live</p>
				<h2 class="h2 mt-3 mb-6">Published posts</h2>
				<ul class="space-y-4">
					{#each publishedPosts as p (p.id)}
						{@render postCard(p)}
					{/each}
				</ul>
			</div>
		{/if}

		{#if reviewedAuthors.length}
			<div>
				<p class="eyebrow">History</p>
				<h2 class="h2 mt-3 mb-6">Authors</h2>
				<ul class="space-y-4">
					{#each reviewedAuthors as a (a.id)}
						{@render authorCard(a)}
					{/each}
				</ul>
			</div>
		{/if}
	</section>
</FccLayout>
