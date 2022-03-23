import styled from 'styled-components'
import { Link } from 'react-router-dom'

interface BreadcrumbItemProps {
  location: string
  title: string
  last?: boolean
}

export const BreadcrumbItem = (props: BreadcrumbItemProps) => {
  return (
    <BreadcrumbLink to={props.location}>
      {' '}
      <Text last={props.last}>{props.title}</Text>{' '}
      <Slash>{props.last ? '' : ' /'}</Slash>
    </BreadcrumbLink>
  )
}

const BreadcrumbLink = styled(Link)`
  text-decoration: none;
`

interface TextProps {
  last: boolean | undefined
}

const Text = styled.span<TextProps>`
  color: ${props => (props.last ? `var(--main-blue);` : `var(--main-black);`)};
  transition: color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1),
    box-shadow 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:hover,
  &:focus {
    box-shadow: 0 4px 0 0 var(--main-blue);
    color: var(--main-blue);
  }
`

const Slash = styled.span`
  color: var(--main-blue);
`
