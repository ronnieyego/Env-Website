import React from "react";
import { connect } from 'react-redux';

import FootprintForm from './FootprintForm';
import { increaseStep, decreaseStep, getQuestionData } from '../../../actions/footprint/form-actions';
import filter from 'lodash/filter';

@connect((store, props) => {
	return {
		questions: store.footprintForm.questions,
        step: store.footprintForm.step,
        isSubmitReady: store.footprintForm.isSubmitReady,
        userGender: store.userInfo.userGender,
        isMobile: store.userInfo.isMobile,
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
        const hourQuestions = filter(allQuestions, function(o) { return o['use-type'] === 'hour'; });
        const heatingCoolingQuestions = filter(hourQuestions, function(o) { return ['heating', 'cooling'].indexOf(o['sub-grouping']) > -1; });
        const applianceQuestions = filter(hourQuestions, function(o) { return ['heating', 'cooling'].indexOf(o['sub-grouping']) === -1; });
        const houseHoldQuestions = filter(allQuestions, function(o) { return o['use-type'] === 'monthly-own' || o['use-type'] === 'monthly-use'; });
        const foodQuestions = filter(allQuestions, function(o) { return o['use-type'] === 'serving'; });
        const transportation = filter(allQuestions, function(o) { return o['use-type'] === 'transportation'; });
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
                isMobile={this.props.isMobile}
            />
        )
	}
};

