import { activeNav, activePath } from '$lib/stores/store.js'
import type { ModalSettings } from '@skeletonlabs/skeleton'
import { formatISO } from 'date-fns'

// exported functions
export const setNavActiveState = (path: any) => {
	if (path.includes('about')) activeNav.set('about')
	else if (path.includes('sermons')) activeNav.set('sermons')
	else if (path.includes('ministries')) activeNav.set('ministries')
	else if (path.includes('small-groups')) activeNav.set('small-groups')
	else if (path.includes('give')) activeNav.set('give')
	else if (path.includes('events')) activeNav.set('events')
	else activeNav.set('home')
}

export const setActivePath = (path: any) => {
	activePath.set(path)
}

export const searchFilter = (
	array: any,
	arrayField: any,
	searchTerm: string
) => {
	return array.filter((item: any) =>
		item[arrayField].toLowerCase().includes(searchTerm.toLowerCase())
	)
}

export const updatedDataFiltered = (array: any, field: string) => {
	const dateToday = formatISO(new Date(), { representation: 'date' })

	return array
		.filter((item: any) => item[field] >= dateToday)
		.sort((a: any, b: any) => (a[field] > b[field] ? 1 : -1))
}

// skeleton utils
export const sermonModalSettings = (
	title: string,
	date: string,
	speaker: string,
	scripture: string,
	youtube: string
) => {
	const settings: ModalSettings = {
		type: 'component',
		component: 'SermonModalComponent',
		meta: {
			title: title,
			date: date,
			speaker: speaker,
			scripture: scripture,
			youtube: youtube,
		},
	}

	return settings
}

export const praiseModalSettings = (meta: any) => {
	const settings: ModalSettings = {
		type: 'component',
		component: 'PraiseModalComponent',
		meta: { ...meta },
	}

	return settings
}
