import React from "react";
import { TextField } from 'material-ui';

import { setQuestionError, updateQuestions} from '../../../actions/footprint/form-actions';
import { getErrorText } from '../../../utils/footprint/question-validators';



export default class Question extends React.Component {
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
        this.props.dispatch(updateQuestions(questionInfo));
    }

	render() {
        const textWidth = this.props.textWidth ? this.props.textWidth : '250px';
		return (
            <li className="footprint-form-question">
                <div>
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

                        />
                    </div>
                    {this.props.belowText && <p className="footprint-form-question-below-text">{this.props.belowText}</p>}
                    {this.props.belowText2 && <p className="footprint-form-question-below-text">{this.props.belowText2}</p>}
                </div>
            </li>
		);
	}
};
