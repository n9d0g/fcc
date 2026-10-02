// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { BreadcrumbItem, PageGallery, SeoData, Sermon } from '$lib/types'
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
			supabase?: SupabaseClient
			cookies?: { name: string; value: string }[]
		}

		interface Banner {
			body: {
				children: {
					marks: string[]
					text: string
				}[]
				markDefs: {
					href: string
				}[]
				style: string
			}[]
			title: string
			date: string
		}
	}
}

export {}
