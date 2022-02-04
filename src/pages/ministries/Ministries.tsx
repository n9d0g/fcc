import React from 'react';
import './Ministries.css';
import { Link } from 'react-router-dom';
import LandingPageSection from '../../components/landing-page-section/LandingPageSection';

function Ministries() {
	return(
		<section className="ministries">
			<section className="ministries-banner">
				<h1 className="ministries-banner-title">our ministries</h1>
			</section>
			<LandingPageSection title="MEN-istry" btnText="men's ministry" btnLocation="/ministries/men" flip={true}/>
			<LandingPageSection title="WOMEN-instry" btnText="women's ministry" btnLocation="/ministries/women" />
			<LandingPageSection title="preteens" btnText="preteens" btnLocation="/ministries/preteens" flip={true} />
			<LandingPageSection title="youth" btnText="youth" btnLocation="/ministries/youth" />
			<LandingPageSection title="college and career" btnText="young adults" btnLocation="/ministries/YA" flip={true} />
			<LandingPageSection title="praise & worship" btnText="praise" btnLocation="/ministries/praise" />
		</section>
	)
}

export default Ministries;