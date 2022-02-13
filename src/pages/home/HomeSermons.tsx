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
      <Header>recent sermons</Header>
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
        <Button location="/sermons" text="view all sermons" />
      </SermonButtonContainer>
    </Sermons>
  )
}

const Sermons = styled.section`
  padding: 120px 80px;
`

const Header = styled.h2`
  font-size: 3rem;
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
  justify-content: center;
  gap: 5rem;
  margin-top: 40px;
`

const NonActiveSermonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const SermonButtonContainer = styled.div`
  margin: 2rem 0;
`
