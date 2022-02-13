import React from 'react'
import { HomeIntro } from './HomeIntro'
import { HomeMission } from './HomeMission'
import { HomeSermons } from './HomeSermons'
import { HomeJoin } from './HomeJoin'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import styled from 'styled-components'
import { motion } from 'framer-motion'

export const Home = () => {
  useDocumentTitle('Home')
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}>
      <HomeContainer>
        <HomeIntro />
        <HomeJoin />
        <HomeMission />
        <HomeSermons />
      </HomeContainer>
    </motion.div>
  )
}

const HomeContainer = styled.main`
  text-align: center;
`
