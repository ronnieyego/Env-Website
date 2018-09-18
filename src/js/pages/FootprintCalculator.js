import React from 'react';

import Header from '../components/header/HeaderHoc';
import FootprintForm from '../components/footprint-form/forms/FormContainer';

export default class FootprintCalcPage extends React.Component {
	render() {
		return (
			<div className="container-fluid text-center">
				<Header />
				<div className="footprint">
					<h1 id="footprint-finder-page-title"><b>What's my footprint?</b></h1>
					<div style={{textAlign: 'left'}}>
						<FootprintForm />
					</div>
				</div>
			</div>
		);
	}
}
