import { useContext, useState } from 'react'
import SermonContext from '../pages/sermons/SermonContext'
import styled from 'styled-components'

export const SermonPageNonActive = (props: any) => {
  const [activeSermon, setActiveSermon] = useState<any>(false)
  const { sermonContext, setSermonContext } = useContext(SermonContext)

  const toggle = (item: any, index: any) => {
    if (activeSermon === index) return null
    setSermonContext(item)
    setActiveSermon(index)
    document
      .getElementById('breadcrumb')
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Container>
      <Title>sermon archive</Title>
      <LineBreak />
      <SermonsContainer>
        {props.data.map((item: any, index: any) => {
          return (
            <Item
              active={sermonContext === item}
              onClick={() => toggle(item, index)}
              key={index}>
              <TitleSpeaker>
                <NonActiveTitle>{item.title}</NonActiveTitle>
                <NonActiveSpeaker>{item.speaker}</NonActiveSpeaker>
              </TitleSpeaker>
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

const LineBreak = styled.hr`
  width: 60px;
  height: 2px;
  border: 0;
  background: var(--main-blue);
  display: block;
  margin: 15px auto 0;
`

const SermonsContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1.2rem;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  background: var(--main-white);
  color: var(--main-blue);
  padding: 1rem;
  transition: 0.3s ease;
  cursor: ${props => (props.active ? `not-allowed` : `pointer`)};
  opacity: ${props => props.active && `0.4`};
  border: ${props =>
    props.active
      ? `3px solid var(--main-green)`
      : `1px solid var(--secondary-grey)`};
  border-radius: 0.3rem;

  &:hover {
    box-shadow: ${props =>
      !props.active && `rgba(100, 100, 111, 0.2) 0px 13px 29px 0px`};
    border: ${props => !props.active && `1px solid transparent`};
    border-radius: ${props => !props.active && `0.3rem`};
  }
`

const TitleSpeaker = styled.div``

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
