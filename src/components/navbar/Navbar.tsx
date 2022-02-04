import '../../App.css';
import './Navbar.css'
import { Link } from 'react-router-dom';
import Zoom from '../zoom/Zoom'
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

function Navbar() {
	const [documentTitle, setDocumentTitle] = useDocumentTitle("Home");

	return (
		<nav className="navbar">
			<Zoom />
			<ol className="container">
				<div className="navbar-left">
					<Link className="navbar-link" to='/' onClick={() => setDocumentTitle("Home")}><li className="navbar-option">freedom in christ church</li></Link>
				</div>
				<div className="navbar-right">
					<Link className="navbar-link" to="/" onClick={() => setDocumentTitle("Home")}><li className="navbar-option">home</li></Link>
					<Link className="navbar-link" to="/about" onClick={() => setDocumentTitle("About")}><li className="navbar-option">about</li></Link>
					<Link className="navbar-link" to="/sermons" onClick={() => setDocumentTitle("Sermons")}><li className="navbar-option">sermons</li></Link>
					<Link className="navbar-link" to="/ministries" onClick={() => setDocumentTitle("Ministries")}><li className="navbar-option">ministries</li></Link>
					<Link className="navbar-link" to="/smallgroups" onClick={() => setDocumentTitle("Small Groups")}><li className="navbar-option">small groups</li></Link>
					<Link className="navbar-link" to="/give" onClick={() => setDocumentTitle("Give")}><li className="navbar-option">give</li></Link>
				</div>
			</ol>
		</nav>
	)
}

export default Navbar;