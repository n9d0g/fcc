<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import { PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY } from '$env/static/public'
	import type { ActionData } from './$types.js'
	import type { ActionResult } from '@sveltejs/kit'
	import { applyAction, deserialize } from '$app/forms'

	// Svelte 5 props
	let { data, form }: { data: any; form: ActionData } = $props()

	let title = $derived(data.title)
	let breadcrumb = $derived(data.breadcrumb)
	let headData = $derived(data.headData)
	let formPending = $state(false)

	const handleSubmit = async (e: SubmitEvent) => {
		formPending = true

		const target = e.target as HTMLFormElement
		const formData = new FormData(target)
		const grecaptchaRes: string = await (window as any).grecaptcha.execute(
			PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY,
			{ action: 'submit' }
		)

		formData.append('grecaptcha', grecaptchaRes)

		const res = await fetch(target.action, {
			method: 'POST',
			body: formData,
			headers: {
				'x-sveltekit-action': 'true',
			},
		})

		const result: ActionResult = deserialize(await res.text())

		formPending = false
		applyAction(result)
	}
</script>

<svelte:head>
	<script
		src={`https://www.google.com/recaptcha/api.js?render=${PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY}`}
	></script>
</svelte:head>

<FccLayout {title} {breadcrumb} {headData}>
	<section class="flex items-center justify-center">
		{#if form?.success}
			<div
				class="border-surface-500 mx-auto my-4 flex w-full max-w-2xl flex-col gap-4 rounded border p-4 sm:p-24"
			>
				<p class="mx-auto max-w-sm text-center">
					Thank you for contacting us! An FCC representative will be in contact
					with you soon.
				</p>
				<a href="/" class="btn preset-filled-surface">Back to Homepage</a>
			</div>
		{:else}
			<form
				method="POST"
				onsubmit={(e) => {
					e.preventDefault()
					handleSubmit(e)
				}}
				class="border-surface-500 mx-auto my-4 flex w-full max-w-2xl flex-col gap-4 rounded border p-4 sm:p-10"
			>
				<div class="flex flex-col gap-4">
					<label for="name" class="label flex flex-col gap-2">
						<span>Name</span>
						<input
							name="name"
							type="text"
							placeholder="Name"
							value={form?.name ?? ''}
							class={`${form?.errors?.name && '!border-red-500'} input rounded-md`}
						/>
						{#if form?.errors?.name}
							<p class="text-error-500 text-sm">{form?.errors?.name}</p>
						{/if}
					</label>
					<label for="email" class="label flex flex-col gap-2">
						<span>Email</span>
						<input
							name="email"
							type="text"
							placeholder="Email"
							value={form?.email ?? ''}
							class={`${form?.errors?.email && '!border-red-500'} input rounded-md`}
						/>
						{#if form?.errors?.email}
							{#each form?.errors?.email as error}
								<p class="text-error-500 text-sm">{error}</p>
							{/each}
						{/if}
					</label>

					<label for="message" class="label flex flex-col gap-2">
						<span>Message</span>
						<textarea
							name="message"
							placeholder="Message"
							value={form?.message ?? ''}
							class={`${form?.errors?.message && '!border-red-500'} textarea rounded-md`}
							rows="6"
						></textarea>
						{#if form?.errors?.message}
							<p class="text-error-500 text-sm">{form?.errors?.message}</p>
						{/if}
					</label>

					<p class="text-tertiary-400 text-xs">
						This site is protected by reCAPTCHA and the Google
						<a href="https://policies.google.com/privacy" class="anchor"
							>Privacy Policy</a
						>
						and
						<a href="https://policies.google.com/terms" class="anchor"
							>Terms of Service</a
						> apply.
					</p>
				</div>
				<button type="submit" class="btn preset-filled" disabled={formPending}>
					{formPending ? 'Sending...' : 'Send'}
				</button>
			</form>
		{/if}
	</section>
</FccLayout>
