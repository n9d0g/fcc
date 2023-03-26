import { writable } from 'svelte/store'

export const sideNavOpen = writable(false)
export const projectStarted = writable(false)
export const activeNav = writable('')
