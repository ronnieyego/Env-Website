import React from "react";
import PropTypes from 'prop-types'

import Question from '../../footprint-calculator/forms/Question';
import DropDownQuestion from '../../footprint-calculator/forms/DropDownQuestion';
import BarChart from '../../CompareBarChart';
import Divider from 'material-ui/Divider';

export default class Cup extends React.Component {

    static propTypes = {
        questions: PropTypes.array
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
                <h3 className="costs-form-header">What's the CO2 of a cup?</h3>
                <div >
                    <p className="costs-form-sub-header">{this.props.cupCo2}lb/CO<sub>2</sub> to create the cup</p>
                    {this.props.cupWashCo2 > 0 ? <p className="costs-form-sub-header">{this.props.cupWashCo2}lb/CO<sub>2</sub> for each wash</p> : '' }

                    <p className="costs-form-explainer">{this.props.displayText}</p>
                    <ul>
                        {questions}
                    </ul>
                    <Divider />
                    <BarChart 
                        graphData={this.props.graphData}
                        units={'Uses'}
                        title={"Compare to disposables"}
                        compare={true}
                        dataKey={'Paper'}
                        dataKeyCompare={'Styrafoam'}
                    />
                </div>
            </div>
		);
	}
}


