import React from "react";
import PropTypes from 'prop-types';

import Question from '../../questions/QuestionHoc';
import HowMuchCo2 from '../../how-much-co2/HowMuchCo2';
import BarChart from '../../bar-chart/BarChartHoc';
import Divider from 'material-ui/Divider';

import { kwhPerPound } from './garbage-data';

export default class Computer extends React.Component {

    static propTypes = {
        questions: PropTypes.array.isRequired,
        computerType: PropTypes.string,
        totalCo2: PropTypes.number,
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
                <h3 className="costs-form-header">What's the CO<sub>2</sub> of Garbage?</h3>
                <div>
                    <div className="costs-form-sub-header">
                        <span>
                            Each week you will emit <HowMuchCo2 co2={this.props.totalCo2} /> pounds of CO<sub>2</sub> via your garbage.
                        </span>         
                    </div>
                    <p className="costs-form-bottom-paragraph">We generally don't think much of what happens when we throw something in the garbage can.  Since the 1950's, people generally stopped burning their garbage in their backyard and cities started shipping it to landfills. We currently have about 3,000 active landfills in the United States.</p>
                    {questions}
                </div>
                <div className="centered">
                </div>
                <Divider />
                <div>
                    <br />
                    <p className="costs-form-sub-header">The Story of Garbage</p>
                    <p className="costs-form-bottom-paragraph">What happens to your trash after it gets picked up by the city?  Most garbage/recycling trucks haul your city's trash to a transfer station.  This is a large warehouse usually located near the edge of a city and people do light processing of your trash.  People quickly review the garbage/recycling to make sure things are misplaced.  Recycling is then shipped to a recycling plant and the garbage is loaded on a freight train to the landfill.</p>
                    <p className="costs-form-bottom-paragraph">Landfills have evolved over America's history.  They started as holes near the edge of the city and have evolved into much more elaborate systems.  Newer landfills are designed to capture energy from landfil gas and eventually covered.  In fact, many former landfills have become parks or have been zoned for housing.  Recently, there's been a trend towards moving landfills further away from cities (no one wants to live near one).  As such, we've been building larger landfills in more remote places.  The downside is that we have to haul our waste further, but this has generally been offset by the economies of scale for larger landfills.</p>
                </div>
                <div>
                    <br />
                    <p className="costs-form-sub-header">Composting and Recycling</p>
                    <p className="costs-form-bottom-paragraph">How much do you save CO<sub>2</sub> by composting and recycling?  The short answer is not much for composting and potentially a ton by recycling. </p>
                    <p className="costs-form-bottom-paragraph">Composting appears great on the surface: you're keeping waste out of a dump and creating soil to use in your local garden.  There are 2 benefits from an emissions standpoint.  1. You save CO<sub>2</sub> by not hauling your waste an extra 100-300 miles.  2. You don't need fertilizer which takes CO<sub>2</sub> to make.  Plus you get to close the loop on food waste and produce more food from it.</p>
                    <p className="costs-form-bottom-paragraph">The data still supports composting, but it has a smaller effect than you might think.  It costs about 0.04 pounds of CO<sub>2</sub> to ship 1 pound of food waste 100 miles.  That's pretty low in the grand scheme of things.  On fertilizer side, it only costs about 0.8 pounds of CO<sub>2</sub> to make one pound of fertilizer.  Given how much fertilizer people use, this also isn't very significant.  Add to this that you only get about 0.12 pounds of compost per pound of food waste.  Finally there's a somewhat hidden cost to composting.  As organic material decays, it releases methane.  Most landfills (75%), have methane capture and burn it to produce energy (around {kwhPerPound} per pound of waste).  Most composting facilities do no have methane capture (its generally not cost effective).  All of that said, composting still has a positive effect, ableit a small one.  You'd get ~100 times larger impact buy wasting less food.</p>
                    <p className="costs-form-bottom-paragraph">Recycling has a very large impact.  Virgin material is usually pretty costly to make and process.  Recycling can usually give back 10-40% of the original cost it made to produce the item in the first place.  Metals have a higher return since they are more carbon intensive.</p>

                </div>
            </div>
		);
	}
}
