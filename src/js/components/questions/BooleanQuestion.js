import React from "react";
import Checkbox from 'material-ui/Checkbox';

import { formatName } from './utils';
import { updateQuestions} from '../../actions/footprint/form-actions';
import { updateCostsQuestions} from '../../actions/cost-forms/costs-actions';


export default class BooleanQuestion extends React.Component {

    updateQuestion(e) {
        const id = e.target.id;
        let value = document.getElementById(id).value;
        value = this.props.question.checked && value === 'on' ? 'off' : 'on';
        const questionInfo = { id, value };
        this.props.dispatch(updateFunction(questionInfo));
    }

	render() {
        const question = this.props.question;
        const style = this.props.styles || {}; // Allow for custom styles
        return (
            <div className="question-boolean" style={style}>
                <Checkbox
                    checked={question.checked}
                    id={this.props.id}
                    label={formatName(this.props.question.name)}
                    onCheck={this.updateQuestion.bind(this)}
                />
            </div>
		);
	}
};
