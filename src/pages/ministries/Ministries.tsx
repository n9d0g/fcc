import { LandingPageSection } from '../../components/LandingPageSection'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import styled from 'styled-components'
import { Breadcrumb } from '../../components/Breadcrumb'
import { BreadcrumbItem } from '../../components/BreadcrumbItem'
import { motion } from 'framer-motion'
import { useSinglePrismicDocument } from '@prismicio/react'
import { Spinner } from '../../components/Spinner'

export const Ministries = () => {
  useDocumentTitle('Ministries')
  const [document]: any = useSinglePrismicDocument('ministries')

  return (
    <>
      {document ? (
        <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <MinistriesSection>
            <Banner banner={document.data.banner.url}>
              <BannerTitle>{document.data.title}</BannerTitle>
            </Banner>
            <Breadcrumb>
              <BreadcrumbItem location="/" title="home" />
              <BreadcrumbItem location="/ministries" title="ministries" last />
            </Breadcrumb>
            {document.data.section.map((item: any, index: any) => (
              <LandingPageSection
                key={index}
                title={item.section_title}
                btnText={item.button_text}
                btnLocation={item.button_location}
                description={item.description}
                picture={item.picture.url}
                flip={item.flipped}
              />
            ))}
          </MinistriesSection>
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
`

const MinistriesSection = styled.section`
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
  color: var(--white);
`
