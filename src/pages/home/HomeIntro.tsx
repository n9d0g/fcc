import { Button } from '../../components/Button'
import styled from 'styled-components'
import bg_intro from '../../assets/pictures/home-bg.avif'
import { motion } from 'framer-motion'

export const HomeIntro = () => {
  return (
    <Intro>
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
          <Button location="/sermons" text="Sermons" documentTitle="Sermons" />
        </ButtonContainer>
      </motion.div>
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
