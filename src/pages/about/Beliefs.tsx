import useDocumentTitle from '../../hooks/useDocumentTitle'
import styled from 'styled-components'
import { Breadcrumb } from '../../components/Breadcrumb'
import { BreadcrumbItem } from '../../components/BreadcrumbItem'
import { motion } from 'framer-motion'
import { useSinglePrismicDocument } from '@prismicio/react'
import { AccordionItem } from '../../components/AccordionItem'
import { Spinner } from '../../components/Spinner'

export const Beliefs = () => {
  useDocumentTitle('Beliefs')
  const [document]: any = useSinglePrismicDocument('belief')

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
            <BreadcrumbItem location="/about/beliefs" title="beliefs" last />
          </Breadcrumb>
          <Intro>
            <IntroText>{document.data.cma_description}</IntroText>
          </Intro>
          <Content>
            <CoreValuesSection>
              <CoreValuesTitle>
                {document.data.core_values_title}
              </CoreValuesTitle>
              {document.data.core_values_description}
              <AccordionContainer>
                {document.data.core_values.map((item: any, index: any) => (
                  <AccordionItem
                    key={index}
                    title={item.cv_title}
                    description={item.cv_description}
                  />
                ))}
              </AccordionContainer>
            </CoreValuesSection>
            <SoF>
              <SoFTitle>{document.data.statement_of_faith_title}</SoFTitle>
              <SoFDescription>
                {document.data.statement_of_faith_description}
              </SoFDescription>
              <AccordionContainer>
                {document.data.statement_of_faith_object.map(
                  (item: any, index: number) => (
                    <AccordionItem
                      key={index}
                      title={item.sof_title}
                      description={item.sof_description}
                    />
                  )
                )}
              </AccordionContainer>
            </SoF>
          </Content>
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
  padding-bottom: 2rem;
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

const Intro = styled.section`
  display: flex;
  justify-content: center;
  max-width: var(--width-max);
  margin: 0 auto;
  padding: 3rem 0;

  @media (max-width: 60em) {
    padding: 1rem 0;
  }
`

const IntroText = styled.p`
  text-align: center;
  font-size: 1.3rem;
  max-width: 50rem;
`

const Content = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: var(--width-max);
  margin: 0 auto;
  padding: 0 1rem;
`

const CoreValuesSection = styled.article`
  display: flex;
  flex-direction: column;
  max-width: var(--width-max);
  justify-content: center;
  margin: 0 auto;
  padding: 0 1rem;
`

const CoreValuesTitle = styled.h2`
  text-align: center;
`

const AccordionContainer = styled.section`
  max-width: var(--width-max);
  padding: 1rem 0;
`

const SoF = styled(CoreValuesSection)``

const SoFTitle = styled(CoreValuesTitle)``

const SoFDescription = styled.div`
  padding: 0 12rem;

  @media (max-width: 60em) {
    padding: 0 1rem;
  }
`
