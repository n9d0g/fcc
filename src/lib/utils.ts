import { activeBirthdays, activeNav, activePath } from '$lib/stores/store.js'
import { Temporal } from '@js-temporal/polyfill'
import {
  drawerStore,
  type DrawerSettings,
  type ModalComponent,
  type ModalSettings,
  type ToastSettings,
  type AutocompleteOption,
  type PopupSettings,
  toastStore,
} from '@skeletonlabs/skeleton'
import SermonModal from './components/sermons/SermonModal.svelte'
import PraiseModal from './components/ministries/praise/PraiseModal.svelte'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: import.meta.env.VITE_SANITY_ID,
  dataset: 'production',
  apiVersion: '2023-03-21',
  useCdn: false,
})

let activeBdayValues: any = ''
activeBirthdays.subscribe(value => (activeBdayValues = value))

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

export const navOptions = () => {
  return [
    {
      href: '/',
      title: 'Home',
    },
    {
      href: '/about',
      title: 'About',
    },
    {
      href: '/sermons',
      title: 'Sermons',
    },
    {
      href: '/ministries',
      title: 'Ministries',
    },
    {
      href: '/small-groups',
      title: 'Small Groups',
    },
    {
      href: '/give',
      title: 'Give',
    },
  ]
}

// skeleton utils
export const drawerSettings: DrawerSettings = {
  position: 'right',
}

export const modalComponentRegistry: Record<string, ModalComponent> = {
  SermonModalComponent: {
    ref: SermonModal,
  },
  PraiseModalComponent: {
    ref: PraiseModal,
  },
}

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

export const wipToastSettings: ToastSettings = {
  message: `Heads up! This site is still under 🚧 construction 🚧`,
  timeout: 3000,
  background: 'variant-filled-primary',
}

export const devToastSettings: ToastSettings = {
  message: `📣 DEV SITE 📣`,
  autohide: false,
  background: 'variant-filled-error',
}

const isPastor = (person: any) => {
  if (person.pastor) return true
  return false
}

const isWeddingAnniversary = (person: any) => {
  if (person.wa) return true
  return false
}

export const getBirthdays: any = async () => {
  const data = await client.fetch(`
    *[_type == "birthdays"] {
      name, birthday, pastor, wa
    }
  `)
  let today = Temporal.Now.plainDateISO().toString()

  if (data) {
    activeBirthdays.set(
      data
        .sort((a: any, b: any) => (a.name > b.name ? 1 : -1))
        .filter(
          (member: any) => member.birthday.slice(5, 10) === today.slice(5, 10)
        )
    )

    for (let i = 0; i < activeBdayValues.length; i++) {
      toastStore.trigger({
        message: `🎉 Happy ${
          isWeddingAnniversary(activeBdayValues[i])
            ? 'Wedding Anniversary'
            : 'Birthday'
        } ${isPastor(activeBdayValues[i]) ? 'Pastor' : ''}  ${
          activeBdayValues[i].name
        } 🎉`,
        timeout: 4000,
        background: 'variant-filled-secondary',
      })
    }
  }

  return false
}

export const isDevEnv = (path: string) => {
  if (
    path.includes('dev.') ||
    path.includes('localhost') ||
    path.includes('127.0.0.1')
  )
    return true

  return false
}

export const closeSideNav = () => {
  return drawerStore.close()
}

export const openSideNav = (settings: any) => {
  return drawerStore.open(settings)
}

export const praiseLeaderOptions: AutocompleteOption[] = [
  { label: 'FCC Men', value: 'men', keywords: '' },
  {
    label: 'FCC Pre-teens',
    value: 'preteens',
    keywords: 'preteens, youth, kids',
  },
  { label: 'FCC Women', value: 'women', keywords: '' },
  { label: 'James', value: 'james', keywords: '' },
  { label: 'John', value: 'john', keywords: '' },
  { label: 'Joi', value: 'joi', keywords: '' },
  { label: 'Nathan', value: 'nathan', keywords: '' },
  { label: 'Raquel', value: 'raquel', keywords: '' },
  { label: 'Rommel', value: 'rommel', keywords: '' },
]

export const praiseFilterPopupSettings: PopupSettings = {
  event: 'focus',
  target: 'praiseAutocomplete',
  placement: 'bottom',
  closeQuery: '.autocomplete-list, .list-nav, ul, li, .autocomplete-item',
}
