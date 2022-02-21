import { Elder } from '../../components/Elder'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import styled from 'styled-components'
import { Breadcrumb } from '../../components/Breadcrumb'
import { BreadcrumbItem } from '../../components/BreadcrumbItem'
import { motion } from 'framer-motion'
import { useSinglePrismicDocument } from '@prismicio/react'

export const Leadership = () => {
  useDocumentTitle('Leadership')
  const [document]: any = useSinglePrismicDocument('leadership')

  return (
    <>
      {document ? (
        <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Banner banner={document.data.banner.url}>
            <BannerTitle>{document.data.title}</BannerTitle>
          </Banner>
          <Breadcrumb>
            <BreadcrumbItem location="/" title="home" />
            <BreadcrumbItem location="/about" title="about" />
            <BreadcrumbItem
              location="/about/leadership"
              title="leadership"
              last
            />
          </Breadcrumb>
          <Intro>
            <Text>{document.data.description}</Text>
          </Intro>
          <Elder />
        </Container>
      ) : (
        <h1>loading</h1>
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
