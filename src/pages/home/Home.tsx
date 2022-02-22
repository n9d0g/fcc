import { HomeIntro } from './HomeIntro'
import { HomeSermons } from './HomeSermons'
import { HomeJoin } from './HomeJoin'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { HomeMission } from './HomeMission'
import { useSinglePrismicDocument } from '@prismicio/react'
import { Spinner } from '../../components/Spinner'

export const Home = () => {
  useDocumentTitle('Home')
  const [document]: any = useSinglePrismicDocument('home')
  const [sermons]: any = useSinglePrismicDocument('sermons')

  return (
    <>
      {document && sermons ? (
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <HomeContainer>
            <HomeIntro
              title={document.data.title}
              banner={document.data.banner.url}
            />
            <HomeJoin
              title={document.data.home_join_title}
              description={document.data.join_prompt_description}
              picture={document.data.join_picture.url}
            />
            <HomeMission description={document.data.home_mission} />
            <HomeSermons
              title={document.data.home_sermons_title}
              sermons={sermons.data.sermons}
            />
          </HomeContainer>
        </motion.main>
      ) : (
        <Spinner />
      )}
    </>
  )
}

const HomeContainer = styled.main`
  background-color: var(--bg-colour);
  color: var(--font-colour);
  text-align: center;
  transition: var(--transition-delay);
`
