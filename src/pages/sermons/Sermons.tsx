import './Sermons.css'
import { SermonLinks } from '../../data/SermonLinks'
import { SermonPageActive } from '../../components/sermon-page-active/SermonPageActive'
import { SermonPageNonActive } from '../../components/sermon-page-non-active/SermonPageNonActive'
import SermonContext from './SermonContext'
import { useState } from 'react'
import useDocumentTitle from '../../hooks/useDocumentTitle'

function Sermons() {
  useDocumentTitle('Sermons')
  const [sermonContext, setSermonContext] = useState(SermonLinks[0])

  return (
    <section className="sermons">
      <div className="sermons-banner">
        <h1 className="sermons-banner-title">sermons</h1>
      </div>
      <div id="active-sermon" className="sermons-content-container">
        <SermonContext.Provider value={{ sermonContext, setSermonContext }}>
          <SermonPageActive
            title={SermonLinks[0].title}
            speaker={SermonLinks[0].speaker}
            scripture={SermonLinks[0].scripture}
            date={SermonLinks[0].date}
            youtube={SermonLinks[0].youtube}
          />
          <SermonPageNonActive data={SermonLinks} />
        </SermonContext.Provider>
      </div>
    </section>
  )
}

export default Sermons
