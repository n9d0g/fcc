import React from 'react'
import useDocumentTitle from '../../hooks/useDocumentTitle'

export const MissionVision = () => {
  useDocumentTitle('Mission & Vision')
  return (
    <div className="mission-vision">
      <section className="mission-vision-banner">
        <h1 className="mission-vision-title">mission & vision</h1>
      </section>
      <section className="mission">
        <h2 className="mission-text-header">our mission:</h2>
        <h3 className="mission-text-description">
          To introduce and represent Christ through our nurturing, small
          group-driven ministries in the community.
        </h3>
      </section>
      <section className="vision">
        <h2 className="mission-text-header">our vision:</h2>
        <h3 className="mission-text-description">
          A Christ-centred, Holy Spirit-led community committed to the building
          of strong relationships and planting of healthy reproducing churches.
        </h3>
      </section>
    </div>
  )
}
