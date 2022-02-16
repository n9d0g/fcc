import { motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'

export const HomeMission = () => {
  return (
    <Mission>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 150 },
        }}>
        <Header>
          Our mission here at Freedom in Christ Church is to introduce and
          represent Christ through our nurturing, small group-driven ministries
          in the community.
        </Header>
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
