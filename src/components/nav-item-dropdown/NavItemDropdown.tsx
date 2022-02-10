import React from 'react'
import { NavItemDropdownItem } from '../nav-item-dropdown-item/NavItemDropdownItem'
import './NavItemDropdown.css'

export const NavItemDropdown = (props: any) => {
	return (
		<div className={`nav-item-dropdown ${props.right && "nav-item-dropdown-right"}`}>
			{props.items.map((item: any, index: any) => {
				return <NavItemDropdownItem key={index} title={item.title} location={item.location} />
			})}
		</div>
	)
}