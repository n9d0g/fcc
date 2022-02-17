import useDocumentTitle from '../../hooks/useDocumentTitle'
import styled from 'styled-components'
import bg from '../../assets/pictures/men_bg.jpg'
import introPic from '../../assets/pictures/about_bg.jpg'
import { Breadcrumb } from '../../components/Breadcrumb'
import { BreadcrumbItem } from '../../components/BreadcrumbItem'
import { motion } from 'framer-motion'

export const Praise = () => {
  useDocumentTitle('Praise')
  return (
    <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Banner>
        <BannerTitle>praise & worship</BannerTitle>
      </Banner>
      <Breadcrumb>
        <BreadcrumbItem location="/" title="home" />
        <BreadcrumbItem location="/ministries" title="ministries" />
        <BreadcrumbItem
          location="/ministries/praise"
          title="praise & worship"
          last
        />
      </Breadcrumb>
      <Intro>
        <IntroPicture />
        <IntroDescription>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
          <p>
            Contact: Bro John Benologa{' '}
            <a href="tel:647-523-9361">(647) 523-9361</a>
          </p>
        </IntroDescription>
      </Intro>
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
  background-image: url(${bg});
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
  max-width: var(--width-max);
  margin: 0 auto;
  padding: 5rem 0;

  @media (max-width: 60em) {
    flex-direction: column;
    padding: 2rem 0;
  }
`

const IntroPicture = styled.div`
  flex: 1;
  background-image: url(${introPic});
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;
  height: 30rem;
  width: 30rem;
  margin: 0 2rem;
`

const IntroDescription = styled.p`
  flex: 1;
`
