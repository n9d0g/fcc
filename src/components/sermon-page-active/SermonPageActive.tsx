import React, { useContext } from 'react'
import SermonContext from '../../pages/sermons/SermonContext'
import './SermonPageActive.css'

export const SermonPageActive = (props: any) => {
  const {sermonContext, } = useContext(SermonContext)

  return (
    <section className="sermon-page-active">
      <div className="sermon-page-active-info">
        <div className="sermon-page-active-info-top">
          <h3 className="sermon-page-active-speaker">{sermonContext.speaker}</h3>
          <h3 className="sermon-page-active-date">{sermonContext.date}</h3>
          <h3 className="sermon-page-active-scripture">
            {sermonContext.scripture}
          </h3>
        </div>
        <hr className="sermon-page-active-info-hr" />
        <h2 className="sermon-page-active-title">{sermonContext.title}</h2>
      </div>
      <div className="sermon-page-active-video-container">
        <iframe
          src={`https://www.youtube.com/embed/${sermonContext.youtube}`}
          width="1100"
          height="640"
          title="YouTube video player"
          allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
      </div>
    </section>
  )
}
