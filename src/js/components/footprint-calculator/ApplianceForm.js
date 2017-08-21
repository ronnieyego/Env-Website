import React from "react";
import Question from './Question';


export default class ApplianceForm extends React.Component {

    constructor(props) {
	    super();
        this.updateQuestion = this.updateQuestion.bind(this)
	}

    updateQuestion(e) {
        let id = e.target.id;
		let value = document.getElementById(id).value;
        //value = parseInt(value) >= 0 ? value : 0; // Only counts numbers
        this.props.updateData('applianceHour', id, value)
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
        const textWidth = '150px';
        const questions = this.props.questions.map(question => {
                let value = this.props.getQuestionValue(question, 'applianceHour');
                return (<Question key={question.name} id={question.name} question={question} updateQuestion={this.updateQuestion} value={value} textWidth={textWidth} />);
            });
		return (
            
            <div>
            <h3 style={subCategory}>Daily use Appliances</h3>
                <div style={questionsStyle}>
                    How many hours a day do you use the following?
                    <ul>
                        {questions}
                    </ul>
                </div>
            </div>
		);
	}
};

