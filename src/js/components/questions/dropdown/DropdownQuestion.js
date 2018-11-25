import React from "react";
import { func, number, shape, string } from 'prop-types'
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField'
import { DROPDOWN_STYLE, UNDERLINE_STYLE, ICON_STYLE } from '../../../utils/shared-styles/dropdown-style';

export default class DropDownQuestion extends React.Component {
    static proptypes = {
        updateQuestion: func.isRequired, 
        question: shape({
            id: string,
            name: string,
            value: string,
            selectOptions: string,
            subtext: string,
            answerText: string, // explains what the answer means
            index: number  // This is what index of answer is slected
        }).isRequired,
        value: string.isRequired
    }

    updateQuestion(id, event, index, value) {
        this.props.dispatch(this.props.updateFunction({id, value, index}));
    }

	render() {
        const question = this.props.question;
        const menuItems = question.selectOptions.map(option => {
            return <MenuItem 
                key={`${option}-${question.name}`}
                primaryText={option}
                value={option}  
            />
        })

        const dropDown = <SelectField
            key={question.name}
            id={question.name}
            onChange={this.updateQuestion.bind(this, question.id)}
            value={this.props.value}
            style={DROPDOWN_STYLE}
            iconStyle={ICON_STYLE}
            underlineStyle={UNDERLINE_STYLE}
        >
            {menuItems}
        </SelectField>;

		return (
            <div className="form-question-container row">
                <p className="form-question-name col-md-3">{question.name}</p>
                <div className="form-question col-md-6">{dropDown}</div>
                <p className="form-question-subtext col-md-3">{question.answerText && question.answerText[question.index] ? question.answerText[question.index] : question.subtext}</p>
            </div>
        );
    }
};




