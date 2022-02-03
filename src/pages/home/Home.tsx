import React from 'react';
import '../../App.css'
import './Home.css'
import HomeIntro from './HomeIntro'
import HomeMission from './HomeMission'
import HomeSermons from './HomeSermons'

function Home() {
	return (
		<main className="home">
			<HomeIntro />
			<HomeMission />
			<HomeSermons />
		</main>	
	)
}

export default Home;