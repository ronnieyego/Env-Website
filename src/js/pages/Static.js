import React from "react";
import { connect } from 'react-redux';
import { browserHistory, BrowserRouter as Router, Route} from 'react-router-dom';

import CO2e from './static/Co2e'
import Data from './static/Data';
import HowTheFormWorks from './static/How-the-form-works';
import FootprintResult from './static/FootprintResult';
import About from './static/About';
import HowMuchCO2 from './static/HowMuchCO2';
import CostsSearch from '../components/costs/search/Search';



export default class StateEnergyProfile extends React.Component {

	render() {
		return (
            <Router history={browserHistory} >
                <div>
                    <Route path="/footprint" component={FootprintResult} />
                    <Route exact={true} path="/CO2e" component={CO2e} />
                    <Route exact={true} path="/costs" component={CostsSearch} />
                    <Route exact={true} path="/data" component={Data} />
                    <Route exact={true} path="/how-much-co2" component={HowMuchCO2} />
                    <Route exact={true} path="/how-your-footprint-was-calculated" component={HowTheFormWorks} />
                    <Route exact={true} path="/about" component={About} />
                </div>
            </Router>
		);
	}
}
