import React from "react";
import { array, func, number, string } from 'prop-types';
import { connect } from 'react-redux';
import { sortAndFilterAndCreateQuestions } from '../../../utils/question-utils';

@connect(store => {
	return {
        questions: store.questions.questions
	};
})
export default class GenericForm extends React.Component {
    static propTypes = {
        title: string,
        headerText: string,
        questionFormName: string,
        questionOrder: array,
        step: number,
        validator: func
    }

	render() {
        const questions = sortAndFilterAndCreateQuestions(this.props.questionFormName, this.props.questionOrder, this.props.questions);

		return (
            <div>
                <h3 id="form-header" className="form-header">{this.props.title}</h3>
                <p className="form-sub-header" id="form-sub-header">{this.props.headerText}</p>
                { questions }
            </div>
		);
	}
};



