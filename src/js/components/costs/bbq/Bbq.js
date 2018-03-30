import React from "react";
import PropTypes from 'prop-types';

import Question from '../../footprint-calculator/forms/Question';
import DropDownQuestion from '../../footprint-calculator/forms/DropDownQuestion';
import HowMuchCo2 from '../../HowMuchCo2';

import BarChart from '../../CompareBarChart';

export default class Bbq extends React.Component {

    static propTypes = {
        questions: PropTypes.array.isRequired,
        totalCo2: PropTypes.number
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
            }
            
        });

		return (
            <div className="costs">
                <h3 className="costs-form-header">What's the CO<sub>2</sub> cost of a barbeque?</h3>
                <div>
                    <div className="costs-form-sub-header">
                        <span>
                            This bbq will emit <HowMuchCo2 co2={this.props.totalCo2} /> pounds of CO<sub>2</sub>.
                        </span>         
                    </div>
                    <p className="costs-form-explainer">Only {Math.round(this.props.grillCo2/this.props.totalCo2 * 100)}% of the emissions come from the actual grilling.  Most of the emissions come from cooking the meat.</p>
                    <BarChart graphData={this.props.graphData} units={'Pounds of CO2'} title={"CO2 breakdown of a BBQ"} defaultMax={20} compare={false} dataKey={'BBQ'} />
                    <ul>
                        {questions}
                    </ul>
                </div>
            </div>
		);
	}
}


