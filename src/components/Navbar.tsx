import { Zoom } from './Zoom'
import { NavItem } from './NavItem'
import { NavItemDropdown } from './NavItemDropdown'
import { aboutDropdownItems } from '../data/aboutDropdownItems'
import { ministriesDropdownItems } from '../data/ministriesDropdownItems'
import { smallGroupsDropdownItems } from '../data/smallGroupsDropdownItems'
import { sermonsDropdownItems } from '../data/sermonsDropdownItems'
import { giveDropdownItems } from '../data/giveDropdownItems'
import { GoThreeBars } from 'react-icons/go'
import { IoMdClose } from 'react-icons/io'
import styled from 'styled-components'
import { useState } from 'react'

export const Navbar = () => {
  const [mobileClicked, setMobileClicked] = useState(false)

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
            <NavItemDropdown items={ministriesDropdownItems} />
          </NavItem>
          <NavItem location="/smallgroups" text="small groups" dropdown>
            <NavItemDropdown items={smallGroupsDropdownItems} />
          </NavItem>
          <NavItem location="/give" text="give" dropdown>
            <NavItemDropdown items={giveDropdownItems} right />
          </NavItem>
        </NavRight>

        {/* mobile */}
        <IconWrapper onClick={() => setMobileClicked(!mobileClicked)}>
          {mobileClicked ? <Cancel /> : <Bars />}
        </IconWrapper>
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
  align-items: center;
`

const NavLeft = styled.div`
  display: flex;
  justify-content: flex-start;
`

const NavRight = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 60em) {
    display: none;
  }
`

const IconWrapper = styled.button`
  display: none;
  background: none;
  border: none;
  color: inherit;
  padding: 0.3rem;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  transition: 0.3s;

  @media (max-width: 60em) {
    display: flex;
  }

  &:hover {
    background: var(--secondary-blue);
    border-radius: 0.2rem;
  }
`

const Bars = styled(GoThreeBars)`
  display: flex;
  color: var(--main-white);
  font-size: 2.5rem;
`

const Cancel = styled(IoMdClose)`
  display: flex;
  color: var(--main-white);
  font-size: 2.5rem;
`
