import React from "react";
import { connect } from 'react-redux';

import FootprintForm from './FootprintForm';
import { increaseStep, decreaseStep, getQuestionData } from '../../../actions/footprint/form-actions';
import _ from 'lodash';

@connect((store, props) => {
	return {
		questions: store.footprintForm.questions,
        step: store.footprintForm.step
	};
})
export default class FootprintFormHoc extends React.Component {
    componentDidMount() {
        if(this.props.questions.length === 0) {
           this.props.dispatch(getQuestionData());
        }
    }

	render() {
        const allQuestions = this.props.questions;
        const applianceHour = _.filter(allQuestions, function(o) { return o['use-type'] === 'hour'; });
        const houseHoldQuestions = _.filter(allQuestions, function(o) { return o['use-type'] === 'monthly-own' || o['use-type'] === 'monthly-use'; });
        const foodQuestions = _.filter(allQuestions, function(o) { return o['use-type'] === 'serving'; });
        const transportation = _.filter(allQuestions, function(o) { return o['use-type'] === 'transportation'; });
		return (
            <FootprintForm {...this.props}
             applianceHour={applianceHour}
             houseHoldQuestions={houseHoldQuestions}
             foodQuestions={foodQuestions}
             transportation={transportation}
            />
        )
	}
};

