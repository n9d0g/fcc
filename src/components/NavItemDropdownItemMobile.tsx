import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface NavItemDropdownItemMobileProps {
  title: string
  location: string
}

export const NavItemDropdownItemMobile = (
  props: NavItemDropdownItemMobileProps
) => {
  return (
    <Item to={props.location}>
      <Text>{props.title}</Text>
    </Item>
  )
}

const Text = styled.p`
  font-size: 0.9rem;
  padding: 0;
`

const Item = styled(Link)`
  display: flex;
  flex-direction: row;
  height: 2.5rem;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.7rem;
  text-decoration: none;
  color: var(--white);
  transform: translateX(1rem);
`
