import React from 'react';

function SermonActive() {
	return (
		<div className="sermons-active">
			<div className="sermons-active-container">
				<iframe width="640" 
								height="360" 
								src="https://www.youtube.com/embed/WxpvgA9jv1g" 
								title="YouTube video player" 
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
				</iframe>
			</div>
		</div>
	)
}

export default SermonActive;