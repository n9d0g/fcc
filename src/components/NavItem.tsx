import { useState } from 'react'
import { RiArrowDropUpLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface NavItemProps {
  location: string
  text: string
  children?: JSX.Element | JSX.Element[]
  dropdown?: boolean
}

export const NavItem = (props: NavItemProps) => {
  const [open, setOpen] = useState(false)

  return (
    <NavItemLink
      to={props.location}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}>
      <Text>
        {props.text}
        {props.dropdown && (
          <TextIcon>
            <RiArrowDropUpLine />
          </TextIcon>
        )}
      </Text>
      {open && props.children}
    </NavItemLink>
  )
}

const NavItemLink = styled(Link)`
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  outline: inherit;
  text-align: left;
  text-decoration: none;
  color: var(--main-white);
  cursor: pointer;

  @media (min-width: 60em) {
    transition: 0.3s;

    &:hover,
    &:focus {
      transform: translateY(-2.5%);
      background-color: var(--secondary-blue);
      border-radius: 1.2rem;
    }

    &:hover svg {
      transform: translateY(21%) scale(1.5, 1.5) rotate(180deg);
      color: var(--white);
    }

    &:focus svg {
      transform: translateY(21%) scale(1.5, 1.5) rotate(180deg);
      color: var(--white);
    }
  }
`

const Text = styled.button`
  margin: 0.8rem;
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  outline: inherit;
  text-align: left;
  text-decoration: none;
  color: var(--white);
  cursor: pointer;

  @media (min-width: 60em) {
    transition: 0.3s;
  }
`

const TextIcon = styled.span`
  @media (min-width: 60em) {
    > svg {
      transform: translateY(21%) scale(1.5, 1.5);
      transition: 0.1s ease-in;
      color: var(--white);
    }
  }
`
