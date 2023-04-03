import type { PageLoad } from './$types'
import { leaders } from '$lib/constants'

export const load = (() => {
  return {
    leaders: leaders,
  }
}) satisfies PageLoad
