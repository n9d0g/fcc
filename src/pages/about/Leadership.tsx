import React from 'react';
import { Link } from 'react-router-dom';

function Leadership() {
	return (
		<div className="leadership">
			<h1 className="header">leadership page</h1>
			<Link to='/about'><h2>back</h2></Link>
		</div>
	)
}

export default Leadership;