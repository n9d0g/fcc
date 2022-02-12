import React from 'react'
import styled from 'styled-components'

export const HomeMission = () => {
  return (
    <Mission>
      <Header>
        Our mission here at Freedom in Christ Church is to introduce and
        represent Christ through our nurturing, small group-driven ministries in
        the community.
      </Header>
    </Mission>
  )
}

const Mission = styled.section`
  padding: 10rem 0;
  background-color: var(--main-green);
`

const Header = styled.p`
  margin: 0 auto;
  text-align: center;
  font-size: 1.7rem;
  max-width: 800px;
`
