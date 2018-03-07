import React from "react";
import PropTypes from 'prop-types';

import Question from '../../footprint-calculator/forms/Question';
import DropDownQuestion from '../../footprint-calculator/forms/DropDownQuestion';
import PieChart from '../../PieChart';
import HowMuchCo2 from '../../HowMuchCo2';

export default class Car extends React.Component {

    static propTypes = {
        questions: PropTypes.array.isRequired,
        totalCo2: PropTypes.number,
        text: PropTypes.string
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
                <h3 className="costs-form-header">What's the lifetime CO<sub>2</sub> of a car?</h3>
                <div>
                    <div className="costs-form-sub-header">
                        <span>
                            <HowMuchCo2 co2={this.props.totalCo2} /> lbs/CO<sub>2</sub> is the lifetime CO<sub>2</sub> for this car.
                        </span>         
                    </div>
                    <p className="costs-form-explainer">{this.props.text}</p>
                    <ul>
                        {questions}
                    </ul>
                </div>
                <PieChart 
                    graphData={this.props.creationBreakdown}
                    title={'Car Creation Emissions'}
                    subtitle={'CO2 cost of making a car'}
                    key={'Transportation Breakdown'}
                />
                <div>
                    <br />
                    <p className="costs-form-sub-header">Methodology</p>
                    <p className="costs-form-bottom-paragraph">Calculating the lifetime CO<sub>2</sub> of a car is complex and the figure should be treated as an estimate.  There are 2 mains parts of this footprint: creation and use.  For creation, ideally, we could figure out every single part that goes into a car and the CO<sub>2</sub> of each part.  Then we could add the cost of putting it all together.  This is considered a bottom-up approach.  Obviously this leads to problems.  How do we know the CO<sub>2</sub> for every part of every car?  There are thousands of factors that go into this and its virtually impossible to account for every one.</p>
                    <p className="costs-form-bottom-paragraph">Fortunately, there is a reasonable way around this: a top-down approach.  You take the entire car industry and look how it takes in materials in aggregate and how much CO<sub>2</sub> it releases.  From there you get a number of how much CO<sub>2</sub> per car as well as the average blend of inputs per unit of car.  But this snapshot isn't complete.  It completely omits the CO<sub>2</sub> of all of its inputs.  In order to resolve this, we must recursively go through each input and resolve it.  E.g. we know how much steel the car industry consumes so we look to the steel industry to see the CO<sub>2</sub> cost to manufacture a pound of steel.  Next we'd look at the iron and coal producers to see how much CO<sub>2</sub> it takes to get a pound of iron ore.  Once we have traced all of the inputs to their origin, we can add them all together to get a more complete picture of the CO<sub>2</sub> per car.</p>
                    <p className="costs-form-bottom-paragraph">A wonderful person named Mike Berners-Lee did this for his book <a href="https://www.amazon.com/How-Bad-Are-Bananas-Everything/dp/1553658310" target="_blank"><u>How Bad Are Bananas</u></a> and came up with a few ranges for a smart car, mid-sized car, and a Land Rover.  I did some extrapolation to get the CO<sub>2</sub> cost per pound of car.  The results were between 7lb of CO<sub>2</sub> per pound of car for a smart car to 16 for the Land Rover.  This makes sense that they vary by a factor of 2.  The smart car is built with fuel efficiency in mind.  Its lighter and uses more plastic vs metal (which has a much lower CO<sub>2</sub> footprint).  Similarly, the Land Rover is built to endure.  It has a lot more CO<sub>2</sub> intensive parts.  Based on how "rugged" your car is, the lb of CO<sub>2</sub> per pound of car variable is closer to either the smart car or Land Rover.</p>
                    <p className="costs-form-bottom-paragraph">Calculating useage CO<sub>2</sub> is pretty straightforward.  Its simply how many gallons of gas you consume (miles/mpg) times the CO<sub>2</sub> for each gallon of gas (about 20 pounds/gallon).</p>
                    <p className="costs-form-bottom-paragraph">I did not take disposal into account for 2 reasons.  One is that its super hard.  If you dump your car on the side of the road its 0.  If you sell it then it depends how much longer the car lasts.  Recycling has its own set of issues since different recyclers can process different amounts of a car.  In fact a lot of discarded cars end up in China.  Once recycled, you should probably account for the reduced CO<sub>2</sub> costs of the products made from your former car, but that's impossible to know (though you could get reasonable estimates).  Ultimately, there are a lot of disposal options and not a lot of good data on their impacts.  Secondly, I strongly suspect that the disposal cost of a car is pretty small compared to its overall footprint.  For a car that has travelled ~150,000 miles, I don't think that disposal would be greater than 5% of its total footprint.</p>
                    <br />
                </div> 
            </div>
		);
	}
}


