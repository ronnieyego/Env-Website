import React from "react";

import { updateQuestions} from '../../../actions/footprint/form-actions';
import { Checkbox } from 'material-ui';

export default class Question extends React.Component {

    formatName(name) {
        name = name.replace(/-/g,' ');
        name = name.charAt(0).toUpperCase() + name.slice(1);
        return name;
    }

    updateQuestion(e) {
        const id = e.target.id;
        let value = document.getElementById(id).value;
        value = this.props.checked && value === 'on' ? 'off' : 'on';
        this.props.dispatch(updateQuestions(id, value));
    }

	render() {
		const textWidth = this.props.textWidth ? this.props.textWidth : '250px';
        const textStyle = {width: textWidth}
        return (
            <div className="footprint-form-question-boolean">
                <Checkbox 
                    id={this.props.id}
                    label={this.formatName(this.props.question.name)}
                    onCheck={this.updateQuestion.bind(this)}
                />
            </div>
		);
	}
};
