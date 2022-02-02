import React from 'react';
import { Link } from 'react-router-dom';

function Beliefs() {
	return (
		<div className="beliefs">
			<h1 className="header">beliefs page</h1>
			<Link to="/about"><h2>back</h2></Link>
		</div>
	)
}

export default Beliefs;