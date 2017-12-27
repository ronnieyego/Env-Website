import React from "react";
import { connect } from 'react-redux';

import Header from '../components/Header';
import StateEnergyHoc from '../components/state-energy/StateEnergyHoc'
import StateEnergyFooter from '../components/StateEnergyFooter';


export default class StateEnergyProfile extends React.Component {

	render() {
		return (
			<div className="container-fluid text-center" >
				<Header />
				<StateEnergyHoc/>
				<StateEnergyFooter />
			</div>
		);
	}
}
