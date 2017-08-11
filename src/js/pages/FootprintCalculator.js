import React from "react";

import Header from '../components/Header.js';
import FootprintForm from '../components/FootprintForm.js';

export default class FootprintCalcPage extends React.Component {
	
	constructor(props) {
		super();
	}
	
	render() {
		return (
			<div className="container-fluid text-center">
					<Header />
					<div>
                        <h1>Footprint Finder</h1>
                        <div style={{textAlign: 'left'}}>
                            <p>There is a ton of advice on how to lower your ecological footprint, "drive less, turn off your lights, dont' eat meat".  Sure, they're all good ideas, but have drastically different impacts.  One flaw I've found in all of these suggestions is that they take a qualitative approach to a very quantitative problem.</p>
                            <p>The calculator below attempts to give you reasonably accurate insights on your ecological footprint.  The goal is to give you the ability to reduce your footprint in a way that fits with your life.</p>
                            <FootprintForm />
                        </div>
					</div>
					
					
			</div>
		);
	}
}
