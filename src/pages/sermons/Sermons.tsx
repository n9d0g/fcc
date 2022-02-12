import { SermonLinks } from '../../data/SermonLinks'
import { SermonPageActive } from '../../components/sermon-page-active/SermonPageActive'
import { SermonPageNonActive } from '../../components/sermon-page-non-active/SermonPageNonActive'
import SermonContext from './SermonContext'
import { useState } from 'react'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import styled from 'styled-components'
import banner from '../../assets/pictures/sermons_bg.avif'

export const Sermons = () => {
  useDocumentTitle('Sermons')
  const [sermonContext, setSermonContext] = useState(SermonLinks[0])

  return (
    <>
      <Banner>
        <BannerTitle>sermons</BannerTitle>
      </Banner>
      <ActiveSermonContainer>
        <SermonContext.Provider value={{ sermonContext, setSermonContext }}>
          <SermonPageActive
            title={SermonLinks[0].title}
            speaker={SermonLinks[0].speaker}
            scripture={SermonLinks[0].scripture}
            date={SermonLinks[0].date}
            youtube={SermonLinks[0].youtube}
          />
          <SermonPageNonActive data={SermonLinks} />
        </SermonContext.Provider>
      </ActiveSermonContainer>
    </>
  )
}

const Banner = styled.div`
  background-image: url(${banner});
  background-position: 50% 50%;
  padding: 7rem 0;
`

const BannerTitle = styled.h1`
  font-size: 4rem;
  text-align: center;
  color: var(--main-black);
`

const ActiveSermonContainer = styled.div`
  padding: 5rem 0;
`
