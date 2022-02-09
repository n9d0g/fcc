import React from 'react'
import '../../App.css'
import './Home.css'
import HomeIntro from './HomeIntro'
import HomeMission from './HomeMission'
import HomeSermons from './HomeSermons'
import { HomeJoin } from './HomeJoin'
import useDocumentTitle from '../../hooks/useDocumentTitle'

function Home() {
  useDocumentTitle('Home')
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
