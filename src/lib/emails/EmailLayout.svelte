<script lang="ts">
	import {
		Body,
		Container,
		Head,
		Heading,
		Html,
		Preview,
		Section,
		Text,
	} from '@better-svelte-email/components'
	import type { Snippet } from 'svelte'

	let {
		preview,
		title,
		children,
		footer,
	}: {
		preview: string
		title: string
		children: Snippet
		footer: Snippet
	} = $props()
</script>

<Html>
	<Head />
	<Preview {preview} />
	<Body class="m-0 bg-slate-100 px-2 py-8 font-sans">
		<Container class="mx-auto w-full max-w-[560px]">
			<Section class="rounded-t-lg bg-brand px-6 py-5">
				<Text class="m-0 text-xs font-semibold tracking-widest text-brand-light uppercase">
					Freedom in Christ Church
				</Text>
				<Heading as="h1" class="m-0 mt-1 text-2xl font-bold text-white">
					{title}
				</Heading>
			</Section>

			<Section class="rounded-b-lg bg-white px-6 py-6">
				{@render children()}
			</Section>

			<Text class="mt-4 text-center text-xs text-slate-500">
				{@render footer()}
			</Text>
		</Container>
	</Body>
</Html>
