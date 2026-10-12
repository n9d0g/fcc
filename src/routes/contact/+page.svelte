<script lang="ts">
	import FccLayout from '#lib/components/FccLayout.svelte'
	import {
		CONTACT_LIMITS,
		contactSchema,
		type ContactField,
	} from '#lib/schemas/contact.js'
	import { PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY } from '$app/env/public'
	import { enhance, type SubmitFunction } from '$app/forms'
	import { tick } from 'svelte'
	import type { ActionData } from './$types.js'

	type Grecaptcha = {
		ready: (_callback: () => void) => void
		execute: (_siteKey: string, _opts: { action: string }) => Promise<string>
	}

	let { data, form }: { data: any; form: ActionData } = $props()

	let title = $derived(data.title)
	let breadcrumb = $derived(data.breadcrumb)
	let headData = $derived(data.headData)

	// Skeleton draws field edges with a ring, so tint the ring for invalid fields
	const fieldClass = 'w-full rounded-md aria-invalid:ring-error-500!'

	const fields: ContactField[] = ['name', 'email', 'message']

	type FormState = {
		values: Record<ContactField, string>
		errors: Partial<Record<ContactField, string>>
		message: string
	}

	// Seed local state from a server response (also used during SSR, so errors
	// render for no-JS submissions where effects never run).
	const fromForm = (f: ActionData): FormState => ({
		values: {
			name: f?.values?.name ?? '',
			email: f?.values?.email ?? '',
			message: f?.values?.message ?? '',
		},
		errors: { ...f?.errors },
		message: f?.message ?? '',
	})

	// Values and errors live locally so validation can react as the user types
	// svelte-ignore state_referenced_locally
	const initial = { ...fromForm(form), submitted: !!form?.values }
	let values = $state(initial.values)
	let errors = $state(initial.errors)
	let formMessage = $state(initial.message)
	let pending = $state(false)
	let submitted = $state(initial.submitted)
	let formEl = $state<HTMLFormElement>()

	$effect(() => {
		if (form?.values) {
			;({ values, errors, message: formMessage } = fromForm(form))
			submitted = true
		}
	})

	const validate = (only?: ContactField) => {
		const result = contactSchema.safeParse(values)
		const next: Partial<Record<ContactField, string>> = {}
		if (!result.success) {
			for (const issue of result.error.issues) {
				const key = issue.path[0] as ContactField
				next[key] ??= issue.message
			}
		}
		if (only) {
			errors = { ...errors, [only]: next[only] }
		} else {
			errors = next
		}
		return result.success
	}

	const focusFirstError = async () => {
		await tick()
		const first = fields.find((f) => errors[f])
		if (first) formEl?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
	}

	const getRecaptchaToken = () =>
		new Promise<string>((resolve, reject) => {
			const grecaptcha = (window as unknown as { grecaptcha?: Grecaptcha })
				.grecaptcha
			if (!grecaptcha) {
				reject(new Error('reCAPTCHA not loaded'))
				return
			}
			const timeout = setTimeout(
				() => reject(new Error('reCAPTCHA timed out')),
				10_000
			)
			grecaptcha.ready(() => {
				// execute() returns a Closure thenable without .finally, so adopt it
				// into a native promise (this also catches synchronous throws)
				Promise.resolve()
					.then(() =>
						grecaptcha.execute(PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY, {
							action: 'contact',
						})
					)
					.then(resolve, reject)
					.finally(() => clearTimeout(timeout))
			})
		})

	const submit: SubmitFunction = async ({ formData, cancel }) => {
		submitted = true
		formMessage = ''

		if (!validate()) {
			cancel()
			focusFirstError()
			return
		}

		pending = true
		try {
			formData.set('grecaptcha', await getRecaptchaToken())
		} catch (e) {
			console.error(e)
			pending = false
			formMessage =
				"We couldn't load our spam protection. Please check your connection, disable any blockers for this site, and try again."
			cancel()
			return
		}

		return async ({ result, update }) => {
			pending = false
			if (result.type === 'error') {
				formMessage = 'Something went wrong. Please try again later.'
				return
			}
			await update({ reset: false })
			if (result.type === 'failure') focusFirstError()
		}
	}

	const describedBy = (f: ContactField, extra = '') =>
		[errors[f] ? `${f}-error` : '', extra].filter(Boolean).join(' ') ||
		undefined
