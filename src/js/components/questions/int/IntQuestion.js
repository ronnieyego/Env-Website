import React from "react";
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField';

import HoverText from '../HoverText';
import { formatName } from '../utils';
import { getErrorText } from '../../../utils/footprint/question-validators';

export default class Question extends React.Component {

    static proptypes = {
        isMobile: PropTypes.bool,
        updateQuestion: PropTypes.func.isRequired, 
        question: PropTypes.object.isRequired,

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
        const containerClass = `form-question-container${!this.props.isMobile ? ' row' : '-mobile'}`;
        const nameClass = `form-question-name ${!this.props.isMobile ? 'col-md-3' : ''}`;
		return (
            <div className={containerClass}>
                <span className={nameClass}>
                    {question.name}
                    { !this.props.isMobile && <HoverText id={this.props.question.id} text={this.props.question.hoverText} /> }
                </span>
                <div className="form-question col-md-6">
                    <TextField
                        errorText={question.errorText}
                        id={question.id.toString()}
                        name={question.name}
                        hintText={question.hintText}
                        onChange={this.updateQuestion.bind(this, question.validator)}
                        value={this.props.value}
                        floatingLabelText={question.floatingLabelText}
                        underlineStyle={{borderBottom: '1px solid darkgray'}}
                        inputStyle={{ textAlign: 'center' }}
                        // type={this.props.isMobile ? 'number' : ''}  // Need to learn how to turn off html5s validation so its only on mobile.
                    />
                </div>
                <p className="form-question-subtext col-md-3">{question.subtext}</p>
            </div>
		);
	}
};
