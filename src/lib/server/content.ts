import { EVENT_FIELDS, type FccEvent } from '#lib/events.js'
import type { Banner, PageGallery, Sermon } from '#lib/types.js'
import { createClient } from '@sanity/client'
import { captureException } from '@sentry/sveltekit'

// Everything read from Sanity Studio (apps/cms). Server-only: SvelteKit won't
// let browser code import from $lib/server, so the client never ships to it.
const sanity = createClient({
	projectId: 'ygo45klz',
	dataset: 'production',
	apiVersion: '2023-03-30',
	useCdn: true,
	// Never drafts, whatever the query says
	perspective: 'published',
})

/**
 * Optional content (see GLOSSARY.md): a page that can be shown without this
 * query wraps it, so a Sanity outage leaves it out instead of failing the
 * page. Whether content is optional is the page's call, not the query's:
 * sermons are optional on the home page but essential on /sermons.
 */
export const optional = <T>(
	query: Promise<T>,
	label: string,
	report: (err: unknown, label: string) => void = (err, label) =>
		captureException(err, { tags: { content: label } })
): Promise<T | null> =>
	query.catch((err) => {
		report(err, label)
		return null
	})

export type Leader = {
	name: string
	title: string
	sort: number
	img: string | null
	subministries?: { name: string; ministry: string }[] | null
}

/** One month of Sunday duties (apps/cms/schemas/sunday-ministries.ts). */
export type SundayMinistryMonth = {
	date: string
	presider?: string
	invites?: string
	powerpoint?: string
	communionPresider?: string
	openingPrayer?: string
	closingPrayer?: string
	coffeeBreakfast?: string
	crawlersToddlers?: string
	ssYoung?: string
	ssOld?: string
	hallSetup?: string
	ushersGreeters?: string
}

export type SundaySchoolLink = {
	title: string
	url: string | null
	pdfUrl: string | null
	section: 'junior' | 'primary' | 'additional'
	openInNewTab?: boolean
}

/** The banner whose start and end dates include `today` (yyyy-MM-dd), if any. */
export const banner = (today: string) =>
	sanity.fetch<Banner | null>(
		`*[_type == "banner" && defined(date)
			&& (!defined(startDate) || startDate <= $today) && date >= $today]
			| order(_updatedAt desc)[0] { _id, _updatedAt, title, body, date }`,
		{ today }
	)

export const sermons = () => sanity.fetch<Sermon[]>(`*[_type == "sermons"]`)

/** Leadership, in their Studio sort order. */
export const leaders = () =>
	sanity.fetch<Leader[]>(
		`*[_type == "leadership"] | order(sort asc) {
			name, title, subministries, sort, 'img': image.asset->url
		}`
	)

export const sundayMinistries = () =>
	sanity.fetch<SundayMinistryMonth[]>(`*[_type == "sunday-ministries"]`)

export const sundaySchoolLinks = () =>
	sanity.fetch<SundaySchoolLink[]>(
		`*[_type == "sunday-school-links"] | order(order asc) {
			title, url, 'pdfUrl': pdf.asset->url, section, openInNewTab
		}`
	)

/** Every event with a start time, newest first. */
export const events = () =>
	sanity.fetch<FccEvent[]>(
		`*[_type == "event" && defined(start)] | order(start desc) { ${EVENT_FIELDS} }`
	)

export const event = (id: string) =>
	sanity.fetch<FccEvent | null>(
		`*[_type == "event" && _id == $id][0] { ${EVENT_FIELDS} }`,
		{ id }
	)

/** The photos set up in Studio for the page at `path`. */
export const gallery = (path: string) =>
	sanity.fetch<PageGallery | null>(
		`*[_type == "page-gallery" && pageUrl == $path][0] {
			title, photos[] { "url": asset->url, alt, caption }
		}`,
		{ path }
	)
