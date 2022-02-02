import React from 'react';
import './SmallGroups.css';
import { Link } from 'react-router-dom';

function SmallGroups() {
	return (
		<div className="smallgroups">
			<h1 className="header">small group page</h1>
			<Link to="/"><h3>back</h3></Link>
		</div>
	)
}

export default SmallGroups;