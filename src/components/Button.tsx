import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface ButtonProps {
  location: any
  text: any
  documentTitle?: any
  margin?: boolean
  external?: boolean
}

export const Button = (props: ButtonProps) => {
  return (
    <>
      {props.external ? (
        <ExternalButton
          href={props.location}
          target="_blank"
          rel="nnoopener noreferrer">
          <ButtonText>{props.text}</ButtonText>
        </ExternalButton>
      ) : (
        <InternalButton to={props.location}>
          <ButtonText>{props.text}</ButtonText>
        </InternalButton>
      )}
    </>
  )
}

const ExternalButton = styled.a`
  padding: 16px;
  border: 1px solid var(--main-blue);
  border-radius: 0.5rem;
  box-shadow: inset 0 56px 0 0 var(--main-blue);
  text-decoration: none;
  background-color: transparent;
  color: var(--main-white);
  transition: color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1),
    box-shadow 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:hover {
    box-shadow: inset 0 0 0 0 var(--main-blue);
    outline: 0;
    color: var(--main-blue);
  }
`

const InternalButton = styled(Link)`
  padding: 16px;
  border: 1px solid var(--main-blue);
  border-radius: 0.5rem;
  box-shadow: inset 0 56px 0 0 var(--main-blue);
  text-decoration: none;
  background-color: transparent;
  color: var(--main-white);
  transition: color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1),
    box-shadow 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:hover {
    box-shadow: inset 0 0 0 0 var(--main-blue);
    outline: 0;
    color: var(--main-blue);
  }
`

const ButtonText = styled.span`
  font-weight: 500;
`
