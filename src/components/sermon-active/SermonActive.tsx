import React from 'react'

export const SermonActive = (props: any) => {
  return (
    <div className="home-sermons-active">
      <div className="home-sermons-active-container">
        <iframe
          width="640"
          height="360"
          src={`https://www.youtube.com/embed/${props.youtube}`}
          title="YouTube video player"
          allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
      </div>
    </div>
  )
}