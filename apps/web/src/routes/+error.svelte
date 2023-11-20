<script lang="ts">
	import { page } from '$app/stores'
	import FccLayout from '$lib/components/FccLayout.svelte'
	import { breadcrumbs } from '$lib/constants'

	const title = 'FCC | 404'
	const breadcrumb = [breadcrumbs.home, breadcrumbs.error]
	const headData = {
		title: 'FCC | 404',
		description: 'This page does not exist.',
	}
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<section
		class="my-4 flex min-h-[50vh] flex-col items-center justify-center gap-8 text-center"
	>
		<h1 class="h1 text-4xl md:text-6xl lg:text-9xl">
			{$page.status}: {$page.error?.message}
		</h1>
		<h2 class="h2">Whoops! Looks like this page doesn't exist.</h2>
		<h3 class="h3">Try one of these pages instead:</h3>
		<div
			class="flex flex-col gap-4 lg:flex-row"
			data-sveltekit-preload-data="hover"
		>
			<a href="/" class="anchor">Home</a>
			<a href="/about" class="anchor">About</a>
			<a href="/sermons" class="anchor">Sermons</a>
			<a href="/ministries" class="anchor">Ministries</a>
			<a href="/small-groups" class="anchor">Small Groups</a>
			<a href="/give" class="anchor">Give</a>
		</div>
	</section>
</FccLayout>
