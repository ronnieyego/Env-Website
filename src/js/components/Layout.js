import React from "react";

import Header from './Header.js';
import Footer from './Footer.js';
import Body from './Body.js';

export default class Layout extends React.Component {

	render() {
		console.log('layout : ', this.props);
		return (
			<div>
				<Header />
				<Body {...this.props} />
			</div>
		);
	}
}
