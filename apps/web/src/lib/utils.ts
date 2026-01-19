import { formatISO } from 'date-fns'

// Navigation functions are now in $lib/stores/navigation.svelte.ts
// Re-export them for backward compatibility
export { setNavActiveState, setActivePath } from '$lib/stores/navigation.svelte'

/**
 * Sets cache headers with bust=true query param support
 * @param setHeaders - SvelteKit's setHeaders function
 * @param url - The request URL
 * @param maxAge - Cache max-age in seconds (default: 600 = 10 minutes)
 * @param staleWhileRevalidate - Stale-while-revalidate in seconds (default: 3600 = 1 hour)
 */
export const setCacheHeaders = (
	setHeaders: (headers: Record<string, string>) => void,
	url: URL,
	maxAge: number = 600,
	staleWhileRevalidate: number = 3600
) => {
	const shouldBust = url.searchParams.get('bust') === 'true'

	setHeaders({
		'cache-control': shouldBust
			? 'no-cache, no-store, must-revalidate'
			: `public, max-age=${maxAge}, stale-while-revalidate=${staleWhileRevalidate}`,
	})
}

export const searchFilter = (
	array: any[],
	arrayField: string,
	searchTerm: string
) => {
	return array.filter((item: any) =>
		item[arrayField].toLowerCase().includes(searchTerm.toLowerCase())
	)
}

export const updatedDataFiltered = (array: any[], field: string) => {
	const dateToday = formatISO(new Date(), { representation: 'date' })

	return array
		.filter((item: any) => item[field] >= dateToday)
		.sort((a: any, b: any) => (a[field] > b[field] ? 1 : -1))
}
