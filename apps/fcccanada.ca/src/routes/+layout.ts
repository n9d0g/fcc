import { activePath } from '$lib/stores/store.js'

export const load = ({ url }) => {
	let activePathValue: string = ''
	activePath.subscribe((value) => (activePathValue = value))

	return {
		url: url.pathname,
	}
}
