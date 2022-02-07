import React from 'react';
import './Home.css';
import SermonNonActive from '../../components/sermon-non-active/SermonNonActive';
import SermonActive from '../../components/sermon-active/SermonActive';

function HomeSermons() {
	return (
		<section className="sermons">
			<h2 className="home-sermons-header">recent sermons</h2>
			<hr className="home-sermons-hr"/>
			<article className="home-sermons-container">
				<SermonActive />
				<div className="home-sermons-non-active-container">
					<SermonNonActive />
					<SermonNonActive />
					<SermonNonActive />
				</div>
			</article>
		</section>
	)
}

export default HomeSermons;