import React, { useContext } from 'react'
import SermonContext from '../../pages/sermons/SermonContext'
import styled from 'styled-components'

export const SermonPageActive = (props: any) => {
  const { sermonContext } = useContext(SermonContext)

  return (
    <Active>
      <ActiveInfo>
        <InfoTop>
          <Speaker>{sermonContext.speaker}</Speaker>
          <Date>{sermonContext.date}</Date>
          <Scripture>{sermonContext.scripture}</Scripture>
        </InfoTop>
        <LineBreak />
        <Title>{sermonContext.title}</Title>
      </ActiveInfo>
      <VideoContainer>
        <iframe
          src={`https://www.youtube.com/embed/${sermonContext.youtube}`}
          width="1100"
          height="640"
          title="YouTube video player"
          allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
      </VideoContainer>
    </Active>
  )
}

const Active = styled.section``

const ActiveInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1100px;
  justify-content: center;
  padding: 3rem 0;
`

const InfoTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Speaker = styled.h3`
  display: flex;
  flex: 1;
  justify-content: left;
`
const Date = styled.h3`
  display: flex;
  flex: 1;
  justify-content: center;
`

const Scripture = styled.h3`
  display: flex;
  flex: 1;
  justify-content: right;
`

const LineBreak = styled.hr`
  color: var(--main-blue);
  margin: 1rem 0;
`

const Title = styled.h2`
  font-size: 2.5rem;
`

const VideoContainer = styled.div`
  display: flex;
  justify-content: center;
`
