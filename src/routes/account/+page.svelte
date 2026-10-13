<script lang="ts">
	import FccLayout from '#lib/components/FccLayout.svelte'
	import Icon from '@iconify/svelte'
	import { enhance, type SubmitFunction } from '$app/forms'
	import { page } from '$app/state'
	import { toaster } from '#lib/stores/toaster.js'
	import { ACCOUNT_LIMITS } from '#lib/schemas/account.js'
	import type { ActionData, PageData } from './$types'

	let { data, form }: { data: PageData; form: ActionData } = $props()

	let title = $derived(data.title)
	let breadcrumb = $derived(data.breadcrumb)
	let headData = $derived(data.headData)

	type Section = 'name' | 'email' | 'password'
	let busy = $state<Section | null>(null)

	// Errors and messages only show under the form that was submitted
	const errorsFor = (section: Section): Record<string, string | undefined> =>
		form?.form === section && 'errors' in form ? (form.errors ?? {}) : {}
	const messageFor = (section: Section) =>
		form?.form === section && 'message' in form ? form.message : undefined

	// Set by /auth/confirm after an email change link is pressed
	const emailStatus = $derived(page.url.searchParams.get('email'))

	const submit =
		(section: Section): SubmitFunction =>
		() => {
			busy = section
			return async ({ result, update }) => {
				busy = null
				// Clear the password fields on success; keep other inputs as typed
				await update({ reset: section === 'password' && result.type === 'success' })
				if (result.type === 'success' && result.data?.success) {
					toaster.success({ title: String(result.data.success) })
				}
			}
		}
</script>

{#snippet error(message: string | undefined)}
	{#if message}
		<p class="text-sm text-error-600">{message}</p>
	{/if}
{/snippet}

{#snippet alert(message: string | undefined)}
	{#if message}
		<p
			class="rounded-xl border border-error-200 bg-error-50 px-4 py-3 text-sm text-error-700"
			role="alert"
		>
			{message}
		</p>
	{/if}
{/snippet}

<FccLayout {title} {breadcrumb} {headData}>
	<section class="mx-auto flex max-w-2xl flex-col gap-8">
		{#if emailStatus === 'changed'}
			<p
				class="rounded-xl border border-success-200 bg-success-50 px-4 py-3 text-sm text-success-700"
				role="status"
			>
				Your email address has been changed to {data.email}.
			</p>
		{:else if emailStatus === 'partial'}
			<p
				class="rounded-xl border border-warning-300 bg-warning-50 px-4 py-3 text-sm text-warning-800"
				role="status"
			>
				Confirmed! To finish, press the link we sent to your other email address
				as well.
			</p>
		{:else if emailStatus === 'invalid'}
			<p
				class="rounded-xl border border-error-200 bg-error-50 px-4 py-3 text-sm text-error-700"
				role="alert"
			>
				That confirmation link is invalid or has expired. Request the change
				again below.
			</p>
		{/if}

		<!-- Display name -->
		<form
			method="POST"
			action="?/name"
			use:enhance={submit('name')}
			class="card flex flex-col gap-5 p-5 sm:p-8"
		>
			<div class="flex items-center gap-3">
				<span class="icon-chip"><Icon icon="lucide:user" class="size-5" /></span>
				<h2 class="h4">Display name</h2>
			</div>
			<p class="text-muted text-sm">
				Shown in your account menu, on your worship team request and as the author
				of your blog posts.
			</p>
			<label class="label flex flex-col gap-2">
				<span>Name</span>
				<input
					class="input"
					name="displayName"
					autocomplete="name"
					placeholder="First and last name"
					maxlength={ACCOUNT_LIMITS.displayName}
					value={data.displayName}
					aria-invalid={!!errorsFor('name').displayName}
					required
				/>
				{@render error(errorsFor('name').displayName)}
			</label>
			{@render alert(messageFor('name'))}
			<button class="btn btn-primary sm:self-end" disabled={busy === 'name'}>
				{busy === 'name' ? 'Saving…' : 'Save name'}
			</button>
		</form>

		<!-- Email -->
		<form
			method="POST"
			action="?/email"
			use:enhance={submit('email')}
			class="card flex flex-col gap-5 p-5 sm:p-8"
		>
			<div class="flex items-center gap-3">
				<span class="icon-chip"><Icon icon="lucide:mail" class="size-5" /></span>
				<h2 class="h4">Email address</h2>
			</div>
			<p class="text-muted text-sm">
				Currently <span class="font-medium text-ink">{data.email}</span>. We'll
				send a confirmation link to the new address, and your email won't change
				until you press it.
			</p>
			{#if data.pendingEmail}
				<p class="rounded-xl bg-warning-50 px-4 py-3 text-sm text-warning-800">
					Waiting for you to confirm <span class="font-medium">{data.pendingEmail}</span>.
				</p>
			{/if}
			<label class="label flex flex-col gap-2">
				<span>New email</span>
				<input
					class="input"
					type="email"
					name="email"
					autocomplete="email"
					placeholder="you@example.com"
					aria-invalid={!!errorsFor('email').email}
					required
				/>
				{@render error(errorsFor('email').email)}
			</label>
			{@render alert(messageFor('email'))}
			<button class="btn btn-primary sm:self-end" disabled={busy === 'email'}>
				{busy === 'email' ? 'Sending…' : 'Change email'}
			</button>
		</form>

		<!-- Password -->
		<form
			method="POST"
			action="?/password"
			use:enhance={submit('password')}
			class="card flex flex-col gap-5 p-5 sm:p-8"
		>
			<div class="flex items-center gap-3">
				<span class="icon-chip"><Icon icon="lucide:key-round" class="size-5" /></span>
				<h2 class="h4">Password</h2>
			</div>
			<!-- Lets password managers match the account -->
			<input type="hidden" name="username" autocomplete="username" value={data.email} />
			<label class="label flex flex-col gap-2">
				<span>Current password</span>
				<input
					class="input"
					type="password"
					name="currentPassword"
					autocomplete="current-password"
					aria-invalid={!!errorsFor('password').currentPassword}
					required
				/>
				{@render error(errorsFor('password').currentPassword)}
			</label>
			<label class="label flex flex-col gap-2">
				<span>New password</span>
				<input
					class="input"
					type="password"
					name="newPassword"
					autocomplete="new-password"
					placeholder="At least {ACCOUNT_LIMITS.passwordMin} characters"
					minlength={ACCOUNT_LIMITS.passwordMin}
					aria-invalid={!!errorsFor('password').newPassword}
					required
				/>
				{@render error(errorsFor('password').newPassword)}
			</label>
			<label class="label flex flex-col gap-2">
				<span>Confirm new password</span>
				<input
					class="input"
					type="password"
					name="confirmPassword"
					autocomplete="new-password"
					aria-invalid={!!errorsFor('password').confirmPassword}
					required
				/>
				{@render error(errorsFor('password').confirmPassword)}
			</label>
			{@render alert(messageFor('password'))}
			<button class="btn btn-primary sm:self-end" disabled={busy === 'password'}>
				{busy === 'password' ? 'Saving…' : 'Change password'}
			</button>
		</form>
	</section>
</FccLayout>
