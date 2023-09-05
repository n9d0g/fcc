import { activeNav, activePath } from '$lib/stores/store.js'
import { Temporal } from '@js-temporal/polyfill'
import type { ModalSettings } from '@skeletonlabs/skeleton'

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
	return array
		.filter(
			(item: any) => item[field] >= Temporal.Now.plainDateISO().toString()
		)
		.sort((a: any, b: any) => (a[field] > b[field] ? 1 : -1))
}

export const getMonth = (temporalDate: string) => {
	let months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	]
	let currentMonth: number = Number(temporalDate.slice(5, 7))

	return months[currentMonth - 1]
}

export const getMonthDay = (temporalDate: string) => {
	let months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	]
	let currentMonth: number = Number(temporalDate.slice(5, 7))
	let currentDay: string = temporalDate.slice(8, 10)

	return months[currentMonth - 1].slice(0, 3) + ' ' + currentDay
}

export const getMonthDayFull = (temporalDate: string) => {
	let months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	]
	let currentMonth: number = Number(temporalDate.slice(5, 7))
	let currentDay: string = temporalDate.slice(8, 10)
	let currentYear: string = temporalDate.slice(0, 4)

	return months[currentMonth - 1] + ' ' + currentDay + ', ' + currentYear
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
