import { writable } from 'svelte/store'

export const projectStarted = writable(false)
export const activeNav = writable('')
export const activePath = writable('')
export const activeBirthdays = writable([])
