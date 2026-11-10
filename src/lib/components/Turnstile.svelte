<script module lang="ts">
	type TurnstileApi = {
		render: (
			_container: HTMLElement,
			_options: {
				sitekey: string
				appearance?: 'always' | 'execute' | 'interaction-only'
				callback?: () => void
				'error-callback'?: () => void
			}
		) => string
		reset: (_widgetId: string) => void
		remove: (_widgetId: string) => void
	}

	type TurnstileWindow = Window & { turnstile?: TurnstileApi }

	// One script for every widget on the page
	let loading: Promise<TurnstileApi> | undefined

	const loadTurnstile = () =>
		(loading ??= new Promise<TurnstileApi>((resolve, reject) => {
			const win = window as TurnstileWindow
			if (win.turnstile) return resolve(win.turnstile)

			const script = document.createElement('script')
			script.src =
				'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
			script.async = true
			script.onload = () =>
				win.turnstile
					? resolve(win.turnstile)
					: reject(new Error('Turnstile loaded without its API'))
			script.onerror = () => {
				// Let a later widget try again
				loading = undefined
				script.remove()
				reject(new Error('Turnstile failed to load'))
			}
			document.head.append(script)
		}))
</script>

<script lang="ts">
	import { CAPTCHA_ERROR } from '#lib/captcha.js'
	import { PUBLIC_TURNSTILE_SITE_KEY } from '$app/env/public'

	// Place inside a <form>. Turnstile adds a hidden cf-turnstile-response input
	// to that form, which the action passes to Supabase as captchaToken.
	// Supabase checks the token itself, so nothing else is needed on the server.

	let container = $state<HTMLDivElement>()
	let failed = $state(false)

	$effect(() => {
		const el = container
		if (!el) return
		if (!PUBLIC_TURNSTILE_SITE_KEY) {
			console.warn('[turnstile] PUBLIC_TURNSTILE_SITE_KEY is not set')
			return
		}

		let cancelled = false
		let api: TurnstileApi | undefined
		let widgetId: string | undefined

		// Tokens are single use. use:enhance reads the form data as the submit
		// event fires, so get a fresh token right after for the next attempt.
		const form = el.closest('form')
		const onSubmit = () =>
			setTimeout(() => {
				if (api && widgetId) api.reset(widgetId)
			})
		form?.addEventListener('submit', onSubmit)

		loadTurnstile().then(
			(turnstile) => {
				if (cancelled) return
				api = turnstile
				widgetId = turnstile.render(el, {
					sitekey: PUBLIC_TURNSTILE_SITE_KEY,
					// Invisible unless Cloudflare needs the person to press a checkbox
					appearance: 'interaction-only',
					callback: () => (failed = false),
					'error-callback': () => (failed = true),
				})
			},
			(error) => {
				console.error('[turnstile]', error)
				if (!cancelled) failed = true
			}
		)

		return () => {
			cancelled = true
			form?.removeEventListener('submit', onSubmit)
			if (api && widgetId) api.remove(widgetId)
		}
	})
</script>

<div bind:this={container}></div>
{#if failed}
	<p
		class="rounded-xl border border-error-200 bg-error-50 px-4 py-3 text-sm text-error-700"
		role="alert"
	>
		{CAPTCHA_ERROR}
	</p>
{/if}
