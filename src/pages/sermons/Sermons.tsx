import React from 'react';
import { Link } from 'react-router-dom';
import './Sermons.css';

function Sermons() {
	return (
		<div className="sermons">
			<h1 className="title">sermons page</h1>
			<Link to='/'><h2>back</h2></Link>
		</div>
	)
}

export default Sermons;