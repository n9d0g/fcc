import { describe, expect, it } from 'vitest'
import { renderEmail } from './render.server.js'
import SupabaseConfirmSignup from './SupabaseConfirmSignup.svelte'

describe('SupabaseConfirmSignup email', () => {
	it('renders the Supabase template with its variables intact', async () => {
		const { html } = await renderEmail(SupabaseConfirmSignup, {})

		expect(html).not.toContain('class="')
		expect(html).toContain('{{ .Token }}')
		expect(html).toMatch(
			/href="\{\{ \.RedirectTo \}\}\?mode=confirm&(amp;)?email=\{\{ \.Email \| urlquery \}\}"/
		)

		// Regenerate with `pnpm test:unit -u`, then paste into Supabase
		await expect(html).toMatchFileSnapshot(
			'../../../supabase/templates/confirm-signup.html'
		)
	})
})
