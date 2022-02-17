import React from 'react'
import styled from 'styled-components'

export const Zoom = () => {
  const link =
    'https://us04web.zoom.us/j/3926981154?pwd=d1BHRTB3eStxZFZIS3lyWHBieENvZz09&fbclid=IwAR1N4y1LI5zX5bPnAABrXd_8ICuFko9Hw_5HV2P4wWj7U6JmALskzjO3H_U'
  return (
    <ZoomContainer>
      <Banner>
        join us sundays at 10:30am&nbsp;
        <ZoomLink href={link} target="_blank" rel="noopener noreferrer">
          via zoom
        </ZoomLink>
      </Banner>
    </ZoomContainer>
  )
}

const ZoomContainer = styled.article`
  margin: 0;
  background-color: var(--main-green);
  text-align: center;
`

const Banner = styled.p`
  margin: 0;
  padding: 0.5rem 0;
  background-color: var(--main-green);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.8rem;
  color: var(--main-black);
  transition: var(--transition-delay);
`

const ZoomLink = styled.a`
  text-decoration: none;
  color: var(--main-black);
  box-shadow: 0 1px 0 0 var(--white);
  transition: color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1),
    box-shadow 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:hover,
  &:focus {
    box-shadow: 0 4px 0 0 var(--white);
    color: var(--white);
  }
`
