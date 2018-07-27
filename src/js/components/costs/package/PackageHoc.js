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
        questions: store.questions.questions,
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
        const questionsToFilter = [];
        const orderOrMail = getAnswerFromId(questions, ids.orderOrMail);
        const mailToState = getAnswerFromId(questions, ids.mailToState);
        const packageWeight = getAnswerFromId(questions, ids.packageWeight);
        const packageMade = getAnswerFromId(questions, ids.packageMade);
        const americanLocation = getAnswerFromId(questions, ids.americanLocations);
        const packageShipping = getAnswerFromId(questions, ids.packageShipping);
        const destination = statesLatLong[this.props.userState];

        if (orderOrMail === 'Mailing') {
            questionsToFilter.push(ids.packageMade);
        } else if(orderOrMail === 'Ordering') {
            questionsToFilter.push(ids.mailToState);
            if(packageMade !== 'America') {
                questionsToFilter.push(ids.americanLocations); 
            }
        }

        let rush = ['Overnight', '2 Day'].indexOf(packageShipping) === -1 ? false : true;
        if( packageShipping === 'Within a week' && ( packageMade === 'China' || packageMade === 'Europe')) {
            rush = true;
        }

        // just so I have something
        let results = { message: 'Whoops its a miss' };
        
        if (orderOrMail === 'Ordering') {
            if(packageMade === 'America') {
                if (americanLocation === 'Across America') {
                    results = getFromAcrossAmerica(destination, rush, packageWeight);
                    const antiRushRes = getFromAcrossAmerica(destination, !rush, packageWeight);
                    results.reverseRush = antiRushRes.totalCo2;
                } else if (americanLocation === 'Semi-local (~1000 miles)') {
                    results = getXDistance(1000, destination, rush, packageWeight);
                    const antiRushRes = getXDistance(1000, destination, !rush, packageWeight);
                    results.reverseRush = antiRushRes.totalCo2;
                } else if (americanLocation === 'Local (~200 miles)') {
                    results = getXDistance(200, destination, rush, packageWeight);
                    const antiRushRes = getXDistance(200, destination, !rush, packageWeight);
                    results.reverseRush = antiRushRes.totalCo2;
                } else if (americanLocation === 'No idea') {
                    results = getXDistance(1500, destination, rush, packageWeight);
                    const antiRushRes = getXDistance(1500, destination, !rush, packageWeight);
                    results.reverseRush = antiRushRes.totalCo2;
                    results.noIdea = true;
                } else {
                    const start = statesLatLong[mailToState];
                    results = getFromStatesToDestination(destination, start, rush, packageWeight);
                    const antiRushRes = getFromStatesToDestination(destination, start, !rush, packageWeight);
                    results.reverseRush = antiRushRes.totalCo2;
                    results.knowWhereMadeInAmerica = americanLocation;
                }
                results.madeInAmerica = true;
            }
            if(packageMade === 'China') {
                results = getFromOverseas('China', destination, rush, packageWeight);
                const antiRushRes = getFromOverseas('China', destination, !rush, packageWeight);
                results.reverseRush = antiRushRes.totalCo2;
            } else if (packageMade === 'Europe') {
                results = getFromOverseas('Europe', destination, rush, packageWeight);
                const antiRushRes = getFromOverseas('Europe', destination, !rush, packageWeight);
                results.reverseRush = antiRushRes.totalCo2;
            } else if (packageMade === 'No idea') {
                results = getFromOverseas('China', destination, rush, packageWeight);
                const antiRushRes = getFromOverseas('China', destination, !rush, packageWeight);
                results.reverseRush = antiRushRes.totalCo2;
                results.noIdea = true;
            }
        } else if (orderOrMail === 'Mailing') {
            const start = statesLatLong[mailToState];
            results = getFromStatesToDestination(destination, start, rush, packageWeight);
            const antiRushRes = getFromStatesToDestination(destination, start, !rush, packageWeight);
            results.reverseRush = antiRushRes.totalCo2;
            results.destinationState = mailToState;
            results.mailing = true;
            if (mailToState === this.props.userState) {
                results.sameState = true;
            }
        }
        console.log(results);
        results.rush = rush;
        const totalCo2 = results.totalCo2;
        const graphData = this.getGraphData(results);
        const roundedResults = this.roundResults(results);
        const showResults = this.props.userState === 'US' ? false : true;  // If its US, they haven't chosen anything since I removed US as an option

        return { graphData, totalCo2, roundedResults, showResults, questionsToFilter };
    }

	render() {
        let questions = this.props.questions.filter(question => { 
            const forms = question['forms'];
            const index = forms.indexOf('package');
            return index !== -1 && !question.hidden; 
        });
        
        const { graphData, totalCo2, roundedResults, showResults, questionsToFilter} = this.getCo2(questions);
        questions = questions.filter( question => questionsToFilter.indexOf(question.id) === -1);

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


