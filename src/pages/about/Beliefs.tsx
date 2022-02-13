import { Accordion } from '../../components/Accordion'
import { CoreValues } from '../../data/CoreValues'
import { StatementOfFaith } from '../../data/StatementOfFaith'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import banner from '../../assets/pictures/beliefs_bg.avif'
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
      <Intro>
        The Christian and Missionary Alliance (C&MA) in Canada is a family of
        churches; we make disciples and multiply transformational churches in
        Canada and the world to the glory of the Triune God.
      </Intro>
      <Breadcrumb>
        <BreadcrumbItem location="/" title="home" />
        <BreadcrumbItem location="/about" title="about" />
        <BreadcrumbItem location="/about/beliefs" title="beliefs" last />
      </Breadcrumb>
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
          Our Statement of Faith identifies the core beliefs of{' '}
          <CMA href={link} target="_blank" rel="noopener noreferrer">
            The Christian and Missionary Alliance.
          </CMA>
          <Accordion data={StatementOfFaith} />
        </SoF>
      </Content>
    </motion.div>
  )
}

const Banner = styled.section`
  background-image: url(${banner});
  background-size: cover;
  background-position: 50%;
  padding: 7rem 0 7rem 0;
  text-align: center;
`

const BannerTitle = styled.h1`
  font-size: 4rem;
  color: var(--main-white);
`

const Intro = styled.section`
  display: flex;
  justify-content: center;
  padding: 5rem;
  background-color: var(--main-green);
`

const Content = styled.section`
  text-align: center;
  padding: 5rem 0;
`

const CoreValuesSection = styled.article`
  margin: 2rem 0;
`

const CoreValuesTitle = styled.h2``

const SoF = styled.article`
  margin: 2rem 0;
`

const SoFTitle = styled.h2``

const CMA = styled.a`
  text-decoration: underline;
  color: var(--main-blue);
  transition: 0.1s ease-in;

  &:hover {
    color: var(--main-green);
    font-size: 1rem;
  }
`
