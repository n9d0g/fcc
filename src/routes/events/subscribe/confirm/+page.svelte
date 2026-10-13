<script lang="ts">
	import FccLayout from '#lib/components/FccLayout.svelte'
	import Icon from '@iconify/svelte'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()
</script>

<svelte:head><meta name="robots" content="noindex" /></svelte:head>

<FccLayout title={data.title} breadcrumb={data.breadcrumb} headData={data.headData}>
	<div class="card mx-auto flex max-w-xl flex-col items-center gap-6 p-8 text-center sm:p-12">
		<span class="icon-chip size-14">
			<Icon icon={data.confirmed ? 'lucide:bell-ring' : 'lucide:link-2-off'} class="size-6" />
		</span>
		<p class="max-w-md text-lg">
			{data.confirmed
				? "Thanks for confirming! We'll email you whenever a new FCC event is added, with a link to add it to your calendar."
				: "That confirmation link isn't valid anymore. Sign up again on the events page and we'll send a new one."}
		</p>
		<a href="/events" class="btn btn-primary">See upcoming events</a>
	</div>
</FccLayout>
