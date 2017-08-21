import React from "react";

export default class Header extends React.Component {

	render() {
		return (
			<nav className="navbar navbar-inverse">
			  <div className="container-fluid">
			    <div className="navbar-header">
			      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			      </button>
			      <img className="navbar-brand" src="/public/footprint.png"/>
			    </div>
			    <div className="collapse navbar-collapse" id="myNavbar">
			      <ul className="nav navbar-nav">
			        <li className="active"><a href="/">Home</a></li>
			        <li><a href="/energy">Energy</a></li>
			        <li><a href="/solar">Solar</a></li>
			      </ul>
			      <ul className="nav navbar-nav navbar-right">
			        <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
			      </ul>
			    </div>
			  </div>
			</nav>
		);
	}
}


