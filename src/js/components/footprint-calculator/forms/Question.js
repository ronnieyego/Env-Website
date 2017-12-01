import React from "react";

import { setQuestionError, updateQuestions} from '../../../actions/footprint/form-actions';
import { TextField } from 'material-ui';


export default class Question extends React.Component {
    formatName(name) {
        if(!name) {
            return '';
        }
        name = name.replace(/-/g,' ');
        name = name.charAt(0).toUpperCase() + name.slice(1);
        return name;
    }

    updateQuestion(e) {
        let id = e.target.id;
        let value = document.getElementById(id).value;
        let errorText = '';
        if(value > 24) {
            errorText = "Fun fact, a day on Pluto lasts 153 hours, on Earth its only lasts 24 hours.";
        } else if (value < 0) {
            errorText = "Where can I buy this magical appliance which runs in reverse?";
        } else if (isNaN(parseInt(value)) || /[^\d.,]/g.test(value)) {
            errorText = "Please enter a valid number";
        }
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
                            onChange={this.updateQuestion.bind(this)}

                        />
                    </div>
                </div>
            </li>
		);
	}
};
