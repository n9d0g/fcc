import { NavItemDropdownItem } from './NavItemDropdownItem'
import styled from 'styled-components'

interface NavItemDropdownItemProps {
  title: string
  location: string
}

interface NavItemDropdownProps {
  items: Array<NavItemDropdownItemProps>
  right?: boolean
}

export const NavItemDropdown = (props: NavItemDropdownProps) => {
  return (
    <Dropdown right={props.right}>
      {props.items.map((item: NavItemDropdownItemProps, index: number) => {
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
  right: boolean | undefined
}

const Dropdown = styled.div<DropdownProps>`
  position: absolute;
  transform: ${props => (props.right ? `translateX(-93px)` : `translateX(3%)`)};
  width: 10.5rem;
  overflow: hidden;
  background-color: var(--main-green);
  border: 1px solid var(--secondary-grey);
  border-radius: 0.7rem;
`
