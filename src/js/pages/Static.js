import React from "react";
import { string } from 'prop-types';

import staticPages from './static/pages-index';
import Header from '../components/header/HeaderHoc';

export default class Static extends React.Component {

    static propTypes = {
        page: string.isRequired
    }

	render() {
        const page = staticPages[this.props.page];
		return (
            <div className="container-fluid">
                <Header />
                {page}
            </div>
		);
	}
}
