import { createClient } from '@sanity/client'
import SermonModal from './components/sermons/SermonModal.svelte'
import PraiseModal from './components/ministries/praise/PraiseModal.svelte'
import { Temporal } from '@js-temporal/polyfill'
import MdLocalFlorist from 'svelte-icons/md/MdLocalFlorist.svelte'
import IoMdBook from 'svelte-icons/io/IoMdBook.svelte'
import MdLightbulbOutline from 'svelte-icons/md/MdLightbulbOutline.svelte'
import IoMdPeople from 'svelte-icons/io/IoMdPeople.svelte'
import FaMoneyCheckAlt from 'svelte-icons/fa/FaMoneyCheckAlt.svelte'
import FaRegCalendar from 'svelte-icons/fa/FaRegCalendar.svelte'
import IoMdLogIn from 'svelte-icons/io/IoMdLogIn.svelte'
import IoIosCafe from 'svelte-icons/io/IoIosCafe.svelte'
import type {
	AutocompleteOption,
	DrawerSettings,
	ModalComponent,
	PopupSettings,
	ToastSettings,
} from '@skeletonlabs/skeleton'

export const breadcrumbs = {
	home: { title: 'Home', href: '/' },
	sermons: { title: 'Sermons', href: '/sermons' },
	give: { title: 'Give', href: '/give' },
	error: { title: 'Error', href: '/error' },
	events: { title: 'Events', href: '/events' },
	login: { title: 'Login', href: '/login' },
	contact: { title: 'Contact', href: '/contact' },
	about: {
		title: 'About',
		href: '/about',
		beliefs: {
			title: 'Beliefs',
			href: '/about/beliefs',
		},
		missionVision: {
			title: 'Mission & Vision',
			href: '/about/mission-vision',
		},
		leadership: {
			title: 'Leadership',
			href: '/about/leadership',
		},
	},
	ministries: {
		title: 'Ministries',
		href: '/ministries',
		men: { title: 'Men', href: '/ministries/men' },
		women: { title: 'Women', href: '/ministries/women' },
		ya: { title: 'Young Adults', href: '/ministies/young-adults' },
		prayer: { title: 'Prayer', href: '/ministries/prayer' },
		youth: { title: 'Youth', href: '/ministries/youth' },
		sundaySchool: { title: 'Sunday School', href: '/ministries/sunday-school' },
		praise: {
			title: 'Praise & Worship',
			href: '/ministries/praise',
			schedule: { title: 'Schedule', href: '/ministries/praise/schedule' },
		},
		sundayMinistries: {
			title: 'Sunday Ministries',
			href: '/sunday-ministries',
		},
		programming: {
			title: 'Programming',
			href: '/programming',
			details: {
				title: 'Programming Details',
				href: '/programming/details',
			},
		},
	},
	smallgroups: {
		title: 'Small Groups',
		href: '/small-groups',
		macasaquit: {
			title: 'Macasaquit Bible Study',
			href: '/small-groups/macasaquit-bible-study',
		},
		southMississauga: {
			title: 'South Mississauga',
			href: '/small-groups/south-mississauga',
		},
		ubs: {
			title: 'University Bible Study',
			href: '/small-groups/university-bible-study',
		},
		womenChasingGod: {
			title: 'Women Chasing God',
			href: '/small-groups/women-chasing-god',
		},
		ya: {
			title: 'Young Adults',
			href: '/small-groups/young-adults',
			men: { title: 'Men', href: '/small-groups/young-adults/men' },
			women: { title: 'Women', href: '/small-groups/young-adults/women' },
		},
		yumul: {
			title: 'Partners in Prayer',
			href: '/small-groups/partners-in-prayer',
		},
	},
	sundaySchool: {
		title: 'Sunday School',
		href: '/sunday-school',
		teachers: {
			title: 'SS Teachers',
			href: '/ss-teachers',
		},
		toddler: {
			title: 'Toddler Class',
			href: '/ss-teachers/toddler',
		},
		junior: {
			title: 'Junior Class',
			href: '/ss-teachers/junior',
		},
		primary: {
			title: 'Primary Class',
			href: '/ss-teachers/primary',
		},
	},
}

export const client = createClient({
	projectId: 'ygo45klz',
	dataset: 'production',
	apiVersion: '2023-03-30',
	useCdn: false,
})

