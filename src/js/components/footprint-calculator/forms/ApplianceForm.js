import React from "react";
import Question from './Question';


export default class ApplianceForm extends React.Component {

    constructor(props) {
	    super();
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
            let value = question.value;
            return (<Question 
                key={question.name} 
                id={question.name} 
                question={question} 
                value={value} 
                textWidth={textWidth} 
                subtext={question.subtext} 
                dispatch={this.props.dispatch}
                />);
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

