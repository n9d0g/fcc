import { motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'

export const HomeMission = (props: any) => {
  return (
    <Mission>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 150 },
        }}>
        <Header>{props.data.missionDescription}</Header>
      </motion.div>
    </Mission>
  )
}

const Mission = styled.section`
  padding: 10rem 1rem;
  background-color: var(--main-green);

  @media (max-width: 60em) {
    padding: 5rem 1rem;
  }
`

const Header = styled.p`
  margin: 0 auto;
  text-align: center;
  font-size: 1.7rem;
  max-width: 50rem;
`
