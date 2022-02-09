import React, { useState } from 'react'
import './SermonPageNonActive.css'

export const SermonPageNonActive = (props: any) => {
  const [activeSermon, setActiveSermon] = useState<any>(false)

  const toggle = (index: any) => {
    if (activeSermon === index) return null
    setActiveSermon(index)
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
              toggle(index)
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
