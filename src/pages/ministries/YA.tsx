import React from 'react';
import { Link } from 'react-router-dom';

function YA() {
	return (
		<div className="ya">
			<h1 className="header">YA ministry page</h1>
			<Link to='/ministries'>back</Link>
		</div>
	)
}

export default YA;