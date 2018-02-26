import React from "react";
import PropTypes from 'prop-types'

import Header from '../Header';
import CarHoc from './CarHoc';
import CupHoc from './CupHoc';

export default class PageWrapper extends React.Component {

    static propTypes = {
        page: PropTypes.string.isRequired
    }

	render() {
        let page;
        switch(this.props.page) {
            case 'cup':
                page = <CupHoc />;
                break;
            case 'car':
                page = <CarHoc />;
                break;
        }

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


