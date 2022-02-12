import { NavItemDropdownItem } from './NavItemDropdownItem'
import styled from 'styled-components'

export const NavItemDropdown = (props: any) => {
  return (
    <Dropdown right={props.right}>
      {props.items.map((item: any, index: any) => {
        return (
          <NavItemDropdownItem
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
  position: absolute;
  transform: translateX(10%);
  width: 175px;
  overflow: hidden;
  background-color: var(--main-green);
  border: 1px solid var(--secondary-grey);
  transform: ${props => (props.right ? `translateX(-70px)` : ``)};
`
