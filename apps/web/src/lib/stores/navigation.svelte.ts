/**
 * Navigation state using Svelte 5 runes
 */

let _activeNav = $state('')

export const navigationState = {
	get activeNav() {
		return _activeNav
	},
	set activeNav(value: string) {
		_activeNav = value
	},
}

export function setNavActiveState(path: string) {
	if (path.includes('about')) navigationState.activeNav = 'about'
	else if (path.includes('sermons')) navigationState.activeNav = 'sermons'
	else if (path.includes('ministries')) navigationState.activeNav = 'ministries'
	else if (path.includes('small-groups'))
		navigationState.activeNav = 'small-groups'
	else if (path.includes('give')) navigationState.activeNav = 'give'
	else if (path.includes('events')) navigationState.activeNav = 'events'
	else if (path.includes('programming'))
		navigationState.activeNav = 'ministries'
	else if (path.includes('contact')) navigationState.activeNav = 'contact'
	else if (path.includes('login')) navigationState.activeNav = 'login'
	else navigationState.activeNav = 'home'
}
