import React from 'react';

import Header from '../components/header/HeaderHoc';
import FootprintResults from '../components/v2-results/Results';

export default class FootprintCalcPage extends React.Component {
	render() {
		return (
			<div className="container-fluid text-center">
				<Header />
				<FootprintResults />
			</div>
		);
	}
}
