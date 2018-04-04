import React from "react";
import PropTypes from 'prop-types'

import Header from '../Header';
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
                    {page}
                </div>
                <br />
                <br />
                <br />
            </div>
		);
	}
}


