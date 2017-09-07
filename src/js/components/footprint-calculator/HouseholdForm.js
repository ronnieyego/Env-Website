import React from "react";
import _ from 'lodash';

import BooleanQuestion from './BooleanQuestion';
import Question from './Question';

export default class Household extends React.Component {

    constructor(props) {
	    super();
        this.updateQuestion = this.updateQuestion.bind(this)
        this.updateData = this.updateData.bind(this)
	}

    updateQuestion(e) {
        let id = e.target.id;
		let value = document.getElementById(id).checked;
        this.props.updateData('household', id, value)
    }

    updateData(question, value) {
        this.props.updateData('household', question, value)
    }

    filterQuestions(questions, filter) {
        return _.filter(questions, function(o) { return o['use-type'] === filter; });
    }

	render() {
        
        const subCategory = {
            fontWeight: 'bold',
            textAlign: 'center'
        };
        const questionsStyle = {
            textAlign: 'left',
            marginLeft: '15px',
            marginTop: '5px',
            marginBottom: '5px'
        };
        const textWidth = '250px';
        const allQuestions = this.props.questions;
        const boolQuestions = this.filterQuestions(allQuestions, 'monthly-own').map(question => {
            const value = this.props.getQuestionValue(question, 'household');
            const checked = value ? 'checked' : 'unchecked';
            return (<BooleanQuestion key={question.name} id={question.name} question={question} questionGroup={'boolean'} updateQuestion={this.updateQuestion} checked={checked} textWidth={textWidth} />);
        });
        const questions = this.filterQuestions(allQuestions, 'monthly-use').map(question => {
            const value = this.props.getQuestionValue(question, 'household');
            return (<Question 
                key={question.name} 
                id={question.name} 
                question={question} 
                updateQuestion={this.updateData} 
                value={value} 
                textWidth={textWidth}
                subText={question.subtext} />
            );
        });

		return (
            <div>
            <h3 style={subCategory}>Household information</h3>
                <div style={questionsStyle}>
                    Which of the following do you own?
                    <ul>
                        {boolQuestions}
                    </ul>
                    How many times a month do you use the following?
                    <ul>
                        {questions}
                    </ul>
                </div>
            </div>
		);
	}
};



