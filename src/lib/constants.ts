import { createClient } from '@sanity/client'
import type {
	AutocompleteOption,
	DrawerSettings,
	ModalComponent,
	PopupSettings,
	ToastSettings,
} from '@skeletonlabs/skeleton'
import SermonModal from './components/sermons/SermonModal.svelte'
import PraiseModal from './components/ministries/praise/PraiseModal.svelte'
import { Temporal } from '@js-temporal/polyfill'
import MdHome from 'svelte-icons/md/MdHome.svelte'
import MdLocalFlorist from 'svelte-icons/md/MdLocalFlorist.svelte'
import IoMdBook from 'svelte-icons/io/IoMdBook.svelte'
import MdLightbulbOutline from 'svelte-icons/md/MdLightbulbOutline.svelte'
import IoMdPeople from 'svelte-icons/io/IoMdPeople.svelte'
import FaMoneyCheckAlt from 'svelte-icons/fa/FaMoneyCheckAlt.svelte'

export const breadcrumbs = {
	home: { title: 'Home', href: '/' },
	about: { title: 'About', href: '/about' },
	beliefs: { title: 'Beliefs', href: '/about/beliefs' },
	ministries: { title: 'Ministries', href: '/ministries' },
	sermons: { title: 'Sermons', href: '/sermons' },
	praise: { title: 'Praise & Worship', href: '/ministries/praise' },
	schedule: { title: 'Schedule', href: '/ministries/praise/schedule' },
	preteens: { title: 'Preteens', href: '/ministries/preteens' },
	leadership: { title: 'Leadership', href: '/about/leadership' },
	smallgroups: { title: 'Small Groups', href: '/small-groups' },
	ministriesMen: { title: 'Men', href: '/ministries/men' },
	ministriesWomen: { title: 'Women', href: '/ministries/women' },
	ministriesYA: { title: 'Young Adults', href: '/ministies/young-adults' },
	ministriesYouth: { title: 'Youth', href: '/ministries/youth' },
	men: { title: 'Men', href: '/small-groups/young-adults/men' },
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
	missionVision: { title: 'Mission & Vision', href: '/about/mission-vision' },
	sgYA: { title: 'Young Adults', href: '/small-groups/young-adults' },
	sgYAWomen: { title: 'Women', href: '/small-groups/young-adults/women' },
	yumul: {
		title: 'Partners in Prayer',
		href: '/small-groups/partners-in-prayer',
	},
	birthdays: { title: 'Birthdays', href: '/birthdays' },
	give: { title: 'Give', href: '/give' },
	error: { title: 'Error', href: '/error' },
}

export const client = createClient({
	projectId: 'ygo45klz',
	dataset: 'production',
	apiVersion: '2023-03-30',
	useCdn: false,
})

export const navOptions = [
	{
		href: '/',
		title: 'Home',
		icon: MdHome,
	},
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
]

export const links = {
	youtube: 'https://www.youtube.com/@freedominchristchurchcanada',
	ig: 'https://www.instagram.com/fcc.canada/',
	fb: 'https://www.facebook.com/groups/1667915316820460',
	ghReleases: 'https://github.com/n9d0g/fcc/releases',
	googleMaps:
		'https://www.google.ca/maps/place/5225+Orbitor+Dr,+Mississauga,+ON+L4W+4Y8/@43.6598788,-79.6065117,17z/data=!3m1!4b1!4m6!3m5!1s0x882b38554ef96393:0x5a2b697b840d7a7d!8m2!3d43.6598749!4d-79.604323!16s%2Fg%2F11b8v4jvnm',
	zoom: 'https://us04web.zoom.us/j/3926981154?pwd=d1BHRTB3eStxZFZIS3lyWHBieENvZz09&fbclid=IwAR1N4y1LI5zX5bPnAABrXd_8ICuFko9Hw_5HV2P4wWj7U6JmALskzjO3H_U',
	giveVerse1: 'https://www.biblegateway.com/passage/?search=2%20Corinthians%209%3A7&version=NIV',
	giveVerse2: 'https://www.biblegateway.com/passage/?search=2+Corinthians+9%3A8&version=NIV',
	etransfer: 'emailto:fcc.fcac@gmail.com',
}

