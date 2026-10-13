<script lang="ts">
	import { Button, Hr, Link, Section, Text } from '@better-svelte-email/components'
	import EmailLayout from './EmailLayout.svelte'

	let {
		authorName,
		email,
		title,
		excerpt,
		reviewUrl,
		submittedAt,
	}: {
		authorName: string
		email: string
		title: string
		excerpt: string
		reviewUrl: string
		submittedAt: string
	} = $props()
</script>

<EmailLayout
	preview={`${authorName} submitted "${title}" for approval`}
	title="Blog post awaiting approval"
>
	<Text class="m-0 text-xs font-semibold tracking-wide text-slate-500 uppercase">
		Author
	</Text>
	<Text class="m-0 mt-1 text-base font-semibold text-slate-900">{authorName}</Text>
	<Link href={`mailto:${email}`} class="text-sm text-brand-dark underline">
		{email}
	</Link>

	<Hr class="my-6 border-slate-200" />

	<Text class="m-0 text-xs font-semibold tracking-wide text-slate-500 uppercase">
		Post
	</Text>
	<Text class="m-0 mt-2 text-lg font-semibold text-slate-900">{title}</Text>
	<Text class="m-0 mt-2 text-base leading-6 text-slate-700">{excerpt}</Text>

	<Section class="mt-6">
		<Button
			href={reviewUrl}
			pX={20}
			pY={12}
			class="rounded-md bg-brand text-sm font-semibold text-white"
		>
			Read and review
		</Button>
	</Section>

	{#snippet footer()}
		Sent from the blog on
		<Link href="https://fcccanada.ca" class="text-slate-500 underline">
			fcccanada.ca
		</Link>
		· {submittedAt}
	{/snippet}
</EmailLayout>
