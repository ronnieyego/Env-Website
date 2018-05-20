import React from "react";
import Question from '../../questions/QuestionHoc';

export default class TransportationForm extends React.Component {

	render() {
        const questions = this.props.questions.map(question => {
            const value = question.value;
            question.checked = value === 'on' ? true : false;
            if(question.hidden) {
                return;
            } 
            return (
                <Question 
                    question={question}
                    value={question.value}
                    questionType={question.type}
                />
            );
        });
		return (
            <div>
            <h3 className="footprint-form-header">Transportation</h3>
                <div>
                    <p className="footprint-form-sub-header">What are your travel habits</p>
                    {questions}
                </div>
            </div>
		);
	}
};

