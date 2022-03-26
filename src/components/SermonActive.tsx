import styled from 'styled-components'
import constants from '../data/constants'

interface SermonActiveProps {
  youtube: string
}

export const SermonActive = (props: SermonActiveProps) => {
  return (
    <SermonContainer>
      <Sermon
        src={`https://www.youtube.com/embed/${props.youtube}`}
        title={constants.iframe.title}
        allow={constants.iframe.allow}
      />
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
