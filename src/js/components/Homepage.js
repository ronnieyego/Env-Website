import React from "react";

import Header from './Header.js';
import Footer from './Footer.js';
import HomepageBody from './HomepageBody.js';

export default class Homepage extends React.Component {

	render() {
		return (
			<div>
				<Header />
				<HomepageBody />
				<Footer />
			</div>
		);
	}
}