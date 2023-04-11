import { activeBirthdays, activeNav, activePath } from '$lib/stores/store.js'
import { Temporal } from '@js-temporal/polyfill'
import { drawerStore, toastStore, type ModalSettings } from '@skeletonlabs/skeleton'
import { client, dateToday } from '$lib/constants'

let activeBdayValues: any = ''
activeBirthdays.subscribe((value) => (activeBdayValues = value))

const isPastor = (person: any) => {
	if (person.pastor) return true
	return false
}

const isWeddingAnniversary = (person: any) => {
	if (person.wa) return true
	return false
}

// exported functions
export const setNavActiveState = (path: any) => {
	if (path.includes('about')) activeNav.set('about')
	else if (path.includes('sermons')) activeNav.set('sermons')
	else if (path.includes('ministries')) activeNav.set('ministries')
	else if (path.includes('small-groups')) activeNav.set('small-groups')
	else if (path.includes('give')) activeNav.set('give')
	else activeNav.set('home')
}

export const setActivePath = (path: any) => {
	activePath.set(path)
}

export const searchFilter = (array: any, arrayField: any, searchTerm: string) => {
	return array.filter((item: any) => item[arrayField].toLowerCase().includes(searchTerm.toLowerCase()))
}

export const updatedDataFiltered = (array: any, field: string) => {
	return array
		.filter((item: any) => item[field] >= Temporal.Now.plainDateISO().toString())
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

export const getBirthdays: any = async () => {
	const data = await client.fetch(`
    *[_type == "birthdays"] {
      name, birthday, pastor, wa
    }
  `)

	if (data) {
		activeBirthdays.set(
			data
				.sort((a: any, b: any) => (a.name > b.name ? 1 : -1))
				.filter((member: any) => member.birthday.slice(5, 10) === dateToday.slice(5, 10))
		)

		for (let i = 0; i < activeBdayValues.length; i++) {
			toastStore.trigger({
				message: `🎉 Happy ${isWeddingAnniversary(activeBdayValues[i]) ? 'Wedding Anniversary' : 'Birthday'} ${
					isPastor(activeBdayValues[i]) ? 'Pastor' : ''
				}  ${activeBdayValues[i].name} 🎉`,
				timeout: 4000,
				background: 'variant-filled-secondary',
			})
		}
	}

	return false
}

export const isDevEnv = (path: string) => {
	if (path.includes('dev.') || path.includes('localhost') || path.includes('127.0.0.1')) return true

	return false
}

export const closeSideNav = () => {
	return drawerStore.close()
}

export const openSideNav = (settings: any) => {
	return drawerStore.open(settings)
}
