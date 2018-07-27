import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ids from '../../../utils/ids/index';
import { 
    tabletQuestions,
    wattage,
    materialBreakdown,
    nameMapping,
    tabletCo2
} from './tablet-data';
import Tablet from './Tablet';
import { getAnswerFromId, getQuestionFromId } from '../../../utils/footprint/get-question-utils';

@connect((store, props) => {
	return {
        questions: store.questions.questions
    };
})
export default class TabletHoc extends React.Component {

    getCo2(questions) {
        const tabletType = getAnswerFromId(questions, ids.tabletType);
        const { co2, production, transportation, use, recycling } = tabletCo2[nameMapping(tabletType)];
        return { co2, production, transportation, use, recycling, tabletType};
    }

	render() {
        const questions = this.props.questions.filter(question => { 
            const forms = question['forms'];
            const index = forms.indexOf('tablet');
            return index !== -1 && !question.hidden; 
        });
        
        const { co2, production, transportation, use, recycling, tabletType } = this.getCo2(questions);
        const productionCo2 = Math.round(production * co2);
        const transportationCo2 = Math.round(transportation * co2);
        const useCo2 = Math.round(use * co2);
        const recyclingCo2 = Math.round(recycling * co2);

        const graphData = [
            {name: 'Production', Phase: productionCo2},
            {name: 'Transportation', Phase: transportationCo2},
            {name: 'Use', Phase: useCo2},
            {name: 'End of life', Phase: recyclingCo2},
        ];

        const tabletName =  tabletType === 'Other' ? 'Tablet' : tabletType;
        
		return (
            <Tablet
                dispatch={this.props.dispatch}    
                questions={questions}
                totalCo2={co2}
                graphData={graphData}
                tabletName={tabletName}
                phases={{productionCo2, transportationCo2, useCo2, recyclingCo2}}
             />
		);
	}
}


