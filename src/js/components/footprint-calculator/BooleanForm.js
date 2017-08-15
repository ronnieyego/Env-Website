import React from "react";
import BooleanQuestion from './BooleanQuestion';


export default class BooleanForm extends React.Component {

    constructor(props) {
	    super();
        let questions = props.questions;
        let formQuestions = []; // Cause props are immutable
        questions.map(question => {
            formQuestions.push(<BooleanQuestion name={question.name} questionGroup={'boolean'} boolQuestionOnChange={props.boolQuestionOnChange} />);
        })
        this.state = {
            questions: formQuestions
        };
	}

	render() {
        console.log('Boolean Form question', this.state.questions)
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
                        {this.state.questions}
                    </ul>
                </div>
            </div>
		);
	}
};



