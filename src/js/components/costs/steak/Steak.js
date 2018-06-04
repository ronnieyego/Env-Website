import React from "react";
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';

import Question from '../../questions/QuestionHoc';
import HowMuchCO2 from '../../how-much-co2/HowMuchCo2';
import ids from '../../../utils/ids/index';

export default class Steak extends React.Component {

    static propTypes = {
        questions: PropTypes.array.isRequired,
        totalCo2: PropTypes.number.isRequired,
    }

    getDisplayText(type) {
        if(type === 'Corn fed') {
            return (
                <div>
                    <p className="costs-form-explainer">I am making some assumptions on this cow.  First and mostly importantly is that it is a factory cow.  This meant that it started the first 6 months of its life on the plains eating grass.  Then it was shipped to a concentrated animal feeding operation (CAFO).  It spent the remaining 8 months of its life eating a grain based diet (with lots of antibiotics).  Gaining about 2 pounds per day, this cow weighted about 1,100 pounds before it was butchered to make your steak.</p>
                    <p className="costs-form-explainer">A few factors affect this cow's footprint vs the grass fed cow.  First and most importantly, it has a much shorter life (14 months vs 24 months).  Secondly, its feed consists mostly of high fat corn.  This increased its food footprint about 10%.  Third, this cow is pumped full of antibiotics (CAFO's have awful living conditions.  <a href="https://www.pbs.org/wgbh/pages/frontline/shows/meat/interviews/pollan.html" target="_blank">Michal Pollan</a> has a good interview describing them).  I did not model the antibiotic's CO<sub>2</sub> cost but assume it's negligible.  Finally there's manure processing.  CAFO's basically exist above a layer of manure that gets shipped/processed occasionally.  This estimate embeds that cost equally for the industrial cow and the grass fed cow, though they probably are different.</p>
                </div>
            )
        } else if (type === 'Grass fed') {
            return (
                <div>
                    <p className="costs-form-explainer">This steak was probably labeled as organic and hormone free.  The cow spent its life on pastures eating grass, hay or alfalfa.  When it reached slaughter weight after about 24 months, it was sent to a slaughterhouse and turned into your steak.</p>
                    <p className="costs-form-explainer">A few factors affect this steak's footprint vs the industrial steak.  First and most importantly, the cow's lifespan is signifcantly longer (170% longer).  Secondly, it has lower feed emissions since grass has a much lower footprint than corn (modeled at 0 for simplicity).  This saved about 10% of the total footprint.</p>
                </div>
            )
        } else if (type === 'Real Kobe beef') {
            return (
                <div>
                    <p className="costs-form-explainer">Kobe beef is widely regarded as the best beef in the world (very debatable).  You've probably never had real Kobe beef as only a few restaurants in the US serve it.  Any restaurant can claim to sell it without any repercussions.  <a href="https://notesofnomads.com/kobe-beef/" target="_blank">Here's a good article</a> that gives a high level overview.</p>
                    <p className="costs-form-explainer">Kobe beef obviously has a higher footprint than the other steaks.  In short, they live longer than other cows (about 28 months), eat grass and malt beer (estimated as a feed 10% increase), and require shipping to the US (~40 pounds of CO<sub>2</sub>).</p>
                </div>
            )
        }
    }

	render() {
        const questions = this.props.questions.map(question => (
                <Question
                    questionType={question.type}
                    key={question.name}
                    question={question}
                    value={question.value}
                />
            )
        );

		return (
            <div className="costs">
                <h3 className="costs-form-header">What's the CO<sub>2</sub> cost of a steak?</h3>
                <div>
                    <div className="costs-form-sub-header">
                        <span>
                            This steak will emit <HowMuchCO2 co2={this.props.totalCo2} exclude={[ids.poundOfBeef]} /> pounds of CO<sub>2</sub>.
                        </span>         
                    </div>
                    {this.getDisplayText(this.props.type)}
                    {questions}
                    <Divider />
                    <div>
                        <p className="costs-form-sub-header">Sources and Methodolgy</p>
                        <p className="costs-form-bottom-paragraph">The <a href="http://www.fao.org/docrep/018/i3437e/i3437e.pdf" target="_blank">FAO</a> has good data on emissions for cattle.  Unfortunately different reports vary drastically.  Most estimates range from 28-70 pounds CO2 per pound of cow for industrial cows.  If you compare total cattle weight the US produces by its total emissions you get ~33 pounds CO2 per pound of cow.  I am using the low end estimate of 28 pounds CO2 per pound of cow as other sources tend to center around it.  That said it's likely a bit low.  A lot of factors go into this estimate so its hard to isolate without knowing exactly how the cow was raised.</p>
                        <p className="costs-form-bottom-paragraph">With 28 pounds CO2 per pound of cow for industrial cows as a baseline, I compared how the grass fed and Kobe cows were raised and adjusted the values accordingly.  These estimates have a higher margin of error than most other footprints due to the high variance of source data.</p>
                    </div>
                </div>
            </div>
		);
	}
}


