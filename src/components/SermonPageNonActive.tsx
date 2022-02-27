import { useContext, useEffect, useState } from 'react'
import SermonContext from '../pages/sermons/SermonContext'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { RiFilter3Fill } from 'react-icons/ri'

interface SermonItemProps {
  title: string
  speaker: string
  scripture: string
  date: string
  youtube: string
}

interface SermonPageNonActiveProps {
  data: Array<SermonItemProps>
}

export const SermonPageNonActive = (props: SermonPageNonActiveProps) => {
  // sort sermons by date initially
  const originalSermonData = props.data.sort((a: any, b: any) =>
    a.date < b.date ? 1 : -1
  )

  const [activeSermon, setActiveSermon] = useState(false)
  const [filterIcon, setFilterIcon] = useState(false)
  const { sermonContext, setSermonContext } = useContext(SermonContext)
  const [sermons, setSermons] = useState(originalSermonData)
  const [searchResults, setSearchResults] = useState(originalSermonData.length)
  const [search, setSearch] = useState('')

  // TODO: TS any fix
  const toggle = (item: SermonItemProps, index: any) => {
    if (activeSermon === index) return null
    setSermonContext(item)
    setActiveSermon(index)
    document
      .getElementById('breadcrumb')
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  // filter by pastor whenever search const is changed
  useEffect(() => {
    // empty search string -> restore original array
    if (search === '') return setSermons(originalSermonData)

    // filter array with query
    const filteredSermons = sermons.filter(item => {
      const query = search.toLowerCase()
      const res = item.speaker.toLowerCase().includes(query)
      return res
    })

    setSermons(filteredSermons)
    setSearchResults(filteredSermons.length)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  return (
    <Container>
      <Title>sermon archive</Title>
      <LineBreak />
      <SearchFilterContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {filterIcon && (
          <SearchFilter
            type="text"
            placeholder="filter by speaker..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => {
              // re-populate sermon array on backspace
              if (e.key === 'Backspace') setSermons(originalSermonData)
            }}
          />
        )}
        <FilterIcon onClick={() => setFilterIcon(!filterIcon)} />
      </SearchFilterContainer>
      {filterIcon && sermons !== originalSermonData && (
        <ResultsText>{searchResults} results found:</ResultsText>
      )}
      <SermonsContainer>
        {sermons.map((item: SermonItemProps, index: number) => {
          return (
            <Item
              active={sermonContext === item}
              onClick={() => toggle(item, index)}
              key={index}>
              <TitleSpeaker>
                <h4>{item.title}</h4>
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

const ResultsText = styled.p`
  display: flex;
  color: var(--main-blue);
  justify-content: center;
`

const FilterIcon = styled(RiFilter3Fill)`
  width: 3rem;
  height: 3rem;
  transition: 0.2s;
  cursor: pointer;
  color: var(--main-blue);

  &:hover {
    transform: scale(1.1);
  }
`

const SearchFilterContainer = styled(motion.div)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1rem;
`

const SearchFilter = styled.input`
  padding: 0.75rem;
  border-radius: 1rem;
  border: 1px solid var(--main-blue);
  background: var(--main-white);
  color: var(--main-black);
  font-size: 1rem;

  @media (min-width: 60em) {
    transition: var(--transition-delay);
  }
`

const Container = styled.section`
  max-width: var(--width-max);
  margin: 0 auto;
  padding: 0 2rem;
`

const Title = styled.h2`
  display: flex;
  justify-content: center;
  padding-top: 3rem;

  @media (max-width: 60em) {
    padding: 2rem 1rem;
  }
`

const LineBreak = styled.hr`
  width: 60px;
  height: 2px;
  border: 0;
  background: var(--main-blue);
  display: block;
  margin: 1rem auto 2rem;

  @media (max-width: 60em) {
    display: none;
  }
`

const SermonsContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1.2rem;
  max-width: var(--width-max);
  justify-content: center;
  margin: 0 auto;
  color: var(--main-white);

  @media (max-width: 60em) {
    grid-template-columns: repeat(1, 1fr);
  }
`

interface ItemProps {
  active: boolean
}

const Item = styled.article<ItemProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  background: var(--main-white);
  color: var(--main-blue-sermons);
  padding: 1rem;
  transition: 0.3s ease;
  cursor: ${props => (props.active ? `not-allowed` : `pointer`)};
  opacity: ${props => props.active && `0.4`};
  border: ${props =>
    props.active
      ? `3px solid var(--main-green)`
      : `1px solid var(--secondary-grey)`};
  border-radius: 0.3rem;

  &:hover,
  &:focus {
    box-shadow: ${props =>
      !props.active && `rgba(100, 100, 111, 0.2) 0px 13px 29px 0px`};
    border: ${props => !props.active && `1px solid transparent`};
    border-radius: ${props => !props.active && `0.3rem`};
  }
`

const TitleSpeaker = styled.div``

const NonActiveSpeaker = styled.h5`
  font-weight: 400;
`

const NonActiveDate = styled.h5`
  font-style: italic;
  font-weight: 300;
`
