import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { AiOutlineInstagram, AiOutlineFacebook, AiOutlineYoutube } from 'react-icons/ai';

function Footer() {
	return (
		<footer className="footer">
			<div className="container">
				<div className="footer-column">
					<img className="footer-logo" src={require('../../assets/logo/logo_dark.png')} alt="Freedom in Christ Church Logo" />
				</div>
				<div className="footer-column">
					<Link className="footer-link footer-header" to="/about">about</Link>
					<Link className="footer-link" to="/about/beliefs"><span className="text-link">beliefs</span></Link>
					<Link className="footer-link" to="/about/values"><span className="text-link">values</span></Link>
					<Link className="footer-link" to="/about/leadership"><span className="text-link">leadership</span></Link>
				</div>
				<div className="footer-column">
					<Link className="footer-link footer-header" to="/sermons">sermons</Link>
					<Link className="footer-link" to="/sermons"><span className="text-link">latest sermon</span></Link>
					<Link className="footer-link" to="/sermons"><span className="text-link">sermon archive</span></Link>
				</div>
				<div className="footer-column">
					<Link className="footer-link footer-header" to="/ministries">ministries</Link>
					<Link className="footer-link" to="/ministries/men"><span className="text-link">men</span></Link>
					<Link className="footer-link" to="/ministries/women"><span className="text-link">women</span></Link>
					<Link className="footer-link" to="/ministries/preteens"><span className="text-link">pre-teens</span></Link>
					<Link className="footer-link" to="/ministries/youth"><span className="text-link">youth</span></Link>
					<Link className="footer-link" to="/ministries/ya"><span className="text-link">young adults</span></Link>
					<Link className="footer-link" to="/ministries/praise"><span className="text-link">praise</span></Link>
					<Link className="footer-link" to="/ministries/praise"><span className="text-link">prayer</span></Link>
				</div>
				<div className="footer-column">
					<Link className="footer-link footer-header" to="/smallgroups">small groups</Link>
					<Link className="footer-link" to="/ministries/youth"><span className="text-link">youth</span></Link>
					<Link className="footer-link" to="/ministries/ya"><span className="text-link">young adults</span></Link>
					<Link className="footer-link" to="/ministries/youth"><span className="text-link">50+</span></Link>
					<Link className="footer-link" to="/ministries/youth"><span className="text-link">mississauga</span></Link>
					<Link className="footer-link" to="/ministries/youth"><span className="text-link">brampton</span></Link>
					<Link className="footer-link" to="/ministries/youth"><span className="text-link">philippines</span></Link>
				</div>
				<div className="footer-column">
					<Link className="footer-link footer-header" to="/give">give</Link>
					<Link className="footer-link" to="/ministries/youth"><span className="text-link">e-transfer</span></Link>
					<Link className="footer-link" to="/ministries/youth"><span className="text-link">mailed cheques</span></Link>
				</div>
				<div className="footer-column socials">
					<a className="social-link" href="https://www.instagram.com/fcc.canada/" target="_blank" rel="noreferrer"><AiOutlineInstagram /></a>
					<a className="social-link" href="https://www.facebook.com/groups/1667915316820460" target="_blank" rel="noreferrer"><AiOutlineFacebook /></a>
					<a className="social-link" href="https://www.youtube.com/channel/UCaB7HWdt8W-ErHqgvhR__rw" target="_blank" rel="noreferrer"><AiOutlineYoutube /></a>
				</div>
			</div>
			<hr className="footer-hr" />
			<h3 className="copyright">&copy; Copyright by Freedom in Christ Church Canada. All Rights Reserved.</h3>
		</footer>
	)
}

export default Footer;