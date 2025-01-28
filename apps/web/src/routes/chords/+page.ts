import { redirect, error } from '@sveltejs/kit'
import { client } from '$lib/constants'

export const load = async () => {
	// fetch praise data and sort by date
	const data = await client.fetch(`
    *[_type == "praise"] | order(date asc) {
      date,
      'pdfURL': pdf.asset->url
    }
  `)

	// find first entry with a PDF URL
	const firstPdfEntry = data.find((entry: any) => entry.pdfURL)

	if (firstPdfEntry?.pdfURL) {
		throw redirect(302, firstPdfEntry.pdfURL)
	} else {
		// if no PDF found, throw 404 error
		throw error(404, 'No chords yet! Check back soon 🥲')
	}
}
