import './About.css'
import { LandingPageSection } from '../../components/landing-page-section/LandingPageSection'
import useDocumentTitle from '../../hooks/useDocumentTitle'

export const About = () => {
  useDocumentTitle('About')
  return (
    <div className="about">
      <section className="about-banner">
        <h1 className="about-banner-title">about FCC</h1>
      </section>
      <LandingPageSection
        title="what we believe"
        btnText="doctrinal statement"
        btnLocation="/about/beliefs"
      />
      <LandingPageSection
        title="mission & vision"
        btnText="mission & vision"
        btnLocation="/about/mission-vision"
        flip={true}
      />
      <LandingPageSection
        title="our team"
        btnText="leadership"
        btnLocation="/about/leadership"
      />
    </div>
  )
}