import React from 'react';
import { Link } from 'react-router-dom';

function About() {
	return (
		<div className="about">
			<h1 className="title">about page</h1>
			<Link to='/about/beliefs'><h2>beliefs</h2></Link>
			<Link to='/about/values'><h2>values</h2></Link>
			<Link to='/about/leadership'><h2>leadership</h2></Link>
			<Link to='/'><h3>back</h3></Link>
		</div>
	)
}

export default About;