import React from 'react'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import styled from 'styled-components'
import leadership_bg from '../../assets/pictures/leadership_bg.jpg'
import { Breadcrumb } from '../../components/Breadcrumb'
import { BreadcrumbItem } from '../../components/BreadcrumbItem'
import { motion } from 'framer-motion'

export const Give = () => {
  useDocumentTitle('Give')

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}>
      <GiveSection>
        <GiveBanner>
          <GiveBannerTitle>give</GiveBannerTitle>
        </GiveBanner>
        <Breadcrumb>
          <BreadcrumbItem location="/" title="home" />
          <BreadcrumbItem location="/give" title="give" last />
        </Breadcrumb>
        <GiveIntro>
          <GiveIntroText>
            You can give financially in multiple ways, but as our services are
            temporarily online, you can give online by sending an e-transfer to{' '}
            <GiveIntroTextEmail>fcc.fcac@gmail.com</GiveIntroTextEmail>.
          </GiveIntroText>
        </GiveIntro>
      </GiveSection>
    </motion.main>
  )
}

const GiveSection = styled.div``

const GiveBanner = styled.header`
  display: flex;
  justify-content: center;
  background-image: url(${leadership_bg});
  background-size: cover;
  background-position: 50%;
  padding: 7rem 0;
  margin: 0 auto;

  @media (max-width: 60em) {
    padding: 4rem 0;
  }
`

const GiveBannerTitle = styled.h1`
  color: var(--main-white);
`

const GiveIntro = styled.section`
  display: flex;
  justify-content: center;
  max-width: var(--width-max);
  margin: 0 auto;
  padding: 3rem 0;

  @media (max-width: 60em) {
    padding: 1rem 0;
  }
`

const GiveIntroText = styled.p`
  text-align: center;
  font-size: 1.3rem;
  max-width: 50rem;
`

const GiveIntroTextEmail = styled.span`
  font-style: italic;
`
