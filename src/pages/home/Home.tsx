import React from 'react'
import { HomeIntro } from './HomeIntro'
import { HomeSermons } from './HomeSermons'
import { HomeJoin } from './HomeJoin'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { HomeMission } from './HomeMission'

export const Home = () => {
  useDocumentTitle('Home')
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <HomeContainer>
        <HomeIntro />
        <HomeJoin />
        <HomeMission />
        <HomeSermons />
      </HomeContainer>
    </motion.main>
  )
}

const HomeContainer = styled.main`
  background-color: var(--bg-colour);
  color: var(--font-colour);
  text-align: center;
  transition: var(--transition-delay);
`
