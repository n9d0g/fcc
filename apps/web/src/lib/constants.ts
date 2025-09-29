import { createClient } from '@sanity/client'
import SermonModal from './components/sermons/SermonModal.svelte'
import PraiseModal from './components/ministries/praise/PraiseModal.svelte'
import MdLocalFlorist from 'svelte-icons/md/MdLocalFlorist.svelte'
import IoMdBook from 'svelte-icons/io/IoMdBook.svelte'
import MdLightbulbOutline from 'svelte-icons/md/MdLightbulbOutline.svelte'
import IoMdPeople from 'svelte-icons/io/IoMdPeople.svelte'
import FaMoneyCheckAlt from 'svelte-icons/fa/FaMoneyCheckAlt.svelte'
import FaRegCalendar from 'svelte-icons/fa/FaRegCalendar.svelte'
import IoMdLogIn from 'svelte-icons/io/IoMdLogIn.svelte'
import IoIosCafe from 'svelte-icons/io/IoIosCafe.svelte'
import type {
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
	events: {
		title: 'Events',
		href: '/events',
		'2024': {
			title: '2024',
			href: '/events/2024',
			fallRetreat: { title: 'Fall Retreat', href: '/events/2024/fall-retreat' },
		},
	},
	login: { title: 'Login', href: '/login' },
	contact: { title: 'Contact', href: '/contact' },
	about: {
		title: 'About',
		href: '/about',
		beliefs: { title: 'Beliefs', href: '/about/beliefs' },
		missionVision: { title: 'Mission & Vision', href: '/about/mission-vision' },
		leadership: { title: 'Leadership', href: '/about/leadership' },
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
			songUsage: { title: 'Song Usage', href: '/ministries/praise/song-usage' },
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
	njil: 'https://njil.dev',
	avSetup:
		'https://n9d0g.notion.site/AV-setup-10949c91f89280c8b319c20ecec69bef',
	ghReleases: 'https://github.com/n9d0g/fcc/releases',
	googleMaps:
		'https://www.google.ca/maps/place/5225+Orbitor+Dr,+Mississauga,+ON+L4W+4Y8/@43.6598788,-79.6065117,17z/data=!3m1!4b1!4m6!3m5!1s0x882b38554ef96393:0x5a2b697b840d7a7d!8m2!3d43.6598749!4d-79.604323!16s%2Fg%2F11b8v4jvnm',
	zoom: 'https://us04web.zoom.us/j/3926981154?pwd=d1BHRTB3eStxZFZIS3lyWHBieENvZz09&fbclid=IwAR1N4y1LI5zX5bPnAABrXd_8ICuFko9Hw_5HV2P4wWj7U6JmALskzjO3H_U',
	giveVerse1:
		'https://www.biblegateway.com/passage/?search=2%20Corinthians%209%3A7&version=NIV',
	giveVerse2:
		'https://www.biblegateway.com/passage/?search=2+Corinthians+9%3A8&version=NIV',
	etransfer: 'emailto:fcc.fcac@gmail.com',
	calendar:
		'https://calendar.google.com/calendar/embed?src=56d34192c2a222f8cb5a5ffdf378d8064c98d35408cc4659688b6d23f51219f5%40group.calendar.google.com&ctz=America%2FToronto',
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

export const praiseFilterPopupSettings: PopupSettings = {
	event: 'focus-blur',
	target: 'praiseAutocomplete',
	placement: 'bottom',
	closeQuery: '.autocomplete-list, .list-nav, ul, li, .autocomplete-item',
}

// SEO constants
export const headData = {
	home: {
		title: 'Freedom in Christ Church | Welcome Home',
		description:
			'Join our welcoming Christian community in Mississauga, ON. Experience meaningful worship, authentic fellowship, and spiritual growth at Freedom in Christ Church. Sunday services, ministries for all ages, and a place to call home.',
	},
	about: {
		title: 'About Freedom in Christ Church | Mississauga Christian Community',
		description:
			'Discover our story, values, and mission at Freedom in Christ Church. Learn how we serve the Mississauga community through faith, fellowship, and Christian love. Join our growing family.',
	},
	beliefs: {
		title: 'What We Believe | Freedom in Christ Church',
		description:
			'Explore our foundational Christian beliefs and biblical teachings. Freedom in Christ Church in Mississauga is grounded in Scripture, committed to authentic faith, and welcoming to all seeking truth.',
	},
	missionVision: {
		title: 'Our Mission & Vision | Freedom in Christ Church',
		description:
			"Discover our mission to spread God's love and our vision for the Mississauga community. Learn how Freedom in Christ Church is building a stronger, more faithful community through service and fellowship.",
	},
	leadership: {
		title: 'Church Leadership | Pastors & Staff at Freedom in Christ Church',
		description:
			'Meet our dedicated pastors and church leaders at Freedom in Christ Church in Mississauga. Our experienced team guides our community with wisdom, compassion, and biblical teaching.',
	},
	sermons: {
		title: 'Sermons & Messages | Freedom in Christ Church',
		description:
			'Watch and listen to inspiring sermons from Freedom in Christ Church. Access our latest messages, biblical teachings, and spiritual guidance from our Mississauga church community.',
	},
	ministries: {
		title: 'Church Ministries | Get Involved at Freedom in Christ Church',
		description:
			"Discover meaningful ways to serve and connect at Freedom in Christ Church in Mississauga. From children's programs to senior ministry, find your place in our Christian community.",
	},
	praise: {
		title: 'Praise & Worship | Freedom in Christ Church',
		description:
			'Experience uplifting worship and praise music at Freedom in Christ Church. Join our worship team and congregation in Mississauga for meaningful, spirit-filled worship services.',
	},
	schedule: {
		title: 'Worship Schedule | Sunday Services at Freedom in Christ Church',
		description:
			'Find our weekly worship schedule and service times at Freedom in Christ Church in Mississauga. Join us for Sunday worship, Bible study, and special events throughout the week.',
	},
	songUsage: {
		title: 'Praise Songs & Worship Music | Freedom in Christ Church',
		description:
			'Explore our worship music collection and praise songs used at Freedom in Christ Church in Mississauga. Discover the hymns and contemporary worship music that inspire our community.',
	},
	give: {
		title: 'Give & Support | Freedom in Christ Church',
		description:
			'Support our ministry and mission in Mississauga. Learn about giving opportunities, tithes, and offerings at Freedom in Christ Church. Your generosity helps us serve the community.',
	},
	contact: {
		title: 'Contact Us | Freedom in Christ Church',
		description:
			"Get in touch with Freedom in Christ Church in Mississauga. Find our location, contact information, and ways to connect with our welcoming Christian community. We'd love to hear from you!",
	},
	sundayMinistries: {
		title:
			'Sunday Ministries | Volunteer Opportunities at Freedom in Christ Church',
		description:
			"Discover volunteer opportunities and Sunday ministries at Freedom in Christ Church in Mississauga. From hospitality to children's ministry, find meaningful ways to serve our community.",
	},
	ministriesMen: {
		title:
			"Men's Ministry | Brotherhood & Spiritual Growth at Freedom in Christ Church",
		description:
			"Join our Men's Ministry at Freedom in Christ Church in Mississauga. Build authentic friendships, grow in faith, and become the spiritual leaders God designed you to be through fellowship and biblical teaching.",
	},
	ministriesWomen: {
		title: "Women's Ministry | Sisterhood & Faith at Freedom in Christ Church",
		description:
			"Connect with other women of faith at Freedom in Christ Church in Mississauga. Join our Women's Ministry for Bible studies, fellowship events, and spiritual growth in a supportive community.",
	},
	ministriesYA: {
		title: 'Young Adults Ministry | Freedom in Christ Church',
		description:
			"Connect with other young adults in Mississauga at Freedom in Christ Church. Our Young Adults Ministry offers relevant teaching, authentic community, and opportunities to grow in faith during life's pivotal years.",
	},
	ministriesYouth: {
		title: 'Youth Ministry | Teens & High School at Freedom in Christ Church',
		description:
			'Empowering the next generation at Freedom in Christ Church in Mississauga. Our Youth Ministry provides a safe space for teens to explore faith, build friendships, and discover their purpose in Christ.',
	},
	ministriesPrayer: {
		title:
			'Prayer Ministry | Join Our Prayer Community at Freedom in Christ Church',
		description:
			'Experience the power of prayer at Freedom in Christ Church in Mississauga. Join our Prayer Ministry for intercessory prayer, prayer meetings, and spiritual support for our community and beyond.',
	},
	smallgroups: {
		title:
			'Small Groups | Bible Study & Fellowship at Freedom in Christ Church',
		description:
			'Join a small group at Freedom in Christ Church in Mississauga for deeper Bible study, authentic relationships, and spiritual growth. Find your community within our larger church family.',
	},
	smallgroupsMacasaquit: {
		title: 'Macasaquit Small Group | Bible Study in Mississauga',
		description:
			'Join the Macasaquit Small Group at Freedom in Christ Church for intimate Bible study, prayer, and fellowship. Connect with believers in your Mississauga neighborhood for spiritual growth and community.',
	},
	smallgroupsYumul: {
		title: 'Partners in Prayer Bible Study | Freedom in Christ Church',
		description:
			'Deepen your prayer life through our Partners in Prayer Bible Study at Freedom in Christ Church in Mississauga. Learn biblical principles of prayer and join a community committed to intercession.',
	},
	smallgroupsSouthMississauga: {
		title: 'South Mississauga Small Group | Community Bible Study',
		description:
			'Connect with Christians in South Mississauga through our small group at Freedom in Christ Church. Enjoy Bible study, fellowship, and spiritual growth with neighbors in your area.',
	},
	smallgroupsUBS: {
		title:
			'University Bible Study | College Ministry at Freedom in Christ Church',
		description:
			'University students in Mississauga, join our University Bible Study at Freedom in Christ Church. Navigate college life with faith, find Christian community, and grow in biblical knowledge.',
	},
	smallgroupsWCG: {
		title:
			"Women Chasing God | Women's Small Group at Freedom in Christ Church",
		description:
			'Join Women Chasing God small group at Freedom in Christ Church in Mississauga. Experience authentic sisterhood, biblical teaching, and spiritual growth designed specifically for women of faith.',
	},
	smallgroupsYA: {
		title: 'Young Adults Small Group | Mississauga Christian Community',
		description:
			"Connect with other young adults at Freedom in Christ Church in Mississauga. Our Young Adults Small Group offers relevant Bible study, fellowship, and support during life's transition years.",
	},
	smallgroupsYAMen: {
		title: "Men's Young Adults Group | Brotherhood at Freedom in Christ Church",
		description:
			"Join our Men's Young Adults Group at Freedom in Christ Church in Mississauga. Build authentic friendships, explore biblical manhood, and grow in faith with other young men.",
	},
	smallgroupsYAWomen: {
		title:
			"Women's Young Adults Group | Sisterhood at Freedom in Christ Church",
		description:
			"Connect with other young women at Freedom in Christ Church in Mississauga. Our Women's Young Adults Group provides biblical teaching, authentic community, and support for young women of faith.",
	},
	events: {
		title: 'Church Events | Freedom in Christ Church Calendar',
		description:
			'Stay updated on upcoming events at Freedom in Christ Church in Mississauga. Join us for worship services, community events, Bible studies, and special celebrations throughout the year.',
	},
	login: {
		title: 'Member Login | Freedom in Christ Church Portal',
		description:
			'Access your Freedom in Christ Church member portal. Login to view sermons, manage your profile, and stay connected with our Mississauga church community.',
	},
	programming: {
		title: 'Church Programs | Freedom in Christ Church',
		description:
			'Explore all programs and activities at Freedom in Christ Church in Mississauga. From Sunday services to special events, discover opportunities for worship, fellowship, and spiritual growth.',
	},
	sundaySchool: {
		title: "Sunday School | Children's Ministry at Freedom in Christ Church",
		description:
			"Nurture your child's faith at Freedom in Christ Church's Sunday School in Mississauga. Age-appropriate Bible teaching, fun activities, and spiritual growth for children of all ages.",
		teachers: {
			title:
				"Sunday School Teachers | Children's Ministry Leaders at Freedom in Christ Church",
			description:
				"Meet our dedicated Sunday School teachers at Freedom in Christ Church in Mississauga. Our passionate educators are committed to nurturing children's faith through biblical teaching and love.",
		},
		toddler: {
			title:
				'Toddler Sunday School | Early Childhood Ministry at Freedom in Christ Church',
			description:
				"Introduce your toddler to God's love at Freedom in Christ Church's Toddler Sunday School in Mississauga. Safe, nurturing environment with age-appropriate Bible stories and activities.",
		},
		primary: {
			title:
				"Primary Sunday School | Elementary Children's Ministry at Freedom in Christ Church",
			description:
				"Engage your elementary-age child at Freedom in Christ Church's Primary Sunday School in Mississauga. Interactive Bible lessons, crafts, and foundational Christian education.",
		},
		junior: {
			title:
				'Junior Sunday School | Pre-Teen Ministry at Freedom in Christ Church',
			description:
				"Help your pre-teen grow in faith at Freedom in Christ Church's Junior Sunday School in Mississauga. Relevant Bible teaching and activities designed for older children.",
		},
	},
}
