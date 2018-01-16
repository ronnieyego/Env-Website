import React from "react";
import { connect } from 'react-redux';

import FootprintForm from './FootprintForm';
import { increaseStep, decreaseStep, getQuestionData } from '../../../actions/footprint/form-actions';
import _ from 'lodash';

@connect((store, props) => {
	return {
		questions: store.footprintForm.questions,
        step: store.footprintForm.step,
        isSubmitReady: store.footprintForm.isSubmitReady,
        userGender: store.userInfo.userGender
	};
})
export default class FootprintFormHoc extends React.Component {
    componentDidMount() {
        if(this.props.questions.length === 0) {
            // If server side questions fail to load, load them here.
            this.props.dispatch(getQuestionData());
        }
    }

	render() {
        const allQuestions = this.props.questions;
        const hourQuestions = _.filter(allQuestions, function(o) { return o['use-type'] === 'hour'; });
        const heatingCoolingQuestions = _.filter(hourQuestions, function(o) { return ['heating', 'cooling'].indexOf(o['sub-grouping']) > -1; });
        const applianceQuestions = _.filter(hourQuestions, function(o) { return ['heating', 'cooling'].indexOf(o['sub-grouping']) === -1; });
        const houseHoldQuestions = _.filter(allQuestions, function(o) { return o['use-type'] === 'monthly-own' || o['use-type'] === 'monthly-use'; });
        const foodQuestions = _.filter(allQuestions, function(o) { return o['use-type'] === 'serving'; });
        const transportation = _.filter(allQuestions, function(o) { return o['use-type'] === 'transportation'; });
		return (
            <FootprintForm {...this.props}
                allQuestions={allQuestions}
                applianceHour={applianceQuestions}
                heatingCoolingQuestions={heatingCoolingQuestions}
                houseHoldQuestions={houseHoldQuestions}
                foodQuestions={foodQuestions}
                transportation={transportation}
                isSubmitReady={this.props.isSubmitReady}
                userGender={this.props.userGender}
            />
        )
	}
};

