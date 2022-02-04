import React from 'react';
import { Link } from 'react-router-dom';
import './About.css'
import Button from '../../components/button/Button';

function About() {
	return (
		<div className="about">
			<section className="about-banner">
				<h1 className="about-banner-title">about FCC</h1>
			</section>
			<section className="about-beliefs">
				<div className="about-beliefs-picture"></div>
				<div className="about-beliefs-container">
					<h2 className="about-beliefs-title">what we believe</h2>
					<p className="about-beliefs-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
					<Button location="/about/beliefs" text="doctrinal statement" />
				</div>
			</section>
			<section className="about-beliefs">
				<div className="about-beliefs-container">
					<h2 className="about-beliefs-title">mission & values</h2>
					<p className="about-beliefs-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
					<Button location="/about/values" text="mission & values" />
				</div>
				<div className="about-beliefs-picture"></div>
			</section>
			<section className="about-beliefs">
				<div className="about-beliefs-picture"></div>
				<div className="about-beliefs-container">
					<h2 className="about-beliefs-title">our team</h2>
					<p className="about-beliefs-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
					<Button location="/about/leadership" text="leadership team" />
				</div>
			</section>
		</div>
	)
}

export default About;