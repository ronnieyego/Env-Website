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
        const questionInfo = { id, value }
        this.props.dispatch(updateQuestions(questionInfo));
    }

	render() {
        const style = this.props.styles || {}; // Allow for custom styles
        return (
            <div className="footprint-form-question-boolean" style={style}>
                <Checkbox
                    checked={this.props.checked}
                    id={this.props.id}
                    label={this.formatName(this.props.question.name)}
                    onCheck={this.updateQuestion.bind(this)}
                />
            </div>
		);
	}
};
