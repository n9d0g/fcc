<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'
	import { enhance } from '$app/forms'
	import type { ActionData, PageData } from './$types'

	let { data, form }: { data: PageData; form: ActionData } = $props()

	let title = $derived(data.title)
	let breadcrumb = $derived(data.breadcrumb)
	let headData = $derived(data.headData)

	type AuthMode = 'login' | 'signup' | 'confirm'
	let mode = $state<AuthMode>('login')

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

<FccLayout {title} {breadcrumb} {headData}>
	<section class="flex items-center justify-center px-4 py-8">
		<div class="card mx-auto w-full max-w-lg p-8">
			<div class="mb-6 flex gap-2 border-b border-gray-200 pb-4 dark:border-surface-600">
				<button
					type="button"
					class="btn btn-sm {mode === 'login' ? 'preset-filled' : 'preset-tonal'}"
					onclick={() => (mode = 'login')}
				>
					Log in
				</button>
				<button
					type="button"
					class="btn btn-sm {mode === 'signup' ? 'preset-filled' : 'preset-tonal'}"
					onclick={() => (mode = 'signup')}
				>
					Sign up
				</button>
				<button
					type="button"
					class="btn btn-sm {mode === 'confirm' ? 'preset-filled' : 'preset-tonal'}"
					onclick={() => (mode = 'confirm')}
				>
					Confirm email
				</button>
			</div>

			{#if errorMessage}
				<p class="text-error-500 mb-4 text-sm">{errorMessage}</p>
			{/if}

			{#if form?.success}
				<p class="text-success-600 mb-4 text-sm">{form.success}</p>
			{/if}

			{#if mode === 'login'}
				<form method="POST" action="?/login" use:enhance class="flex flex-col gap-6">
					<label class="label">
						<span>Email</span>
						<input
							class="input"
							type="email"
							name="email"
							placeholder="you@example.com"
							value={form?.email ?? ''}
							required
						/>
					</label>

					<label class="label">
						<span>Password</span>
						<input
							class="input"
							type="password"
							name="password"
							placeholder="Password"
							required
						/>
					</label>

					<button class="btn preset-filled" type="submit">Log in</button>
				</form>
			{:else if mode === 'signup'}
				<form method="POST" action="?/signup" use:enhance class="flex flex-col gap-6">
					<label class="label">
						<span>Email</span>
						<input
							class="input"
							type="email"
							name="email"
							placeholder="you@example.com"
							value={form?.email ?? ''}
							required
						/>
					</label>

					<label class="label">
						<span>Password</span>
						<input
							class="input"
							type="password"
							name="password"
							placeholder="At least 8 characters"
							minlength="8"
							required
						/>
					</label>

					<button class="btn preset-filled" type="submit">Create account</button>
				</form>
			{:else}
				<form method="POST" action="?/verifyOtp" use:enhance class="flex flex-col gap-6">
					<p class="text-surface-600-400 text-sm">
						Enter the 6-digit code sent to your email after signing up.
					</p>

					<label class="label">
						<span>Email</span>
						<input
							class="input"
							type="email"
							name="email"
							placeholder="you@example.com"
							value={form?.email ?? ''}
							required
						/>
					</label>

					<label class="label">
						<span>Confirmation code</span>
						<input
							class="input"
							type="text"
							name="token"
							placeholder="123456"
							inputmode="numeric"
							autocomplete="one-time-code"
							required
						/>
					</label>

					<button class="btn preset-filled" type="submit">Confirm email</button>
				</form>

				<form
					method="POST"
					action="?/resendOtp"
					use:enhance
					class="mt-4 flex flex-col gap-2"
				>
					<input type="hidden" name="email" value={form?.email ?? ''} />
					<button class="btn btn-sm preset-tonal" type="submit">
						Resend confirmation code
					</button>
				</form>
			{/if}
		</div>
	</section>
</FccLayout>
