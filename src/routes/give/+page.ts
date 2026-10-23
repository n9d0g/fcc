import { links } from '#lib/config/index.js'

export const load = async () => {
	return {
		links: {
			verse1: links.giveVerse1,
			verse2: links.giveVerse2,
			googleMaps: links.googleMaps,
			etransfer: links.etransfer,
		},
	}
}
