import { Renderer, toPlainText } from '@better-svelte-email/server'
import type { Component, ComponentProps } from 'svelte'

// FCC brand colours (mirrors the primary palette in app.css)
const renderer = new Renderer({
	customCSS: `
		@theme {
			--color-brand: #0ea5e9;
			--color-brand-light: #dbf2fc;
			--color-brand-dark: #0b7caf;
		}
	`,
})

/**
 * Render a Svelte email template to inlined, email-client-safe HTML plus a
 * plain-text fallback.
 */
export async function renderEmail<C extends Component<any>>(
	component: C,
	props: ComponentProps<C>
) {
	const html = await renderer.render(component, { props })
	return { html, text: toPlainText(html) }
}
