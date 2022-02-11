import React, { useState } from 'react'
import './Home.css'
import { SermonNonActive } from '../../components/sermon-non-active/SermonNonActive'
import { SermonActive }from '../../components/sermon-active/SermonActive'
import { SermonLinks } from '../../data/SermonLinks'
import Button from '../../components/button/Button'
import HomeSermonContext from './HomeSermonContext'

function HomeSermons() {
  const [activeSermon, setActiveSermon] = useState<any>(SermonLinks[0])

  return (
    <section className="home-sermons">
      <h2 className="home-sermons-header">recent sermons</h2>
      <hr className="home-sermons-hr" />
      <article className="home-sermons-container">
        <HomeSermonContext.Provider value={{ activeSermon, setActiveSermon }}>
          <SermonActive youtube={activeSermon.youtube}/>
          <div className="home-sermons-non-active-container">
            <SermonNonActive data={SermonLinks[0]} />
            <SermonNonActive data={SermonLinks[1]} />
            <SermonNonActive data={SermonLinks[2]} />
          </div>
        </HomeSermonContext.Provider>
      </article>
      <article className="home-sermons-button">
        <Button location="/sermons" text="view all sermons" />
      </article>
    </section>
  )
}

export default HomeSermons
