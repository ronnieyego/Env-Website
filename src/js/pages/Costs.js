import React from "react";
import PropTypes from 'prop-types';
import costsPages from '../components/costs/pages-index';
import Header from '../components/Header';
import CostsFooter from '../components/costs/CostsFooter';

export default class Costs extends React.Component {

    static propTypes = {
        page: PropTypes.string.isRequired
    }

	render() {
        const page = costsPages[this.props.page];
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
