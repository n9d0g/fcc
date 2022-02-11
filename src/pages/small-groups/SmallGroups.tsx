import './SmallGroups.css'
import { LandingPageSection } from '../../components/landing-page-section/LandingPageSection'
import useDocumentTitle from '../../hooks/useDocumentTitle'

export const SmallGroups = () => {
  useDocumentTitle('Small Groups')
  return (
    <section className="smallgroups">
      <section className="smallgroups-banner">
        <h1 className="smallgroups-banner-title">our small groups</h1>
      </section>
      <LandingPageSection
        title="women chasing God"
        btnText="velcome"
        btnLocation="/smallgroups/women-chasing-god"
      />
      <LandingPageSection
        title="university students bible study (16-19)"
        btnText="youth"
        btnLocation="/ministries/youth"
        flip
      />
      <LandingPageSection
        title="south mississauga"
        btnText="mississauga"
        btnLocation="/smallgroups/mississauga"
      />
      <LandingPageSection
        title="yumul bible study"
        btnText="explore"
        btnLocation="/smallgroups/yumul"
        flip
      />
      <LandingPageSection
        title="bro. allan's bible study"
        btnText="explore"
        btnLocation="/smallgroups/allan"
      />
      <LandingPageSection
        title="young adults"
        btnText="young adults"
        btnLocation="/ministries/ya"
        flip
      />
    </section>
  )
}