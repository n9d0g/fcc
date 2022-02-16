import styled from 'styled-components'
import { AccordionItem } from './AccordionItem'

interface AccordionItemProps {
  title: string
  description: string
}

interface AccordionProps {
  data: Array<AccordionItemProps>
}

export const Accordion = (props: AccordionProps) => {
  return (
    <Container>
      {props.data.map((item: AccordionItemProps, index: number) => {
        return (
          <AccordionItem
            key={index}
            title={item.title}
            description={item.description}
          />
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  max-width: 70rem;
  padding: 1rem 0;
`
