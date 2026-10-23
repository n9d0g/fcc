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
	// General contact address (on the church banner). E-transfers go to
	// fcc.fcac@gmail.com instead; see links.etransfer.
	email: 'fcc.church.canada@gmail.com',
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
			email: church.email,
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
