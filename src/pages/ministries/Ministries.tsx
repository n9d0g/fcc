import { LandingPageSection } from '../../components/LandingPageSection'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import styled from 'styled-components'
import bg from '../../assets/pictures/ministry_bg.avif'
import { Breadcrumb } from '../../components/Breadcrumb'
import { BreadcrumbItem } from '../../components/BreadcrumbItem'
import { motion } from 'framer-motion'

export const Ministries = () => {
  useDocumentTitle('Ministries')
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}>
      <MinistriesSection>
        <Banner>
          <BannerTitle>our ministries</BannerTitle>
        </Banner>
        <Breadcrumb>
          <BreadcrumbItem location="/" title="home" />
          <BreadcrumbItem location="/ministries" title="ministries" last />
        </Breadcrumb>
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
    </motion.div>
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
