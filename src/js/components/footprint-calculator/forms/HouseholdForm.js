import React from "react";
import _ from 'lodash';

import BooleanQuestion from './BooleanQuestion';
import Question from './Question';
import StateDropDown from '../../StateDropdown';

export default class Household extends React.Component {
    constructor() {
        super();
        this.updateStateDropdown = this.updateStateDropdown.bind(this);
    }

    updateStateDropdown(e) {
        const id = e.target.id;
        const value = document.getElementById(id).value;
        this.props.dispatch({type: 'UPDATE_USER_STATE', payload: value});
    }
    
    filterQuestions(questions, filter) {
        return _.filter(questions, function(o) { return o['use-type'] === filter; });
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
        const allQuestions = this.props.questions;
        const boolQuestions = this.filterQuestions(allQuestions, 'monthly-own').map(question => {
            const checked = question.value === 'on' ? true : false;
            return (<BooleanQuestion 
                key={question.name} 
                id={question.name} 
                question={question} 
                questionGroup={'boolean'} 
                checked={checked} 
                textWidth={textWidth} 
                dispatch={this.props.dispatch}/>);
        });
        const questions = this.filterQuestions(allQuestions, 'monthly-use').map(question => {
            const value = question.value;
            return (<Question 
                key={question.name} 
                id={question.name} 
                question={question} 
                value={value} 
                textWidth={textWidth}
                subText={question.subtext} 
                dispatch={this.props.dispatch}/>
            );
        });

		return (
            <div>
            <h3 style={subCategory}>Household information</h3>
                <div style={questionsStyle}>
                    What state do you live in?
                    <ul>
                        <StateDropDown id="userState" updateQuestion={this.updateStateDropdown} />
                    </ul>
                    Which of the following do you own?
                    <ul>
                        {boolQuestions}
                    </ul>
                    How many times a month do you use the following?
                    <ul>
                        {questions}
                    </ul>
                </div>
            </div>
		);
	}
};



