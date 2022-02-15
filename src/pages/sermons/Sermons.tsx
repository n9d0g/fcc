import { SermonLinks } from '../../data/SermonLinks'
import { SermonPageActive } from '../../components/SermonPageActive'
import { SermonPageNonActive } from '../../components/SermonPageNonActive'
import SermonContext from './SermonContext'
import { useState } from 'react'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import styled from 'styled-components'
import banner from '../../assets/pictures/sermons_bg.avif'
import { Breadcrumb } from '../../components/Breadcrumb'
import { BreadcrumbItem } from '../../components/BreadcrumbItem'
import { motion } from 'framer-motion'

export const Sermons = () => {
  useDocumentTitle('Sermons')
  const [sermonContext, setSermonContext] = useState(SermonLinks[0])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}>
      <Banner>
        <BannerTitle>sermons</BannerTitle>
      </Banner>
      <Breadcrumb>
        <BreadcrumbItem location="/" title="home" />
        <BreadcrumbItem location="/sermons" title="sermons" last />
      </Breadcrumb>
      <ActiveSermonContainer>
        <SermonContext.Provider value={{ sermonContext, setSermonContext }}>
          <SermonPageActive
            title={SermonLinks[0].title}
            speaker={SermonLinks[0].speaker}
            scripture={SermonLinks[0].scripture}
            date={SermonLinks[0].date}
            youtube={SermonLinks[0].youtube}
          />
          <SermonPageNonActive data={SermonLinks} />
        </SermonContext.Provider>
      </ActiveSermonContainer>
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
  color: var(--main-blue);
`

const ActiveSermonContainer = styled.div`
  padding-bottom: 5rem;
`
