<script lang="ts">
	import Icon from '@iconify/svelte'
	import PostCard from '#lib/components/blog/PostCard.svelte'
	import type { ComponentProps } from 'svelte'

	let {
		posts,
	}: { posts: Array<ComponentProps<typeof PostCard>['post'] & { id: string }> } =
		$props()
</script>

<section class="section bg-white">
	<div class="wrap">
		<div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
			<div>
				<p class="eyebrow">From our members</p>
				<h2 class="h2 mt-3">Latest from the blog</h2>
			</div>
			<a
				class="btn btn-outline shrink-0 self-start md:self-auto"
				href="/blog"
				data-sveltekit-preload-data="hover"
			>
				Read the blog
				<Icon icon="lucide:arrow-right" class="size-4" />
			</a>
		</div>
		<div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each posts as post (post.id)}
				<PostCard {post} />
			{/each}
		</div>
	</div>
</section>
