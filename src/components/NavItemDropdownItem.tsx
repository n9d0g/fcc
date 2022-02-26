import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface NavItemDropdownItemProps {
  title: string
  location: string
}

export const NavItemDropdownItem = (props: NavItemDropdownItemProps) => {
  return <Item to={props.location}>{props.title}</Item>
}

const Item = styled(Link)`
  display: flex;
  flex-direction: row;
  height: 3rem;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem;
  text-decoration: none;
  color: var(--white);
  box-shadow: 0px 24px 3px -24px var(--secondary-grey);

  @media (min-width: 60em) {
    transition: 0.3s;
  }

  &:hover,
  &:focus {
    background-color: var(--main-blue);
  }
`
