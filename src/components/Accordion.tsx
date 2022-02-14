import { useState } from 'react'
import { FiPlus, FiMinus } from 'react-icons/fi'
import styled from 'styled-components'

export const Accordion = (props: any) => {
  const [clicked, setClicked] = useState<any>(false)

  const toggle = (index: any) => {
    if (clicked === index) return setClicked(null)
    setClicked(index)
  }

  return (
    <Container>
      {props.data.map((item: any, index: any) => {
        return (
          <Item>
            <ClosedContainer onClick={() => toggle(index)} key={index}>
              <h4>{item.title}</h4>
              <Icon>{clicked === index ? <FiMinus /> : <FiPlus />}</Icon>
            </ClosedContainer>
            {clicked === index ? (
              <Description>{item.description}</Description>
            ) : null}
          </Item>
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1100px;
  margin-right: auto;
  margin-left: auto;
`

const Item = styled.div`
  border-bottom: 1px solid var(--main-green);
`

const Icon = styled.span``

const ClosedContainer = styled.div`
  padding: 1rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  transition: 0.5s;

  &:hover {
    background-color: var(--main-green);
  }
`

const Description = styled.p`
  padding: 0 12px;
  text-align: left;
`
