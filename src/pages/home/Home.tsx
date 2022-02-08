import React from 'react'
import '../../App.css'
import './Home.css'
import HomeIntro from './HomeIntro'
import HomeMission from './HomeMission'
import HomeSermons from './HomeSermons'
import { HomeJoin } from './HomeJoin'

function Home() {
  return (
    <main className="home">
      <HomeIntro />
      <HomeJoin />
      <HomeMission />
      <HomeSermons />
    </main>
  )
}

export default Home
