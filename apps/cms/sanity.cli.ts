import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
	api: {
		projectId: 'ygo45klz',
		dataset: 'production',
	},
	server: {
		port: 6969,
	},
})
