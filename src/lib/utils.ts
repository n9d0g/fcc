import { SITE_URL, church } from '#lib/config/seo.js'
import { addDays, format, formatISO } from 'date-fns'

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

const escapeAttr = (value: string) =>
	value
		.replaceAll('&', '&amp;')
		.replaceAll('"', '&quot;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')

// Stops a "</script>" inside the data from closing the JSON-LD tag early
export const jsonLd = (data: unknown) =>
	`<script type="application/ld+json">${JSON.stringify(data).replaceAll('<', '\\u003c')}</script>`

/** Canonical production URL for a page, without query string or hash. */
export const canonicalUrl = (url: string) => {
	const { pathname } = new URL(url)
	return `${SITE_URL}${pathname === '/' ? '/' : pathname.replace(/\/$/, '')}`
}

/**
 * Canonical link, social preview tags and a WebPage record tied to the
 * sitewide Church record (see +layout.svelte).
 */
export const buildSeoHeadExtras = (
	url: string,
	title: string,
	description: string
) => {
	const canonical = canonicalUrl(url)
	const t = escapeAttr(title)
	const d = escapeAttr(description)

	return [
		`<link rel="canonical" href="${canonical}"/>`,
		`<meta property="og:type" content="website"/>`,
		`<meta property="og:site_name" content="${church.name}"/>`,
		`<meta property="og:locale" content="en_CA"/>`,
		`<meta property="og:url" content="${canonical}"/>`,
		`<meta property="og:title" content="${t}"/>`,
		`<meta property="og:description" content="${d}"/>`,
		`<meta property="og:image" content="${church.ogImage}"/>`,
		`<meta name="twitter:card" content="summary_large_image"/>`,
		`<meta name="twitter:title" content="${t}"/>`,
		`<meta name="twitter:description" content="${d}"/>`,
		`<meta name="twitter:image" content="${church.ogImage}"/>`,
		jsonLd({
			'@context': 'https://schema.org',
			'@type': 'WebPage',
			'@id': `${canonical}#webpage`,
			url: canonical,
			name: title,
			description,
			inLanguage: 'en-CA',
			isPartOf: { '@id': `${SITE_URL}/#website` },
			about: { '@id': `${SITE_URL}/#church` },
		}),
	].join('')
}
