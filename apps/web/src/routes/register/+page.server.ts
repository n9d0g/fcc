import { z } from 'zod'
import { fail, redirect } from '@sveltejs/kit'
import { supabase } from '$lib/supabaseClient'

const registerSchema = z.object({
	username: z.string().email({ message: 'Please enter a valid email address' }),
	password: z
		.string()
		.trim()
		.min(8, { message: 'Password must be at least 8 characters' })
		.regex(/[A-Z]/, {
			message: 'Password must contain at least one uppercase letter',
		})
		.regex(/[0-9]/, { message: 'Password must contain at least one number' }),
})

export const actions = {
	register: async ({ request }: { request: any }) => {
		try {
			const formData = Object.fromEntries(await request.formData())
			const registerData = registerSchema.safeParse(formData)
			const { username, password } = formData

			// validate registration fields
			if (registerData.success === false) {
				const errors = registerData.error.flatten().fieldErrors
				return fail(400, {
					errors: errors,
					username: username,
				})
			}

			// attempt to create user in Supabase
			const { data: authData, error: authError } = await supabase.auth.signUp({
				email: username,
				password: password,
				options: {
					emailRedirectTo: `${request.url.origin}/login`,
				},
			})

			if (authError) {
				return fail(400, {
					errors: {
						server: authError.message,
					},
					username: username,
				})
			}

			// Redirect to login page with success message
			throw redirect(303, '/login?registered=true')
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
