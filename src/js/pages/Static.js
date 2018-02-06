import React from "react";
import { connect } from 'react-redux';
import { browserHistory, BrowserRouter as Router, Route} from 'react-router-dom';

import CO2e from './static/Co2e'
import Data from './static/Data';
import HowTheFormWorks from './static/How-the-form-works';
import FootprintResult from './static/FootprintResult';
import About from './static/About';


export default class StateEnergyProfile extends React.Component {

	render() {
		return (
            <Router history={browserHistory} >
                <div>
                    <Route path="/footprint" component={FootprintResult} />
                    <Route exact={true} path="/CO2e" component={CO2e} />
                    <Route exact={true} path="/data" component={Data} />
                    <Route exact={true} path="/how-your-footprint-was-calculated" component={HowTheFormWorks} />
                    <Route exact={true} path="/about" component={About} />
                </div>
            </Router>
		);
	}
}
