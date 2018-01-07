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
        let calories = 0;
        const questions = this.props.questions.map(question => {
            const value = question.value;
            calories += value ? value * question['calories/serving'] : 0;
            return (
                <Question
                errorText={question.errorText || ''}
                key={question.name}
                id={question.name}
                question={question}
                value={value}
                subtext={question.subtext}
                dispatch={this.props.dispatch}
                validator={question.validator}
            />
            );
        });

        const calorieDisplay = !isNaN(calories) ? 
            (<div>Your estimated calorie count is <b style={{fontWeight: '800'}}>{calories.toLocaleString()}</b>.</div>) 
            :
            'Please submit proper numbers';
		return (
            
            <div>
            <h3 className="footprint-form-header">Food</h3>
                <div>
                    <p className="footprint-form-sub-header">How many servings of each food do you eat each day?</p>
                    <p className="footprint-form-sub-header">{calorieDisplay}</p>
                    <ul>
                        {questions}
                    </ul>
                    <p className="footprint-form-sub-header">{calorieDisplay}</p>
                </div>
            </div>
		);
	}
};

