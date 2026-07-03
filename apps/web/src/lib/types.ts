export interface SeoData {
	title: string
	description: string
}

export interface BreadcrumbItem {
	title: string
	href: string
}

export interface GalleryPhoto {
	url: string
	alt?: string
	caption?: string
}

export interface PageGallery {
	title?: string
	photos: GalleryPhoto[]
}

export interface Sermon {
	_id: string
	title: string
	date: string
	speaker: string
	scripture: string
	youtube: string
}

export interface PageLayoutData {
	title: string
	breadcrumb: BreadcrumbItem[]
	headData: SeoData
}
