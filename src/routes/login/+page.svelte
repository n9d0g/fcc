<script lang="ts">
	import FccLayout from '#lib/components/FccLayout.svelte'
	import { enhance } from '$app/forms'
	import { page } from '$app/state'
	import type { ActionData } from './$types'

	let { form }: { form: ActionData } = $props()

	type AuthMode = 'login' | 'confirm'
	// Signing up lives on /signup. The confirm form has no tab; it's reached from
	// the signup confirmation email, which links to /login?mode=confirm&email=...
	let mode = $state<AuthMode>(
		page.url.searchParams.get('mode') === 'confirm' ? 'confirm' : 'login'
	)
	const email = $derived(form?.email ?? page.url.searchParams.get('email') ?? '')
	// Prefilled from the email's "Confirm email" button (?token=123456)
	const token = $derived(page.url.searchParams.get('token') ?? '')
	// Set by pages that require login (e.g. the worship request review link)
	const redirectTo = $derived(page.url.searchParams.get('redirectTo') ?? '/')

	const errorMessage = $derived(
		form?.error != null && typeof form.error === 'string'
			? form.error
			: form?.error != null
				? 'Something went wrong. Please try again.'
				: ''
	)

	$effect(() => {
		if (form?.mode) {
			mode = form.mode as AuthMode
		}
	})
</script>

<FccLayout heading="Log In">
	<section class="flex items-center justify-center">
		<div class="card mx-auto w-full max-w-lg p-6 sm:p-10">
			<nav class="mb-8 flex flex-wrap gap-2 rounded-full bg-surface-100 p-1">
				<button
					type="button"
					class="btn btn-sm flex-1 {mode === 'login' ? 'bg-white text-ink shadow-sm' : 'text-muted hover:text-ink'}"
					aria-current={mode === 'login' ? 'page' : undefined}
					onclick={() => (mode = 'login')}
				>
					Log in
				</button>
				<a href="/signup" class="btn btn-sm flex-1 text-muted hover:text-ink">Sign up</a>
			</nav>

			{#if errorMessage}
				<p class="mb-4 rounded-xl border border-error-200 bg-error-50 px-4 py-3 text-sm text-error-700">{errorMessage}</p>
			{/if}

			{#if form?.success}
				<p class="mb-4 rounded-xl border border-success-200 bg-success-50 px-4 py-3 text-sm text-success-700">{form.success}</p>
			{/if}

			{#if mode === 'login'}
				<form method="POST" action="?/login" use:enhance class="flex flex-col gap-6">
					<input type="hidden" name="redirectTo" value={redirectTo} />
					<label class="label flex flex-col gap-2">
						<span>Email</span>
						<input
							class="input"
							type="email"
							name="email"
							placeholder="you@example.com"
							value={email}
							required
						/>
					</label>

					<label class="label flex flex-col gap-2">
						<span>Password</span>
						<input
							class="input"
							type="password"
							name="password"
							placeholder="Password"
							required
						/>
					</label>

					<button class="btn btn-primary btn-lg" type="submit">Log in</button>
				</form>

				<p class="mt-6 text-center text-sm text-muted">
					New here? <a href="/signup" class="anchor">Create an account</a>
				</p>
			{:else}
				<form method="POST" action="?/verifyOtp" use:enhance class="flex flex-col gap-6">
					<div class="space-y-1">
						<h2 class="text-lg font-semibold">Confirm your email</h2>
						<p class="text-muted text-sm">
							Enter the 6-digit code from your confirmation email.
						</p>
					</div>

					<label class="label flex flex-col gap-2">
						<span>Email</span>
						<input
							class="input"
							type="email"
							name="email"
							placeholder="you@example.com"
							value={email}
							required
						/>
					</label>

					<label class="label flex flex-col gap-2">
						<span>Confirmation code</span>
						<input
							class="input"
							type="text"
							name="token"
							placeholder="123456"
							inputmode="numeric"
							autocomplete="one-time-code"
							value={token}
							required
						/>
					</label>

					<button class="btn btn-primary btn-lg" type="submit">Confirm email</button>
				</form>

				<form
					method="POST"
					action="?/resendOtp"
					use:enhance
					class="mt-4 flex flex-col gap-2"
				>
					<input type="hidden" name="email" value={email} />
					<button class="btn btn-sm btn-outline" type="submit">
						Resend confirmation code
					</button>
				</form>
			{/if}
		</div>
	</section>
</FccLayout>
