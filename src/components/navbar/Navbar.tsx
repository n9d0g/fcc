import '../../App.css'
import './Navbar.css'
import { Link } from 'react-router-dom'
import Zoom from '../zoom/Zoom'

function Navbar() {
  return (
    <nav className="navbar">
      <Zoom />
      <ol className="container">
        <div className="navbar-left">
          <Link className="navbar-link" to="/">
            <li className="navbar-option">freedom in christ church</li>
          </Link>
        </div>
        <div className="navbar-right">
          <Link className="navbar-link" to="/">
            <li className="navbar-option">home</li>
          </Link>
          <Link className="navbar-link" to="/about">
            <li className="navbar-option">about</li>
          </Link>
          <Link className="navbar-link" to="/sermons">
            <li className="navbar-option">sermons</li>
          </Link>
          <Link className="navbar-link" to="/ministries">
            <li className="navbar-option">ministries</li>
          </Link>
          <Link className="navbar-link" to="/smallgroups">
            <li className="navbar-option">small groups</li>
          </Link>
          <Link className="navbar-link" to="/give">
            <li className="navbar-option">give</li>
          </Link>
        </div>
      </ol>
    </nav>
  )
}

export default Navbar
