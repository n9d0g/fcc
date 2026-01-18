// Modal store using Svelte 5 runes
export type ModalType = 'sermon' | 'praise' | null

export interface SermonModalData {
	title: string
	date: string
	speaker: string
	scripture: string
	youtube: string
}

export interface PraiseModalData {
	date: string
	speaker?: string
	title?: string
	series?: string
	scripture?: string
	objective?: string
	summary?: string
	songs?: Array<{ title: string; artist: string }>
	pdf?: string
	unavailableList?: Array<{ name: string; reason: string }>
}

export type ModalData = SermonModalData | PraiseModalData | null

// Create reactive state for modal
let modalType = $state<ModalType>(null)
let modalData = $state<ModalData>(null)

export function openSermonModal(data: SermonModalData) {
	modalType = 'sermon'
	modalData = data
}

export function openPraiseModal(data: PraiseModalData) {
	modalType = 'praise'
	modalData = data
}

export function closeModal() {
	modalType = null
	modalData = null
}

export function getModalState() {
	return {
		get type() {
			return modalType
		},
		get data() {
			return modalData
		},
		get isOpen() {
			return modalType !== null
		},
	}
}
