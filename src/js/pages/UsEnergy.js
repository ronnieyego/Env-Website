import React from "react";

import Header from '../components/Header.js';
import SideNav from '../components/SideNav.js';
import EnergySourceMap from '../components/EnergySourceMap.js';

export default class UsEnergy extends React.Component {
	
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
					<EnergySourceMap />
			</div>
		);
	}
}
