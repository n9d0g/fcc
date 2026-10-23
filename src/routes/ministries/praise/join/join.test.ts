import { describe, expect, it } from 'vite-plus/test'
import { useOutbox } from '#lib/server/notifier.js'
import { actions } from './+page.server.js'

// The request is saved through locals.supabase; this fakes just that insert
const fakeEvent = () => {
	const form = new FormData()
	form.set('fullName', 'Jane Doe')
	form.append('roles', 'vocals')
	return {
		request: new Request('https://fcccanada.ca/ministries/praise/join', {
			method: 'POST',
			body: form,
		}),
		url: new URL('https://fcccanada.ca/ministries/praise/join'),
		locals: {
			safeGetSession: async () => ({
				session: {},
				user: { id: 'u1', email: 'jane@x.ca' },
			}),
			supabase: {
				from: () => ({
					insert: () => ({
						select: () => ({
							single: async () => ({ data: { id: 'r1' }, error: null }),
						}),
					}),
				}),
			},
		},
	} as unknown as Parameters<typeof actions.default>[0]
}

describe('worship team join request', () => {
	it('emails the requests inbox, replying to the requester', async () => {
		const outbox = useOutbox()
		expect(await actions.default(fakeEvent())).toEqual({ success: true })

		expect(outbox.sent).toHaveLength(1)
		const [email] = outbox.sent
		expect(email.to).toEqual([outbox.inboxes.requests])
		expect(email.replyTo).toBe('jane@x.ca')
		expect(email.subject).toBe('Worship team request: Jane Doe')
		expect(email.html).toContain('/admin/worship-requests/r1')
	})
})
