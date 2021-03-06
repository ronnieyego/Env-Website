import React from "react";
import PropTypes from 'prop-types'

import Question from '../../questions/QuestionHoc';
import BarChart from '../../bar-chart/BarChartHoc';
import Divider from 'material-ui/Divider';

export default class Cup extends React.Component {

    static propTypes = {
        questions: PropTypes.array
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

        const negativeStyrafoamReason = this.props.washType === 'Dishwasher' ? "Whoa!! What's going on with the Styrafoam? To wash a cup in a dishwasher it takes 0.05lb/CO2 for each wash, whereas it just takes 0.02lb/CO2 to create a styrafoam cup. Pro tip: handwash your cups!" : ''

		return (
            <div className="costs">
                <h3 className="costs-form-header">What's the CO2 of a cup?</h3>
                <div >
                    <p className="costs-form-sub-header">{this.props.cupCo2}lb/CO<sub>2</sub> to create the cup</p>
                    {this.props.cupWashCo2 > 0 ? <p className="costs-form-sub-header">{this.props.cupWashCo2}lb/CO<sub>2</sub> for each wash</p> : '' }

                    <p className="costs-form-explainer">{this.props.displayText}</p>
                    {questions}
                    <Divider />
                    <p className="costs-form-sub-header">The following graph shows the number of uses of disposable cups after which it's better to use non-disposable alternatives when washed with <u>{this.props.washType}.</u></p>
                    <BarChart 
                        graphData={this.props.graphData}
                        units={'Uses'}
                        compare={true}
                        dataKey={'Paper'}
                        dataKeyCompare={'Styrafoam'}
                        mobileHeaders={['Cup Type', 'Breakeven (Paper)', 'Breakeven (Styrafoam)']}
                    />
                    <p>
                        {negativeStyrafoamReason}
                    </p>
                </div>
            </div>
		);
	}
}


