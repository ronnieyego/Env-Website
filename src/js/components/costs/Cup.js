import React from "react";
import PropTypes from 'prop-types'
import Question from '../footprint-calculator/forms/Question';
import DropDownQuestion from '../footprint-calculator/forms/DropDownQuestion';

export default class Cup extends React.Component {

    static propTypes = {
        questions: PropTypes.array
    }

	render() {
        const questions = this.props.questions.map(question => {
            if(question.type === 'int') {
                return (
                    <Question
                    errorText={question.errorText || ''}
                    key={question.name}
                    id={question.name}
                    question={question}
                    value={question.value}
                    aboveText={question.subtext}
                    dispatch={this.props.dispatch}
                    validator={question.validator}
                    floatingLabelText={question.floatingLabelText}
                    formType={question.formType}
                />
                )
            } else if(question.type === 'dropdown') {
                return (
                    <DropDownQuestion 
                        name={question.name}
                        key={question.name}
                        id={question.name}
                        selectOptions={question.selectOptions}
                        question={question}
                        value={question.value}
                        dispatch={this.props.dispatch}
                        formType={question.formType}
                    />
                );
            }
            
        });

		return (
            <div>
                <h3 className="footprint-form-header">Cup</h3>
                    <div >
                        <p className="footprint-form-sub-header">Its a page about cups!</p>
                        <ul>
                            {questions}
                        </ul>
                    </div>
            </div>
		);
	}
}


