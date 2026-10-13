<script lang="ts">
	import FccLayout from '#lib/components/FccLayout.svelte'
	import Icon from '@iconify/svelte'
	import { enhance, type SubmitFunction } from '$app/forms'
	import { toaster } from '#lib/stores/toaster.js'
	import {
		WORSHIP_REQUEST_LIMITS,
		WORSHIP_ROLES,
		roleLabel,
	} from '#lib/schemas/worship-team.js'
	import type { ActionData, PageData } from './$types'

	let { data, form }: { data: PageData; form: ActionData } = $props()

	let title = $derived(data.title)
	let breadcrumb = $derived(data.breadcrumb)
	let headData = $derived(data.headData)
	let request = $derived(data.request)

	let pending = $state(false)
	let message = $state('')

	const errors = $derived(form?.errors ?? {})
	const values = $derived(form?.values)

	const status = {
		pending: {
			icon: 'lucide:hourglass',
			heading: 'Your request is in!',
			body: "Thanks for offering to serve. We'll review your request and get back to you soon.",
		},
		approved: {
			icon: 'lucide:music',
			heading: "You're on the worship team!",
			body: 'Welcome to the team. Check the schedule below to see when you are serving.',
		},
		rejected: {
			icon: 'lucide:mail',
			heading: "We weren't able to add you just yet",
			body: 'Please reach out to us and we would be glad to talk about ways to get involved.',
		},
	} as const

	const submit: SubmitFunction = () => {
		pending = true
		return async ({ result, update }) => {
			pending = false
			await update({ reset: false })
			if (result.type === 'success') {
				toaster.success({
					title: 'Request sent!',
					description: "We'll be in touch about joining the worship team.",
				})
			}
		}
	}
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<section class="mx-auto max-w-2xl">
		{#if !data.signedIn}
			<div class="card flex flex-col items-center gap-6 p-8 text-center sm:p-12">
				<span class="icon-chip size-14">
					<Icon icon="lucide:log-in" class="size-6" />
				</span>
				<p class="max-w-md text-lg">
					Log in or create an account to request to join the worship team.
				</p>
				<a href="/login" class="btn btn-primary w-full sm:w-auto">
					Log in or sign up
				</a>
			</div>
		{:else if request}
			{@const s = status[request.status]}
			<div
				class="card flex flex-col items-center gap-6 p-8 text-center sm:p-12"
				role="status"
			>
				<span class="icon-chip size-14">
					<Icon icon={s.icon} class="size-6" />
				</span>
				<div class="space-y-2">
					<h2 class="h3">{s.heading}</h2>
					<p class="text-muted max-w-md">{s.body}</p>
				</div>
				<p class="text-muted text-sm">
					Requested: {request.roles.map(roleLabel).join(', ')}
				</p>
				{#if request.status === 'approved'}
					<div class="flex flex-wrap justify-center gap-2">
						<a href="/ministries/praise/schedule" class="btn btn-primary">
							View the schedule
						</a>
						<a href="/ministries/praise/availability" class="btn btn-outline">
							Block out Sundays
						</a>
					</div>
				{:else if request.status === 'rejected'}
					<a href="/contact" class="btn btn-primary">Contact us</a>
				{:else}
					<a href="/ministries/praise" class="btn btn-outline">
						Back to Praise &amp; Worship
					</a>
				{/if}
			</div>
		{:else}
			<p class="lede mb-8">
				Whether you're an experienced musician or a passionate beginner, we'd
				love to have you. Tell us a bit about how you'd like to serve and we'll
				be in touch.
			</p>

			<form
				method="POST"
				use:enhance={submit}
				aria-busy={pending}
				class="card flex flex-col gap-6 p-5 sm:p-8"
			>
				<label class="label flex flex-col gap-2">
					<span>Your name</span>
					<input
						class="input"
						name="fullName"
						autocomplete="name"
						placeholder="First and last name"
						maxlength={WORSHIP_REQUEST_LIMITS.fullName}
						value={values?.fullName ?? data.displayName}
						aria-invalid={!!errors.fullName}
						required
					/>
					{#if errors.fullName}
						<p class="text-sm text-error-600">{errors.fullName}</p>
					{/if}
				</label>

				<fieldset class="flex flex-col gap-3">
					<legend class="label mb-3">How would you like to serve?</legend>
					<div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
						{#each WORSHIP_ROLES as role (role.value)}
							<label
								class="flex cursor-pointer items-center gap-2 rounded-xl border border-line px-3 py-2.5 text-sm transition hover:bg-surface-100 has-checked:border-primary-500 has-checked:bg-primary-50"
							>
								<input
									type="checkbox"
									name="roles"
									value={role.value}
									checked={values?.roles.includes(role.value)}
									class="checkbox"
								/>
								<span aria-hidden="true">{role.emoji}</span>
								{role.label}
							</label>
						{/each}
					</div>
					{#if errors.roles}
						<p class="text-sm text-error-600">{errors.roles}</p>
					{/if}
				</fieldset>

				<label class="label flex flex-col gap-2">
					<span>Anything else? <span class="text-muted">(optional)</span></span>
					<textarea
						class="textarea min-h-28 resize-y"
						name="message"
						rows="4"
						placeholder="Experience, availability, anything you'd like us to know"
						maxlength={WORSHIP_REQUEST_LIMITS.message}
						bind:value={message}
					></textarea>
					<div class="flex items-start justify-between gap-4 text-sm">
						<p class="text-error-600">{errors.message ?? ''}</p>
						<p class="text-muted shrink-0 tabular-nums">
							{message.length}/{WORSHIP_REQUEST_LIMITS.message}
						</p>
					</div>
				</label>

				{#if form?.message}
					<p
						class="rounded-xl border border-error-200 bg-error-50 px-4 py-3 text-sm text-error-700"
						role="alert"
					>
						{form.message}
					</p>
				{/if}

				<button
					type="submit"
					class="btn btn-primary btn-lg sm:self-end"
					disabled={pending}
				>
					{pending ? 'Sending…' : 'Send request'}
				</button>
			</form>
		{/if}
	</section>
</FccLayout>
