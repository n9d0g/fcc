import { addDays, format, formatISO } from 'date-fns'

// Re-export navigation helper for backward compatibility
export { setNavActiveState } from '$lib/stores/navigation.svelte'

export const CACHE_PRESETS = {
	short: [600, 3600] as const,
	long: [3600, 86400] as const,
	home: [300, 3600] as const,
}

/**
 * Formats CMS date strings with +1 day offset for timezone alignment.
 */
export const formatCmsDate = (
	date: string,
	pattern: string = 'MMMM do, yyyy'
): string => {
	if (!date) return 'Date not available'
	return format(addDays(new Date(date), 1), pattern)
}

export const setCacheHeaders = (
	setHeaders: (_headers: Record<string, string>) => void,
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

export const sortByField = <T extends Record<string, unknown>>(
	array: T[],
	field: keyof T & string,
	direction: 'asc' | 'desc' = 'asc'
) => {
	return [...array].sort((a, b) => {
		const aVal = String(a[field] ?? '')
		const bVal = String(b[field] ?? '')
		const comparison = aVal.localeCompare(bVal)
		return direction === 'asc' ? comparison : -comparison
	})
}

export const searchFilter = <T extends Record<string, unknown>>(
	array: T[],
	arrayField: keyof T & string,
	searchTerm: string
) => {
	return array.filter((item) => {
		const value = item[arrayField]
		return String(value ?? '')
			.toLowerCase()
			.includes(searchTerm.toLowerCase())
	})
}

export const updatedDataFiltered = <T extends Record<string, unknown>>(
	array: T[],
	field: keyof T & string
) => {
	const dateToday = formatISO(new Date(), { representation: 'date' })

	return sortByField(
		array.filter((item) => String(item[field] ?? '') >= dateToday),
		field,
		'asc'
	)
}

export const buildSeoHeadExtras = (
	url: string,
	title: string,
	description: string
) => {
	const schema = JSON.stringify({
		'@context': 'http://schema.org',
		'@type': 'website',
		name: title,
		description,
		url,
	})

	return `<link rel="canonical" href="${url}"/><script type="application/ld+json">${schema}</script>`
}
