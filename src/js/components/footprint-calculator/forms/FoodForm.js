import React from "react";

import { MenuItem, SelectField, Slider } from 'material-ui';
import Question from './Question';

import { updateQuestionSet} from '../../../actions/footprint/form-actions';
import { getQuestionFromKey } from '../../../utils/footprint/get-question-utils';
import { americanFood, americanDietCalories, demographicCalories } from '../../../utils/utils-data/american-averages';


export default class FoodForm extends React.Component {

    constructor(props) {
	    super();
        this.state = {
            calories: 0
        }
    }

    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    updateGenderDropdown(event, index, gender) {
        // Gah this is messy.  Sorry future Steven.
        const values = {};
        const cals = demographicCalories['American Average'][gender];
        const foodMultiplier = cals / americanDietCalories;
        const foodKeys = Object.keys(americanFood);
        foodKeys.forEach(current => {
            const value = americanFood[current].yearServings * foodMultiplier / 365;
            values[current] = Math.round(value * 10)/10;
        });
        const valueKeys = Object.keys(values);
        const updatedQuestions = this.props.allQuestions.map(question => {
            const index = valueKeys.indexOf(question.name)
            if( index > -1) {
                question.value = values[valueKeys[index]];
            }
            return question;
        });
        this.props.dispatch({type: 'UPDATE_USER_GENDER', payload: gender});
        this.props.dispatch({type: 'UPDATE_QUESTIONS', payload: updatedQuestions})
    }

	render() {
        const genderSelects = ['male', 'female'].map(gender => <MenuItem key={gender} primaryText={this.capitalize(gender)} value={gender} />);
        let calories = 0;
        let showError = false;
        const questions = this.props.questions.map(question => {
            const value = question.value;
            calories += value ? value * question['calories/serving'] : 0;
            if(question.errorText) {
                showError = true;
            }

            return (
                <Question
                errorText={question.errorText || ''}
                key={question.name}
                id={question.name}
                question={question}
                value={value}
                aboveText={question.subtext}
                dispatch={this.props.dispatch}
                validator={question.validator}
                floatingLabelText={question.floatingLabelText}
            />
            );
        });

        const calorieDisplay = showError ?
            'Please submit proper answers' :    
            (<div>Your estimated calorie count is <b style={{fontWeight: '800'}}>{calories.toLocaleString()}</b>.</div>);
            
		return (
            
            <div>
            <h3 className="footprint-form-header">Food</h3>
                <div>
                    <p className="footprint-form-sub-header">How many servings of each food do you eat each day?</p>
                    <br />
                    <p className="footprint-form-sub-header">Need help? Pre-populate with an average American</p>
                    <div className="display-flex-around">
                        <SelectField 
                            id="gender"
                            floatingLabelText="Select Gender"
                            menuItemStyle={{fontWeight: 'bold'}}
                            menuStyle={{textAlign: 'center'}}
                            onChange={this.updateGenderDropdown.bind(this)}
                            value={this.props.userGender}
                        >
                            {genderSelects}
                        </SelectField>
                    </div>
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

