import { LandingPageSection } from '../../components/LandingPageSection'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import styled from 'styled-components'
import bg from '../../assets/pictures/smallgroups_bg.avif'
import { Breadcrumb } from '../../components/Breadcrumb'
import { BreadcrumbItem } from '../../components/BreadcrumbItem'
import { motion } from 'framer-motion'

export const SmallGroups = () => {
  useDocumentTitle('Small Groups')
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}>
      <SmallGroupsSection>
        <Banner>
          <BannerTitle>our small groups</BannerTitle>
        </Banner>
        <Breadcrumb>
          <BreadcrumbItem location="/" title="home" />
          <BreadcrumbItem location="/smallgroups" title="small groups" last />
        </Breadcrumb>
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
      </SmallGroupsSection>
    </motion.div>
  )
}

const SmallGroupsSection = styled.section`
  text-align: center;
  background-color: var(--main-green);
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
  color: var(--main-blue);
`
