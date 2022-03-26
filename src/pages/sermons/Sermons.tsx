import { SermonPageActive } from '../../components/SermonPageActive'
import { SermonPageNonActive } from '../../components/SermonPageNonActive'
import SermonContext from './SermonContext'
import { useState } from 'react'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import styled from 'styled-components'
import { Breadcrumb } from '../../components/Breadcrumb'
import { BreadcrumbItem } from '../../components/BreadcrumbItem'
import { motion } from 'framer-motion'
import { useSinglePrismicDocument } from '@prismicio/react'
import { Spinner } from '../../components/Spinner'
import constants from '../../data/constants'

export const Sermons = () => {
  useDocumentTitle('Sermons')
  const [sermonContext, setSermonContext] = useState(null)
  const [document]: any = useSinglePrismicDocument('sermons')

  return (
    <>
      {document ? (
        <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Banner banner={document.data.banner.url}>
            <BannerTitle>{document.data.header}</BannerTitle>
          </Banner>
          <Breadcrumb>
            <BreadcrumbItem
              location={constants.links.home.location}
              title={constants.links.home.text}
            />
            <BreadcrumbItem
              location={constants.links.sermons.location}
              title={constants.links.sermons.text}
              last
            />
          </Breadcrumb>
          <ActiveSermonContainer>
            <SermonContext.Provider value={{ sermonContext, setSermonContext }}>
              {sermonContext && <SermonPageActive />}
              <SermonPageNonActive data={document.data.sermons} />
            </SermonContext.Provider>
          </ActiveSermonContainer>
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

interface BannerProps {
  banner: string
}

const Banner = styled.header<BannerProps>`
  display: flex;
  justify-content: center;
  background-size: cover;
  background-position: 50%;
  background-image: url(${props => props.banner});
  margin: 0 auto;
  padding: 7rem 0;

  @media (max-width: 60em) {
    padding: 4rem 0;
  }
`

const BannerTitle = styled.h1`
  color: var(--main-blue);
`

const ActiveSermonContainer = styled.div`
  padding-bottom: 5rem;
`
