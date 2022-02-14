import { useState } from 'react'
import { SermonNonActive } from '../../components/SermonNonActive'
import { SermonActive } from '../../components/SermonActive'
import { SermonLinks } from '../../data/SermonLinks'
import { Button } from '../../components/Button'
import HomeSermonContext from './HomeSermonContext'
import styled from 'styled-components'

export const HomeSermons = () => {
  const [activeSermon, setActiveSermon] = useState<any>(SermonLinks[0])

  return (
    <Sermons>
      <h2 id="home-sermon">recent sermons</h2>
      <LineBreak />
      <SermonContainer>
        <HomeSermonContext.Provider value={{ activeSermon, setActiveSermon }}>
          <SermonActive youtube={activeSermon.youtube} />
          <NonActiveSermonContainer>
            <SermonNonActive data={SermonLinks[0]} />
            <SermonNonActive data={SermonLinks[1]} />
            <SermonNonActive data={SermonLinks[2]} />
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
  max-width: 1100px;
  margin: 0 auto;

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
