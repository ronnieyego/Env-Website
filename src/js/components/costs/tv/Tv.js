import React from "react";
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';

import Question from '../../footprint-calculator/forms/Question';
import DropDownQuestion from '../../footprint-calculator/forms/DropDownQuestion';
import HowMuchCo2 from '../../how-much-co2/HowMuchCo2';
import ids from '../../../utils/ids/index';
import { resolveArticle } from '../../../utils/article-fixer';
import UserStateDropdown from '../../UserStateDropdown';

export default class TV extends React.Component {

    static propTypes = {
        questions: PropTypes.array.isRequired,
        totalCo2: PropTypes.number,
        homeType: PropTypes.string
    }

	render() {

        const questions = this.props.questions.map(question => {
            if(question.type === 'int') {
                return (
                    <Question
                        errorText={question.errorText || ''}
                        key={question.name}
                        id={question.name}
                        question={question}
                        value={question.value}
                        aboveText={question.subtext}
                        dispatch={this.props.dispatch}
                        validator={question.validator}
                        floatingLabelText={question.floatingLabelText}
                        formType={question.formType}
                />
                )
            } else if(question.type === 'dropdown') {
                return (
                    <DropDownQuestion 
                        name={question.name}
                        key={question.name}
                        id={question.name}
                        selectOptions={question.selectOptions}
                        question={question}
                        subtext={question.subtext}
                        value={question.value}
                        dispatch={this.props.dispatch}
                        formType={question.formType}
                        marginLeft="0px"
                    />
                );
            } else if(question.type === 'user-state') {
                return <UserStateDropdown />;
            }
            
        });

		return (
            <div className="costs">
                <h3 className="costs-form-header">What's the CO<sub>2</sub> cost of a TV?</h3>
                <div>
                    <div className="costs-form-sub-header">
                        <span>
                            This TV will emit <HowMuchCo2 co2={this.props.totalCo2} exclude={[]} /> pounds of CO<sub>2</sub>.
                        </span>         
                    </div>
                    <p className="costs-form-explainer">A TV takes a lot of CO<sub>2</sub> to build. Pretty much all of the CO<sub>2</sub> comes from creating the building materials.  Only 2% of CO<sub>2</sub> comes from construction energy and transportation.  This estimate does not include any CO<sub>2</sub> after construction (e.g. heating/cooling). </p>
                    <ul>
                        {questions}
                    </ul>
                    <Divider />
                    <div>
                        <p className="costs-form-sub-header">Key findings</p>
                    </div>
                    <Divider />
                    <div>
                        <p className="costs-form-sub-header">Sources and Assumptions</p>
                    </div>
                </div>
            </div>
		);
	}
}


