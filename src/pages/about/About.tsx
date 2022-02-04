import React from 'react';
import { Link } from 'react-router-dom';
import './About.css'

function About() {
	return (
		<div className="about">
			<section className="about-banner">
				<h1 className="about-banner-title">about page</h1>
			</section>
			<Link to='/about/beliefs'><h2>beliefs</h2></Link>
			<Link to='/about/values'><h2>values</h2></Link>
			<Link to='/about/leadership'><h2>leadership</h2></Link>
			<Link to='/'><h3>back</h3></Link>
		</div>
	)
}

export default About;