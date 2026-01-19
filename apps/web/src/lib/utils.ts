import { formatISO } from 'date-fns'

// Navigation functions are now in $lib/stores/navigation.svelte.ts
// Re-export them for backward compatibility
export { setNavActiveState, setActivePath } from '$lib/stores/navigation.svelte'

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
