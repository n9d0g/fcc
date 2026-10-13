<script lang="ts">
	import FccLayout from '#lib/components/FccLayout.svelte'
	import PostReview from '#lib/components/blog/PostReview.svelte'
	import Icon from '@iconify/svelte'
	import {
		POST_STATUS_LABEL,
		parseBody,
		readingMinutes,
	} from '#lib/schemas/blog.js'
	import { format } from 'date-fns'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()

	let title = $derived(data.title)
	let breadcrumb = $derived(data.breadcrumb)
	let headData = $derived(data.headData)
	let post = $derived(data.post)

	const blocks = $derived(parseBody(post.body))
</script>

<svelte:head>
	{#if post.status !== 'published'}
		<meta name="robots" content="noindex" />
	{/if}
</svelte:head>

<FccLayout {title} {breadcrumb} {headData}>
	<article class="mx-auto max-w-2xl">
		{#if post.status !== 'published'}
			<div
				class="mb-8 flex flex-col gap-4 rounded-2xl border border-warning-300 bg-warning-50 p-5"
				role="status"
			>
				<p class="flex items-center gap-2 font-semibold text-warning-800">
					<Icon icon="lucide:eye-off" class="size-4" />
					Preview · {POST_STATUS_LABEL[post.status]}
				</p>
				<p class="text-sm text-warning-800">
					Only you{data.canReview ? ', the author' : ''} and the blog reviewers can
					see this post until it's published.
				</p>
				{#if post.review_note && (data.isAuthor || data.canReview)}
					<p class="text-sm whitespace-pre-line text-warning-900">
						<span class="font-semibold">Reviewer note:</span>
						{post.review_note}
					</p>
				{/if}
				{#if data.isAuthor}
					<a href="/blog/write/{post.id}" class="btn btn-sm btn-outline self-start">
						<Icon icon="lucide:pencil" class="size-4" />
						Edit post
					</a>
				{/if}
			</div>
		{/if}

		{#if data.canReview}
			<div class="card mb-8 p-5">
				<p class="eyebrow mb-3">Review</p>
				<PostReview id={post.id} status={post.status} />
			</div>
		{/if}

		<p class="text-muted mb-8 text-sm">
			By <span class="font-medium text-ink">{post.author_name}</span>
			{#if post.published_at}
				· <time datetime={post.published_at}>
					{format(new Date(post.published_at), 'MMMM d, yyyy')}
				</time>
			{/if}
			· {readingMinutes(post.body)} min read
		</p>

		<div class="space-y-5 text-lg leading-relaxed">
			{#each blocks as block, i (i)}
				{#if block.type === 'heading'}
					<h2 class="h3 pt-4">{block.text}</h2>
				{:else if block.type === 'list'}
					<ul class="list-disc space-y-2 pl-6">
						{#each block.items as item, j (j)}
							<li>{item}</li>
						{/each}
					</ul>
				{:else}
					<p>
						{#each block.lines as line, j (j)}{#if j > 0}<br />{/if}{line}{/each}
					</p>
				{/if}
			{/each}
		</div>

		<div class="mt-12 border-t border-line pt-8">
			<a href="/blog" class="btn btn-outline">
				<Icon icon="lucide:arrow-left" class="size-4" />
				All posts
			</a>
		</div>
	</article>
</FccLayout>
