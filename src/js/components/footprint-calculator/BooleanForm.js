import React from "react";
import BooleanQuestion from './BooleanQuestion';


export default class BooleanForm extends React.Component {

    constructor(props) {
	    super();
        this.updateQuestion = this.updateQuestion.bind(this)
	}

    updateQuestion(e) {
        let id = e.target.id;
		let value = document.getElementById(id).value;
        console.log('boolean question', value);
        this.props.updateData('boolean', id, value)
    }

	render() {
        const questions = this.props.questions.map(question => {
            let value = this.props.getQuestionValue(question, 'boolean');
            return (<BooleanQuestion key={question.name} id={question.name} question={question} questionGroup={'boolean'} updateQuestion={this.updateQuestion} value={value} />);
        })
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