</script>

<svelte:head>
	<script
		src={`https://www.google.com/recaptcha/api.js?render=${PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY}`}
		async
		defer
	></script>
</svelte:head>

<FccLayout {title} {breadcrumb} {headData}>
	<section class="flex w-full items-center justify-center px-4 py-6 sm:px-6">
		{#if form?.success}
			<div
				class="border-surface-500 mx-auto flex w-full max-w-2xl flex-col items-center gap-6 rounded-lg border p-6 text-center sm:p-12"
				role="status"
			>
				<p class="max-w-md">
					Thank you for contacting us! An FCC representative will be in contact
					with you soon.
				</p>
				<a href="/" class="btn preset-filled-surface w-full sm:w-auto">
					Back to Homepage
				</a>
			</div>
		{:else}
			<form
				bind:this={formEl}
				method="POST"
				novalidate
				use:enhance={submit}
				aria-busy={pending}
				class="border-surface-500 mx-auto flex w-full max-w-2xl flex-col gap-5 rounded-lg border p-4 sm:p-8 md:p-10"
			>
				<div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
					<label for="contact-name" class="label flex min-w-0 flex-col gap-2">
						<span>Name</span>
						<input
							id="contact-name"
							name="name"
							type="text"
							autocomplete="name"
							placeholder="Your name"
							required
							maxlength={CONTACT_LIMITS.name}
							bind:value={values.name}
							oninput={() => submitted && validate('name')}
							onblur={() => submitted && validate('name')}
							aria-invalid={!!errors.name}
							aria-describedby={describedBy('name')}
							readonly={pending}
							class="input {fieldClass}"
						/>
						{#if errors.name}
							<p id="name-error" class="text-error-500 text-sm">
								{errors.name}
							</p>
						{/if}
					</label>

					<label for="contact-email" class="label flex min-w-0 flex-col gap-2">
						<span>Email</span>
						<input
							id="contact-email"
							name="email"
							type="email"
							inputmode="email"
							autocomplete="email"
							autocapitalize="off"
							spellcheck="false"
							placeholder="you@example.com"
							required
							maxlength={CONTACT_LIMITS.email}
							bind:value={values.email}
							oninput={() => submitted && validate('email')}
							onblur={() => submitted && validate('email')}
							aria-invalid={!!errors.email}
							aria-describedby={describedBy('email')}
							readonly={pending}
							class="input {fieldClass}"
						/>
						{#if errors.email}
							<p id="email-error" class="text-error-500 text-sm">
								{errors.email}
							</p>
						{/if}
					</label>
				</div>

				<label for="contact-message" class="label flex flex-col gap-2">
					<span>Message</span>
					<textarea
						id="contact-message"
						name="message"
						placeholder="How can we help?"
						required
						maxlength={CONTACT_LIMITS.message}
						rows="6"
						bind:value={values.message}
						oninput={() => submitted && validate('message')}
						onblur={() => submitted && validate('message')}
						aria-invalid={!!errors.message}
						aria-describedby={describedBy('message', 'message-count')}
						readonly={pending}
						class="textarea min-h-36 resize-y {fieldClass}"
					></textarea>
					<div class="flex items-start justify-between gap-4 text-sm">
						<p id="message-error" class="text-error-500 min-w-0">
							{errors.message ?? ''}
						</p>
						<p
							id="message-count"
							class="text-surface-600-400 shrink-0 tabular-nums"
						>
							{values.message.length}/{CONTACT_LIMITS.message}
						</p>
					</div>
				</label>

				<div aria-live="polite">
					{#if formMessage}
						<p
							class="border-error-500 bg-error-50 text-error-700 dark:bg-error-950 dark:text-error-200 rounded-md border px-4 py-3 text-sm"
							role="alert"
						>
							{formMessage}
						</p>
					{/if}
				</div>

				<div
					class="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between"
				>
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
					<button
						type="submit"
						class="btn preset-filled w-full shrink-0 sm:w-auto sm:min-w-32"
						disabled={pending}
					>
						{#if pending}
							<span
								class="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
								aria-hidden="true"
							></span>
							Sending…
						{:else}
							Send message
						{/if}
					</button>
				</div>
			</form>
		{/if}
	</section>
</FccLayout>
