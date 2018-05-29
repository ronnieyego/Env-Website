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

   
    roundResults(results) {
        Object.keys(results).forEach(key => {
            if (typeof results[key] === 'number') {
                results[key] = Math.round(results[key] * 10)/10;
            }
        });
        return results;
    }

    getGraphData(results) {
        const totalAir = results.planeCo2 || 0;
        const totalRail = (results.overseasRailCo2 || 0) + (results.usRailCo2 || 0);
        const totalTruck = results.usTruckCo2 || 0;
        const totalShip = results.overseasShipCo2 || 0;

        return [
            {name: 'Air', Method: totalAir},
            {name: 'Rail', Method: totalRail},
            {name: 'Truck', Method: totalTruck},
            {name: 'Ship', Method: totalShip}
        ];
    }

    getCo2(questions) {
        const packageWeight = getAnswerFromId(questions, ids.packageWeight);
        const packageMade = getAnswerFromId(questions, ids.packageMade);
        const packageShipping = getAnswerFromId(questions, ids.packageShipping);
        const destination = statesLatLong[this.props.userState];

        let rush = ['Overnight', '2 Day'].indexOf(packageShipping) === -1 ? false : true;
        if( packageShipping === 'Within a week' && ( packageMade === 'China' || packageMade === 'Europe')) {
            rush = true;
        }

        // just so I have something
        let results = { message: 'Whoops its a miss' };
        if(packageMade === 'China') {
            results = getFromOverseas('China', destination, rush, packageWeight);
        } else if (packageMade === 'Europe') {
            results = getFromOverseas('Europe', destination, rush, packageWeight);
        } else if (packageMade === 'Across America') {
            results = getFromAcrossAmerica(destination, rush, packageWeight)
        } else if (packageMade === 'Semi-local (~1000 miles)') {
            results = getXDistance(1000, destination, rush, packageWeight)
        } else if (packageMade === 'Local (~200 miles)') {
            results = getXDistance(200, destination, rush, packageWeight)
        } else if (packageMade === 'Unknown. Probably in America') {
            results = getXDistance(2000, destination, rush, packageWeight)
        } else if (packageMade === 'No idea') {
            results = getFromOverseas('China', destination, rush, packageWeight);
            results.noIdea = true;
        }
        results.rush = rush;
        const totalCo2 = results.totalCo2;
        const graphData = this.getGraphData(results);
        const roundedResults = this.roundResults(results);
        const showResults = totalCo2 === 2.637 ? false : true;  //Hack thats the default load total CO2

        return { graphData, totalCo2, roundedResults, showResults };
    }

	render() {
        const questions = this.props.questions.filter(question => { 
            const forms = question['forms'];
            const index = forms.indexOf('package');
            return index !== -1 && !question.hidden; 
        });
        
        const { graphData, totalCo2, roundedResults, showResults} = this.getCo2(questions);
        console.log('hoc results', roundedResults);

		return (
            <Package
                dispatch={this.props.dispatch}    
                questions={questions}
                userState={this.props.userState}
                totalCo2={totalCo2}
                results={roundedResults}
                graphData={graphData}
                showResults={showResults}
             />
		);
	}
}


