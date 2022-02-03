import React from 'react';
import { Link } from 'react-router-dom';
import './Give.css';

function Give() {
	return (
		<div className="give">
			<h1 className="header">give page</h1>
			<Link to='/'><h2>back</h2></Link>
		</div>
	)
}

export default Give;