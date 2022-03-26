import { useState } from 'react'
import { SermonNonActive } from '../../components/SermonNonActive'
import { SermonActive } from '../../components/SermonActive'
import { Button } from '../../components/Button'
import HomeSermonContext from './HomeSermonContext'
import styled from 'styled-components'
import constants from '../../data/constants'

export const HomeSermons = (props: any) => {
  // sort sermons from newest to oldest
  const sermons = props.sermons.sort((a: any, b: any) =>
    a.date < b.date ? 1 : -1
  )

  const [activeSermon, setActiveSermon] = useState<any>(sermons[0])

  return (
    <Sermons>
      <h2 id="home-sermon">{props.title}</h2>
      <LineBreak />
      <SermonContainer>
        <HomeSermonContext.Provider value={{ activeSermon, setActiveSermon }}>
          <SermonActive youtube={activeSermon.youtube} />
          <NonActiveSermonContainer>
            <SermonNonActive data={sermons[0]} />
            <SermonNonActive data={sermons[1]} />
            <SermonNonActive data={sermons[2]} />
          </NonActiveSermonContainer>
        </HomeSermonContext.Provider>
      </SermonContainer>
      <SermonButtonContainer>
        <Button
          location={constants.links.sermons.location}
          text="view all sermons"
          more
        />
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
  margin: 3rem auto 0 auto;
  max-width: var(--width-max);

  @media (max-width: 60em) {
    flex-direction: column;
  }
`

const NonActiveSermonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  gap: 3rem;

  @media (max-width: 60em) {
    flex-direction: column;
    gap: 1rem;
  }
`

const SermonButtonContainer = styled.div`
  margin: 2rem 0;
`
