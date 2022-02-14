import useDocumentTitle from '../../hooks/useDocumentTitle'
import styled from 'styled-components'
import bg from '../../assets/pictures/smallgroups_bg.avif'
import about_bg from '../../assets/pictures/about_bg.avif'
import { Breadcrumb } from '../../components/Breadcrumb'
import { BreadcrumbItem } from '../../components/BreadcrumbItem'
import { motion } from 'framer-motion'

export const Allan = () => {
  useDocumentTitle('Allan BS')
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}>
      <Banner>
        <BannerTitle>bro allan's bible study</BannerTitle>
      </Banner>
      <Breadcrumb>
        <BreadcrumbItem location="/" title="home" />
        <BreadcrumbItem location="/smallgroups" title="SGs" />
        <BreadcrumbItem
          location="/smallgroups/allan"
          title="allan's bible study"
          last
        />
      </Breadcrumb>
      <Intro>
        <IntroPicture />
        <IntroDescription>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
            <DescriptionContact>
              Contact: Bro Allan Macasaquit{' '}
              <ContactNumber href="tel:647-523-9361">
                (647) 523-9361
              </ContactNumber>
            </DescriptionContact>
          </p>
        </IntroDescription>
      </Intro>
    </motion.div>
  )
}

const Banner = styled.section`
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
  color: var(--main-blue);
`

const Intro = styled.section`
  display: flex;
  max-width: 1100px;
  margin: 0 auto;
  padding: 5rem 0;

  @media (max-width: 60em) {
    flex-direction: column;
    padding: 2rem 0;
  }
`

const IntroPicture = styled.div`
  flex: 1;
  background-image: url(${about_bg});
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;
  height: 500px;
  width: 500px;
  margin: 0 2rem;
`

const IntroDescription = styled.div`
  flex: 1;
`

const ContactNumber = styled.a``

const DescriptionContact = styled.p``
