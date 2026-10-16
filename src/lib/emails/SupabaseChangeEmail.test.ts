import { describe, expect, it } from 'vite-plus/test'
import { renderEmail } from './render.server.js'
import SupabaseChangeEmail from './SupabaseChangeEmail.svelte'

describe('SupabaseChangeEmail email', () => {
	it('renders the Supabase template with its variables intact', async () => {
		const { html } = await renderEmail(SupabaseChangeEmail, {})

		expect(html).not.toContain('class="')
		expect(html).toContain('{{ .Email }}')
		expect(html).toContain('{{ .NewEmail }}')
		expect(html).toMatch(
			/href="\{\{ \.RedirectTo \}\}\?token_hash=\{\{ \.TokenHash \}\}&(amp;)?type=email_change"/
		)

		// Regenerate with `pnpm test:unit -u`, then paste into Supabase
		await expect(html).toMatchFileSnapshot(
			'../../../supabase/templates/change-email.html'
		)
	})
})
