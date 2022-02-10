import React from 'react'
import './NavItemDropdownItem.css'
import { Link } from 'react-router-dom';

export const NavItemDropdownItem = (props: any) => {
	return (
		<Link className="nav-item-dropdown-item" to={props.location}>
			{props.title}
		</Link>
	)
}