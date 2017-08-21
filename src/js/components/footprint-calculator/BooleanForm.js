import React from "react";
import BooleanQuestion from './BooleanQuestion';


export default class BooleanForm extends React.Component {

    constructor(props) {
	    super();
        this.updateQuestion = this.updateQuestion.bind(this)
	}

    updateQuestion(e) {
        let id = e.target.id;
		let value = document.getElementById(id).checked;
        this.props.updateData('boolean', id, value)
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
        const textWidth = '250px';
        const questions = this.props.questions.map(question => {
            let value = this.props.getQuestionValue(question, 'boolean');
            let checked = value ? 'checked' : 'unchecked';
            return (<BooleanQuestion key={question.name} id={question.name} question={question} questionGroup={'boolean'} updateQuestion={this.updateQuestion} checked={checked} textWidth={textWidth} />);
        });

		return (
            <div>
            <h3 style={subCategory}>Appliance Ownership</h3>
                <div style={questionsStyle}>
                    Which of the following do you own?
                    <ul>
                        {questions}
                    </ul>
                </div>
            </div>
		);
	}
};



