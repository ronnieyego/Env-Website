import React from "react";
import { array } from 'prop-types';
import { connect } from 'react-redux';

import Question from '../../questions/QuestionHoc';
import ids from '../../../utils/ids/index';

export default class Household extends React.Component {
    static propTypes = {
        questions: array.isRequired
    }
	render() {
        const questions = this.props.questions.filter(question => { 
            const forms = question['forms'];
            const index = forms.indexOf('household');
            return index !== -1 && !question.hidden; 
        });

        const questionComponents = questions.map( question => (
            <Question
                questionType={question.type}
                key={question.name}
                question={question}
                value={question.value}
            />
        ));

		return (
            <div>
            <h3 className="footprint-form-header">Household Information</h3>
                <div>
                    <p className="footprint-form-sub-header">Please answer the following about your home</p>
                    { questionComponents }
                </div>
            </div>
		);
	}
};



