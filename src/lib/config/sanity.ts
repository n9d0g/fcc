import { createClient } from '@sanity/client'
import type { PageGallery } from '$lib/types'

export const client = createClient({
	projectId: 'ygo45klz',
	dataset: 'production',
	apiVersion: '2023-03-30',
	useCdn: true,
})

export async function fetchPageGallery(
	pageUrl: string
): Promise<PageGallery | null> {
	return client.fetch(
		`*[_type == "page-gallery" && pageUrl == $pageUrl][0]{
			title,
			photos[]{
				"url": asset->url,
				alt,
				caption
			}
		}`,
		{ pageUrl }
	)
}
