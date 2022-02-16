import styled from 'styled-components'
import { NavItemDropdownItemMobile } from './NavItemDropdownItemMobile'

interface NavItemDropdownMobileItemProps {
  title: string
  location: string
}

interface NavItemDropdownMobileProps {
  items: Array<NavItemDropdownMobileItemProps>
  right?: boolean
}

export const NavItemDropdownMobile = (props: NavItemDropdownMobileProps) => {
  return (
    <Dropdown right={props.right}>
      {props.items.map(
        (item: NavItemDropdownMobileItemProps, index: number) => {
          return (
            <NavItemDropdownItemMobile
              key={index}
              title={item.title}
              location={item.location}
            />
          )
        }
      )}
    </Dropdown>
  )
}

interface DropdownProps {
  right: boolean | undefined
}

const Dropdown = styled.div<DropdownProps>`
  width: 175px;
  overflow: hidden;
  background-color: var(--main-green);
`
