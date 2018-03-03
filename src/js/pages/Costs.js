import React from "react";
import { connect } from 'react-redux';
import { browserHistory, BrowserRouter as Router, Route} from 'react-router-dom';

import PageWrapper from '../components/costs/PageWrapper';

const car = () => <PageWrapper page='car' />;
const clothes = () => <PageWrapper page='clothes' />;
const cup = () => <PageWrapper page='cup' />;

export default class Costs extends React.Component {

	render() {
		return (
            <Router history={browserHistory} >
                <div>
                    <Route exact={true} path="/costs/car" component={car} />
                    <Route exact={true} path="/costs/cup" component={cup} />
                    <Route exact={true} path="/costs/clothes" component={clothes} />
                </div>
            </Router>
		);
	}
}
