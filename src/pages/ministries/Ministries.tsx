import { LandingPageSection } from '../../components/LandingPageSection'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import styled from 'styled-components'
import bg from '../../assets/pictures/ministry_bg.jpg'
import { Breadcrumb } from '../../components/Breadcrumb'
import { BreadcrumbItem } from '../../components/BreadcrumbItem'
import { motion } from 'framer-motion'

export const Ministries = () => {
  useDocumentTitle('Ministries')
  return (
    <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
    </Container>
  )
}

const Container = styled(motion.main)`
  background-color: var(--main-white);
  color: var(--main-black);
  transition: var(--transition-delay);
`

const MinistriesSection = styled.section`
  background-color: var(--main-white);
  color: var(--main-black);
`

const Banner = styled.header`
  display: flex;
  justify-content: center;
  background-size: cover;
  background-position: 50%;
  background-image: url(${bg});
  margin: 0 auto;
  padding: 7rem 0;

  @media (max-width: 60em) {
    padding: 4rem 0;
  }
`

const BannerTitle = styled.h1`
  color: var(--white);
`
