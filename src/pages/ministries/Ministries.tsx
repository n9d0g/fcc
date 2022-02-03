import React from 'react';
import './Ministries.css';
import { Link } from 'react-router-dom';

function Ministries() {
	return(
		<div className="ministries">
			<h1 className="header">ministries page</h1>
			<Link to='/ministries/men'><h2>men</h2></Link>
			<Link to='/ministries/women'><h2>women</h2></Link>
			<Link to='/ministries/preteens'><h2>preteens</h2></Link>
			<Link to='/ministries/youth'><h2>youth</h2></Link>
			<Link to='/ministries/YA'><h2>YA</h2></Link>
			<Link to='/ministries/praise'><h2>praise</h2></Link>
			<Link to='/'><h3>back</h3></Link>
		</div>
	)
}

export default Ministries;