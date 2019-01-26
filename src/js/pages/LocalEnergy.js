import React from "react";
import { connect } from 'react-redux';

import Header from '../components/header/HeaderHoc';
import LocalEnergyResults from '../components/local-energy/LocalEnergyResults';
import { sortAndFilterAndCreateQuestions } from '../utils/question-utils';
import ids from '../utils/ids/index';

@connect(store => {
	return {
		questions: store.questions.questions,
		searchDistance: store.localEnergy.searchDistance,
        energySources: store.localEnergy.energySources,
		zipDataError: store.localEnergy.zipDataError,
		userZipData: store.userInfo.userZipData
	};
})
export default class LocalEnergy extends React.Component {

	render() {
		const haveEnergySources = this.props.energySources && Object.keys(this.props.energySources).length > 0;
		const haveUserZip = !!this.props.userZipData;
		const showResults = haveEnergySources && haveUserZip;
        const questions = sortAndFilterAndCreateQuestions('local-energy', [ids.userZip], this.props.questions)
		return (
			<div>
				<Header />
				<div className="container-fluid text-center" >
					
					<div className="local-energy-explainer">
						<h1 className="local-energy-explainer-title">Where does my energy come from?</h1>
						<p className="local-energy-explainer-text">Most households emit over 1,000 pounds of CO<sub>2</sub> per month via their electricity usage.  Yet not all energy is created equally.  Natural gas emits about 1 pound of CO<sub>2</sub> per kwh while solar emits just 1/10th of that.</p>
						<p className="local-energy-explainer-text">Enter your zip code below to see where your energy comes from and compare against other places.</p>
					</div>
					{ questions }
					{ showResults && <LocalEnergyResults /> }
				</div>
				<br />
				<br />
				<br />
			</div>
		);
	}
}
