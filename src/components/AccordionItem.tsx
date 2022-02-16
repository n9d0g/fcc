import { useState } from 'react'
import { FiMinus, FiPlus } from 'react-icons/fi'
import styled from 'styled-components'

interface AccordionItemProps {
  title: string
  description: string
}

export const AccordionItem = (props: AccordionItemProps) => {
  const [clicked, setClicked] = useState(false)

  return (
    <Item>
      <ClosedContainer onClick={() => setClicked(!clicked)}>
        <Title>{props.title}</Title>
        <Icon>{clicked ? <FiMinus /> : <FiPlus />}</Icon>
      </ClosedContainer>
      {clicked && <Description>{props.description}</Description>}
    </Item>
  )
}

const Item = styled.div`
  border-bottom: 1px solid var(--main-green);
`

const Icon = styled.span`
  transform: translateY(0.3rem);
  font-size: 1.8rem;
`

const ClosedContainer = styled.div`
  display: flex;
  padding: 1rem;
  cursor: pointer;
  justify-content: space-between;
  align-items: center;
  transition: 0.5s;

  &:hover {
    background-color: var(--main-green);
  }
`

const Description = styled.p`
  padding: 0 12px;
  text-align: left;
`

const Title = styled.h3`
  @media (max-width: 60em) {
    padding: 0;
  }
`
