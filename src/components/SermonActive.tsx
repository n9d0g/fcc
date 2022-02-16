import React from 'react'
import styled from 'styled-components'

interface SermonActiveProps {
  youtube: string
}

export const SermonActive = (props: SermonActiveProps) => {
  return (
    <SermonContainer>
      <Sermon
        width="560"
        height="349"
        src={`https://www.youtube.com/embed/${props.youtube}`}
        title="YouTube video player"
        allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></Sermon>
    </SermonContainer>
  )
}

const SermonContainer = styled.div`
  float: none;
  clear: both;
  width: 100%;
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 25px;
  height: 0;
`

const Sermon = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
