import React from 'react';
import { Link } from 'react-router-dom';

function Men() {
	return (
		<div className="men">
			<h1 className="header">men's ministry page</h1>
			<Link to='/ministries'>back</Link>
		</div>
	)
}

export default Men;