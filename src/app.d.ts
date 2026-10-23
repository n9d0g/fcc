// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { PageMeta } from '#lib/config/pages.js'
import type { PageGallery, Sermon } from '#lib/types.js'
import type { Viewer } from '#lib/server/access.js'
import type { Session, SupabaseClient, User } from '@supabase/supabase-js'

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient
			safeGetSession: () => Promise<{
				session: Session | null
				user: User | null
			}>
			/** Resolved on first call, then reused for the rest of the request */
			viewer: () => Promise<Viewer>
		}

		interface PageData {
			pageMeta?: PageMeta
			sermons?: Sermon[]
			gallery?: PageGallery | null
			session?: Session | null
			user?: User | null
			isSuperuser?: boolean
			isBlogAuthor?: boolean
			isWorshipMember?: boolean
			roles?: string[]
			supabase?: SupabaseClient
			cookies?: { name: string; value: string }[]
		}
	}
}

export {}
