import React from "react";
import { connect } from 'react-redux';
import { browserHistory, BrowserRouter as Router, Route} from 'react-router-dom';

import PageWrapper from '../components/costs/PageWrapper';

const cup = () => <PageWrapper page='cup' />;
const car = () => <PageWrapper page='car' />;

export default class Costs extends React.Component {

	render() {
		return (
            <Router history={browserHistory} >
                <div>
                    <Route exact={true} path="/costs/cup" component={cup} />
                    <Route exact={true} path="/costs/car" component={car} />
                </div>
            </Router>
		);
	}
}
