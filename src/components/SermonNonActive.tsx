import React, { useContext } from 'react'
import HomeSermonContext from '../pages/home/HomeSermonContext'
import styled from 'styled-components'

export const SermonNonActive = (props: any) => {
  const { activeSermon, setActiveSermon } = useContext(HomeSermonContext)

  return (
    <>
      {activeSermon === props.data ? (
        <SermonClicked>
          <Title>{props.data.title}</Title>
          <Speaker>{props.data.speaker}</Speaker>
          <Date>{props.data.date}</Date>
        </SermonClicked>
      ) : (
        <Sermon onClick={() => setActiveSermon(props.data)}>
          <Title>{props.data.title}</Title>
          <Speaker>{props.data.speaker}</Speaker>
          <Date>{props.data.date}</Date>
        </Sermon>
      )}
    </>
  )
}

const Title = styled.h3`
  text-decoration: none;
  color: var(--main-white);
`

const Speaker = styled.h4`
  text-decoration: none;
  color: var(--main-white);
`

const Date = styled.h5`
  text-decoration: none;
  color: var(--main-white);
  font-style: italic;
`

const Sermon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: var(--main-blue);
  padding: 0.9rem;
  border-radius: 5px;
  margin-bottom: 25px;
  min-width: 18rem;
  text-decoration: none;
  text-align: left;
  border: 2px solid transparent;
  cursor: pointer;
  transition: 0.3s;

  @media (max-width: 60em) {
    margin: 0 2rem;
  }

  &:hover {
    opacity: 0.5;
  }
`

const SermonClicked = styled(Sermon)`
  opacity: 0.4;
  border: 3px solid var(--main-green);
  cursor: not-allowed;
`
