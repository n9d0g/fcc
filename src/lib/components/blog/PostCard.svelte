<script lang="ts">
	import { postExcerpt, readingMinutes } from '#lib/schemas/blog.js'
	import { format } from 'date-fns'

	let {
		post,
	}: {
		post: {
			slug: string
			title: string
			excerpt: string
			body: string
			author_name: string
			published_at: string | null
		}
	} = $props()
</script>

<article class="card group relative flex h-full flex-col gap-3 p-6 transition hover:shadow-lift">
	<p class="text-muted text-xs">
		{#if post.published_at}
			<time datetime={post.published_at}>
				{format(new Date(post.published_at), 'MMM d, yyyy')}
			</time>
			·
		{/if}
		{readingMinutes(post.body)} min read
	</p>
	<h3 class="h4 leading-snug">
		<a
			href="/blog/{post.slug}"
			class="after:absolute after:inset-0 group-hover:underline"
			data-sveltekit-preload-data="hover"
		>
			{post.title}
		</a>
	</h3>
	<p class="text-muted line-clamp-3 flex-1 text-sm">{postExcerpt(post)}</p>
	<p class="text-sm font-medium">By {post.author_name}</p>
</article>
