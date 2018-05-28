import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ids from '../../../utils/ids/index';
import { 
    getFromOverseas,
    getFromAcrossAmerica,
    getXDistance,
    getFromStatesToDestination
} from './package-data';
import Package from './Package';

import { statesLatLong } from '../../../utils/utils-data/lat-longs';
import { getAnswerFromId, getQuestionFromId } from '../../../utils/footprint/get-question-utils';

@connect((store, props) => {
	return {
        questions: store.costsForms.questions,
        userState: store.userInfo.userState
    };
})
export default class PackageHoc extends React.Component {

   
    getCo2(questions) {
        const packageWeight = getAnswerFromId(questions, ids.packageWeight);
        const packageMade = getAnswerFromId(questions, ids.packageMade);
        const packageShipping = getAnswerFromId(questions, ids.packageShipping);
        const destination = statesLatLong[this.props.userState];

        const rush = ['Overnight', '2 Day'].indexOf(packageShipping) === -1 ? false : true;

        // just so I have something
        let results = { message: 'Whoops its a miss' };
        if(packageMade === 'China') {
            results = getFromOverseas('china', destination, rush, packageWeight);
        } else if (packageMade === 'Europe') {
            results = getFromOverseas('europe', destination, rush, packageWeight);
        } else if (packageMade === 'Across America') {
            results = getFromAcrossAmerica(destination, rush, packageWeight)
        } else if (packageMade === 'Semi-local (~1000 miles)') {
            results = getXDistance(1000, destination, rush, packageWeight)
        } else if (packageMade === 'Local (~200 miles)') {
            results = getXDistance(200, destination, rush, packageWeight)
        } else if (packageMade === 'Unknown. Probably in America') {
            results = getXDistance(2000, destination, rush, packageWeight)
        } else if (packageMade === 'No idea') {
            console.log('No idea?  Lets assume china!');
            results = getFromOverseas('china', destination, rush, packageWeight);
        }
        
        return results;
    }

	render() {
        const questions = this.props.questions.filter(question => { 
            const forms = question['forms'];
            const index = forms.indexOf('package');
            return index !== -1 && !question.hidden; 
        });
        
        const results = this.getCo2(questions);
        console.log('hoc results', results);

		return (
            <Package
                dispatch={this.props.dispatch}    
                questions={questions}
                totalCo2={500}
             />
		);
	}
}


