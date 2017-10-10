import React from "react";
import Question from './Question';


export default class FoodForm extends React.Component {

    constructor(props) {
	    super();
        this.state = {
            calories: 0
        }
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
        let calories = 0;
        const questions = this.props.questions.map(question => {
            let value = question.value;
            calories += value * question['calories/serving'];
            return (
                <Question 
                key={question.name}
                id={question.name}
                question={question}
                value={value}
                textWidth={textWidth}
                subtext={question.subtext}
                dispatch={this.props.dispatch}/>
            );
        });

        const calorieDisplay = !isNaN(calories) ? 
            (<div>Your estimated calorie count is <b>{calories.toLocaleString()}</b>.</div>) 
            :
            'Please submit proper numbers';
		return (
            
            <div>
            <h3 style={subCategory}>Food</h3>
                <div style={questionsStyle}>
                    How many servings of each food do you eat each day?  
                    <br />{calorieDisplay}
                    <ul>
                        {questions}
                    </ul>
                </div>
            </div>
		);
	}
};

