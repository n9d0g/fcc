import { useState } from 'react'
import { SermonNonActive } from '../../components/SermonNonActive'
import { SermonActive } from '../../components/SermonActive'
import { Button } from '../../components/Button'
import HomeSermonContext from './HomeSermonContext'
import styled from 'styled-components'

export const HomeSermons = (props: any) => {
  const [activeSermon, setActiveSermon] = useState<any>(props.data[0])

  return (
    <Sermons>
      <h2 id="home-sermon">recent sermons</h2>
      <LineBreak />
      <SermonContainer>
        <HomeSermonContext.Provider value={{ activeSermon, setActiveSermon }}>
          <SermonActive youtube={activeSermon.youtube} />
          <NonActiveSermonContainer>
            {props.data.map((item: any, index: string) => {
              return <SermonNonActive key={index} data={item} />
            })}
          </NonActiveSermonContainer>
        </HomeSermonContext.Provider>
      </SermonContainer>
      <SermonButtonContainer>
        <Button location="/sermons" text="view all sermons" more />
      </SermonButtonContainer>
    </Sermons>
  )
}

const Sermons = styled.section`
  padding: 9rem 1rem;
  max-width: var(--width-max);
  margin: 0 auto;
  color: var(--main-black);

  @media (max-width: 60em) {
    padding: 4rem 1rem;
  }
`

const LineBreak = styled.hr`
  width: 60px;
  height: 2px;
  border: 0;
  background: var(--main-blue);
  display: block;
  margin: 25px auto;
`

const SermonContainer = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5rem;
  margin-top: 40px;

  @media (max-width: 60em) {
    flex-direction: column;
  }
`

const NonActiveSermonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;

  @media (max-width: 60em) {
    flex-direction: column;
    gap: 1rem;
  }
`

const SermonButtonContainer = styled.div`
  margin: 2rem 0;
`
