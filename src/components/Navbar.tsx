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
import { useEffect, useState, useRef } from 'react'
import { NavItemMobile } from './NavItemMobile'
import { NavItemDropdownMobile } from './NavItemDropdownMobile'
import { useNavigate } from 'react-router-dom'
import { useOnClickOutside } from '../hooks/useOnClickOutside'

export const Navbar = () => {
  const [mobileClicked, setMobileClicked] = useState(false)
  const navigation = useNavigate()
  const ref = useRef<HTMLDivElement>(null!)

  useOnClickOutside(ref, () => setMobileClicked(false))

  useEffect(() => {
    if (mobileClicked) setMobileClicked(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation])

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
          {!mobileClicked && <Bars aria-label="navigation" />}
        </IconWrapper>
        {mobileClicked && (
          <Drawer ref={ref}>
            <IconWrapperMobile onClick={() => setMobileClicked(!mobileClicked)}>
              <Cancel />
            </IconWrapperMobile>
            <NavItemMobile location="/" text="home" home />
            <NavItemMobile location="/about" text="about" dropdown>
              <NavItemDropdownMobile items={aboutDropdownItems} />
            </NavItemMobile>
            <NavItemMobile location="/sermons" text="sermons" dropdown>
              <NavItemDropdownMobile items={sermonsDropdownItems} />
            </NavItemMobile>
            <NavItemMobile location="/ministries" text="ministries" dropdown>
              <NavItemDropdownMobile items={ministriesDropdownItems} />
            </NavItemMobile>
            <NavItemMobile location="/smallgroups" text="small groups" dropdown>
              <NavItemDropdownMobile items={smallGroupsDropdownItems} />
            </NavItemMobile>
            <NavItemMobile location="/give" text="give" dropdown>
              <NavItemDropdownMobile items={giveDropdownItems} right />
            </NavItemMobile>
          </Drawer>
        )}
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

const Container = styled.article`
  margin: 0;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: row;
  list-style-type: none;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 60em) {
    padding: 0.8rem 0.5rem;
  }
`

const NavLeft = styled.div`
  display: flex;
  justify-content: flex-start;
`

const NavRight = styled.div`
  margin: 1rem 0;
  padding: 0;
  list-style-type: none;
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

  &:hover,
  &:focus {
    background: var(--secondary-blue);
    border-radius: 0.2rem;
  }
`

const IconWrapperMobile = styled(IconWrapper)`
  justify-content: right;
  padding: 1rem;

  &:hover,
  &:focus {
    background: none;
    border-radius: none;
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

const Drawer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: left;
  position: fixed;
  inset: 0 0 0 40%;
  border: 1px solid var(--secondary-grey);
  background-color: var(--main-green);
  overflow-y: scroll;

  @media (min-width: 60em) {
    display: none;
  }
`
