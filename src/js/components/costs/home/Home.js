import React from "react";
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';

import Question from '../../footprint-calculator/forms/Question';
import DropDownQuestion from '../../footprint-calculator/forms/DropDownQuestion';
import HowMuchCo2 from '../../HowMuchCo2';
import ids from '../../../utils/ids/index';
import { resolveArticle } from '../../../utils/article-fixer';
import BarChart from '../../CompareBarChart';

export default class House extends React.Component {

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
            }
            
        });

		return (
            <div className="costs">
                <h3 className="costs-form-header">What's the CO<sub>2</sub> cost of {resolveArticle(this.props.homeType)}?</h3>
                <div>
                    <div className="costs-form-sub-header">
                        <span>
                            This {this.props.homeType} will emit <HowMuchCo2 co2={this.props.totalCo2} exclude={[ids.buildSuburbanHome, ids.twoBedroomApartment]} /> pounds of CO<sub>2</sub>.
                        </span>         
                    </div>
                    <p className="costs-form-explainer">{resolveArticle(this.props.homeType, 'A')} takes a lot of CO<sub>2</sub> to build. Pretty much all of the CO<sub>2</sub> comes from creating the building materials.  Only 2% of CO<sub>2</sub> comes from construction energy and transportation.  This estimate does not include any CO<sub>2</sub> after construction (e.g. heating/cooling). </p>
                    <ul>
                        {questions}
                    </ul>

                    <BarChart 
                        graphData={this.props.graphData}
                        units={'Pounds of CO2'}
                        title={"CO2 breakdown of your Home"}
                        defaultMax={20} 
                        compare={false}
                        dataKey={'Breakdown'}
                    />
                    <Divider />
                    <div>
                        <p className="costs-form-sub-header">Key findings</p>
                        <p className="costs-form-bottom-paragraph">Living in an apartment doesn't save much CO<sub>2</sub> in the construction phase.  I thought that construction energy and transportation made up a larger percent of the overall footprint.  That said, living in an apartment can greatly reduce your footprint due to less travel and shared heating/cooling.</p>
                        <p className="costs-form-bottom-paragraph">Wood homes are the most CO<sub>2</sub> intensive.  This might surprise you.  If so, you're not alone as I had trouble accepting this fact.  Wood takes a lot of energy to process.  First there's logging on mountains, and then transportation to a plant.  At the plant, the wood needs to be stripped, cut, dried, and treated before finally being shipped again.</p>
                        <p className="costs-form-bottom-paragraph">You can greatly reduce your CO<sub>2</sub> in the demolition phase.  Most remodelers and renovators demolish the house/room.  However, in many cases, it's possible to reclaim the materials and reuse them.  Up to ~20% of the house's CO<sub>2</sub> can be reclaimed through this.</p>
                    </div>
                    <Divider />
                    <div>
                        <p className="costs-form-sub-header">Sources and Assumptions</p>
                        <p className="costs-form-bottom-paragraph">Despite being such a large footprint, I struggled to find data.  As such, this estimate is a lot of piecemeal and guesswork.  Most data came from 4 studies: <a href="https://www.amazon.com/How-Bad-Are-Bananas-Everything/dp/1553658310" target="_blank"><u>How Bad Are Bananas</u></a>, <a href="http://www.mdpi.com/2071-1050/8/6/579" target="_blank">this study on apartments</a>, <a href="http://emptyhomes.com/wp-content/uploads/2011/06/New-Tricks-With-Old-Bricks-final-12-03-081.pdf" target="_blank">this study on brick apartments</a>, and <a href="https://www.youtube.com/watch?v=SQbqthgn15w" target="_blank">this TED talk</a>.</p>
                        <p className="costs-form-bottom-paragraph">Fortunately, each study gave a pretty detailed breakdown of how much CO2 went into each part.  Unfortunately, none of the studies dived too deep into their methodologies for measuring CO2. The fear was that one methodology would produce significantly different results than the others.  When I broke down each study to CO2 per square foot, the numbers were pretty comparable and I don't think there's too large of an error.</p>
                        <p className="costs-form-bottom-paragraph">For a house, I'm assuming that the transportation CO2 is pretty insignificant (~1% in a city.  Larger for rural houses, but I'm guessing it's still not more than 2%).  For apartments, I'm estimating a 2% savings vs the same house.  This comes from efficiencies in construction tools and workers.</p>
                    </div>
                </div>
            </div>
		);
	}
}


