import { z } from 'zod'

// Shared by the contact form (for native input constraints) and its server action
export const CONTACT_LIMITS = {
	name: 100,
	email: 254,
	message: 5000,
} as const

export const contactSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, { error: 'Please enter your name.' })
		.max(CONTACT_LIMITS.name, {
			error: `Name must be ${CONTACT_LIMITS.name} characters or fewer.`,
		}),
	email: z
		.string()
		.trim()
		.min(1, { error: 'Please enter your email.' })
		.max(CONTACT_LIMITS.email, { error: 'Email is too long.' })
		.pipe(z.email({ error: 'Please enter a valid email address.' })),
	message: z
		.string()
		.trim()
		.min(1, { error: 'Please enter a message.' })
		.max(CONTACT_LIMITS.message, {
			error: `Message must be ${CONTACT_LIMITS.message} characters or fewer.`,
		}),
})

export type ContactInput = z.infer<typeof contactSchema>
export type ContactField = keyof ContactInput