export const navOptions = [
	{
		href: '/about',
		title: 'About',
		icon: MdLightbulbOutline,
	},
	{
		href: '/sermons',
		title: 'Sermons',
		icon: IoMdBook,
	},
	{
		href: '/events',
		title: 'Events',
		icon: FaRegCalendar,
	},
	{
		href: '/ministries',
		title: 'Ministries',
		icon: MdLocalFlorist,
	},
	{
		href: '/small-groups',
		title: 'Small Groups',
		icon: IoMdPeople,
	},
	{
		href: '/give',
		title: 'Give',
		icon: FaMoneyCheckAlt,
	},
	{
		href: '/',
		title: 'Login',
		icon: IoMdLogIn,
	},
	{
		href: '/contact',
		title: 'Contact',
		icon: IoIosCafe,
	},
]

export const links = {
	ghReleases: 'https://github.com/n9d0g/fcc/releases',
	googleMaps:
		'https://www.google.ca/maps/place/5225+Orbitor+Dr,+Mississauga,+ON+L4W+4Y8/@43.6598788,-79.6065117,17z/data=!3m1!4b1!4m6!3m5!1s0x882b38554ef96393:0x5a2b697b840d7a7d!8m2!3d43.6598749!4d-79.604323!16s%2Fg%2F11b8v4jvnm',
	zoom: 'https://us04web.zoom.us/j/3926981154?pwd=d1BHRTB3eStxZFZIS3lyWHBieENvZz09&fbclid=IwAR1N4y1LI5zX5bPnAABrXd_8ICuFko9Hw_5HV2P4wWj7U6JmALskzjO3H_U',
	giveVerse1:
		'https://www.biblegateway.com/passage/?search=2%20Corinthians%209%3A7&version=NIV',
	giveVerse2:
		'https://www.biblegateway.com/passage/?search=2+Corinthians+9%3A8&version=NIV',
	etransfer: 'emailto:fcc.fcac@gmail.com',
	excel:
		'https://docs.google.com/spreadsheets/d/1SuzguOJzxilcX1COZMnvoqOl0MWD8xlGJVsVLLwJGlo/edit#gid=0',
	calendar:
		'https://calendar.google.com/calendar/embed?height=900&wkst=1&bgcolor=%230ea5e9&ctz=America%2FToronto&showTitle=1&showNav=1&showDate=1&showPrint=0&showCalendars=0&src=nate%40fcccanada.ca&ctz=America%2FToronto&color=%23009688',
	programming: {
		details:
			'https://docs.google.com/spreadsheets/d/1iFB5tAo-S7RFSaUZrl9PH33X-fjfAbozwBunRYdqrsc/edit#gid=0',
		attendance:
			'https://docs.google.com/spreadsheets/d/1-wwTym8TqkicbAW9Eb42kdy0Qtp0HneuseVycepJ-OE/edit#gid=595486822',
	},
	wcg: {
		zoom: 'https://us02web.zoom.us/j/8781264602?pwd=dHkwcytVdXdYWXVOdk82Smk4WS9UZz09',
		core52: 'https://core52.org/',
		doctrines: 'https://www.minibiblelessons.com/doctrine/',
		teenTopics: 'https://www.minibiblelessons.com/teen-topics/',
	},
	socials: {
		youtube: 'https://www.youtube.com/@freedominchristchurchcanada',
		ig: 'https://www.instagram.com/fcc.canada/',
		fb: 'https://www.facebook.com/groups/1667915316820460',
	},
}

export const missionVision = {
	mission:
		'To introduce and represent Christ through our nurturing, small group-driven ministries in the community.',
	vision:
		'A Christ-centred, Holy Spirit-led community committed to the building of strong relationships and planting of healthy reproducing churches.',
}

export const dateToday = Temporal.Now.plainDateISO().toString()

// skeleton constants
export const drawerSettings: DrawerSettings = {
	position: 'right',
}

export const modalComponentRegistry: Record<string, ModalComponent> = {
	SermonModalComponent: {
		ref: SermonModal,
	},
	PraiseModalComponent: {
		ref: PraiseModal,
	},
}

export const devToastSettings: ToastSettings = {
	message: `📣 DEV SITE 📣`,
	autohide: false,
	background: 'variant-filled-error',
}

export const praiseFilterPopupSettings: PopupSettings = {
	event: 'focus-blur',
	target: 'praiseAutocomplete',
	placement: 'bottom',
	closeQuery: '.autocomplete-list, .list-nav, ul, li, .autocomplete-item',
}

