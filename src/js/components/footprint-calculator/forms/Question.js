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
        //TODO combine into 1 action.
        this.props.dispatch(setQuestionError(id, errorText));
        this.props.dispatch(updateQuestions(id, value));
    }

	render() {
        const textWidth = this.props.textWidth ? this.props.textWidth : '250px';
        if(this.props.name === "house-heat-pump") {
            console.log('props are', this.props);
        }
		return (
            <li className="footprint-form-question">
                <div>
                    <p className="footprint-form-question-name">{this.formatName(this.props.question.name)}</p>
                    <div>
                        <TextField
                            errorText={this.props.errorText}
                            id={this.props.id}
                            name={this.props.id}
                            hintText={this.props.subtext}
                            onChange={this.updateQuestion.bind(this, this.props.validator)}

                        />
                    </div>
                </div>
            </li>
		);
	}
};
