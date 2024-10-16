// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}

		interface Banner {
			body: {
				children: {
					marks: string[]
					text: string
				}[]
				markDefs: {
					href: string
				}[]
				style: string
			}[]
			title: string
			date: string
		}
	}
}

export {}
