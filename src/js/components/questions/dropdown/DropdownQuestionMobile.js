import React from "react";
import { func, number, shape, string } from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton';
import { GREEN_GRADIENT } from '../../../utils/shared-styles/colors';


export default class DropDownQuestionMobile extends React.Component {
    static proptypes = {
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

	render() {
        const question = this.props.question;
        const optionButtons = question.selectOptions.map((option, index) => {
            const selected = option === this.props.value;
            const buttonStyle = selected ? {background: GREEN_GRADIENT } : { background: '#ffffff'};
            return (
                <div className="form-question-buttons-mobile" key={`${option}-${question.id}`} >
                    <RaisedButton 
                        buttonStyle={buttonStyle}
                        key={`${option}-${question.name}`}
                        label={option}
                        labelColor={selected ? '#ffffff' : '#000000'}
                        onClick={() => this.props.dispatch(this.props.updateFunction({ id: question.id, index, value: option }))}
                        style={{ width: '100%'}}
                        value={option}  
                    />
                </div>
            );
        });

		return (
            <div className="form-question-container-mobile">
                <p className="form-question-name">{question.name}</p>
                <div className="form-question">
                    {optionButtons}
                </div>
                <p className="form-question-subtext-mobile">{question.answerText && question.answerText[question.index] ? question.answerText[question.index] : question.subtext}</p>
            </div>
        );
    }
};




