import React from "react";
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField';
import ReactTooltip from 'react-tooltip';

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
		return (
            <div className="question">
                <span className="question-name-container">
                    <div className="question-name">{formatName(question.name, this.props.question.formType)}</div>
                    {question.hoverText && 
                        <span>
                            <div className="question-help" data-tip data-for={`int-question-hover-${question.id}`}>
                                <i className="material-icons question-icon">help</i> </div>
                                <ReactTooltip place="top" id={`int-question-hover-${question.id}`} type='dark' effect='solid'>
                                    <p className="int-question-hover">{question.hoverText}</p>
                                </ReactTooltip>
                        </span>
                    }
                </span>
                {question.aboveText && <p className="question-subtext">{question.aboveText}</p>}
                {question.aboveText2 && <p className="question-subtext">{question.aboveText2}</p>}
                <div>
                    <TextField
                        errorText={question.errorText}
                        id={question.id.toString()}
                        name={question.name}
                        hintText={question.subText || question.subtext}
                        onChange={this.updateQuestion.bind(this, question.validator)}
                        value={this.props.value}
                        floatingLabelText={question.floatingLabelText}
                        inputStyle={{ textAlign: 'center' }}
                        type={this.props.isMobile ? 'number' : ''}  // Need to learn how to turn off html5s validation so its only on mobile.
                    />
                </div>
                {question.belowText && <p className="question-below-text">{question.belowText}</p>}
                {question.belowText2 && <p className="question-below-text">{question.belowText2}</p>}
            </div>
		);
	}
};
