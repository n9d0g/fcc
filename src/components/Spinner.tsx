import { SpinnerCircularFixed } from 'spinners-react'
import styled from 'styled-components'

export const Spinner = () => {
  return (
    <SpinnerContainer>
      <SpinnerCircularFixed
        size={90}
        thickness={150}
        speed={148}
        color="rgba(57, 134, 172, 1)"
        secondaryColor="rgba(57, 172, 60, 0.41)"
      />
    </SpinnerContainer>
  )
}

const SpinnerContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100vw;
  height: 90vh;
  background-color: var(--main-white);
`
