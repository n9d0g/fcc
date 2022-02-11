import '../../App.css'
import './Navbar.css'
import { Zoom } from '../zoom/Zoom'
import { NavItem } from '../nav-item/NavItem'
import { NavItemDropdown } from '../nav-item-dropdown/NavItemDropdown'
import { aboutDropdownItems } from '../../data/aboutDropdownItems'
import { ministriesDropdownItems } from '../../data/ministriesDropdownItems'
import { smallGroupsDropdownItems } from '../../data/smallGroupsDropdownItems'
import { giveDropdownItems } from '../../data/giveDropdownItems'


export const Navbar = () => {
  return (
    <nav className="navbar">
      <Zoom />
      <ol className="container">
        <div className="navbar-left">
          <NavItem location="/" text="freedom in christ church" />
        </div>
        <div className="navbar-right">
          <NavItem location="/" text="home" />
          <NavItem location="/about" text="about" dropdown={true}>
            <NavItemDropdown items={aboutDropdownItems} />
          </NavItem>
          <NavItem location="/sermons" text="sermons" />
          <NavItem location="/ministries" text="ministries" dropdown={true}>
            <NavItemDropdown items={ministriesDropdownItems} right />
          </NavItem>
          <NavItem location="/smallgroups" text="small groups" dropdown={true}>
            <NavItemDropdown items={smallGroupsDropdownItems} />
          </NavItem>
          <NavItem location="/give" text="give">
            <NavItemDropdown items={giveDropdownItems} right />
          </NavItem>
        </div>
      </ol>
    </nav>
  )
}