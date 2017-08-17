import React from "react";
import Question from './Question';


export default class FoodForm extends React.Component {

    constructor(props) {
	    super();
        this.updateQuestion = this.updateQuestion.bind(this)
	}

    updateQuestion(e) {
        let id = e.target.id;
		let value = document.getElementById(id).value;
        value = parseInt(value) >= 0 ? value : 0; // Only counts numbers
        this.props.updateData('foodQuestions', id, value)
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
        const textWidth = '75px';
        const questions = this.props.questions.map(question => {
                let value = this.props.getQuestionValue(question, 'foodQuestions');
                return (<Question key={question.name} id={question.name} question={question} updateQuestion={this.updateQuestion} value={value} textWidth={textWidth} />);
            });
		return (
            
            <div>
            <h3 style={subCategory}>Food</h3>
                <div style={questionsStyle}>
                    How many pounds of each food do you eat each day?
                    <ul>
                        {questions}
                    </ul>
                </div>
            </div>
		);
	}
};

