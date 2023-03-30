import { activeNav } from '$lib/stores/store.js'
import { Temporal } from '@js-temporal/polyfill'
import { disableScrollHandling } from '$app/navigation'

export const scrollToTop = () => {
  document.body.scrollTop = document.documentElement.scrollTop = 0

  try {
    disableScrollHandling()
  } catch (e) {}
}

export const setNavActiveState = (path: any) => {
  if (path.includes('about')) activeNav.set('about')
  else if (path.includes('sermons')) activeNav.set('sermons')
  else if (path.includes('ministries')) activeNav.set('ministries')
  else if (path.includes('small-groups')) activeNav.set('small-groups')
  else if (path.includes('give')) activeNav.set('give')
  else activeNav.set('home')
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
