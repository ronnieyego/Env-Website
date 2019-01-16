import React from "react";
import { connect } from 'react-redux';

import Header from '../components/header/HeaderHoc';
import LocalEnergyResults from '../components/local-energy/LocalEnergyResults';
import { sortAndFilterAndCreateQuestions } from '../utils/question-utils';
import ids from '../utils/ids/index';

@connect(store => {
	return {
        questions: store.questions.questions,
        zipData: store.localEnergy.zipData,
        zipDataError: store.localEnergy.zipDataError,
	};
})
export default class LocalEnergy extends React.Component {

	render() {
		const showResults = this.props.zipData && Object.keys(this.props.zipData).length > 0;
        console.log('zipData prop', this.props.zipData);
        const questions = sortAndFilterAndCreateQuestions('local-energy', [ids.userZip], this.props.questions)
		return (
			<div className="container-fluid text-center" >
				<Header />
				<div className="local-energy-explainer">
					<h1 className="local-energy-explainer-title">Where does my energy come from?</h1>
					<p className="local-energy-explainer-text">Not all energy sources Most households emit over 1,000 pounds of CO<sub>2</sub> per month via their electricity usage.</p>
				</div>
                { questions }
                { showResults && <LocalEnergyResults energySources={this.props.zipData} /> }
			</div>
		);
	}
}
