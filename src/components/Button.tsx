import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { BsArrowRightShort } from 'react-icons/bs'

interface ButtonProps {
  location: string
  text: string
  documentTitle?: string
  margin?: boolean
  external?: boolean
  more?: boolean
}

export const Button = (props: ButtonProps) => {
  return (
    <ButtonContainer>
      {props.external ? (
        <ExternalButton
          href={props.location}
          target="_blank"
          rel="nnoopener noreferrer">
          <ButtonText>{props.text}</ButtonText>
        </ExternalButton>
      ) : (
        <InternalButton to={props.location}>
          <ButtonText>
            <>{props.text}</>
            {props.more && (
              <MoreContainer>
                {' '}
                <MoreIcon />
              </MoreContainer>
            )}
          </ButtonText>
        </InternalButton>
      )}
    </ButtonContainer>
  )
}

const ButtonContainer = styled.div`
  margin: 3rem 1rem 0;
`

const MoreContainer = styled.span`
  align-items: center;
`

const MoreIcon = styled(BsArrowRightShort)`
  transform: translateX(2px) translateY(2px) scale(1.8);
`

const ExternalButton = styled.a`
  padding: 1rem;
  border: 1px solid var(--main-blue);
  border-radius: 0.5rem;
  box-shadow: inset 0 56px 0 0 var(--main-blue);
  text-decoration: none;
  background-color: transparent;
  color: var(--white);
  transition: color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1),
    box-shadow 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:hover,
  &:focus {
    box-shadow: inset 0 0 0 0 var(--main-blue);
    outline: 0;
    color: var(--main-blue);
  }
`

const InternalButton = styled(Link)`
  padding: 1rem;
  border: 1px solid var(--main-blue);
  border-radius: 0.5rem;
  box-shadow: inset 0 56px 0 0 var(--main-blue);
  text-decoration: none;
  background-color: transparent;
  color: var(--white);
  transition: color 0.3s cubic-bezier(0.165, 0.84, 0.44, 1),
    box-shadow 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:hover,
  &:focus {
    box-shadow: inset 0 0 0 0 var(--main-blue);
    outline: 0;
    color: var(--main-blue);
  }
`

const ButtonText = styled.span`
  font-weight: 500;
`
