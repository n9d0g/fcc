import { LandingPageSection } from '../../components/LandingPageSection'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import banner from '../../assets/pictures/about_bg.jpg'
import styled from 'styled-components'
import { Breadcrumb } from '../../components/Breadcrumb'
import { BreadcrumbItem } from '../../components/BreadcrumbItem'
import { motion } from 'framer-motion'

export const About = () => {
  useDocumentTitle('About')
  return (
    <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Banner>
        <BannerTitle>about FCC</BannerTitle>
      </Banner>
      <Breadcrumb>
        <BreadcrumbItem location="/" title="home" />
        <BreadcrumbItem location="/about" title="about" last />
      </Breadcrumb>
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
    </Container>
  )
}

const Container = styled(motion.main)`
  background: var(--main-white);
  color: var(--main-black);
  transition: var(--transition-delay);
`

const Banner = styled.header`
  display: flex;
  justify-content: center;
  background-size: cover;
  background-position: 50%;
  background-image: url(${banner});
  margin: 0 auto;
  padding: 7rem 0;

  @media (max-width: 60em) {
    padding: 4rem 0;
  }
`

const BannerTitle = styled.h1`
  color: var(--white);
  transition: var(--transition-delay);
`
