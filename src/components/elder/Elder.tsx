import React from 'react';
import './Elder.css';

export const Elder = (props: any) => {
	return (
		<section className="elders-container">
			{props.data.map((elder: any, index: any) => {
				return (
					<article className="elder">
						<div className="elder-picture" data-name={elder.picture}></div>
						<h2 className="elder-name">{elder.name}</h2>
						<h3 className="elder-title">{elder.title}</h3>
						<h3 className="elder-description">{elder.description}</h3>
					</article>
				)})}
		</section>
	)
}