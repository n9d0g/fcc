import React from 'react';
import { Button } from '../button/Button';
import './LandingPageSection.css';

interface LandingPageSectionProps {
	picture?: any,
	title: any,
	description?: any,
	btnText: any,
	btnLocation: any
	flip?: boolean 
}

export const LandingPageSection = (props: LandingPageSectionProps) => {
	let className = 'landing-page-section';
	if (props.flip) className += " flipped";

	return (
		<section className={className}>
			<div className="landing-page-section-picture"></div>
			<div className="landing-page-section-container">
				<h2 className="landing-page-section-title">{props.title}</h2>
				<p className="landing-page-section-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
				<Button location={props.btnLocation} text={props.btnText} />
			</div>
		</section>
	)
}