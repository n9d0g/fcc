import { z } from 'zod'
import { fail } from '@sveltejs/kit'

const loginSchema = z.object({
	username: z.string().trim().min(1, { message: 'Username is required' }),
	password: z
		.string()
		.trim()
		.min(8, { message: 'Password must be at least 8 characters' }),
})

export const actions = {
	login: async ({ request }: { request: any }) => {
		try {
			const formData = Object.fromEntries(await request.formData())
			const loginData = loginSchema.safeParse(formData)
			const { username, password } = formData

			// validate login fields
			if (loginData.success === false) {
				const errors = loginData.error.flatten().fieldErrors

				return fail(400, {
					errors: errors,
					username: username,
				})
			}

			console.log(username, password)

			// Add your authentication logic here
		} catch (e) {
			console.error(e)
			return fail(500, {
				errors: {
					server: 'Internal server error occurred',
				},
			})
		}
	},
}
