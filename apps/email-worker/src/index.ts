import { route } from './routes'

// The parts of Cloudflare's ForwardableEmailMessage this worker uses
interface IncomingEmail {
	readonly from: string
	readonly to: string
	setReject(reason: string): void
	forward(rcptTo: string, headers?: Headers): Promise<void>
}

// Email Routing's catch-all sends every message for @fcccanada.ca here.
// Known addresses are forwarded; anything else bounces back to the sender.
export default {
	async email(message: IncomingEmail) {
		const decision = route(message.to, message.from)

		if (decision.action === 'reject') {
			console.log('rejected', {
				to: message.to,
				from: message.from,
				reason: decision.reason,
			})
			message.setReject(decision.reason)
			return
		}

		// Lets the destination inbox filter by which address was used
		const headers = new Headers({
			'X-FCC-Alias': `${decision.alias}@fcccanada.ca`,
		})
		for (const destination of decision.to) {
			await message.forward(destination, headers)
		}
		console.log('forwarded', { alias: decision.alias, to: decision.to })
	},
}
