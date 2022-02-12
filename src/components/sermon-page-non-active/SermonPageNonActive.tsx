import { useContext, useState } from 'react'
import SermonContext from '../../pages/sermons/SermonContext'
import styled from 'styled-components'

export const SermonPageNonActive = (props: any) => {
  const [activeSermon, setActiveSermon] = useState<any>(false)
  const { sermonContext, setSermonContext } = useContext(SermonContext)

  const toggle = (item: any, index: any) => {
    if (activeSermon === index) return null
    setSermonContext(item)
    setActiveSermon(index)
    document
      .getElementById('active-sermon')
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Container>
      <Title>sermon archive</Title>
      <SermonsContainer>
        {props.data.map((item: any, index: any) => {
          return (
            <Item
              active={sermonContext === item}
              onClick={() => toggle(item, index)}
              key={index}>
              <NonActiveTitle>{item.title}</NonActiveTitle>
              <NonActiveSpeaker>{item.speaker}</NonActiveSpeaker>
              <NonActiveDate>{item.date}</NonActiveDate>
            </Item>
          )
        })}
      </SermonsContainer>
    </Container>
  )
}

const Container = styled.section`
  max-width: 1100px;
  margin: 0 auto;
`

const Title = styled.h2`
  display: flex;
  justify-content: center;
  font-size: 2.3rem;
  padding-top: 3rem;
`

const SermonsContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 15px;
  max-width: 1100px;
  justify-content: center;
  margin: 0 auto;
  padding: 3rem 0;
  color: var(--main-white);
`

interface ItemProps {
  active: any
}

const Item = styled.div<ItemProps>`
  flex: 1;
  background: var(--main-blue);
  padding: 1rem;
  transition: 0.3s;
  cursor: ${props => (props.active ? `not-allowed` : `pointer`)};
  opacity: ${props => props.active && `0.4`};
  border: ${props => props.active && `3px solid var(--main-green)`};

  &:hover {
    opacity: 0.8;
  }
`

const NonActiveTitle = styled.h3`
  font-size: 1.1rem;
`

const NonActiveSpeaker = styled.h4`
  font-weight: 400;
`

const NonActiveDate = styled.h5`
  font-style: italic;
  font-weight: 300;
`
