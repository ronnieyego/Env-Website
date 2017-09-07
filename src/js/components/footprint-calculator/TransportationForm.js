import React from "react";
import Question from './Question';
import BooleanQuestion from './BooleanQuestion';
import DropDownQuestion from './DropDownQuestion';

export default class TransportationForm extends React.Component {

    constructor(props) {
	    super();
        this.updateQuestionDropdown = this.updateQuestionDropdown.bind(this)
        this.updateQuestionBool = this.updateQuestionBool.bind(this)
        this.updateData = this.updateData.bind(this)
	}

    updateQuestionDropdown(e) {
        let id = e.target.id;
		let value = document.getElementById(id).value;
        this.props.updateData('transportation', id, value)
    }
    updateQuestionBool(e) {
        let id = e.target.id;
		let value = document.getElementById(id).checked;
        this.props.updateData('transportation', id, value)
    }
    updateData(question, value) {
        this.props.updateData('transportation', question, value)
    }

	render() {
        const subCategory = {
            fontWeight: 'bold',
            textAlign: 'center'
        };
        const questionsStyle = {
            textAlign: 'left',
            marginLeft: '15px',
            marginTop: '5px',
            marginBottom: '5px'
        };
        const textWidth = '350px';
        const questions = this.props.questions.map(question => {
                let value = this.props.getQuestionValue(question, 'transportation');
                if(question.useBool) {
                    let checked = value ? 'checked' : 'unchecked';
                    return (<BooleanQuestion key={question.name} id={question.name} question={question} updateQuestion={this.updateQuestionBool} checked={checked} textWidth={textWidth}  />)
                } else if (question.selectOptions) {
                    return (<DropDownQuestion key={question.name} id={question.name} selectOptions={question.selectOptions} question={question} updateQuestion={this.updateQuestionDropdown} textWidth={textWidth} selected={value} updateData={this.updateData} />)
                }
                return (<Question key={question.name} id={question.name} question={question} updateQuestion={this.updateData} value={value} textWidth={textWidth} subText={question.subtext} />);
            });
		return (
            <div>
            <h3 style={subCategory}>Transportation</h3>
                <div style={questionsStyle}>
                    What are your travel habits
                    <ul>
                        {questions}
                    </ul>
                </div>
            </div>
		);
	}
};

