// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type {
	BreadcrumbItem,
	PageGallery,
	SeoData,
	Sermon,
} from '#lib/types.js'
import type { Session, SupabaseClient, User } from '@supabase/supabase-js'

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient
			safeGetSession: () => Promise<{
				session: Session | null
				user: User | null
			}>
		}

		interface PageData {
			title?: string
			breadcrumb?: BreadcrumbItem[]
			headData?: SeoData
			sermons?: Sermon[]
			gallery?: PageGallery | null
			session?: Session | null
			user?: User | null
			isBlogAuthor?: boolean
			isWorshipMember?: boolean
			roles?: string[]
			supabase?: SupabaseClient
			cookies?: { name: string; value: string }[]
		}

		interface Banner {
			_id: string
			_updatedAt: string
			body?: {
				_key: string
				children: {
					_key: string
					marks: string[]
					text: string
				}[]
				markDefs?: {
					_key: string
					href: string
				}[]
				style: string
			}[]
			title?: string
			/** Last day shown, yyyy-MM-dd */
			date: string
		}
	}
}

export {}
