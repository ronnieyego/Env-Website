import React from "react";

export default class Header extends React.Component {

	render() {
		return (
			<nav className="navbar navbar-inverse">
			  <div className="container-fluid">
			    <div className="navbar-header">
						{/* This is the burger */}
			      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			      </button>

			      <img className="navbar-brand" src="/public/footprint.png"/>
			    </div>
			    <div className="collapse navbar-collapse" id="myNavbar">
			      <ul className="nav navbar-nav">
			        <li><a href="/">Footprint</a></li>
			        <li><a href="/energy">Energy</a></li>
			        <li><a href="/solar">Solar</a></li>
							<li><a href="/how-your-footprint-was-calculated">Form Calculations</a></li>
							<li><a href="/data">Data</a></li>
							<li><a href="/co2e">CO<sub>2</sub>e</a></li>
			      </ul>
			      <ul className="nav navbar-nav navbar-right">
			      </ul>
			    </div>
			  </div>
			</nav>
		);
	}
}


