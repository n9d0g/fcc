import React from 'react';
import '../../App.css';
import './Navbar.css'
import { Link } from 'react-router-dom';

function Navbar() {
	return (
		<nav className="navbar">
			<ol className="container">
				<div className="navbar-left">
					<Link to='/'><li className="navbar-option">logo</li></Link>
				</div>
				<div className="navbar-right">
					<Link to="/"><li className="navbar-option">home</li></Link>
					<Link to="/about"><li className="navbar-option">about</li></Link>
					<Link to="/sermons"><li className="navbar-option">sermons</li></Link>
				</div>
			</ol>
		</nav>
	)
}

export default Navbar;