// Canonical production origin. Canonical URLs, Open Graph tags and the
// sitemap always point here so dev.fcccanada.ca never competes in search.
export const SITE_URL = 'https://fcccanada.ca'

// Single source for the church's name, address and service time (NAP). Keep
// it identical to the Google Business Profile listing — local search ranking
// depends on these details matching everywhere they appear.
export const church = {
	name: 'Freedom in Christ Church',
	shortName: 'FCC',
	tagline: 'A volunteer-led Alliance church in Mississauga, Ontario',
	description:
		'Freedom in Christ Church (FCC) is a volunteer-led Alliance church in Mississauga, Ontario. We gather every Sunday at 10:30 AM in person and on Zoom for worship, Bible teaching and fellowship, with small groups across Mississauga, Brampton and the GTA.',
	address: {
		street: '5225 Orbitor Drive, Unit 3',
		city: 'Mississauga',
		region: 'ON',
		postalCode: 'L4W 4Y8',
		country: 'CA',
	},
	geo: { latitude: 43.6598749, longitude: -79.604323 },
	serviceTime: { day: 'Sunday', opens: '10:30', closes: '12:30' },
	areaServed: [
		'Mississauga',
		'Brampton',
		'Peel Region',
		'Greater Toronto Area',
	],
	ogImage: `${SITE_URL}/og-image.jpg`,
}

