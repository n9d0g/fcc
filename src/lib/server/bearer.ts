// Compares without short-circuiting, so response timing doesn't leak the secret
const safeEqual = (a: string, b: string) => {
	if (a.length !== b.length) return false
	let diff = 0
	for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
	return diff === 0
}

/** True when the request carries "Authorization: Bearer <secret>". */
export const hasBearer = (request: Request, secret: string) =>
	!!secret &&
	safeEqual(request.headers.get('authorization') ?? '', `Bearer ${secret}`)
