/**
 * Navigation state using Svelte 5 runes
 * This replaces the Svelte 4 writable stores with simpler reactive state
 */

// Shared reactive state for navigation
let _activeNav = $state('')
let _activePath = $state('')

export const navigationState = {
	get activeNav() {
		return _activeNav
	},
	set activeNav(value: string) {
		_activeNav = value
	},
	get activePath() {
		return _activePath
	},
	set activePath(value: string) {
		_activePath = value
	},
}

// Helper function to set navigation state based on path
export function setNavActiveState(path: string) {
	if (path.includes('about')) navigationState.activeNav = 'about'
	else if (path.includes('sermons')) navigationState.activeNav = 'sermons'
	else if (path.includes('ministries')) navigationState.activeNav = 'ministries'
	else if (path.includes('small-groups')) navigationState.activeNav = 'small-groups'
	else if (path.includes('give')) navigationState.activeNav = 'give'
	else if (path.includes('events')) navigationState.activeNav = 'events'
	else navigationState.activeNav = 'home'
}

export function setActivePath(path: string) {
	navigationState.activePath = path
}
