import { Button } from './Button'
import styled from 'styled-components'

interface LandingPageSectionProps {
  title: string
  description: string
  btnText: string
  btnLocation: string
  picture: string
  flip: boolean
}

export const LandingPageSection = (props: LandingPageSectionProps) => {
  return (
    <LandingPageContainer flipped={props.flip}>
      <Picture picture={props.picture}></Picture>
      <Container>
        <h2>{props.title}</h2>
        <Description>{props.description}</Description>
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
  transition: var(--transition-delay);

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

interface PictureProps {
  picture: string
}

const Picture = styled.div<PictureProps>`
  flex: 1;
  background-image: url(${props => props.picture});
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;
  height: 30rem;
  width: 30rem;
  margin: 0 2rem;
`
