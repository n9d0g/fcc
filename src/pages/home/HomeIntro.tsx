import { Button } from '../../components/Button'
import styled from 'styled-components'
import bg_intro from '../../assets/pictures/home-bg.avif'

export const HomeIntro = () => {
  return (
    <Intro>
      <IntroHeader>Welcome to Freedom in Christ Church.</IntroHeader>
      <ButtonContainer>
        <Button location="/about" text="I'm new" documentTitle="About" />
        <Button location="/sermons" text="Sermons" documentTitle="Sermons" />
      </ButtonContainer>
    </Intro>
  )
}

const Intro = styled.section`
  background-image: url(${bg_intro});
  background-size: cover;
  background-position: 50%;
  padding: 18rem 0 26rem 0;
`

const IntroHeader = styled.h1`
  color: var(--main-white);
  font-size: 3rem;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  > a {
    margin: 16px;
  }
`
