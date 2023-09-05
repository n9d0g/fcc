import { headData, breadcrumbs } from '$lib/constants'

export const load = () => {
	const breadcrumb = [
		breadcrumbs.home,
		breadcrumbs.about,
		breadcrumbs.about.beliefs,
	]

	return {
		title: 'Our Beliefs.',
		breadcrumb: breadcrumb,
		coreValues: [
			{
				title: '1. The Glory of the Triune God',
				text: 'Therefore: We love Him wholeheartedly, worship Him sincerely and seek passionately to complete the work He has given us to do.',
			},
			{
				title: '2. The Authority of the Bible',
				text: 'Therefore: We adhere to our statement of faith as a summary of key truths from the Bible that we agree on as a family of churches. We affirm the ministries of preaching and teaching in order to understand, obey, and apply the Bible to our faith and practice.',
			},
			{
				title: '3. Christ-centred Living',
				text: 'Therefore: We lead believers into the fullness of the Spirit and faith in the all-sufficient Christ for healing and power to live holy lives of service.',
			},
			{
				title: '4. The Church',
				text: 'Therefore: We love the Church universal and seek to plant and nurture healthy, transformational local churches as the means of building Christ’s Kingdom and nurturing individual Christians. We minister on the basis of spiritual giftedness as essential to divine power and effectiveness. We encourage dynamic creativity resulting in diverse congregational composition, language, and organizational structures in order to fulfill Christ’s desire to reach all people.',
			},
			{
				title: '5. Lost People',
				text: 'Therefore: We allocate a disproportionately large amount of energy and resources to reaching lost people, discipling them to maturity in, and devotion to, Christ.',
			},
			{
				title: '6. Missions',
				text: 'Therefore: We give priority to world evangelization. We give priority in our missionary activity to evangelizing those people who have had the least opportunity to hear the Gospel, thus expediting the return of Christ.',
			},
			{
				title: '7. Leadership',
				text: 'Therefore: We intentionally identify and train godly leaders. We affirm and empower our pastors, other credentialed workers, and lay leaders, esteeming them highly in the Lord.',
			},
			{
				title: '8. Strategic Cooperation',
				text: 'Therefore: We serve each other with humility and compassion. We create strategies, structures, and policies that enhance local initiative and maximize cooperation in the accomplishment of our purpose. We develop strategic partnerships with those of like-minded message, mission, passion, and purpose.',
			},
			{
				title: '9. Social Responsibility',
				text: 'Therefore: We uphold biblical justice. We minister to the poor and oppressed as ministry to Jesus Himself. We encourage and strengthen marriages and families.',
			},
			{
				title: '10. Stewardship',
				text: 'Therefore: We view all our resources and possessions as God-owned and we use them with integrity, accountability, and maximum effectiveness. We embrace faithfulness and sacrifice in the advance of Christ’s Kingdom.',
			},
			{
				title: '11. Prayer',
				text: 'Therefore: We do nothing until we pray.',
			},
		],
		statementsOfFaith: [
			{
				title: '1. God',
				text: 'There is one God, who is infinitely perfect, existing eternally in three persons: Father, Son and Holy Spirit.',
			},
			{
				title: '2. Jesus',
				text: 'Jesus Christ is true God and true man. He was conceived by the Holy Spirit and born of the Virgin Mary. He died upon the cross, the Just for the unjust, as a substitutionary sacrifice, and all who believe in Him are justified on the ground of His shed blood. He arose from the dead according to the Scriptures. He is now at the right hand of the Majesty on high as our great High Priest. He will come again to establish His kingdom of righteousness and peace.',
			},
			{
				title: '3. Holy Spirit',
				text: 'The Holy Spirit is a divine Person, sent to indwell, guide, teach and empower the believer, and to convince the world of sin, of righteousness and of judgment.',
			},
			{
				title: '4. Bible',
				text: 'The Old and New Testaments, inerrant as originally given, were verbally inspired by God and are a complete revelation of His will for the salvation of people. They constitute the divine and only rule of Christian faith and practice.',
			},
			{
				title: '5. Sin',
				text: 'Humankind, originally created in the image and likeness of God, fell through disobedience, incurring thereby both physical and spiritual death. All people are born with a sinful nature, are separated from the life of God, and can be saved only through the atoning work of the Lord Jesus Christ. The destiny of the impenitent and unbelieving is existence forever in conscious torment, but that of the believer is everlasting joy and bliss.',
			},
			{
				title: '6. Freedom from Sin',
				text: 'Salvation has been provided only through Jesus Christ. Those who repent and believe in Him are united with Christ through the Holy Spirit and are thereby regenerated (born again), justified, sanctified and granted the gift of eternal life as adopted children of God.',
			},
			{
				title: '7. Christian Living',
				text: "It is the will of God that in union with Christ each believer should be sanctified thoroughly thereby being separated from sin and the world and fully dedicated to God, receiving power for holy living and sacrificial and effective service toward the completion of Christ's commission. This is accomplished through being filled with the Holy Spirit which is both a distinct event and progressive experience in the life of the believer.",
			},
			{
				title: '8. Healing',
				text: 'Provision is made in the redemptive work of the Lord Jesus Christ for the healing of the mortal body. Prayer for the sick and anointing with oil as taught in the Scriptures are privileges for the Church in this present age.',
			},
			{
				title: '9. Church',
				text: "The universal Church, of which Christ is the Head, consists of all those who believe on the Lord Jesus Christ, are redeemed through His blood, regenerated by the Holy Spirit, and commissioned by Christ to go into all the world as a witness, preaching the Gospel to all nations. The local church, the visible expression of the universal Church, is a body of believers in Christ who are joined together to worship God, to observe the ordinances of Baptism and the Lord's Supper, to pray, to be edified through the Word of God, to fellowship, and to testify in word and deed to the good news of salvation both locally and globally. The local church enters into relationships with other like-minded churches for accountability, encouragement and mission.",
			},
			{
				title: '10. Life after death',
				text: 'There shall be a bodily resurrection of the just and of the unjust; for the former, a resurrection unto life; for the latter, a resurrection unto judgment.',
			},
			{
				title: '11. Second Coming of Christ',
				text: "The second coming of the Lord Jesus Christ is imminent and will be personal and visible. As the believer’s blessed hope, this vital truth is an incentive for holy living and sacrificial service toward the completion of Christ's commission.",
			},
		],
		headData: headData.beliefs,
	}
}
