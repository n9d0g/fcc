import React from 'react';
import { Link } from 'react-router-dom';

function Youth() {
	return (
		<div className="youth">
			<h1 className="header">youth's ministry page</h1>
			<Link to='/ministries'>back</Link>
		</div>
	)
}

export default Youth;