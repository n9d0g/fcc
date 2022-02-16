import React, { useContext } from 'react'
import SermonContext from '../pages/sermons/SermonContext'
import styled from 'styled-components'

export const SermonPageActive = () => {
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
        <h2>{sermonContext.title}</h2>
      </ActiveInfo>
      <VideoContainer>
        <Video
          src={`https://www.youtube.com/embed/${sermonContext.youtube}`}
          width="1100"
          height="640"
          title="YouTube video player"
          allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></Video>
      </VideoContainer>
    </Active>
  )
}

const Active = styled.section`
  max-width: var(--width-max);
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 60em) {
    padding: 1rem;
  }
`

const ActiveInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: var(--width-max);
  justify-content: center;
  padding: 3rem 0;

  @media (max-width: 60em) {
    flex-direction: column-reverse;
    padding: 0 0 1.5rem;
  }
`

const InfoTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 60em) {
    flex-direction: column;
  }
`

const Speaker = styled.h3`
  display: flex;
  flex: 1;
  justify-content: left;
  font-weight: 400;

  @media (max-width: 60em) {
    font-size: 1.4rem;
  }
`
const Date = styled.h3`
  display: flex;
  flex: 1;
  justify-content: center;
  font-weight: 400;

  @media (max-width: 60em) {
    justify-content: left;
    font-size: 1.1rem;
  }
`

const Scripture = styled.h3`
  display: flex;
  flex: 1;
  justify-content: right;
  font-weight: 400;

  @media (max-width: 60em) {
    justify-content: left;
    font-size: 1.1rem;
  }
`

const LineBreak = styled.hr`
  width: 60rem;
  height: 2px;
  border: 0;
  background: var(--main-blue);
  display: block;
  margin: 1rem auto 0.5rem;

  @media (max-width: 60em) {
    display: none;
  }
`

const VideoContainer = styled.div`
  float: none;
  clear: both;
  width: 100%;
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 25px;
  height: 0;
`

const Video = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
