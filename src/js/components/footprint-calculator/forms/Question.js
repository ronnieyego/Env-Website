import React from "react";
import PropTypes from 'prop-types'
import { TextField } from 'material-ui';

import { setQuestionError, updateQuestions} from '../../../actions/footprint/form-actions';
import { updateCostsQuestions} from '../../../actions/cost-forms/costs-actions';
import { getErrorText } from '../../../utils/footprint/question-validators';



export default class Question extends React.Component {

    static proptypes = {
        formType: PropTypes.string, // Where do i dispatch answers to
        
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
    }

    formatName(name) {
        if(!name) {
            return '';
        }
        name = name.replace(/-/g,' ');
        name = name.charAt(0).toUpperCase() + name.slice(1);
        return name;
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
        if(this.props.formType && this.props.formType === 'costs') { // There is only 1 form type for now.
            this.props.dispatch(updateCostsQuestions(questionInfo));
        } else { // Do footprint form
            this.props.dispatch(updateQuestions(questionInfo));
        }
    }

	render() {
        const textWidth = this.props.textWidth ? this.props.textWidth : '250px';
		return (
            <div className="footprint-form-question">
                <p className="footprint-form-question-name">{this.formatName(this.props.question.name)}</p>
                {this.props.aboveText && <p className="footprint-form-question-subtext">{this.props.aboveText}</p>}
                {this.props.aboveText2 && <p className="footprint-form-question-subtext">{this.props.aboveText2}</p>}
                <div>
                    <TextField
                        errorText={this.props.errorText}
                        id={this.props.id}
                        name={this.props.id}
                        hintText={this.props.subText}
                        onChange={this.updateQuestion.bind(this, this.props.validator)}
                        value={this.props.value}
                        floatingLabelText={this.props.floatingLabelText}
                        // type="number" Should add for mobile, but then you can do stuff like .343.3423.43
                        // Need to learn how to turn off html5s validation

                    />
                </div>
                {this.props.belowText && <p className="footprint-form-question-below-text">{this.props.belowText}</p>}
                {this.props.belowText2 && <p className="footprint-form-question-below-text">{this.props.belowText2}</p>}
            </div>
		);
	}
};
