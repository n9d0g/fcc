import React, { useState } from 'react'
import { FiPlus, FiMinus } from 'react-icons/fi'
import styled from 'styled-components'

interface AccordionItemProps {
  title: string
  description: string
}

interface AccordionProps {
  data: Array<AccordionItemProps>
}

export const Accordion = (props: AccordionProps) => {
  const [clicked, setClicked] = useState<boolean>(false)

  const toggle = (index: any) => {
    if (clicked === index) return setClicked(false)
    setClicked(index)
  }

  return (
    <Container>
      {props.data.map((item: AccordionItemProps, index: any) => {
        return (
          <Item>
            <ClosedContainer onClick={() => toggle(index)} key={index}>
              <Title>{item.title}</Title>
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
  max-width: 70rem;
  padding: 1rem 0;
`

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
