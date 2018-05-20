import React from "react";
import PropTypes from 'prop-types';

import Question from '../../questions/QuestionHoc';
import HowMuchCo2 from '../../how-much-co2/HowMuchCo2';

import BarChart from '../../bar-chart/BarChartHoc';

export default class Bbq extends React.Component {

    static propTypes = {
        questions: PropTypes.array.isRequired,
        totalCo2: PropTypes.number
    }

	render() {
        const questions = this.props.questions.map(question => (
            <Question
                questionType={question.type}
                key={question.name}
                question={question}
                value={question.value}
            />
        ));

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
                    <BarChart graphData={this.props.graphData} units={'Pounds of CO2'} title={"CO2 breakdown of a BBQ"} defaultMax={20} compare={false} dataKey={'BBQ'} mobileHeaders={['Food', 'Pounds of CO2']} />
                    {questions}
                </div>
            </div>
		);
	}
}


