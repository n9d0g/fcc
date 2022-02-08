import './SmallGroups.css'
import LandingPageSection from '../../components/landing-page-section/LandingPageSection'

function SmallGroups() {
  return (
    <section className="smallgroups">
      <section className="smallgroups-banner">
        <h1 className="smallgroups-banner-title">our small groups</h1>
      </section>
      <LandingPageSection
        title="youth (13-18)"
        btnText="youth"
        btnLocation="/ministries/youth"
      />
      <LandingPageSection
        title="young adults"
        btnText="young adults"
        btnLocation="/ministries/ya"
        flip={true}
      />
      <LandingPageSection
        title="55+"
        btnText="lolo at lola"
        btnLocation="/smallgroups/55plus"
      />
      <LandingPageSection
        title="mississauga"
        btnText="mississauga"
        btnLocation="/smallgroups/mississauga"
        flip={true}
      />
      <LandingPageSection
        title="brampton"
        btnText="velcome"
        btnLocation="/smallgroups/brampton"
      />
      <LandingPageSection
        title="philippines"
        btnText="mabuhay"
        btnLocation="/smallgroups/philippines"
        flip={true}
      />
    </section>
  )
}

export default SmallGroups
