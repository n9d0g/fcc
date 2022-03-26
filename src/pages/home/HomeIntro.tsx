import { Button } from '../../components/Button'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Logo } from '../../components/Logo'
import constants from '../../data/constants'

export const HomeIntro = (props: any) => {
  return (
    <Intro banner={props.banner}>
      <Logo />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 2 }}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 50 },
        }}>
        <IntroHeader>{props.title}</IntroHeader>
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
          <Button location={constants.links.about.location} text="I'm new" />
          <Button
            location={constants.links.sermons.location}
            text="Sermons"
            more
          />
        </ButtonContainer>
      </motion.div>
    </Intro>
  )
}

interface IntroBanner {
  banner: string
}

const Intro = styled.section<IntroBanner>`
  background-image: url(${props => props.banner});
  background-size: cover;
  background-position: 50%;
  padding: 0 0 16rem 0;
  @media (max-width: 60em) {
    padding: 5rem 0 10rem;
  }
`

const IntroHeader = styled.h1`
  color: var(--white);
  transition: var(--transition-delay);
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`
