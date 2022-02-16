import { Button } from '../../components/Button'
import styled from 'styled-components'
import bg_intro from '../../assets/pictures/home-bg.jpg'
import { motion } from 'framer-motion'
import { Logo } from '../../components/Logo'

export const HomeIntro = () => {
  return (
    <Intro>
      <Logo colour="white" />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 2 }}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 50 },
        }}>
        <IntroHeader>Welcome to Freedom in Christ Church.</IntroHeader>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 1 }}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 50 },
        }}>
        <ButtonContainer>
          <Button location="/about" text="I'm new" documentTitle="About" />
          <Button
            location="/sermons"
            text="Sermons"
            documentTitle="Sermons"
            more
          />
        </ButtonContainer>
      </motion.div>
    </Intro>
  )
}

const Intro = styled.section`
  background-image: url(${bg_intro});
  background-size: cover;
  background-position: 50%;
  padding: 0 0 16rem 0;

  @media (max-width: 60em) {
    padding: 5rem 0 10rem;
  }
`

const IntroHeader = styled.h1`
  color: var(--main-white);
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`
