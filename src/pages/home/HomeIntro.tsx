import './Home.css';
import { Button } from '../../components/button/Button';

export const HomeIntro = () => {
	return (
		<section className="home-intro">
			<h1 className="home-intro-header">Welcome to Freedom in Christ Church.</h1>
			<div className="home-intro-button-container">
				<Button location='/about' text="I'm new" documentTitle="About"/>
				<Button location='/sermons' text="Sermons" documentTitle="Sermons" />
			</div>
		</section>
	)
}