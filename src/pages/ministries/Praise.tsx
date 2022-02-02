import React from 'react';
import { Link } from 'react-router-dom';

function Praise() {
	return (
		<div className="praise">
			<h1 className="header">praise ministry page</h1>
			<Link to='/ministries'>back</Link>
		</div>
	)
}

export default Praise;