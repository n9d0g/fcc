import useDocumentTitle from '../../hooks/useDocumentTitle'
import styled from 'styled-components'
import { Breadcrumb } from '../../components/Breadcrumb'
import { BreadcrumbItem } from '../../components/BreadcrumbItem'
import { motion } from 'framer-motion'
import { useSinglePrismicDocument } from '@prismicio/react'
import { Spinner } from '../../components/Spinner'
import constants from '../../data/constants'

export const Allan = () => {
  useDocumentTitle('Allan BS')
  const [document]: any = useSinglePrismicDocument('allan')

  return (
    <>
      {document ? (
        <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Banner banner={document.data.banner.url}>
            <BannerTitle>{document.data.title}</BannerTitle>
          </Banner>
          <Breadcrumb>
            <BreadcrumbItem
              location={constants.links.home.location}
              title={constants.links.home.text}
            />
            <BreadcrumbItem
              location={constants.links.smallGroups.location}
              title={constants.links.smallGroups.text}
            />
            <BreadcrumbItem
              location={constants.links.smallGroups.allan.location}
              title={constants.links.smallGroups.allan.text}
              last
            />
          </Breadcrumb>
          <Intro>
            <IntroPicture picture={document.data.picture.url} />
            <IntroDescription>{document.data.description}</IntroDescription>
          </Intro>
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

interface IntroPictureProps {
  picture: string
}

const IntroPicture = styled.div<IntroPictureProps>`
  flex: 1;
  background-image: url(${props => props.picture});
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
