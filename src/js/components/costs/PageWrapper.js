import React from "react";
import PropTypes from 'prop-types'

import Header from '../Header';
import CostsFooter from './CostsFooter';
import pages from './pages-index';

export default class PageWrapper extends React.Component {

    static propTypes = {
        page: PropTypes.string.isRequired
    }

	render() {
        const page = pages[this.props.page];

		return (
            <div>
                <Header />
                <div className="costs-page">
                    <div className="costs">
                        {page}
                        <CostsFooter />
                    </div>
                </div>
            </div>
		);
	}
}


