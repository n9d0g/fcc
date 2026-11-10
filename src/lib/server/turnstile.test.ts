import { afterEach, describe, expect, it, vi } from 'vite-plus/test'
import { verifyTurnstile } from './turnstile.js'

const base = { token: 'tok', secret: 'shh', logPrefix: '[test]' }

const mockFetch = (response: Response) => {
	const fetchMock = vi.fn(async () => response)
	vi.stubGlobal('fetch', fetchMock)
	return fetchMock
}

const json = (body: unknown, status = 200) =>
	new Response(JSON.stringify(body), {
		status,
		headers: { 'content-type': 'application/json' },
	})

describe('verifyTurnstile', () => {
	afterEach(() => {
		vi.unstubAllGlobals()
		vi.restoreAllMocks()
	})

	it('passes when Cloudflare confirms the token', async () => {
		const fetchMock = mockFetch(json({ success: true }))

		await expect(
			verifyTurnstile({ ...base, remoteip: '203.0.113.7' })
		).resolves.toBe(true)

		const [url, init] = fetchMock.mock.calls[0] as unknown as [
			string,
			RequestInit,
		]
		expect(url).toBe(
			'https://challenges.cloudflare.com/turnstile/v0/siteverify'
		)
		const body = init.body as URLSearchParams
		expect(body.get('secret')).toBe('shh')
		expect(body.get('response')).toBe('tok')
		expect(body.get('remoteip')).toBe('203.0.113.7')
	})

	it('rejects without calling Cloudflare when no token was submitted', async () => {
		vi.spyOn(console, 'warn').mockImplementation(() => {})
		const fetchMock = mockFetch(json({ success: true }))

		await expect(verifyTurnstile({ ...base, token: '' })).resolves.toBe(false)
		expect(fetchMock).not.toHaveBeenCalled()
	})

	it('rejects when the secret is missing', async () => {
		vi.spyOn(console, 'error').mockImplementation(() => {})
		const fetchMock = mockFetch(json({ success: true }))

		await expect(verifyTurnstile({ ...base, secret: '' })).resolves.toBe(false)
		expect(fetchMock).not.toHaveBeenCalled()
	})

	it('rejects when siteverify returns an HTTP error', async () => {
		const error = vi.spyOn(console, 'error').mockImplementation(() => {})
		mockFetch(new Response('nope', { status: 500 }))

		await expect(verifyTurnstile(base)).resolves.toBe(false)
		expect(error).toHaveBeenCalledWith('[test] turnstile: siteverify HTTP', 500)
	})

	it("rejects and logs Cloudflare's verdict, not the token", async () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
		const verdict = {
			success: false,
			'error-codes': ['invalid-input-response'],
		}
		mockFetch(json(verdict))

		await expect(verifyTurnstile(base)).resolves.toBe(false)
		expect(warn).toHaveBeenCalledWith('[test] turnstile rejected', verdict)
		expect(JSON.stringify(warn.mock.calls)).not.toContain('tok')
	})
})
