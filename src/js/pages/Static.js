import React from "react";
import { connect } from 'react-redux';
import { browserHistory, BrowserRouter as Router, Route} from 'react-router-dom';

import Header from '../components/Header';
import CO2e from './static/Co2e'
import Data from './static/Data';
import HowTheFormWorks from './static/How-the-form-works';


export default class StateEnergyProfile extends React.Component {

	render() {
		return (
            <Router history={browserHistory} >
                <div>
                    <Route exact={true} path="/CO2e" component={CO2e} />
                    <Route exact={true} path="/data" component={Data} />
                    <Route exact={true} path="/how-your-footprint-was-calculated" component={HowTheFormWorks} />
                </div>
            </Router>
		);
	}
}
