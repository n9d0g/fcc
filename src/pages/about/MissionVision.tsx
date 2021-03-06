import useDocumentTitle from '../../hooks/useDocumentTitle'
import styled from 'styled-components'
import { Breadcrumb } from '../../components/Breadcrumb'
import { BreadcrumbItem } from '../../components/BreadcrumbItem'
import { motion } from 'framer-motion'
import { useSinglePrismicDocument } from '@prismicio/react'
import { Spinner } from '../../components/Spinner'
import constants from '../../data/constants'

export const MissionVision = () => {
  useDocumentTitle('Mission & Vision')
  const [document]: any = useSinglePrismicDocument('mission-vision-page')

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
              location={constants.links.about.location}
              title={constants.links.about.text}
            />
            <BreadcrumbItem
              location={constants.links.about.missionVision.location}
              title={constants.links.about.missionVision.text}
              last
            />
          </Breadcrumb>
          <Mission>
            <MissionHeader>{document.data.mission_header}</MissionHeader>
            <MissionDescription>
              {document.data.mission_description}
            </MissionDescription>
          </Mission>
          <Vision>
            <VisionHeader>{document.data.vision_header}</VisionHeader>
            <VisionDescription>
              {document.data.vision_description}
            </VisionDescription>
          </Vision>
        </Container>
      ) : (
        <Spinner />
      )}
    </>
  )
}

const Container = styled(motion.main)`
  background-color: var(--bg-colour);
  color: var(--font-colour);
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
  color: var(--main-white);
`

const Mission = styled.section`
  background-color: var(--bg-colour);
  color: var(--font-colour);
  text-align: center;
  padding: 2rem 1rem;
  transition: var(--transition-delay);
`

const MissionHeader = styled.h2`
  max-width: 50rem;
  margin: 0 auto;
`

const VisionHeader = styled(MissionHeader)``

const MissionDescription = styled.h3`
  max-width: 50rem;
  margin: 0 auto;
  font-weight: 400;
`

const VisionDescription = styled(MissionDescription)``

const Vision = styled.section`
  background-color: var(--main-blue);
  text-align: center;
  padding: 3rem 0;
  transition: var(--transition-delay);
`
