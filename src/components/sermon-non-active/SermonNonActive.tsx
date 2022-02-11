import React, { useContext } from 'react'
import HomeSermonContext from '../../pages/home/HomeSermonContext'

export const SermonNonActive = (props: any) => {
  const {activeSermon, setActiveSermon} = useContext(HomeSermonContext)

  return (
    <div className={`home-sermons-non-active-item ${activeSermon === props.data ? 'active' : ''}`} onClick={() => {setActiveSermon(props.data)}}>
      <h3 className="home-sermons-non-active-header">{props.data.title}</h3>
      <h4 className="home-sermons-non-active-header">{props.data.speaker}</h4>
      <h5 className="home-sermons-non-active-header"><i>{props.data.date}</i></h5>
    </div>
  )
}