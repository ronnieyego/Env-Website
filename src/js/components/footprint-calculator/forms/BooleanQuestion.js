import React from "react";

import { updateQuestions} from '../../../actions/footprint/form-actions';
import { updateCostsQuestions} from '../../../actions/cost-forms/costs-actions';
import Checkbox from 'material-ui/Checkbox';

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
        const questionInfo = { id, value };
        if(this.props.formType && this.props.formType === 'costs') { // There is only 1 form type for now.
            this.props.dispatch(updateCostsQuestions(questionInfo));
        } else { // Do footprint form
            this.props.dispatch(updateQuestions(questionInfo));
        }
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
