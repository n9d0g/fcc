export type GalleryPhoto = {
	url: string
	alt?: string
	caption?: string
}

export type PageGallery = {
	title?: string
	photos: GalleryPhoto[]
}

export type Sermon = {
	_id: string
	title: string
	date: string
	speaker: string
	scripture: string
	youtube: string
}

/** Site-wide notice shown above the header (apps/cms/schemas/banner.ts) */
export type Banner = {
	_id: string
	_updatedAt: string
	body?: {
		_key: string
		children: { _key: string; marks: string[]; text: string }[]
		markDefs?: { _key: string; href: string }[]
		style: string
	}[]
	title?: string
	/** Last day shown, yyyy-MM-dd */
	date: string
}
