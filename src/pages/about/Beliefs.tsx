import { Accordion } from '../../components/Accordion'
import { CoreValues } from '../../data/CoreValues'
import { StatementOfFaith } from '../../data/StatementOfFaith'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import banner from '../../assets/pictures/beliefs_bg.jpg'
import styled from 'styled-components'
import { Breadcrumb } from '../../components/Breadcrumb'
import { BreadcrumbItem } from '../../components/BreadcrumbItem'
import { motion } from 'framer-motion'

export const Beliefs = () => {
  useDocumentTitle('Beliefs')
  const link = 'https://www.cmacan.org/about/'
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}>
      <Banner>
        <BannerTitle>our beliefs</BannerTitle>
      </Banner>
      <Breadcrumb>
        <BreadcrumbItem location="/" title="home" />
        <BreadcrumbItem location="/about" title="about" />
        <BreadcrumbItem location="/about/beliefs" title="beliefs" last />
      </Breadcrumb>
      <Intro>
        <IntroText>
          The Christian and Missionary Alliance (C&MA) in Canada is a family of
          churches; we make disciples and multiply transformational churches in
          Canada and the world to the glory of the Triune God.
        </IntroText>
      </Intro>
      <Content>
        <CoreValuesSection>
          <CoreValuesTitle>Core Values</CoreValuesTitle>
          What we believe determines what we value, and what we value defines
          how we live. We are committed to 11 core values that can be read
          below:
          <Accordion data={CoreValues} />
        </CoreValuesSection>
        <SoF>
          <SoFTitle>Statement of Faith</SoFTitle>
          <SoFDescription>
            Our Statement of Faith identifies the core beliefs of{' '}
            <span>
              <CMA href={link} target="_blank" rel="noopener noreferrer">
                The Christian and Missionary Alliance.
              </CMA>
            </span>
          </SoFDescription>
          <Accordion data={StatementOfFaith} />
        </SoF>
      </Content>
    </motion.div>
  )
}

const Banner = styled.section`
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
  color: var(--main-white);
`

const Intro = styled.section`
  display: flex;
  justify-content: center;
  max-width: 1100px;
  margin: 0 auto;
  padding: 3rem 0;

  @media (max-width: 60em) {
    padding: 1rem 0;
  }
`

const IntroText = styled.p`
  text-align: center;
  font-size: 1.3rem;
  max-width: 800px;
`

const Content = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1rem;
`

const CoreValuesSection = styled.article`
  display: flex;
  flex-direction: column;
  max-width: 1100px;
  justify-content: center;
  margin: 0 auto;
  padding: 0 1rem;
`

const CoreValuesTitle = styled.h2`
  text-align: center;
`

const SoF = styled(CoreValuesSection)``

const SoFTitle = styled(CoreValuesTitle)``

const SoFDescription = styled.div`
  padding: 0 12rem;

  @media (max-width: 60em) {
    padding: 0 1rem;
  }
`

const CMA = styled.a`
  text-decoration: underline;
  color: var(--main-blue);
  transition: 0.1s ease-in;

  &:hover {
    color: var(--main-green);
    font-size: 1rem;
  }
`
