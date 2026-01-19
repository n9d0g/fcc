import { createClient } from '@sanity/client'

export const client = createClient({
	projectId: 'ygo45klz',
	dataset: 'production',
	apiVersion: '2023-03-30',
	useCdn: true, // Enable CDN for faster cached reads in production
})
