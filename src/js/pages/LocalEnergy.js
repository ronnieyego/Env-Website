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
        console.log('zipData prop', this.props.zipData);
        const questions = sortAndFilterAndCreateQuestions('local-energy', [ids.userZip], this.props.questions)
		return (
			<div className="container-fluid text-center" >
				<Header />
				<div>Hello World</div>
                { questions }
                { this.props.zipData && <LocalEnergyResults energySources={this.props.zipData} /> }
			</div>
		);
	}
}
