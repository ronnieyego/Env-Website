import React from "react";
import Question from './Question';
import BooleanQuestion from './BooleanQuestion';
import DropDownQuestion from './DropDownQuestion';
import { getAnswerFromKey } from '../../../utils/footprint/get-question-utils';

export default class TransportationForm extends React.Component {

	render() {
        const questions = this.props.questions.map(question => {
            const value = question.value;
            if(question.hidden) {
                return;
            } else if(question.type === 'bool') {
                const checked = value === 'on' ? true : false;
                return (
                    <BooleanQuestion 
                        key={question.name}
                        id={question.name}
                        question={question}
                        checked={checked}
                        dispatch={this.props.dispatch}  
                    />
                );
            } else if (question.selectOptions) {
                return (
                    <DropDownQuestion 
                        name={question.name}
                        key={question.name}
                        id={question.name}
                        selectOptions={question.selectOptions}
                        question={question}
                        value={value}
                        dispatch={this.props.dispatch} 
                    />
                );
            }
            return (
                <Question 
                    errorText={question.errorText || ''}
                    key={question.name}
                    id={question.name}
                    question={question}
                    value={value}
                    subText={question.subtext}
                    dispatch={this.props.dispatch}
                    validator={question.validator}
                />
            );
        });
		return (
            <div>
            <h3 className="footprint-form-header">Transportation</h3>
                <div>
                    <p className="footprint-form-sub-header">What are your travel habits</p>
                    <ul>
                        {questions}
                    </ul>
                </div>
            </div>
		);
	}
};

