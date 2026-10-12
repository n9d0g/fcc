<script lang="ts">
	import {
		Body,
		Button,
		Container,
		Head,
		Heading,
		Hr,
		Html,
		Link,
		Preview,
		Section,
		Text,
	} from '@better-svelte-email/components'

	let {
		name,
		email,
		message,
		submittedAt,
	}: {
		name: string
		email: string
		message: string
		submittedAt: string
	} = $props()
</script>

<Html>
	<Head />
	<Preview preview={`${name}: ${message}`} />
	<Body class="m-0 bg-slate-100 px-2 py-8 font-sans">
		<Container class="mx-auto w-full max-w-[560px]">
			<Section class="rounded-t-lg bg-brand px-6 py-5">
				<Text class="m-0 text-xs font-semibold tracking-widest text-brand-light uppercase">
					Freedom in Christ Church
				</Text>
				<Heading as="h1" class="m-0 mt-1 text-2xl font-bold text-white">
					New contact form message
				</Heading>
			</Section>

			<Section class="rounded-b-lg bg-white px-6 py-6">
				<Text class="m-0 text-xs font-semibold tracking-wide text-slate-500 uppercase">
					From
				</Text>
				<Text class="m-0 mt-1 text-base font-semibold text-slate-900">{name}</Text>
				<Link href={`mailto:${email}`} class="text-sm text-brand-dark underline">
					{email}
				</Link>

				<Hr class="my-6 border-slate-200" />

				<Text class="m-0 text-xs font-semibold tracking-wide text-slate-500 uppercase">
					Message
				</Text>
				<Text
					class="m-0 mt-2 rounded-md border-0 border-l-4 border-solid border-brand bg-slate-50 px-4 py-3 text-base leading-6 text-slate-800"
				>
					{#each message.split(/\r?\n/) as line, i}{#if i > 0}<br />{/if}{line}{/each}
				</Text>

				<Section class="mt-6">
					<Button
						href={`mailto:${email}?subject=${encodeURIComponent('Re: Your message to Freedom in Christ Church')}`}
						pX={20}
						pY={12}
						class="rounded-md bg-brand text-sm font-semibold text-white"
					>
						Reply to {name}
					</Button>
				</Section>
			</Section>

			<Text class="mt-4 text-center text-xs text-slate-500">
				Sent from the contact form on
				<Link href="https://fcccanada.ca/contact" class="text-slate-500 underline">
					fcccanada.ca
				</Link>
				· {submittedAt}
			</Text>
		</Container>
	</Body>
</Html>
