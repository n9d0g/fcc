import React from 'react'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import styled from 'styled-components'
import leadership_bg from '../../assets/pictures/leadership_bg.avif'

export const Give = () => {
  useDocumentTitle('Give')

  return (
    <GiveSection>
      <GiveBanner>
        <GiveBannerTitle>give</GiveBannerTitle>
      </GiveBanner>
      <GiveIntro>
        <GiveIntroText>
          You can give financially in multiple ways, but as our services are
          temporarily online, you can give online by sending an e-transfer to{' '}
          <GiveIntroTextEmail>fcc.fcac@gmail.com</GiveIntroTextEmail>.
        </GiveIntroText>
      </GiveIntro>
    </GiveSection>
  )
}

const GiveSection = styled.div``

const GiveBanner = styled.section`
  background-image: url(${leadership_bg});
  background-size: cover;
  background-position: 50%;
  padding: 7rem 0;
`

const GiveBannerTitle = styled.h1`
  text-align: center;
  font-size: 4rem;
  color: var(--main-white);
`

const GiveIntro = styled.section`
  display: flex;
  justify-content: center;
  text-align: center;
  max-width: 1100px;
  margin: 0 auto;
  padding: 3rem 0;
`

const GiveIntroText = styled.p`
  font-size: 2rem;
`

const GiveIntroTextEmail = styled.span`
  font-style: italic;
`
