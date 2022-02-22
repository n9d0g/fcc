import styled from 'styled-components'
import { useAllPrismicDocumentsByType } from '@prismicio/react'

interface SubMinistriesItemProps {
  ministry: string
  leader: string
}

interface ElderItemProps {
  data: {
    name: string
    picture: any
    title: string
    description: string
    subministries: Array<SubMinistriesItemProps>
  }
}

export const Elder = () => {
  const [document]: any = useAllPrismicDocumentsByType('elder')

  return (
    <Container>
      {document &&
        document.map((elder: ElderItemProps, index: number) => {
          return (
            <Item key={index}>
              <ElderTopInfo>
                <ElderPicture picture={elder.data.picture.url}></ElderPicture>
                <ElderInfo>
                  <Name>{elder.data.name}</Name>
                  <Title>{elder.data.title}</Title>
                  <Ministry>{elder.data.description}</Ministry>
                </ElderInfo>
              </ElderTopInfo>
              <SubMinistriesContainer>
                <SubMinsitryTitle>Sub-Ministries:</SubMinsitryTitle>
                {elder.data.subministries.map(
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

const ElderTopInfo = styled.div`
  display: flex;
  flex-direction: column;
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
  background-image: ${props => `url(${props.picture})`};

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
