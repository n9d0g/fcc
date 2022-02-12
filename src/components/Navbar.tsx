import { Zoom } from './Zoom'
import { NavItem } from './NavItem'
import { NavItemDropdown } from './NavItemDropdown'
import { aboutDropdownItems } from '../data/aboutDropdownItems'
import { ministriesDropdownItems } from '../data/ministriesDropdownItems'
import { smallGroupsDropdownItems } from '../data/smallGroupsDropdownItems'
import { sermonsDropdownItems } from '../data/sermonsDropdownItems'
import { giveDropdownItems } from '../data/giveDropdownItems'
import styled from 'styled-components'

export const Navbar = () => {
  return (
    <Nav>
      <Zoom />
      <Container>
        <NavLeft>
          <NavItem location="/" text="freedom in christ church" />
        </NavLeft>
        <NavRight>
          <NavItem location="/" text="home" />
          <NavItem location="/about" text="about" dropdown>
            <NavItemDropdown items={aboutDropdownItems} />
          </NavItem>
          <NavItem location="/sermons" text="sermons" dropdown>
            <NavItemDropdown items={sermonsDropdownItems} />
          </NavItem>
          <NavItem location="/ministries" text="ministries" dropdown>
            <NavItemDropdown items={ministriesDropdownItems} right />
          </NavItem>
          <NavItem location="/smallgroups" text="small groups" dropdown>
            <NavItemDropdown items={smallGroupsDropdownItems} />
          </NavItem>
          <NavItem location="/give" text="give" dropdown>
            <NavItemDropdown items={giveDropdownItems} right />
          </NavItem>
        </NavRight>
      </Container>
    </Nav>
  )
}

const Nav = styled.nav`
  position: sticky;
  top: 0;
  background: var(--main-blue);
  z-index: 9999;
`

const Container = styled.ol`
  margin: 0;
  padding: 15px 30px;
  display: flex;
  flex-direction: row;
  list-style-type: none;
  justify-content: space-between;
`

const NavLeft = styled.div`
  display: flex;
  justify-content: flex-start;
`

const NavRight = styled.div`
  display: flex;
  flex-direction: row;
`
