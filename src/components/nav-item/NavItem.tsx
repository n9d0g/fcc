import { useState } from 'react'
import { RiArrowDropUpLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import './NavItem.css'

interface NavItemProps {
	location: any,
	text: any,
	children?: JSX.Element | JSX.Element[],
	dropdown?: boolean
}

export const NavItem = (props: NavItemProps) => {
	const [open, setOpen] = useState(false)

	return (
		<Link to={props.location} className="nav-item" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
			<li className="nav-item-text">{props.text}
				{props.dropdown && (<span className="nav-item-text-icon"><RiArrowDropUpLine /></span>)}</li>
			{open && props.children}
		</Link>
	)
}