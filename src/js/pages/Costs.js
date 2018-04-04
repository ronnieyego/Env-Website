import React from "react";
import { connect } from 'react-redux';
import { browserHistory, BrowserRouter as Router, Route} from 'react-router-dom';

import pages from '../components/costs/pages-index';
import PageWrapper from '../components/costs/PageWrapper';

export default class Costs extends React.Component {

	render() {
        const pageNames = Object.keys(pages);
        const routes = pageNames.map(pageName => {
            const path = `/costs/${pageName}`;
            const component = () => <PageWrapper page={pageName} />;
            return <Route exact={true} path={path} component={component} />
        });
		return (
            <Router history={browserHistory} >
                <div>
                    {routes}
                </div>
            </Router>
		);
	}
}
