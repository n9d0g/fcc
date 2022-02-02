import React from 'react';
import { Link } from 'react-router-dom';

function Values() {
	return (
		<div className="values">
			<h1 className="header">values page</h1>
			<Link to='/about'><h2>back</h2></Link>
		</div>
	)
}

export default Values;