// SEO metadata for all pages
export const headData = {
	home: {
		title: 'Freedom in Christ Church | Alliance Church in Mississauga',
		description:
			'Freedom in Christ Church is a welcoming, volunteer-led Alliance church in Mississauga, ON. Join us Sundays at 10:30 AM in person or on Zoom for worship, Bible teaching, small groups and ministries for every age.',
	},
	about: {
		title: 'About FCC | Volunteer-Led Alliance Church, Mississauga',
		description:
			'Get to know Freedom in Christ Church, a volunteer-led Alliance church in Mississauga, Ontario. Learn our story, beliefs and mission, and how our members serve the Mississauga community together.',
	},
	beliefs: {
		title: 'What We Believe | Alliance Church in Mississauga | FCC',
		description:
			'The beliefs and core values of Freedom in Christ Church, an Alliance church in Mississauga, ON. Grounded in Scripture, centred on Christ and led by the Holy Spirit.',
	},
	missionVision: {
		title: 'Our Mission & Vision | Freedom in Christ Church Mississauga',
		description:
			'The mission and vision of Freedom in Christ Church, a volunteer-led Alliance church in Mississauga: introducing Christ through small group-driven ministries and planting healthy, reproducing churches.',
	},
	leadership: {
		title: 'Church Leadership | Freedom in Christ Church Mississauga',
		description:
			'Meet the pastors and volunteer leaders of Freedom in Christ Church, an Alliance church in Mississauga, Ontario, who serve our congregation with care and biblical teaching.',
	},
	sermons: {
		title: 'Sermons & Messages | Freedom in Christ Church',
		description:
			'Watch and listen to inspiring sermons from Freedom in Christ Church. Access our latest messages, biblical teachings, and spiritual guidance from our Mississauga church community.',
	},
	ministries: {
		title: 'Church Ministries in Mississauga | Freedom in Christ Church',
		description:
			"Find your place to serve and connect at Freedom in Christ Church, a volunteer-led Alliance church in Mississauga. Worship, prayer, Sunday school, men's, women's, youth and young adults ministries.",
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
		title: 'Contact & Directions | Alliance Church in Mississauga | FCC',
		description:
			'Visit Freedom in Christ Church at 5225 Orbitor Drive, Unit 3, Mississauga, ON. Sunday worship at 10:30 AM in person and on Zoom. Send us a message or plan your visit.',
	},
	sundayMinistries: {
		title: 'Volunteer at Church in Mississauga | Sunday Ministries | FCC',
		description:
			"Freedom in Christ Church is a volunteer-led Alliance church in Mississauga, and every Sunday is run by volunteers. Serve in hospitality, AV, children's ministry and more.",
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
		title: 'Small Groups & Bible Studies in Mississauga | FCC',
		description:
			'Join a small group or Bible study with Freedom in Christ Church, a volunteer-led Alliance church in Mississauga. Groups meet across Mississauga, Brampton and online.',
	},
	smallgroupsBramptonWomens1: {
		title: "Brampton Women's Bible Study 1 | Freedom in Christ Church",
		description:
			"Join our Brampton Women's Bible Study Group 1 at Freedom in Christ Church. Connect with other women in faith through meaningful Bible study, prayer, and fellowship in a supportive community.",
	},
	smallgroupsBramptonWomens2: {
		title: "Brampton Women's Bible Study 2 | Freedom in Christ Church",
		description:
			"Join our Brampton Women's Bible Study Group 2 at Freedom in Christ Church. Grow in faith alongside other women through engaging Bible study, heartfelt prayer, and authentic fellowship.",
	},
	smallgroupsGoldenGirls: {
		title: 'Golden Girls | Freedom in Christ Church',
		description:
			'Join the Golden Girls small group at Freedom in Christ Church. A vibrant community of women growing together in faith through Bible study, prayer, and fellowship via Zoom.',
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
	events: {
		title: 'Church Events | Freedom in Christ Church Calendar',
		description:
			'Stay updated on upcoming events at Freedom in Christ Church in Mississauga. Join us for worship services, community events, Bible studies, and special celebrations throughout the year.',
	},
	praiseJoin: {
		title: 'Join the Worship Team | Freedom in Christ Church',
		description:
			'Request to join the Praise & Worship team at Freedom in Christ Church in Mississauga. Vocalists and musicians of every skill level are welcome.',
	},
	worshipRequests: {
		title: 'Worship Team Requests | Freedom in Christ Church',
		description: 'Review requests to join the Praise & Worship team.',
	},
	teamAvailability: {
		title: 'Team Availability | Freedom in Christ Church',
		description: 'Sundays worship team members are unavailable to serve.',
	},
	praiseAvailability: {
		title: 'My Availability | Freedom in Christ Church',
		description:
			'Let the Praise & Worship leaders know which Sundays you are unable to serve.',
	},
	blog: {
		title: 'Blog | Freedom in Christ Church Mississauga',
		description:
			'Stories, devotionals and testimonies written by the members of Freedom in Christ Church, a volunteer-led Alliance church in Mississauga, Ontario.',
	},
	blogWrite: {
		title: 'Write for the Blog | Freedom in Christ Church',
		description:
			'Write and manage your posts for the Freedom in Christ Church blog.',
	},
	blogApprovals: {
		title: 'Blog Approvals | Freedom in Christ Church',
		description: 'Review blog author requests and posts awaiting approval.',
	},
	account: {
		title: 'Edit Profile | Freedom in Christ Church',
		description: 'Update your name, email address and password.',
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
	},
}

// Sitewide schema.org records, rendered once in the root layout. Each page's
// WebPage record (buildSeoHeadExtras) points back at these by @id.
export const siteSchema = {
	'@context': 'https://schema.org',
	'@graph': [
		{
			'@type': 'Church',
			'@id': `${SITE_URL}/#church`,
			name: church.name,
			alternateName: church.shortName,
			slogan: church.tagline,
			description: church.description,
			url: `${SITE_URL}/`,
			logo: `${SITE_URL}/apple-touch-icon.png`,
			image: church.ogImage,
			email: 'fcc.fcac@gmail.com',
			address: {
				'@type': 'PostalAddress',
				streetAddress: church.address.street,
				addressLocality: church.address.city,
				addressRegion: church.address.region,
				postalCode: church.address.postalCode,
				addressCountry: church.address.country,
			},
			geo: { '@type': 'GeoCoordinates', ...church.geo },
			hasMap:
				'https://www.google.com/maps/place/5225+Orbitor+Dr,+Mississauga,+ON+L4W+4Y8',
			areaServed: church.areaServed.map((name) => ({ '@type': 'Place', name })),
			openingHoursSpecification: {
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: `https://schema.org/${church.serviceTime.day}`,
				opens: church.serviceTime.opens,
				closes: church.serviceTime.closes,
			},
			knowsAbout: [
				'Alliance church',
				'Christian worship',
				'Bible study',
				'Small groups',
				'Volunteer-led ministry',
			],
			sameAs: [
				'https://www.youtube.com/@freedominchristchurchcanada',
				'https://www.instagram.com/fcc.canada/',
				'https://www.facebook.com/groups/1667915316820460',
			],
		},
		{
			'@type': 'WebSite',
			'@id': `${SITE_URL}/#website`,
			url: `${SITE_URL}/`,
			name: church.name,
			inLanguage: 'en-CA',
			publisher: { '@id': `${SITE_URL}/#church` },
		},
	],
}
