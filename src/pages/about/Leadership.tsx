import React from 'react'
import { Elder } from '../../components/elder/Elder'
import { Elders } from '../../data/Elders'
import useDocumentTitle from '../../hooks/useDocumentTitle'

function Leadership() {
  useDocumentTitle('Leadership')
  return (
    <div className="leadership">
      <section className="leadership-banner">
        <h1 className="leadership-title">our team</h1>
      </section>
      <section className="leadership-intro">
        <p className="leadership-intro-text">
          We believe God’s plan is that each local church be led by a team of
          qualified, spiritually mature men and women whose proven leadership in
          their home and community demonstrates their ability to lead God’s
          church.
        </p>
      </section>
      <Elder data={Elders} />
    </div>
  )
}

export default Leadership
