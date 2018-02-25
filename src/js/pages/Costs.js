import React from "react";
import { connect } from 'react-redux';
import { browserHistory, BrowserRouter as Router, Route} from 'react-router-dom';

import PageWrapperComponent from '../components/costs/PageWrapper';

const PageWrapper = () => <PageWrapperComponent page='cup' />;

export default class Costs extends React.Component {

	render() {
		return (
            <Router history={browserHistory} >
                <div>
                    <Route exact={true} path="/costs/cup" component={PageWrapper} />
                </div>
            </Router>
		);
	}
}
