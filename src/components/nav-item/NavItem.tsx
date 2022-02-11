import { useState } from 'react'
import { Link } from 'react-router-dom'
import './NavItem.css'

interface NavItemProps {
	location: any,
	text: any,
	children?: JSX.Element | JSX.Element[]
}

export const NavItem = (props: NavItemProps) => {
	const [open, setOpen] = useState(false)

	return (
		<Link to={props.location} className="nav-item" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
			<li className="nav-item-text">{props.text}</li>
			{open && props.children}
		</Link>
	)
}