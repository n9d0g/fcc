import { useContext } from 'react'
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
          <div>
            <Title>{props.data.title}</Title>
            <Speaker>{props.data.speaker}</Speaker>
          </div>
          <Date>{props.data.date}</Date>
        </SermonClicked>
      ) : (
        <Sermon
          onClick={() => {
            setActiveSermon(props.data)
            scroll()
          }}>
          <div>
            <Title>{props.data.title}</Title>
            <Speaker>{props.data.speaker}</Speaker>
          </div>
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
  height: 100%;
  width: auto;
  background: var(--main-blue);
  color: var(--white);
  padding: 0.9rem;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
  text-decoration: none;
  text-align: left;
  border: 2px solid transparent;
  cursor: pointer;
  transition: 0.3s;

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
