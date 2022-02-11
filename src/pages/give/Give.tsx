import React from 'react'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import './Give.css'

export const Give = () => {
  useDocumentTitle('Give')

  return (
    <div className="give">
      <section className="give-banner">
        <h1 className="give-banner-title">give</h1>
      </section>
      <section className="give-intro">
        <p className="give-intro-text">
          You can give financially in multiple ways. During the weekend services
          you can simply drop a check or cash in one of the offering boxes
          located near the sanctuary entrances. You can also give online by
          sending an e-transfer to{' '}
          <span className="give-intro-text-email">fcc.fcac@gmail.com</span>.
        </p>
      </section>
    </div>
  )
}