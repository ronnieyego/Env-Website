import React from "react";
import { connect } from 'react-redux';
import { browserHistory, BrowserRouter as Router, Route} from 'react-router-dom';

import CupHoc from '../components/costs/CupHoc';

export default class Costs extends React.Component {

	render() {
		return (
            <Router history={browserHistory} >
                <div>
                    <Route exact={true} path="/costs/cup" component={CupHoc} />
                </div>
            </Router>
		);
	}
}
