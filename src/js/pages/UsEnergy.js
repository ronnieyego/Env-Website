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
		const headerStyles = {
			
			marginLeft: '75px',
			marginRight: '75px',
			marginTop: '25px'
		};
		return (
			<div className="container-fluid text-center">
					<Header />
					<div style={headerStyles}>
						<h1><b>United States Energy Production</b></h1>
						<p style={{textAlign: 'left'}}>The United States produced ~23,500 TWHs of energy in 2016 (80 Quadrillio BTUs) across both private and public sectors.  This makes the US the 2nd largest energy producer in th world (after China).  Being a large and diverse country, the US has a multitude of energy sources.  Historically, the US relied heavily on coal as its primary source of energy.  This changed in the 1800's as rich oil fields were discovered and the US became the world's primary producer of oil.  Going into the 1900's the US started to heavily invest in hydroelectric and then nuclear power.  Three large changes shape the landscape in the early 21st century.  First is the decline of nuclear due to high regulation costs and perceived danger.  Second is the rise of renewables, notably solar.  Third is the rise of natural gas due to fracking.</p>
						
						<EnergySourceMap style={{marginLeft: '300px'}} />
					</div>
					
			</div>
		);
	}
}