// SEO constants
export const headData = {
	home: {
		title: 'Freedom in Christ Church.',
		description:
			'Official website for the Freedom in Christ Church located in Mississauga, ON.',
	},
	about: {
		title: 'FCC | About',
		description: 'About page for the Freedom in Christ Church.',
	},
	beliefs: {
		title: 'FCC | Beliefs',
		description: 'Beliefs page for the Freedom in Christ Church.',
	},
	missionVision: {
		title: 'FCC | Mission & Vision',
		description: 'Mission and Vision page for the Freedom in Christ Church.',
	},
	leadership: {
		title: 'FCC | Leadership',
		description: 'Leadership page for the Freedom in Christ Church.',
	},
	sermons: {
		title: 'FCC | Sermons',
		description: 'Sermons page for the Freedom in Christ Church.',
	},
	ministries: {
		title: 'FCC | Ministries',
		description: 'Ministries page for the Freedom in Christ Church.',
	},
	praise: {
		title: 'FCC | Praise',
		description: 'Praise & Worship page for the Freedom in Christ Church.',
	},
	schedule: {
		title: 'FCC | Praise Schedule',
		description:
			'Praise & Worship Schedule page for the Freedom in Christ Church.',
	},
	give: {
		title: 'FCC | Give',
		description:
			'Give / Offering page for the Freedom in Christ Church. Generosity is a form of Worship.',
	},
	contact: {
		title: 'FCC | Contact',
		description:
			'Contact page for the Freedom in Christ Church. Generosity is a form of Worship.',
	},
	sundayMinistries: {
		title: 'FCC | Sunday Ministries',
		description:
			'Sunday Ministries page for the Freedom in Christ Church. Generosity is a form of Worship.',
	},
	ministriesMen: {
		title: 'FCC | Ministries - Men',
		description:
			'Our various activities, events and meetings are all geared towards helping MEN of all ages come together for times of fun, fellowship and teaching with the goals of becoming the spiritual leaders God has designed them to be.',
	},
	ministriesWomen: {
		title: 'FCC | Ministries - Women',
		description: "Women's Ministry page for the Freedom in Christ Church.",
	},
	ministriesYA: {
		title: 'FCC | Ministries - YA',
		description:
			"Young Adults' Ministry page for the Freedom in Christ Church.",
	},
	ministriesYouth: {
		title: 'FCC | Ministries - Youth',
		description: "Youth's Ministry page for the Freedom in Christ Church.",
	},
	ministriesPrayer: {
		title: 'FCC | Ministries - Prayer',
		description: 'Prayer Ministry page for the Freedom in Christ Church.',
	},
	smallgroups: {
		title: 'FCC | Small Groups',
		description: 'Small Groups page for the Freedom in Christ Church.',
	},
	smallgroupsMacasaquit: {
		title: 'FCC | Macasaquit Small Group',
		description:
			'Macasaquit Small Group page for the Freedom in Christ Church.',
	},
	smallgroupsYumul: {
		title: 'FCC | Partners in Prayer Bible Study',
		description:
			'Partners in Prayer Bible Study Small Group page for the Freedom in Christ Church.',
	},
	smallgroupsSouthMississauga: {
		title: 'FCC | South Mississauga Small Group',
		description:
			'South Mississauga Small Group page for the Freedom in Christ Church.',
	},
	smallgroupsUBS: {
		title: 'FCC | University Bible Study Small Group',
		description:
			'University Bible Study Small Group page for the Freedom in Christ Church.',
	},
	smallgroupsWCG: {
		title: 'FCC | Women Chasing God Small Group',
		description:
			'Women Chasing God Small Group page for the Freedom in Christ Church.',
	},
	smallgroupsYA: {
		title: "FCC | Young Adults' Small Group",
		description:
			"Young Adults' Small Group page for the Freedom in Christ Church.",
	},
	smallgroupsYAMen: {
		title: "FCC | Men's YA Small Group",
		description:
			"Men's Young Adults' Small Group page for the Freedom in Christ Church.",
	},
	smallgroupsYAWomen: {
		title: "FCC | Women's YA Small Group",
		description:
			"Women's Young Adults' Small Group page for the Freedom in Christ Church.",
	},
	events: {
		title: 'FCC | Events',
		description: 'FCC Events page for the Freedom in Christ Church.',
	},
	login: {
		title: 'FCC | Login',
		description: 'FCC Login page for the Freedom in Christ Church.',
	},
	programming: {
		title: 'FCC | Programming',
		description: 'FCC Programming page for the Freedom in Christ Church.',
	},
	sundaySchool: {
		title: 'FCC | Sunday School',
		description: 'FCC Sunday School page for the Freedom in Christ Church.',
		teachers: {
			title: 'FCC | SS Teachers',
			description:
				"FCC Sunday School Teachers' page for the Freedom in Christ Church.",
		},
		toddler: {
			title: 'FCC | Toddler Class',
			description:
				'FCC Toddler Sunday School page for the Freedom in Christ Church.',
		},
		primary: {
			title: 'FCC | Primary Class',
			description:
				'FCC Primary Sunday School page for the Freedom in Christ Church.',
		},
		junior: {
			title: 'FCC | Junior Class',
			description:
				'FCC Junior Sunday School page for the Freedom in Christ Church.',
		},
	},
}
