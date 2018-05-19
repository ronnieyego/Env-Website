import React from "react";
import PropTypes from 'prop-types';

import Question from '../../footprint-calculator/forms/Question';
import DropDownQuestion from '../../footprint-calculator/forms/DropDownQuestion';
import HowMuchCo2 from '../../how-much-co2/HowMuchCo2';
import BarChart from '../../CompareBarChart';
import Divider from 'material-ui/Divider';
import ids from '../../../utils/ids/index';
import { resolveArticle } from '../../../utils/article-fixer';

export default class Tablet extends React.Component {

    static propTypes = {
        questions: PropTypes.array.isRequired,
        totalCo2: PropTypes.number,
        tabletName: PropTypes.string,
        graphData: PropTypes.array,
        phases: PropTypes.object // {production, transportation, use, recycling}
    }

	render() {

        const questions = this.props.questions.map(question => {
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
        });

		return (
            <div className="costs">
                <h3 className="costs-form-header">What's the lifetime CO<sub>2</sub> of {resolveArticle(this.props.tabletName)}?</h3>
                <div>
                    <div className="costs-form-sub-header">
                        <span>
                        {resolveArticle(this.props.tabletName, 'A')} will emit <HowMuchCo2 co2={this.props.totalCo2} exclude={[ids.ipad]} /> pounds of CO<sub>2</sub> in its lifetime.
                        </span>         
                    </div>
                    <p className="costs-form-explainer">Most of the CO<sub>2</sub> ({this.props.phases.productionCo2} lb/CO<sub>2</sub>) comes from material production phase.  This includes mining the materials, shipping them to the factory, and then assembling them.  Use is generally the next largest bucket ({this.props.phases.useCo2} lb/CO<sub>2</sub>).  While this varies by use and utilities, most tablets assume a 4 year lifecycle and average utilities (see your state's utility emissions <a href="/energy" target="_blank">here</a>.  Transportation has a relatively low cost ({this.props.phases.transportationCo2} lb/CO<sub>2</sub>).  Most tablets are assumbled in Asia and shipped to the US by sea.  Finally the disposal of tablets have a tiny footprint ({this.props.phases.recyclingCo2} lb/CO<sub>2</sub>) which comes from the cost to dismantle and recycle E-waste.</p>
                    {questions}
                </div>
                <div className="centered">
                    <BarChart graphData={this.props.graphData} units={'Pounds of CO2'} title={"Material Breakdown of a tablet"} defaultMax={300} dataKey={'Phase'} />
                </div>
                <Divider />
                <div>
                    <br />
                    <p className="costs-form-sub-header">Methodology and Assumptions</p>
                    <p className="costs-form-bottom-paragraph">All prouducers have generated environmental reports for their products (except Samsung) which detail how much CO2 each tablet produces.  They do have slightly different assumptions about usage, but overall are pretty consistent (Dell has a much high transportation cost, since they rely on air freight a lot).  In terms of accuracy, each company has an incentive to minimize their footprint, but I doubt that has a significant effect (>5%) on the outcome.  I estimated the "average" tablet (and Samsung's) by simply averaging the 3.</p>
                    <p className="costs-form-bottom-paragraph">While there are many different versions of each tablet (E.g. there are over 6 generations of Ipads), they tended to all be within the same range of impact.</p>
                </div> 
                <Divider />
                <div>
                    <p className="costs-form-sub-header">Sources</p>
                        <ul className="costs-form-list">
                            <li><a href="https://www.apple.com/environment/reports/" target="_blank">Apple</a>: Apple does a fantastic job at catalogging the footprint of their products.</li>
                            <li><a href="https://www.microsoft.com/en-us/environment/product/design" target="_blank">Microsoft</a>:  Click on the link to download a PDF of a lot of Microsoft products.</li>
                            <li><a href="http://www.dell.com/learn/us/en/vn/corp-comm/environment_carbon_footprint_products" target="_blank">Dell</a>:  Dell likes to measure sustainability in terms of orange juice and VW Golfs!</li>
                        </ul>
                </div> 
            </div>
		);
	}
}


