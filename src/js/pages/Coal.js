import React from "react";

import Header from '../components/Header.js';
import SideNav from '../components/SideNav.js';
import EnergySourceMap from '../components/energy-source-map/EnergySourceMap.js';

export default class Coal extends React.Component {
	
	constructor(props) {
		super();
	
		this.state = {      
		}

		if(typeof window !== 'undefined') {
	  		console.log('window state', window.__STATE__);
			//this.state.stateId = window.__STATE__.stateId;	  
		}
	}
	
	render() {

		return (
			<div className="container-fluid text-center" >
				  <div className="row content">

					<div className="col-sm-8 text-center">
						<h1 style={{textAlign: 'center', fontWeight: 'bold'}}>Coal</h1>
						<p>This is a page about coal yo.</p>
					</div>
					<EnergySourceMap />
					<div className="col-sm-2 sidenav">
						<div className="well">
						<p>ADS</p>
						</div>
						<div className="well">
						<p>ADS</p>
						</div>
					</div>
				  </div>
			</div>
		);
	}
}
