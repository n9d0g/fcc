import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const NavItemDropdownItem = (props: any) => {
  return <Item to={props.location}>{props.title}</Item>
}

const Item = styled(Link)`
  display: flex;
  flex-direction: row;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem;
  text-decoration: none;
  color: var(--main-white);
  transition: 0.3s;
  box-shadow: 0px 24px 3px -24px var(--secondary-grey);

  &:hover {
    background-color: var(--main-blue);
  }
`