export const leaders = [
	{
		name: 'Roland Yumul',
		title: 'Elder',
		img: 'https://media.licdn.com/dms/image/C4E03AQEuwd6hM-eB5g/profile-displayphoto-shrink_800_800/0/1645071488158?e=1684972800&v=beta&t=SmZVICeppvChJG8QrWH8SiCiRSF0lzctWeoeZsB_8Aw',
	},
	{
		name: 'Errol Rasco',
		title: 'Elder',
		img: 'https://media.licdn.com/dms/image/C4E03AQFMUkKwE7wlhQ/profile-displayphoto-shrink_800_800/0/1605494638297?e=1684972800&v=beta&t=nKkWGcSleg24HL1qglE1AtJGWAZUcZqg0e7dB6-UMXY',
	},
	{
		name: 'Lolita Irong',
		title: 'Church Advisor',
		img: 'https://scontent.fyto1-1.fna.fbcdn.net/v/t1.6435-9/65182990_2959573534085247_7142814347377508352_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=l6uYBTxSB_cAX8tIg1O&_nc_ht=scontent.fyto1-1.fna&oh=00_AfAhqQExbIuUBof7puMyGuWp3IowxY-MOABTewqvmi-TJQ&oe=64461878',
	},
	{
		name: 'Cherry Macasaquit',
		title: 'Church Secretary',
		img: 'https://scontent.fyto1-1.fna.fbcdn.net/v/t1.18169-9/16113914_1534764989889169_4973299190117740899_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=L_YeMA2B4EMAX888v3y&_nc_ht=scontent.fyto1-1.fna&oh=00_AfAuQgU5KV7Ud78CSNC869AHt7fqyO9wnGHFezylYkZqow&oe=64460941',
	},
	{
		name: 'James Quiambao',
		title: 'Deacon - Church Administration',
		img: 'https://media.licdn.com/dms/image/D5603AQF0R4D9bDJe9Q/profile-displayphoto-shrink_800_800/0/1675285452098?e=1684972800&v=beta&t=qHYgAp9P5hLQ5W1-vFg5FOtzBZ_RokTH_CAtrLB1CIM',
	},
	{
		name: 'John Benologa',
		title: 'Deacon - Church Programming',
		img: 'https://media.licdn.com/dms/image/C5603AQEpnWR9SEvz7g/profile-displayphoto-shrink_800_800/0/1589062001481?e=1684972800&v=beta&t=wtl4hCSWznwgWotO-cdkdTYgneJ0nvOhg6WswbYAu-E',
	},
	{
		name: 'Ian Irong',
		title: 'Deacon - Church Outreach',
		img: 'https://scontent.fyto1-2.fna.fbcdn.net/v/t1.15752-9/337080317_774354094255285_2196328331222131331_n.jpg?stp=dst-jpg_p1080x2048&_nc_cat=111&ccb=1-7&_nc_sid=ae9488&_nc_ohc=O621cIix7RAAX8UZwtS&_nc_ht=scontent.fyto1-2.fna&oh=03_AdSayUSYIstPsekFKocP1Jx9DA8wyhFb20CL6MuQPmg8JQ&oe=64461F6B',
	},
	{
		name: 'Didymuz Cruz',
		title: 'Deacon - Church Edification',
		img: 'https://cdn.discordapp.com/avatars/337151082566254592/a6596db63639c9eb5ea5f554dc9806de.webp?size=128',
	},
]

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

export const praiseLeaderOptions: AutocompleteOption[] = [
	{ label: 'FCC Men', value: 'men', keywords: '' },
	{
		label: 'FCC Pre-teens',
		value: 'preteens',
		keywords: 'preteens, youth, kids',
	},
	{ label: 'FCC Women', value: 'women', keywords: '' },
	{ label: 'James', value: 'james', keywords: '' },
	{ label: 'John', value: 'john', keywords: '' },
	{ label: 'Joi', value: 'joi', keywords: '' },
	{ label: 'Nathan', value: 'nathan', keywords: '' },
	{ label: 'Raquel', value: 'raquel', keywords: '' },
	{ label: 'Rommel', value: 'rommel', keywords: '' },
]

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
		description: 'Official website for the Freedom in Christ Church located in Mississauga, ON.',
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
		description: 'Praise & Worship Schedule page for the Freedom in Christ Church.',
	},
	birthdays: {
		title: 'FCC | Birthdays',
		description: 'Birthdays page for the Freedom in Christ Church.',
	},
	give: {
		title: 'FCC | Give',
		description: 'Give / Offering page for the Freedom in Christ Church. Generosity is a form of Worship.',
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
	ministriesPreteens: {
		title: 'FCC | Ministries - Preteens',
		description: "Preteen's Ministry page for the Freedom in Christ Church.",
	},
	ministriesYA: {
		title: 'FCC | Ministries - YA',
		description: "Young Adults' Ministry page for the Freedom in Christ Church.",
	},
	ministriesYouth: {
		title: 'FCC | Ministries - Youth',
		description: "Youth's Ministry page for the Freedom in Christ Church.",
	},
	smallgroups: {
		title: 'FCC | Small Groups',
		description: 'Small Groups page for the Freedom in Christ Church.',
	},
	smallgroupsMacasaquit: {
		title: 'FCC | Macasaquit Small Group',
		description: 'Macasaquit Small Group page for the Freedom in Christ Church.',
	},
	smallgroupsYumul: {
		title: 'FCC | Partners in Prayer Bible Study',
		description: 'Partners in Prayer Bible Study Small Group page for the Freedom in Christ Church.',
	},
	smallgroupsSouthMississauga: {
		title: 'FCC | South Mississauga Small Group',
		description: 'South Mississauga Small Group page for the Freedom in Christ Church.',
	},
	smallgroupsUBS: {
		title: 'FCC | University Bible Study Small Group',
		description: 'University Bible Study Small Group page for the Freedom in Christ Church.',
	},
	smallgroupsWCG: {
		title: 'FCC | Women Chasing God Small Group',
		description: 'Women Chasing God Small Group page for the Freedom in Christ Church.',
	},
	smallgroupsYA: {
		title: "FCC | Young Adults' Small Group",
		description: "Young Adults' Small Group page for the Freedom in Christ Church.",
	},
	smallgroupsYAMen: {
		title: "FCC | Men's YA Small Group",
		description: "Men's Young Adults' Small Group page for the Freedom in Christ Church.",
	},
	smallgroupsYAWomen: {
		title: "FCC | Women's YA Small Group",
		description: "Women's Young Adults' Small Group page for the Freedom in Christ Church.",
	},
}
