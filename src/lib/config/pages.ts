import type { RouteId } from '$app/types'

/** What a page is called and whether search engines should list it. */
export type PageEntry = {
	/** Breadcrumb label */
	label: string
	/** SEO title (<title>, Open Graph) */
	title: string
	description: string
	/** Left out of the sitemap, disallowed in robots.txt and tagged noindex */
	indexed?: false
	/** Sitemap priority; 0.6 when unset */
	priority?: number
}

export type Crumb = { label: string; href: string }

/** A page's entry resolved for rendering, as `page.data.pageMeta`. */
export type PageMeta = {
	title: string
	description: string
	indexed: boolean
	/** Home first, this page last */
	crumbs: Crumb[]
}

/**
 * Every page on the site, keyed by SvelteKit route id. Breadcrumbs follow the
 * path, skipping levels with no entry (e.g. /admin, /events/2026). The root
 * layout resolves the current route's entry; pages.test.ts checks that every
 * +page.svelte has one.
 */
export const PAGES = {
	'/': {
		label: 'Home',
		title: 'Freedom in Christ Church | Alliance Church in Mississauga',
		description:
			'Freedom in Christ Church is a welcoming, volunteer-led Alliance church in Mississauga, ON. Join us Sundays at 10:30 AM in person or on Zoom for worship, Bible teaching, small groups and ministries for every age.',
		priority: 1.0,
	},
	'/about': {
		label: 'About',
		title: 'About FCC | Volunteer-Led Alliance Church, Mississauga',
		description:
			'Get to know Freedom in Christ Church, a volunteer-led Alliance church in Mississauga, Ontario. Learn our story, beliefs and mission, and how our members serve the Mississauga community together.',
		priority: 0.8,
	},
	'/about/beliefs': {
		label: 'Beliefs',
		title: 'What We Believe | Alliance Church in Mississauga | FCC',
		description:
			'The beliefs, core values and Alliance roots of Freedom in Christ Church in Mississauga. Learn about the Fourfold Gospel and the history of The Christian and Missionary Alliance, founded by Canadian A. B. Simpson.',
	},
	'/about/leadership': {
		label: 'Leadership',
		title: 'Church Leadership | Freedom in Christ Church Mississauga',
		description:
			'Meet the pastors and volunteer leaders of Freedom in Christ Church, an Alliance church in Mississauga, Ontario, who serve our congregation with care and biblical teaching.',
	},
	'/about/mission-vision': {
		label: 'Mission & Vision',
		title: 'Our Mission & Vision | Freedom in Christ Church Mississauga',
		description:
			'The mission and vision of Freedom in Christ Church, a volunteer-led Alliance church in Mississauga: introducing Christ through small group-driven ministries and planting healthy, reproducing churches.',
	},
	'/account': {
		label: 'Edit Profile',
		title: 'Edit Profile | Freedom in Christ Church',
		description: 'Update your name, email address and password.',
		indexed: false,
	},
	'/admin/availability': {
		label: 'Team Availability',
		title: 'Team Availability | Freedom in Christ Church',
		description: 'Sundays worship team members are unavailable to serve.',
		indexed: false,
	},
	'/admin/blog': {
		label: 'Blog Approvals',
		title: 'Blog Approvals | Freedom in Christ Church',
		description: 'Review blog author requests and posts awaiting approval.',
		indexed: false,
	},
	'/admin/prayer': {
		label: 'Prayer Schedule',
		title: 'Prayer Schedule | Freedom in Christ Church',
		description: 'Manage the weekly prayer meeting devotional schedule.',
		indexed: false,
	},
	'/admin/users': {
		label: 'Users & Roles',
		title: 'Users & Roles | Freedom in Christ Church',
		description: 'Choose which members lead prayer and worship.',
		indexed: false,
	},
	'/admin/worship': {
		label: 'Worship Schedule',
		title: 'Worship Schedule | Freedom in Christ Church',
		description: 'Manage the Sunday worship team, songs and chords.',
		indexed: false,
	},
	'/admin/worship-requests': {
		label: 'Worship Requests',
		title: 'Worship Team Requests | Freedom in Christ Church',
		description: 'Review requests to join the Praise & Worship team.',
		indexed: false,
	},
	'/admin/worship-requests/[id]': {
		label: 'Request',
		title: 'Worship Team Requests | Freedom in Christ Church',
		description: 'Review requests to join the Praise & Worship team.',
		indexed: false,
	},
	'/admin/worship/[id]': {
		label: 'Service',
		title: 'Worship Schedule | Freedom in Christ Church',
		description: 'Manage the Sunday worship team, songs and chords.',
		indexed: false,
	},
	'/blog': {
		label: 'Blog',
		title: 'Blog | Freedom in Christ Church Mississauga',
		description:
			'Stories, devotionals and testimonies written by the members of Freedom in Christ Church, a volunteer-led Alliance church in Mississauga, Ontario.',
	},
	'/blog/[slug]': {
		label: 'Post',
		title: 'Blog | Freedom in Christ Church Mississauga',
		description:
			'Stories, devotionals and testimonies written by the members of Freedom in Christ Church, a volunteer-led Alliance church in Mississauga, Ontario.',
	},
	'/blog/write': {
		label: 'Write',
		title: 'Write for the Blog | Freedom in Christ Church',
		description:
			'Write and manage your posts for the Freedom in Christ Church blog.',
		indexed: false,
	},
	'/blog/write/[id]': {
		label: 'Post',
		title: 'Write for the Blog | Freedom in Christ Church',
		description:
			'Write and manage your posts for the Freedom in Christ Church blog.',
		indexed: false,
	},
	'/contact': {
		label: 'Contact',
		title: 'Contact & Directions | Alliance Church in Mississauga | FCC',
		description:
			'Visit Freedom in Christ Church at 5225 Orbitor Drive, Unit 3, Mississauga, ON. Sunday worship at 10:30 AM in person and on Zoom. Send us a message or plan your visit.',
		priority: 0.8,
	},
	'/events': {
		label: 'Events',
		title: 'Church Events in Mississauga | Freedom in Christ Church',
		description:
			'Upcoming and past events at Freedom in Christ Church, a volunteer-led Alliance church in Mississauga. Add events to your calendar or get new ones by email.',
	},
	'/events/2024': {
		label: '2024',
		title: 'Church Events in Mississauga | Freedom in Christ Church',
		description:
			'Upcoming and past events at Freedom in Christ Church, a volunteer-led Alliance church in Mississauga. Add events to your calendar or get new ones by email.',
	},
	'/events/2024/fall-retreat': {
		label: 'Fall Retreat',
		title: 'Church Events in Mississauga | Freedom in Christ Church',
		description:
			'Upcoming and past events at Freedom in Christ Church, a volunteer-led Alliance church in Mississauga. Add events to your calendar or get new ones by email.',
	},
	'/events/2026/thanksgiving': {
		label: 'Thanksgiving 2026',
		title: 'Thanksgiving 2026 | Freedom in Christ Church Mississauga',
		description:
			'Photos from the Thanksgiving 2026 celebration at Freedom in Christ Church, an Alliance church in Mississauga: worship, a shared meal and our church family giving thanks together.',
	},
	'/events/subscribe/confirm': {
		label: 'Event Updates',
		title: 'Event Updates | Freedom in Christ Church',
		description:
			'Manage your email updates about Freedom in Christ Church events.',
		indexed: false,
	},
	'/events/unsubscribe': {
		label: 'Unsubscribe',
		title: 'Event Updates | Freedom in Christ Church',
		description:
			'Manage your email updates about Freedom in Christ Church events.',
		indexed: false,
	},
	'/give': {
		label: 'Give',
		title: 'Give & Support | Freedom in Christ Church',
		description:
			'Support our ministry and mission in Mississauga. Learn about giving opportunities, tithes, and offerings at Freedom in Christ Church. Your generosity helps us serve the community.',
	},
	'/login': {
		label: 'Login',
		title: 'Member Login | Freedom in Christ Church Portal',
		description:
			'Access your Freedom in Christ Church member portal. Login to view sermons, manage your profile, and stay connected with our Mississauga church community.',
		indexed: false,
	},
	'/ministries': {
		label: 'Ministries',
		title: 'Church Ministries in Mississauga | Freedom in Christ Church',
		description:
			"Find your place to serve and connect at Freedom in Christ Church, a volunteer-led Alliance church in Mississauga. Worship, prayer, Sunday school, men's, women's, youth and young adults ministries.",
		priority: 0.8,
	},
	'/ministries/men': {
		label: 'Men',
		title:
			"Men's Ministry | Brotherhood & Spiritual Growth at Freedom in Christ Church",
		description:
			"Join our Men's Ministry at Freedom in Christ Church in Mississauga. Build authentic friendships, grow in faith, and become the spiritual leaders God designed you to be through fellowship and biblical teaching.",
	},
	'/ministries/praise': {
		label: 'Praise & Worship',
		title: 'Praise & Worship | Freedom in Christ Church',
		description:
			'Experience uplifting worship and praise music at Freedom in Christ Church. Join our worship team and congregation in Mississauga for meaningful, spirit-filled worship services.',
	},
	'/ministries/praise/availability': {
		label: 'My Availability',
		title: 'My Availability | Freedom in Christ Church',
		description:
			'Let the Praise & Worship leaders know which Sundays you are unable to serve.',
		indexed: false,
	},
	'/ministries/praise/join': {
		label: 'Join the Team',
		title: 'Join the Worship Team | Freedom in Christ Church',
		description:
			'Request to join the Praise & Worship team at Freedom in Christ Church in Mississauga. Vocalists and musicians of every skill level are welcome.',
	},
	'/ministries/praise/schedule': {
		label: 'Schedule',
		title: 'Worship Schedule | Sunday Services at Freedom in Christ Church',
		description:
			'Find our weekly worship schedule and service times at Freedom in Christ Church in Mississauga. Join us for Sunday worship, Bible study, and special events throughout the week.',
		indexed: false,
	},
	'/ministries/praise/song-usage': {
		label: 'Song Usage',
		title: 'Praise Songs & Worship Music | Freedom in Christ Church',
		description:
			'Explore our worship music collection and praise songs used at Freedom in Christ Church in Mississauga. Discover the hymns and contemporary worship music that inspire our community.',
		indexed: false,
	},
	'/ministries/prayer': {
		label: 'Prayer',
		title:
			'Prayer Ministry | Join Our Prayer Community at Freedom in Christ Church',
		description:
			'Experience the power of prayer at Freedom in Christ Church in Mississauga. Join our Prayer Ministry for intercessory prayer, prayer meetings, and spiritual support for our community and beyond.',
	},
	'/ministries/sunday-ministries': {
		label: 'Sunday Ministries',
		title: 'Volunteer at Church in Mississauga | Sunday Ministries | FCC',
		description:
			"Freedom in Christ Church is a volunteer-led Alliance church in Mississauga, and every Sunday is run by volunteers. Serve in hospitality, AV, children's ministry and more.",
	},
	'/ministries/sunday-school': {
		label: 'Sunday School',
		title: "Sunday School | Children's Ministry at Freedom in Christ Church",
		description:
			"Nurture your child's faith at Freedom in Christ Church's Sunday School in Mississauga. Age-appropriate Bible teaching, fun activities, and spiritual growth for children of all ages.",
	},
	'/ministries/women': {
		label: 'Women',
		title: "Women's Ministry | Sisterhood & Faith at Freedom in Christ Church",
		description:
			"Connect with other women of faith at Freedom in Christ Church in Mississauga. Join our Women's Ministry for Bible studies, fellowship events, and spiritual growth in a supportive community.",
	},
	'/ministries/young-adults': {
		label: 'Young Adults',
		title: 'Young Adults Ministry | Freedom in Christ Church',
		description:
			"Connect with other young adults in Mississauga at Freedom in Christ Church. Our Young Adults Ministry offers relevant teaching, authentic community, and opportunities to grow in faith during life's pivotal years.",
	},
	'/ministries/youth': {
		label: 'Youth',
		title: 'Youth Ministry | Teens & High School at Freedom in Christ Church',
		description:
			'Empowering the next generation at Freedom in Christ Church in Mississauga. Our Youth Ministry provides a safe space for teens to explore faith, build friendships, and discover their purpose in Christ.',
	},
	'/programming': {
		label: 'Programming',
		title: 'Church Programs | Freedom in Christ Church',
		description:
			'Explore all programs and activities at Freedom in Christ Church in Mississauga. From Sunday services to special events, discover opportunities for worship, fellowship, and spiritual growth.',
	},
	'/programming/details': {
		label: 'Programming Details',
		title: 'Church Programs | Freedom in Christ Church',
		description:
			'Explore all programs and activities at Freedom in Christ Church in Mississauga. From Sunday services to special events, discover opportunities for worship, fellowship, and spiritual growth.',
	},
	'/sermons': {
		label: 'Sermons',
		title: 'Sermons & Messages | Freedom in Christ Church',
		description:
			'Watch and listen to inspiring sermons from Freedom in Christ Church. Access our latest messages, biblical teachings, and spiritual guidance from our Mississauga church community.',
		priority: 0.8,
	},
	'/signup': {
		label: 'Sign Up',
		title: 'Create an Account | Freedom in Christ Church',
		description:
			'Create a free Freedom in Christ Church account to join the worship team, lead prayer meetings and write for the blog.',
		indexed: false,
	},
	'/small-groups': {
		label: 'Small Groups',
		title: 'Small Groups & Bible Studies in Mississauga | FCC',
		description:
			'Join a small group or Bible study with Freedom in Christ Church, a volunteer-led Alliance church in Mississauga. Groups meet across Mississauga, Brampton and online.',
		priority: 0.8,
	},
	'/small-groups/brampton-womens-1': {
		label: "Brampton Women's Bible Study 1",
		title: "Brampton Women's Bible Study 1 | Freedom in Christ Church",
		description:
			"Join our Brampton Women's Bible Study Group 1 at Freedom in Christ Church. Connect with other women in faith through meaningful Bible study, prayer, and fellowship in a supportive community.",
	},
	'/small-groups/brampton-womens-2': {
		label: "Brampton Women's Bible Study 2",
		title: "Brampton Women's Bible Study 2 | Freedom in Christ Church",
		description:
			"Join our Brampton Women's Bible Study Group 2 at Freedom in Christ Church. Grow in faith alongside other women through engaging Bible study, heartfelt prayer, and authentic fellowship.",
	},
	'/small-groups/golden-girls': {
		label: 'Golden Girls',
		title: 'Golden Girls | Freedom in Christ Church',
		description:
			'Join the Golden Girls small group at Freedom in Christ Church. A vibrant community of women growing together in faith through Bible study, prayer, and fellowship via Zoom.',
	},
	'/small-groups/macasaquit-bible-study': {
		label: 'Macasaquit Bible Study',
		title: 'Macasaquit Small Group | Bible Study in Mississauga',
		description:
			'Join the Macasaquit Small Group at Freedom in Christ Church for intimate Bible study, prayer, and fellowship. Connect with believers in your Mississauga neighborhood for spiritual growth and community.',
	},
	'/small-groups/partners-in-prayer': {
		label: 'Partners in Prayer',
		title: 'Partners in Prayer Bible Study | Freedom in Christ Church',
		description:
			'Deepen your prayer life through our Partners in Prayer Bible Study at Freedom in Christ Church in Mississauga. Learn biblical principles of prayer and join a community committed to intercession.',
	},
	'/small-groups/south-mississauga': {
		label: 'South Mississauga',
		title: 'South Mississauga Small Group | Community Bible Study',
		description:
			'Connect with Christians in South Mississauga through our small group at Freedom in Christ Church. Enjoy Bible study, fellowship, and spiritual growth with neighbors in your area.',
	},
	'/small-groups/university-bible-study': {
		label: 'University Bible Study',
		title:
			'University Bible Study | College Ministry at Freedom in Christ Church',
		description:
			'University students in Mississauga, join our University Bible Study at Freedom in Christ Church. Navigate college life with faith, find Christian community, and grow in biblical knowledge.',
	},
	'/small-groups/women-chasing-god': {
		label: 'Women Chasing God',
		title:
			"Women Chasing God | Women's Small Group at Freedom in Christ Church",
		description:
			'Join Women Chasing God small group at Freedom in Christ Church in Mississauga. Experience authentic sisterhood, biblical teaching, and spiritual growth designed specifically for women of faith.',
	},
	'/small-groups/young-adults': {
		label: 'Young Adults',
		title: 'Young Adults Small Group | Mississauga Christian Community',
		description:
			"Connect with other young adults at Freedom in Christ Church in Mississauga. Our Young Adults Small Group offers relevant Bible study, fellowship, and support during life's transition years.",
	},
} satisfies Partial<Record<RouteId, PageEntry>>

export type PageId = keyof typeof PAGES

export const isPageId = (id: string | null): id is PageId =>
	!!id && Object.hasOwn(PAGES, id)

const ancestors = (id: string) =>
	id
		.split('/')
		.map((_, i, parts) => parts.slice(0, i + 1).join('/') || '/')
		.filter((prefix, i, all) => all.indexOf(prefix) === i && isPageId(prefix))

/**
 * The resolved metadata for a page. Dynamic pages pass the real label and
 * title from their own load, e.g. `pageFor(route.id, { label: post.title })`.
 */
export const pageFor = (
	id: PageId,
	overrides: Partial<Pick<PageEntry, 'label' | 'title' | 'description'>> = {}
): PageMeta => {
	const entry: PageEntry = { ...PAGES[id], ...overrides }
	return {
		title: entry.title,
		description: entry.description,
		indexed: entry.indexed !== false,
		crumbs: ancestors(id).map((prefix) => ({
			label:
				prefix === id
					? entry.label
					: (PAGES[prefix as PageId] as PageEntry).label,
			href: prefix,
		})),
	}
}
