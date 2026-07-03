// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { BreadcrumbItem, PageGallery, SeoData, Sermon } from '$lib/types'

declare global {
	namespace App {
		interface PageData {
			title?: string
			breadcrumb?: BreadcrumbItem[]
			headData?: SeoData
			sermons?: Sermon[]
			gallery?: PageGallery | null
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
