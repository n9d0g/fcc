import React from 'react';
import { Link } from 'react-router-dom';
import './About.css'
import LandingPageSection from '../../components/landing-page-section/LandingPageSection';

function About() {
	return (
		<div className="about">
			<section className="about-banner">
				<h1 className="about-banner-title">about FCC</h1>
			</section>
			<LandingPageSection title="what we believe" btnText="doctrinal statement" btnLocation="/about/beliefs" />
			<LandingPageSection title="mission & values" btnText="mission & values" btnLocation="/about/values" flip={true}/>
			<LandingPageSection title="our team" btnText="leadership" btnLocation="/about/leadership" />
		</div>
	)
}

export default About;