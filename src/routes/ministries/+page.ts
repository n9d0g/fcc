import bibleStudy from '#lib/assets/community/bible-study.jpg'
import womenFellowship from '#lib/assets/community/women-fellowship.jpg'
import men from '#lib/assets/community/men-ministry.jpg'
import women from '#lib/assets/community/women-ministry.jpg'
import youth from '#lib/assets/ministries/youth/youth-picnic.jpg'
import youngAdults from '#lib/assets/ministries/young-adults/young-adults-picnic.jpg'
import praiseTeam from '#lib/assets/ministries/praise/praise-team.jpg'
import sundaySchool from '#lib/assets/ministries/sunday-school/sunday-school-class.jpg'

export const load = async () => {
	return {
		landingPageItems: [
			{
				title: 'Praise & Worship',
				link: '/ministries/praise',
				description: 'Leading the church in song every Sunday.',
				icon: 'lucide:music',
				image: praiseTeam,
			},
			{
				title: 'Prayer',
				link: '/ministries/prayer',
				description: 'Wednesdays at 7 PM on Zoom.',
				icon: 'lucide:hand-heart',
				image: bibleStudy,
			},
			{
				title: 'Sunday Service Ministries',
				link: '/ministries/sunday-ministries',
				description: 'Greeters, presiders, coffee and more.',
				icon: 'lucide:coffee',
				image: womenFellowship,
			},
			{
				title: 'Sunday School',
				link: '/ministries/sunday-school',
				description: 'Bible lessons for kids, toddlers to grade 6.',
				icon: 'lucide:backpack',
				image: sundaySchool,
			},
			{
				title: 'Men',
				link: '/ministries/men',
				description: 'Monthly fellowship and encouragement.',
				image: men,
			},
			{
				title: 'Women',
				link: '/ministries/women',
				description: 'Monthly gatherings of faith and friendship.',
				image: women,
			},
			{
				title: 'Youth',
				link: '/ministries/youth',
				description: 'For teens aged 13 to 19.',
				image: youth,
			},
			{
				title: 'Young Adults',
				link: '/ministries/young-adults',
				description: 'For ages 20 to 35.',
				image: youngAdults,
			},
		],
	}
}
