import youngAdults from '#lib/assets/community/young-adults.jpg'
import womenMinistry from '#lib/assets/community/women-ministry.jpg'
import womenFellowship from '#lib/assets/community/women-fellowship.jpg'
import classGraduation from '#lib/assets/community/class-graduation.jpg'
import bibleStudy from '#lib/assets/community/bible-study.jpg'
import birthdayCelebration from '#lib/assets/community/birthday-celebration.jpg'
import tableBibleStudy from '#lib/assets/community/table-bible-study.jpg'
import sundayServicePrayer from '#lib/assets/community/sunday-service-prayer.jpg'
import homeGathering from '#lib/assets/community/home-gathering.jpg'

export const load = async () => {
	const gridData = [
		{
			title: 'Women Chasing God',
			link: '/small-groups/women-chasing-god',
			icon: 'lucide:globe',
			image: womenMinistry,
		},
		{
			title: 'South Mississauga',
			link: '/small-groups/south-mississauga',
			icon: 'lucide:map-pin',
			image: classGraduation,
		},
		{
			title: "Brampton Women's Bible Study 1",
			link: '/small-groups/brampton-womens-1',
			icon: 'lucide:book-heart',
			image: bibleStudy,
		},
		{
			title: "Brampton Women's Bible Study 2",
			link: '/small-groups/brampton-womens-2',
			icon: 'lucide:book-heart',
			image: birthdayCelebration,
		},
		{
			title: 'Golden Girls',
			link: '/small-groups/golden-girls',
			icon: 'lucide:flower-2',
			image: womenFellowship,
		},
		{
			title: 'Young Adults',
			link: '/small-groups/young-adults',
			icon: 'lucide:users',
			image: youngAdults,
		},
		{
			title: 'University Bible Study',
			link: '/small-groups/university-bible-study',
			icon: 'lucide:graduation-cap',
			image: tableBibleStudy,
		},
		{
			title: 'Partners in Prayer Bible Study',
			link: '/small-groups/partners-in-prayer',
			icon: 'lucide:hand-heart',
			image: sundayServicePrayer,
		},
		{
			title: 'Macasaquit Bible Study',
			link: '/small-groups/macasaquit-bible-study',
			icon: 'lucide:home',
			image: homeGathering,
		},
	]

	return {
		landingPageItems: gridData,
	}
}
