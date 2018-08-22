import React from "react";
import { connect } from 'react-redux';

import ids from '../../../utils/ids/index';
import Garbage from './Garbage';

import { getAnswerFromId, getQuestionFromId } from '../../../utils/footprint/get-question-utils';

@connect((store, props) => {
	return {
        questions: store.questions.questions
    };
})
export default class GarbageHoc extends React.Component {

    getCo2(questions) {
        //const co2 = distance * 
    }

	render() {
        let questions = this.props.questions.filter(question => { 
            const forms = question.forms;
            const index = forms.indexOf('garbage');
            return index !== -1 && !question.hidden; 
        });

        const graphData = [
            {name: 'Production', Phase: production},
            {name: 'Use', Phase: use},
            {name: 'Transportation', Phase: transportation},
            {name: 'End of life', Phase: recycling},
        ];

		return (
            <Garbage
                dispatch={this.props.dispatch}    
                questions={questions}
                computerType={computerType}
                brand={brand}
                totalCo2={total}
                use={use}
                production={production}
                transportation={transportation}
                recycling={recycling}
                graphData={graphData}
                graphDefaultMax={graphDefaultMax}
             />
		);
	}
}


