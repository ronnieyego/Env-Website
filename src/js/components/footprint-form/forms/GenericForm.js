import React from "react";
import { array, func, number, string } from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { getQuestionFromId } from '../../questions/utils';
import { sortAndFilterAndCreateQuestions } from '../../../utils/question-utils';
import { updateQuestionsV2 } from '../../../actions/footprint/form-actions';


const MAX_STEPS = 6;


@connect(store => {
	return {
        questions: store.questions.questions,
        errorQuestions: store.footprintForm.errorQuestions
	};
})
export default class GenericForm extends React.Component {
    static propTypes = {
        headerText: string,
        questionFormName: string,
        questionOrder: array,
        step: number,
        validator: func
    }

    decreaseStep() {
        const validation = this.props.dispatch(this.props.validator());
        this.props.dispatch({type: 'SET_ERROR_QUESTIONS', payload: validation.errorQuestions})
        if(!validation.valid) {
        } else {
           this.props.dispatch({type: 'DECREASE_STEP'});
        }
     }
 
     increaseStep() {
        const validation = this.props.dispatch(this.props.validator());
        this.props.dispatch({type: 'SET_ERROR_QUESTIONS', payload: validation.errorQuestions})
        if(!validation.valid) {
            this.updateErrorQuestions(validation.errorQuestions);
        } else {
           this.props.dispatch({type: 'INCREASE_STEP'});
           location.href = '#';
           location.href = '#footprint-form-title';
        }
     }

     updateErrorQuestions(ids) {
        ids.forEach(id => {
            const question = getQuestionFromId(this.props.questions, id);
            question.errorText = question.errorText ? question.errorText : 'Please answer the question correctly';
            this.props.dispatch(updateQuestionsV2(question));
        });
        const topId = ids[0];
        location.href = "#";
        location.href = `#question-${topId}`;
     }

	render() {
        const questions = sortAndFilterAndCreateQuestions(this.props.questionFormName, this.props.questionOrder, this.props.questions);
        const errorQuestions = this.props.errorQuestions;
        console.log('this.props.errorQuestions', this.props.errorQuestions);
        let errorMessage = (<div />);

        if(errorQuestions.length !== 0) {
            errorMessage = (<div className="footprint-form-error-message">Please fill out all fields correctly.</div>);
        }

		return (
            <div>
                <div>
                    <p className="footprint-form-sub-header">{this.props.headerText}</p>
                    { questions }
                </div>
                {errorMessage}
                <div className="footprint-form-bottom-buttons">
                    <RaisedButton 
                        className="left-btn"
                        label="Back"
                        onClick={() => this.decreaseStep()}
                        secondary={true}
                    />
                    Step {this.props.step} of {MAX_STEPS}
                    <RaisedButton 
                        className="right-btn"
                        label="Next"
                        onClick={() => this.increaseStep()}
                        primary={true}
                    />
                </div>
            </div>
		);
	}
};



