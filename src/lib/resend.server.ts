import { Resend } from 'resend'
import { RESEND_API_KEY, RESEND_FROM_EMAIL } from '$env/static/private'

const resend = new Resend(RESEND_API_KEY)

export { resend, RESEND_FROM_EMAIL }
