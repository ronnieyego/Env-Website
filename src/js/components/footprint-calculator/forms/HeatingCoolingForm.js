import React from "react";
import Question from '../../questions/QuestionHoc';

export default class HeatingCoolingForm extends React.Component {

	render() {
        const questions = this.props.questions.map(question => {
            let value = question.value;
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
            <h3 className="footprint-form-header">Heating and Cooling</h3>
                <div >
                    <p className="footprint-form-sub-header">How many hours a day do you use the following?</p>
                    {questions}
                </div>
            </div>
		);
	}
};

