import styled from 'styled-components'
import lolita from '../assets/pictures/elders/lolita.jpg'
import roland from '../assets/pictures/elders/roland.jpg'
import errol from '../assets/pictures/elders/errol.jpg'
import chrys from '../assets/pictures/elders/chrys.jpg'

interface SubMinistriesItemProps {
  ministry: string
  leader: string
}

interface ElderItemProps {
  name: string
  picture: string
  title: string
  description: string
  subministries: Array<SubMinistriesItemProps>
}

interface ElderProps {
  data: Array<ElderItemProps>
}

export const Elder = (props: ElderProps) => {
  return (
    <Container>
      {props.data.map((elder: ElderItemProps, index: number) => {
        return (
          <Item key={index}>
            <>
              <ElderPicture picture={elder.picture}></ElderPicture>
              <ElderInfo>
                <Name>{elder.name}</Name>
                <Title>{elder.title}</Title>
                <Ministry>{elder.description}</Ministry>
              </ElderInfo>
            </>
            <SubMinistriesContainer>
              <SubMinsitryTitle>Sub-Ministries:</SubMinsitryTitle>
              {elder.subministries.map(
                (item: SubMinistriesItemProps, index: number) => {
                  return (
                    <SubMinistry key={index}>
                      <u>{item.ministry}</u>: <i>{item.leader}</i>
                    </SubMinistry>
                  )
                }
              )}
            </SubMinistriesContainer>
          </Item>
        )
      })}
    </Container>
  )
}

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2rem;
  justify-content: center;
  max-width: 60em;
  margin: 0 auto;
  padding: 3rem;
  @media (max-width: 60em) {
    grid-template-columns: repeat(1, 1fr);
    padding: 0 2rem;
  }
`

const Item = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  padding: 2rem 1rem;
  background-color: var(--secondary-grey);
  color: var(--black);
  border-radius: 1rem;
  box-shadow: rgba(100, 100, 111, 0.5) 0px 13px 29px 0px;
`

const ElderInfo = styled.div`
  display: flex;
  flex-direction: column;
`

interface ElderPictureProps {
  picture: string
}

const ElderPicture = styled.div<ElderPictureProps>`
  height: 30rem;
  width: 30rem;
  background-position: 50% 50%;
  background-repeat: no-repeat;
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
  @media (max-width: 60em) {
    height: 20rem;
    width: 20rem;
  }
`

const Name = styled.h3`
  padding: 0.5rem 0;
`

const Title = styled.h4`
  font-style: italic;
  padding: 0;
  font-weight: 400;
`

const Ministry = styled.h5`
  padding: 0;
  font-weight: 400;
`

const SubMinsitryTitle = styled.h6`
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0;
`

const SubMinistry = styled.p`
  padding: 0;
  margin: 0;
  @media (max-width: 60em) {
    padding: 0;
  }
`

const SubMinistriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
`
