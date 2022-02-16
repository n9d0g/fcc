import { Button } from './Button'
import styled from 'styled-components'
import picture from '../assets/pictures/about_bg.jpg'

interface LandingPageSectionProps {
  title: string
  description?: string
  btnText: string
  btnLocation: string
  picture?: string
  flip?: boolean
}

export const LandingPageSection = (props: LandingPageSectionProps) => {
  return (
    <LandingPageContainer flipped={props.flip}>
      <Picture />
      <Container>
        <h2>{props.title}</h2>
        <Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Description>
        <Button location={props.btnLocation} text={props.btnText} />
      </Container>
    </LandingPageContainer>
  )
}

interface LandingPageContainerProps {
  flipped: boolean | undefined
}

const LandingPageContainer = styled.section<LandingPageContainerProps>`
  display: flex;
  max-width: var(--width-max);
  margin: 0 auto;
  padding: 3rem 0;
  flex-direction: ${props => (props.flipped ? `row-reverse` : `row`)};

  @media (max-width: 60em) {
    flex-direction: column;
    padding: 1rem 1rem 3rem;
  }
`

const Container = styled.div`
  flex: 1;
  text-align: left;
`

const Description = styled.p`
  padding: 1rem;
  margin: 0 auto;
`

const Picture = styled.picture`
  flex: 1;
  background-image: url(${picture});
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;
  height: 30rem;
  width: 30rem;
  margin: 0 2rem;
`
