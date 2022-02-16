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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}>
      <AboutContainer>
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
      </AboutContainer>
    </motion.div>
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
  color: var(--main-white);
`
