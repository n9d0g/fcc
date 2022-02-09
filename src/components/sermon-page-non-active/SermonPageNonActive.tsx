import React, { useContext, useState } from 'react'
import SermonContext from '../../pages/sermons/SermonContext'
import './SermonPageNonActive.css'

export const SermonPageNonActive = (props: any) => {
  const [activeSermon, setActiveSermon] = useState<any>(false)
  const {setSermonContext} = useContext(SermonContext)

  const toggle = (item: any, index: any) => {
    if (activeSermon === index) return null
    setSermonContext(item)
    setActiveSermon(index)
    document.getElementById("active-sermon")?.scrollIntoView({behavior: 'smooth'})
  }

  return (
    <section className="sermon-page-non-active">
      {props.data.map((item: any, index: any) => {
        return (
          <div
            className={`sermon-page-non-active-item ${
              activeSermon === index ? 'active' : ''
            }`}
            onClick={() => {
              toggle(item, index)
            }}
            key={index}>
            <h3 className="sermon-page-non-active-item-title">{item.title}</h3>
            <h4 className="sermon-page-non-active-item-speaker">
              {item.speaker}
            </h4>
            <h5 className="sermon-page-non-active-item-date">{item.date}</h5>
          </div>
        )
      })}
    </section>
  )
}
