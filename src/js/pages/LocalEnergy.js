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
		userZipData: store.userInfo.userZipData
	};
})
export default class LocalEnergy extends React.Component {

	render() {
		const showResults = this.props.zipData && Object.keys(this.props.zipData).length > 0;
        const questions = sortAndFilterAndCreateQuestions('local-energy', [ids.userZip], this.props.questions)
		return (
			<div className="container-fluid text-center" >
				<Header />
				<div className="local-energy-explainer">
					<h1 className="local-energy-explainer-title">Where does my energy come from?</h1>
					<p className="local-energy-explainer-text">Most households emit over 1,000 pounds of CO<sub>2</sub> per month via their electricity usage.  Yet not all energy is created equally.  Natural gas emits about 1 pound of CO<sub>2</sub> per kwh while solar emits just 1/10th of that.</p>
					<p className="local-energy-explainer-text">Enter your zip code below to see where your energy comes from and compare against other places.</p>
				</div>
                { questions }
                { showResults && <LocalEnergyResults energySources={this.props.zipData} userZipData={this.props.userZipData} /> }
			</div>
		);
	}
}
