import { activeNav } from '$lib/stores/store.js'
import { Temporal } from '@js-temporal/polyfill'
import { disableScrollHandling } from '$app/navigation'
import {
  drawerStore,
  type DrawerSettings,
  type ModalComponent,
  type ModalSettings,
  type ToastSettings,
} from '@skeletonlabs/skeleton'
import SermonModal from './components/sermons/SermonModal.svelte'
import PraiseModal from './components/ministries/praise/PraiseModal.svelte'

export const scrollToTop = (el: any) => {
  el.scrollIntoView()
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

export const praiseModalSettings = meta => {
  const settings: ModalSettings = {
    type: 'component',
    component: 'PraiseModalComponent',
    meta: { ...meta },
  }

  return settings
}

export const toastSettings: ToastSettings = {
  message: `Heads up! This site is still under 🚧 construction 🚧`,
  timeout: 3000,
  background: 'variant-filled-primary',
}

export const closeSideNav = () => {
  return drawerStore.close()
}

export const openSideNav = (settings: any) => {
  return drawerStore.open(settings)
}
