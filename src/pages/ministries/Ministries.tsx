import { LandingPageSection } from '../../components/landing-page-section/LandingPageSection'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import styled from 'styled-components'
import bg from '../../assets/pictures/ministry_bg.avif'

export const Ministries = () => {
  useDocumentTitle('Ministries')
  return (
    <MinistriesSection>
      <Banner>
        <BannerTitle>our ministries</BannerTitle>
      </Banner>
      <LandingPageSection
        title="MEN-istry"
        btnText="men's ministry"
        btnLocation="/ministries/men"
        flip={true}
      />
      <LandingPageSection
        title="WOMEN-instry"
        btnText="women's ministry"
        btnLocation="/ministries/women"
      />
      <LandingPageSection
        title="preteens"
        btnText="preteens"
        btnLocation="/ministries/preteens"
        flip={true}
      />
      <LandingPageSection
        title="youth"
        btnText="youth"
        btnLocation="/ministries/youth"
      />
      <LandingPageSection
        title="young adults"
        btnText="young adults"
        btnLocation="/ministries/YA"
        flip={true}
      />
      <LandingPageSection
        title="praise & worship"
        btnText="praise"
        btnLocation="/ministries/praise"
      />
    </MinistriesSection>
  )
}

const MinistriesSection = styled.section`
  text-align: center;
`

const Banner = styled.section`
  background-image: url(${bg});
  background-size: cover;
  background-position: 50%;
  padding: 7rem 0 7rem 0;
`

const BannerTitle = styled.h1`
  text-align: center;
  font-size: 4rem;
  color: var(--main-white);
`
