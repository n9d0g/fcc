import React, { useEffect, useState } from 'react'
import { HomeIntro } from './HomeIntro'
import { HomeMission } from './HomeMission'
import { HomeSermons } from './HomeSermons'
import { HomeJoin } from './HomeJoin'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import sanityClient from '../../client'

export const Home = () => {
  useDocumentTitle('Home')
  const [homeData, setHomeData] = useState()
  const [sermonData, setSermonData] = useState()

  useEffect(() => {
    sanityClient
      .fetch(
        `
        *[_type == 'homepage'][0] {
          title,
          introBanner {
            asset -> {url}
          },
          joinTitle,
          joinDescription,
          missionDescription
        }`
      )
      .then(data => setHomeData(data))
      .catch(console.error)

    sanityClient
      .fetch(
        `
      *[_type == 'sermons'] | order(_createdAt asc){
        title,
        speaker,
        scripture,
        date,
        youtube
      }
    `
      )
      .then(data => setSermonData(data))
      .catch(console.error)
  }, [])

  console.log(sermonData)

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {homeData && sermonData && (
        <HomeContainer>
          <HomeIntro data={homeData} />
          <HomeJoin data={homeData} />
          <HomeMission data={homeData} />
          <HomeSermons data={sermonData} />
        </HomeContainer>
      )}
    </motion.main>
  )
}

const HomeContainer = styled.main`
  background-color: var(--bg-colour);
  color: var(--font-colour);
  text-align: center;
  transition: var(--transition-delay);
`
