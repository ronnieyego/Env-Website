import React from "react";
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField';


import { formatName } from './utils';
import { setQuestionError} from '../../actions/footprint/form-actions';
import { updateCostsQuestions} from '../../actions/cost-forms/costs-actions';
import { getErrorText } from '../../utils/footprint/question-validators';

export default class Question extends React.Component {

    static proptypes = {
        isMobile: PropTypes.bool,
        updateQuestion: PropTypes.func, 
        question: PropTypes.object,

        /* Everything in Question object
        // Core
            id: PropTypes.string,
            errorText: PropTypes.string,
            validator: PropTypes.string,
            value: PropTypes.string,
            subText: PropTypes.string,
            floatingLabelText: PropTypes.string,

        // Looks
            textWidth: PropTypes.string,
            aboveText: PropTypes.string,
            aboveText2: PropTypes.string,
            belowText: PropTypes.string,
            belowText2: PropTypes.string
        */
    }

    updateQuestion(validator, e) {
        let id = e.target.id;
        let value = document.getElementById(id).value;
        const errorText = getErrorText(value, validator);
        const questionInfo = {
            id,
            value,
            errorText
        };
        this.props.dispatch(this.props.updateFunction(questionInfo));
    }

	render() {
        const question = this.props.question
        const textWidth = question.textWidth ? question.textWidth : '250px';
        const inputStyle = this.props.isMobile ? { textAlign: 'center' } : {};
		return (
            <div className="question">
                <p className="question-name">{formatName(question.name, this.props.question.formType)}</p>
                {question.aboveText && <p className="question-subtext">{question.aboveText}</p>}
                {question.aboveText2 && <p className="question-subtext">{question.aboveText2}</p>}
                <div>
                    <TextField
                        errorText={question.errorText}
                        id={question.id.toString()}
                        name={question.name}
                        hintText={question.subText}
                        onChange={this.updateQuestion.bind(this, question.validator)}
                        value={this.props.value}
                        floatingLabelText={question.floatingLabelText}
                        inputStyle={inputStyle}
                        // type="number" Should add for mobile, but then you can do stuff like .343.3423.43
                        // Need to learn how to turn off html5s validation

                    />
                </div>
                {question.belowText && <p className="question-below-text">{question.belowText}</p>}
                {question.belowText2 && <p className="question-below-text">{question.belowText2}</p>}
            </div>
		);
	}
};
