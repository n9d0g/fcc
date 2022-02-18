import React, { useContext } from 'react'
import HomeSermonContext from '../pages/home/HomeSermonContext'
import styled from 'styled-components'

interface SermonNonActiveProps {
  data: {
    title: string
    speaker: string
    date: string
    scripture: string
    youtube: string
  }
}

export const SermonNonActive = (props: SermonNonActiveProps) => {
  const { activeSermon, setActiveSermon } = useContext(HomeSermonContext)

  const scroll = () => {
    document
      .getElementById('home-sermon')
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {activeSermon === props.data ? (
        <SermonClicked>
          <Title>{props.data.title}</Title>
          <Speaker>{props.data.speaker}</Speaker>
          <Date>{props.data.date}</Date>
        </SermonClicked>
      ) : (
        <Sermon
          onClick={() => {
            setActiveSermon(props.data)
            scroll()
          }}>
          <Title>{props.data.title}</Title>
          <Speaker>{props.data.speaker}</Speaker>
          <Date>{props.data.date}</Date>
        </Sermon>
      )}
    </>
  )
}

const Title = styled.h4``

const Speaker = styled.h5`
  font-weight: 400;
`

const Date = styled.h6`
  font-weight: 400;
  font-style: italic;
`

const Sermon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: var(--main-blue);
  color: var(--white);
  padding: 0.9rem;
  border-radius: 0.25rem;
  margin-bottom: 1.5rem;
  min-width: 18rem;
  text-decoration: none;
  text-align: left;
  border: 2px solid transparent;
  cursor: pointer;
  transition: 0.3s;

  @media (max-width: 60em) {
    margin: 0 2rem;
  }

  &:hover,
  &:focus {
    opacity: 0.5;
  }
`

const SermonClicked = styled(Sermon)`
  opacity: 0.4;
  border: 3px solid var(--main-green);
  cursor: not-allowed;
`
