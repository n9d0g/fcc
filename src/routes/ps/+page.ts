import type { PageLoad } from './$types'
import { redirect } from '@sveltejs/kit'

export const load = (() => {
  throw redirect(302, '/ministries/praise/schedule')
}) satisfies PageLoad