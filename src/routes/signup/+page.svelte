<script lang="ts">
	import FccLayout from '#lib/components/FccLayout.svelte'
	import { enhance } from '$app/forms'
	import type { ActionData, PageData } from './$types'

	let { data, form }: { data: PageData; form: ActionData } = $props()

	let title = $derived(data.title)
	let breadcrumb = $derived(data.breadcrumb)
	let headData = $derived(data.headData)

	const email = $derived(form?.email ?? '')
	const displayName = $derived(form?.displayName ?? '')
	const errorMessage = $derived(
		form && 'error' in form && typeof form.error === 'string' ? form.error : ''
	)
	const success = $derived(form && 'success' in form ? form.success : '')
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<section class="flex items-center justify-center">
		<div class="card mx-auto w-full max-w-lg p-6 sm:p-10">
			<nav class="mb-8 flex flex-wrap gap-2 rounded-full bg-surface-100 p-1">
				<a href="/login" class="btn btn-sm flex-1 text-muted hover:text-ink">Log in</a>
				<span class="btn btn-sm flex-1 bg-white text-ink shadow-sm" aria-current="page">
					Sign up
				</span>
			</nav>

			{#if errorMessage}
				<p class="mb-4 rounded-xl border border-error-200 bg-error-50 px-4 py-3 text-sm text-error-700">{errorMessage}</p>
			{/if}

			{#if success}
				<p class="mb-4 rounded-xl border border-success-200 bg-success-50 px-4 py-3 text-sm text-success-700">{success}</p>
				<a
					class="btn btn-outline w-full"
					href="/login?mode=confirm&email={encodeURIComponent(email)}"
				>
					Enter confirmation code instead
				</a>
			{:else}
				<p class="mb-6 text-sm text-muted">
					Members can use an account to join the worship team, lead prayer
					meetings and write for the blog.
				</p>

				<form method="POST" use:enhance class="flex flex-col gap-6">
					<label class="label flex flex-col gap-2">
						<span>Name</span>
						<input
							class="input"
							type="text"
							name="displayName"
							autocomplete="name"
							placeholder="First and last name"
							maxlength="100"
							value={displayName}
							required
						/>
					</label>

					<label class="label flex flex-col gap-2">
						<span>Email</span>
						<input
							class="input"
							type="email"
							name="email"
							autocomplete="email"
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
							autocomplete="new-password"
							placeholder="At least 8 characters"
							minlength="8"
							required
						/>
					</label>

					<button class="btn btn-primary btn-lg" type="submit">Create account</button>
				</form>

				<p class="mt-6 text-center text-sm text-muted">
					Already have an account? <a href="/login" class="anchor">Log in</a>
				</p>
			{/if}
		</div>
	</section>
</FccLayout>
