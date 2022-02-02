import React from 'react';
import { Link } from 'react-router-dom';

function Women() {
	return (
		<div className="women">
			<h1 className="header">women's ministry page</h1>
			<Link to='/ministries'>back</Link>
		</div>
	)
}

export default Women;