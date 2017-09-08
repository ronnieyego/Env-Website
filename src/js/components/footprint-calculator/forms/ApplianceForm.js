import React from "react";
import Question from './Question';


export default class ApplianceForm extends React.Component {

    constructor(props) {
	    super();
        this.updateQuestion = this.updateQuestion.bind(this)
	}

    updateQuestion(questionId, value) {
        this.props.updateData('applianceHour', questionId, value)
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
                return (<Question key={question.name} id={question.name} question={question} updateQuestion={this.updateQuestion} value={value} textWidth={textWidth} subText={question.subtext} />);
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

