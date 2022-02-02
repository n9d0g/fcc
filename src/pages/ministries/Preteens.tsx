import React from 'react';
import { Link } from 'react-router-dom';

function Preteens() {
	return (
		<div className="preteens">
			<h1 className="header">preteen's ministry page</h1>
			<Link to='/ministries'>back</Link>
		</div>
	)
}

export default Preteens;