import React from "react";
import { connect } from 'react-redux';

import Divider from 'material-ui/Divider';

import Question from '../../questions/QuestionHoc';
import StateDropDown from '../../StateDropdown';



@connect((store, props) => {
	return {
		userState: store.footprintFormAnswers.userState,
	};
})
export default class Household extends React.Component {

    updateStateDropdown(event, index, value) {
        this.props.dispatch({type: 'UPDATE_USER_STATE', payload: value});
    }
    
    filterQuestions(questions, filter) {
        return questions.filter(question => question['use-type'] === filter );
    }

	render() {
        const allQuestions = this.props.questions;
        const boolQuestions = this.filterQuestions(allQuestions, 'monthly-own')
            .map(question => {
                question.checked = question.value === 'on' ? true : false;
                return (
                    <Question 
                        question={question}
                        value={question.value}
                        questionType={question.type}
                    />
                )
            }
        );
        const questions = this.filterQuestions(allQuestions, 'monthly-use')
            .map(question => (
                <Question 
                    question={question}
                    value={question.value}
                    questionType={question.type}
                />
            )
        );

		return (
            <div>
            <h3 className="footprint-form-header">Household information</h3>
                <div>
                    <p className="footprint-form-sub-header">What state do you live in?</p>
                    <ul>
                        <StateDropDown 
                            id="userState"
                            updateQuestion={this.updateStateDropdown.bind(this)} 
                            subText={'Choose your state'}
                            value={this.props.userState}
                        />
                    </ul>
                    <p className="footprint-form-sub-header">Which of the following do you own?</p>
                        {boolQuestions}
                    <div className="form-divider">
                        <Divider />
                    </div>
                    <p className="footprint-form-sub-header">How many times a month do you use the following?</p>
                    <p className="footprint-form-sub-header-description">Please do not include housemate use </p>
                    {questions}
                </div>
            </div>
		);
	}
};



