import React from "react";
import PropTypes from 'prop-types';

import Question from '../footprint-calculator/forms/Question';
import DropDownQuestion from '../footprint-calculator/forms/DropDownQuestion';
import HowMuchCo2 from '../HowMuchCo2';

export default class Clothes extends React.Component {

    static propTypes = {
        questions: PropTypes.array.isRequired,
        co2: PropTypes.object //{ total, shirts, jackets, pants, shorts, socksUndies, accessories, shoes }
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
                <h3 className="costs-form-header">What's the CO<sub>2</sub> of my clothes?</h3>
                <div>
                    <div className="costs-form-sub-header">
                        <span>
                            Text goes here  {this.props.co2.total}
                            {/* <HowMuchCo2 co2={this.props.totalCo2} /> lbs/CO<sub>2</sub> is the lifetime CO<sub>2</sub> for this car. */}
                        </span>         
                    </div>
                    {/* <p className="costs-form-explainer">{this.props.text}</p> */}
                    <ul>
                        {questions}
                    </ul>
                </div>
                <div>
                    <br />
                    <p className="costs-form-sub-header">Methodology</p>
                    <br />
                </div> 
            </div>
		);
	}
}


