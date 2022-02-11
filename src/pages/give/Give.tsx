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
          You can give financially in multiple ways, but as our services are temporarily online, 
          you can give online by sending an e-transfer to{' '}
          <span className="give-intro-text-email">fcc.fcac@gmail.com</span>.
        </p>
      </section>
    </div>
  )
}