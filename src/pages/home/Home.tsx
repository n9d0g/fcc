import React from 'react'
import { HomeIntro } from './HomeIntro'
import { HomeMission } from './HomeMission'
import { HomeSermons } from './HomeSermons'
import { HomeJoin } from './HomeJoin'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import styled from 'styled-components'

export const Home = () => {
  useDocumentTitle('Home')
  return (
    <HomeContainer>
      <HomeIntro />
      <HomeJoin />
      <HomeMission />
      <HomeSermons />
    </HomeContainer>
  )
}

const HomeContainer = styled.main`
  text-align: center;
`
