import { LandingPageSection } from '../../components/LandingPageSection'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import banner from '../../assets/pictures/about_bg.avif'
import styled from 'styled-components'

export const About = () => {
  useDocumentTitle('About')
  return (
    <AboutContainer>
      <Banner>
        <BannerTitle>about FCC</BannerTitle>
      </Banner>
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
    </AboutContainer>
  )
}

const AboutContainer = styled.div`
  text-align: center;
  background-color: var(--main-green);
`

const Banner = styled.section`
  background-image: url(${banner});
  background-size: cover;
  background-position: 50%;
  padding: 7rem 0 7rem 0;
`

const BannerTitle = styled.h1`
  font-size: 4rem;
  color: var(--main-white);
`
