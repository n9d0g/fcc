import React from 'react';
import { Link } from 'react-router-dom';
import './Sermons.css';

function Sermons() {
	return (
		<section className="sermons">
			<h1 className="title">sermons page</h1>
			<Link to='/'><h2>back</h2></Link>
		</section>
	)
}

export default Sermons;