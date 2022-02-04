import React from 'react';
import './SmallGroups.css';
import { Link } from 'react-router-dom';
import LandingPageSection from '../../components/landing-page-section/LandingPageSection';

function SmallGroups() {
	return (
		<section className="smallgroups">
			<section className="smallgroups-banner">
				<h1 className="smallgroups-banner-title">our small groups</h1>
			</section>
			<LandingPageSection title="youth (13-18)" btnText="youth" btnLocation="/smallgroups/men" />
			<LandingPageSection title="young adults" btnText="young adults" btnLocation="/smallgroups/women" flip={true} />
			<LandingPageSection title="50+" btnText="lolo at lola" btnLocation="/smallgroups/preteens" />
			<LandingPageSection title="mississauga" btnText="mississauga" btnLocation="/smallgroups/youth" flip={true}/>
			<LandingPageSection title="brampton" btnText="velcome" btnLocation="/smallgroups/YA" />
			<LandingPageSection title="philippines" btnText="mabuhay" btnLocation="/smallgroups/praise" flip={true} />
		</section>
	)
}

export default SmallGroups;