// How this works
// The question payload has an array of IDs of questions to be added (order matters)
// This component adds the questions to the store.  But the form is the ID of this component
// This component acts as a mini form (it gets and filters those new questions)
// The new questions and answers and accessible in the store.

import React from "react";
import { bool, func, object } from 'prop-types';
import { connect } from 'react-redux';

import Question from './QuestionHoc';
import HoverText from './HoverText';
import IconButton from 'material-ui/IconButton';
import { AddIcon, RemoveIcon } from '../../assets/icons/index';

import { sortAndFilterAndCreateQuestions } from '../../utils/question-utils';
import { formatName } from './utils';
import { updateQuestions} from '../../actions/footprint/form-actions';
import { updateCostsQuestions} from '../../actions/cost-forms/costs-actions';
import { getQuestionFromId } from '../../utils/footprint/get-question-utils';


@connect((store, props) => {
	return {
		questions: store.questions.questions,
	};
})
export default class DropdownQuestion extends React.Component {

    static propType = {
        isMobile: bool,
        updateQuestion: func, 
        question: object,

    // Everything in Question object
        // id: 
        // name
        // questions:  ALl subquestions in this grouping
    }

    constructor() {
        super();
        this.state = {
            questionIds: []
        };
    }

    createQuestion(questionIds, forms) {
        const questions = questionIds.map(id => {
            const question = getQuestionFromId(this.props.questions, id);
            const newId = Math.random();
            const newQuestionName = `${this.props.question.childQuestionName}${this.state.questionIds.length + 1}`;
            const newQuestion = { ...question, name: newQuestionName, id: newId, forms: [`${this.props.question.id}`] };
            const allQuestionIds = [...this.state.questionIds];
            allQuestionIds.push(newId);
            this.setState({ questionIds: allQuestionIds});
            this.addQuestion(newQuestion);
            }
        );
    }

    addQuestion(question) {
        this.props.dispatch({ type: 'ADD_QUESTION', payload: question });
    }

    removeQuestion(questionId) {
        this.props.dispatch({ type: 'REMOVE_QUESTION', payload: questionId });
    }

    updateQuestion(id, event, index, value) {
        this.props.dispatch(this.props.updateFunction({id, value, index}));
    }

	render() {
        const question = this.props.question;
        const ids = question.questions;
        const forms = question.forms;
        const childQuestions = sortAndFilterAndCreateQuestions(`${this.props.question.id}`, this.state.questionIds, this.props.questions);
        
        return (
            <div className="question">
                <div>
                    <span className="question-name-container">
                        <div className="question-name" >{formatName(question.name, this.props.question.formType)}</div>
                        <HoverText id={this.props.question.id} text={this.props.question.hoverText} />
                    </span>
                </div>
                <div className="multiple-question-children">
                    {childQuestions}
                </div>

                <div className="multiple-question-icon-container" >
                    <IconButton onClick={() => this.createQuestion(ids, forms)}>
                        <AddIcon />
                    </IconButton>
                    <IconButton onClick={() => this.removeQuestion(this.state.questionIds.pop())}>
                        <RemoveIcon />
                    </IconButton>
                </div>
            </div>
		);
	}
};
