import styled from 'styled-components'
import { NavItemDropdownItemMobile } from './NavItemDropdownItemMobile'

export const NavItemDropdownMobile = (props: any) => {
  return (
    <Dropdown right={props.right}>
      {props.items.map((item: any, index: any) => {
        return (
          <NavItemDropdownItemMobile
            key={index}
            title={item.title}
            location={item.location}
          />
        )
      })}
    </Dropdown>
  )
}

interface DropdownProps {
  right: any
}

const Dropdown = styled.div<DropdownProps>`
  width: 175px;
  overflow: hidden;
  background-color: var(--main-green);
`
