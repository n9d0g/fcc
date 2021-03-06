import useDocumentTitle from '../../hooks/useDocumentTitle'
import styled from 'styled-components'
import { Breadcrumb } from '../../components/Breadcrumb'
import { BreadcrumbItem } from '../../components/BreadcrumbItem'
import { motion } from 'framer-motion'
import { useSinglePrismicDocument } from '@prismicio/react'
import { Spinner } from '../../components/Spinner'
import constants from '../../data/constants'

export const Give = () => {
  useDocumentTitle('Give')
  const [document]: any = useSinglePrismicDocument('give_page')

  return (
    <>
      {document ? (
        <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <GiveSection>
            <GiveBanner banner={document.data.banner.url}>
              <GiveBannerTitle>{document.data.title}</GiveBannerTitle>
            </GiveBanner>
            <Breadcrumb>
              <BreadcrumbItem
                location={constants.links.home.location}
                title={constants.links.home.text}
              />
              <BreadcrumbItem
                location={constants.links.give.location}
                title={constants.links.give.text}
                last
              />
            </Breadcrumb>
            <GiveIntro>
              <GiveIntroText>{document.data.description}</GiveIntroText>
            </GiveIntro>
          </GiveSection>
        </Container>
      ) : (
        <Spinner />
      )}
    </>
  )
}

const Container = styled(motion.main)`
  background-color: var(--main-white);
  color: var(--main-black);
  transition: var(--transition-delay);
`

const GiveSection = styled.div`
  background-color: var(--main-white);
  color: var(--main-black);
  transition: var(--transition-delay);
`

interface GiveBannerProps {
  banner: string
}

const GiveBanner = styled.header<GiveBannerProps>`
  display: flex;
  justify-content: center;
  background-image: ${props => `url(${props.banner})`};
  background-size: cover;
  background-position: 50%;
  padding: 7rem 0;
  margin: 0 auto;

  @media (max-width: 60em) {
    padding: 4rem 0;
  }
`

const GiveBannerTitle = styled.h1`
  color: var(--main-white);
`

const GiveIntro = styled.section`
  display: flex;
  justify-content: center;
  max-width: var(--width-max);
  margin: 0 auto;
  padding: 3rem 0;

  @media (max-width: 60em) {
    padding: 1rem 0;
  }
`

const GiveIntroText = styled.p`
  text-align: center;
  font-size: 1.3rem;
  max-width: 50rem;
`
