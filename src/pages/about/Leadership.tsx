import { Elder } from '../../components/Elder'
import { Elders } from '../../data/Elders'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import styled from 'styled-components'
import banner from '../../assets/pictures/leadership_bg.jpg'
import { Breadcrumb } from '../../components/Breadcrumb'
import { BreadcrumbItem } from '../../components/BreadcrumbItem'
import { motion } from 'framer-motion'

export const Leadership = () => {
  useDocumentTitle('Leadership')
  return (
    <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Banner>
        <BannerTitle>our team</BannerTitle>
      </Banner>
      <Breadcrumb>
        <BreadcrumbItem location="/" title="home" />
        <BreadcrumbItem location="/about" title="about" />
        <BreadcrumbItem location="/about/leadership" title="leadership" last />
      </Breadcrumb>
      <Intro>
        <Text>
          We believe God’s plan is that each local church be led by a team of
          qualified, spiritually mature men and women whose proven leadership in
          their home and community demonstrates their ability to lead God’s
          church.
        </Text>
      </Intro>
      <Elder data={Elders} />
    </Container>
  )
}

const Container = styled(motion.main)`
  background-color: var(--main-white);
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

const Intro = styled.section`
  display: flex;
  justify-content: center;
  max-width: var(--width-max);
  margin: 0 auto;
  padding: 5rem 0;

  @media (max-width: 60em) {
    flex-direction: column;
    padding: 2rem 0;
  }
`

const Text = styled.p`
  text-align: center;
  font-size: 1.3rem;
  max-width: 50rem;
`
