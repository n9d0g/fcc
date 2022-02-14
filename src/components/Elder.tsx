import styled from 'styled-components'
import lolita from '../assets/pictures/elders/lolita.avif'
import roland from '../assets/pictures/elders/roland.avif'
import errol from '../assets/pictures/elders/errol.avif'
import chrys from '../assets/pictures/elders/chrys.avif'

export const Elder = (props: any) => {
  return (
    <Container>
      {props.data.map((elder: any, index: any) => {
        return (
          <Item key={index}>
            <ElderPicture picture={elder.picture}></ElderPicture>
            <h3>{elder.name}</h3>
            <h4>{elder.title}</h4>
            <p>{elder.description}</p>
          </Item>
        )
      })}
    </Container>
  )
}

const Container = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 5rem;
`

const Item = styled.article`
  display: flex;
  flex-direction: column;
`

interface ElderPictureProps {
  picture: any
}

const ElderPicture = styled.div<ElderPictureProps>`
  height: 300px;
  width: 300px;
  background-position: 50% 50%;

  // TODO: find more efficient solution for this
  background-image: ${props =>
    props.picture === 'lolita'
      ? `url(${lolita})`
      : '' || props.picture === 'errol'
      ? `url(${errol})`
      : '' || props.picture === 'chrys'
      ? `url(${chrys})`
      : '' || props.picture === 'roland'
      ? `url(${roland})`
      : ''};
`
