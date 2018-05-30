import React from "react";
import {array, bool, number, string, object } from 'prop-types';
import Divider from 'material-ui/Divider';

import { fromStateToHouse, transitCO2 } from'./package-data';
import Question from '../../questions/QuestionHoc';
import HowMuchCo2 from '../../how-much-co2/HowMuchCo2';
import ids from '../../../utils/ids/index';
import { resolveArticle } from '../../../utils/article-fixer';
import BarChart from '../../bar-chart/BarChartHoc';
import { getFullStateName } from '../../../utils/state-mappings';

const shippingMethodCo2Data = [
    {name: 'Air', Method: 0.986},
    {name: 'Rail', Method: 0.238},
    {name: 'Truck', Method: 0.3},
    {name: 'Ship', Method: 0.01}
];

export default class House extends React.Component {

    static propTypes = {
        questions: array.isRequired,
        totalCo2: number.isRequired,
        userState: string.isRequired,
        graphData: array.isRequired,
        results: object.isRequired,
        showResults: bool
    }


    getDisplayTextFromResults(results) {
        let text = 'Error.  Something went wrong.';
        if(results.fromOverseas) {
            const startText = results.noIdea ? `Let's assume y` : 'Y';
            if (results.rush) {
                text = `${startText}our package started in ${results.fromOverseas}.  Since you needed this package asap, it quickly travelled ${results.overseasRailDistance.toLocaleString()} miles to the nearest airport, loaded into a cargo plane and travelled ${results.airDistance.toLocaleString()} miles to the closest hub in ${getFullStateName(this.props.userState)}. The package was then loaded into a truck and travelled ~${fromStateToHouse} miles to your front door.`;
            } else {
                text = `${startText}our package started in ${results.fromOverseas} and travelled about ${results.overseasRailDistance.toLocaleString()} miles by rail to reach a port.  From there it got loaded on a container ship and sailed ${results.overseasShipDistance.toLocaleString()} miles to ${results.shipPort.name} (or a nearby port).  Next, your package was once again loaded on a train and travelled about ${results.usDistance.toLocaleString()} miles to a major hub in ${getFullStateName(this.props.userState)}.  Finally, the package was loaded into a truck and travelled ~${fromStateToHouse} miles to your front door.`;
            }
        } else if (results.producedIn) {
            const producedIn = results.producedIn.length > 2 ? results.producedIn : getFullStateName(results.producedIn)
            if(results.local) {
                text = `Let's assumse your order was produced in ${producedIn}.  Since this is somewhat close (under 200 miles) to your house, the package was probably faster and cheaper to ship the package by truck instead of plane or rail.  It travelled about ${results.usDistance.toLocaleString()} miles to a major hub in ${getFullStateName(this.props.userState)} and processed at a distribution center.  Finally, the package was loaded into a different truck and travelled ~${fromStateToHouse} miles to your front door.`;
            } else if (results.rush) {
                text = `Let's assumse your order was produced in ${producedIn}.  Since you needed this package quickly, it had to be rushed over. This means it travelled ${results.airDistance.toLocaleString()} miles by air and landed in the closest hub in ${getFullStateName(this.props.userState)}. The package was then loaded into a truck and travelled ~${fromStateToHouse} miles to your front door.`;
            } 
            else {
                text = `Let's assumse your order was produced in ${producedIn}.  Factories tend to have easy access to freight so we'll assume its instantly loaded onto a train.  From there it travelled about ${results.usDistance.toLocaleString()} miles to a major hub in ${getFullStateName(this.props.userState)}.  Finally, the package was loaded into a truck and travelled ~${fromStateToHouse} miles to your front door.`;
            }
        }
        return <p className="costs-form-sub-text">{text}</p>;
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
        const exludeHowMuchIds = [];

		return (
            <div className="costs">
                <h3 className="costs-form-header">What's the CO<sub>2</sub> cost of shipping a package?</h3>
                <div>
                    <div className="costs-form-sub-header">
                        {!this.props.showResults && <p>Please fill out the form below to see the CO<sub>2</sub> cost of shpping a package.</p>}
                        {this.props.showResults && <span>Your package will emit <HowMuchCo2 co2={this.props.totalCo2} exclude={exludeHowMuchIds} /> pounds of CO<sub>2</sub>.</span>}
                        {this.props.showResults && this.getDisplayTextFromResults(this.props.results)}       
                    </div>
                    {this.props.showResults && <BarChart
                        graphData={this.props.graphData}
                        units={'Pounds of CO2'}
                        title={`CO2 by shipping method`}
                        dataKey={'Method'}
                        mobileHeaders={['Method', 'Pounds of CO2']}
                    />}
                    {questions}
                    <br />
                    <Divider />
                    <br />
                    <div>
                        <p className="costs-form-sub-header">Key Findings and Questions</p>
                        <ul>
                            <li>Container ship is the lowest CO<sub>2</sub> intensive option.  It takes less CO<sub>2</sub> to transport something from China to the coast than it takes to cross half of America.</li>
                            <li>Rush delivery takes 5-10 times more CO<sub>2</sub> than non rush delivery.</li>
                            <li>How much does grouping orders save?
                                <p className="costs-form-indented-paragraph">The short answer is not much.  If you live in IL and order an item from CA and another from NY, the shipping company will probably group them close to your house.  Each item still had the same journey.  In the case where you order 2 packages from NY and NJ and they get grouped in NY before going out, its still likely that the total CO<sub>2</sub> will be similar.  Each item is still roughly doing the same distance as it did before.  In effect, your second item simply displaced someone else's order on that truck/train and it had to be put on the next one.  Grouping your orders will have an effect if the truck would otherwise run empty.  E.g. if a truck drove 200 miles with only your second order, it'd be a huge waste of CO<sub>2</sub>.  While this doesn't really happen on the package level, grouping can help companies run their trucks at a higher capacity and thus reduce the total number of trips.</p>
                            </li>
                            <li>How many distribution center are there?  Do packages ever go the wrong direction?
                                <p className="costs-form-indented-paragraph">A lot.  Amazon generally has 3-6 in each state!  There is usually a distribution center close to every metropolitan area and while packages can and sometimes do go in the wrong direction, its in the companies best interest to reduce waste and inefficiency.</p>
                            </li>
                        </ul>
                    </div>
                    <br />

                    <BarChart
                        graphData={shippingMethodCo2Data}
                        units={'Grams of CO2'}
                        title={`CO2 per km-kg by shipping method`}
                        dataKey={'Method'}
                        defaultMax={1}
                        mobileHeaders={['Method', 'gCO2 per kg-km']}
                    />
                    <Divider />
                    <div>
                        <p className="costs-form-sub-header">Methodoloy</p>
                        <p className="costs-form-bottom-paragraph">At its core, calculating the CO<sub>2</sub> cost of a package is simple.  For each leg of the package's journey, find out what mode of transportation its using and calculate its CO<sub>2</sub> contribution.  Most research uses the unit gCO<sub>2</sub>/km-kg.  This translates to grams of CO<sub>2</sub>e for every unit of weight-distance.  It makes sense as heavier objects require more energy to move and obviously longer distances take more energy as well.  The biggest assumption with this unit is that a doubling of weight has the same effect as a doubling of distance.  Conceptually this makes sense.  It should be noted that this unit ignores spacial constraints.  A really large but light item leaves less room for other items.</p>
                        <p className="costs-form-bottom-paragraph">Determining the gCO<sub>2</sub>/km-kg was pretty easy.  There's a decent amount of research on the subject and the range of values is pretty small (range was about the average +/- 50%; surprisingly low compared to other areas).  <a href="http://www.winnipeg.ca/finance/findata/matmgt/documents/2012/682-2012/682-2012_Appendix_H-WSTP_South_End_Plant_Process_Selection_Report/Appendix%207.pdf" target="_blank">This table</a> has a pretty good summary if you're curious.  The real struggle came with routing and what mode of transportation each leg entailed.</p>
                        <p className="costs-form-bottom-paragraph">Shipping within America is somewhat simple.  Generally, we load the item on a frieght train and transport it to a major distribution center.  From there it might get transferred to a closer distribution center.  Finally it gets trucked to your house. I assume that there's a direct freight line that takes the package close to your house.  Since most rail tracks aren't perfectly straight, I am underestimating the total CO<sub>2</sub> (rail CO<sub>2</sub> could be up to %20 higher).  Once it arrives at a hub near you, I am assuming that it travels 100 miles by truck to get to your house.  This is probably high if you live close to a city, but probably low if you live rurally.  At a certain distance, its more economical to transport the package via truck and ignore rail.  I used the cutoff of 200 miles, though I'm sure its different for each company.</p>
                        <p className="costs-form-bottom-paragraph">Overseas shipping is pretty simple.  The package needs to get to a port, travel to a US port, and then get to your door.  Bulk goods tend to get to a port via rail and a lot of industry purposely build factories with easy access to rail freight.  For China, most of their industrial hubs are located within 100 miles of the coast. I assumed they all took 100 miles of rail freight to get to a port (Europe is similar).  Since container shipping is the cheapest transit method, I assume that it'll be shipped to the closest major port near you (there are reasons to ship to a different port, but I believe most items bought are distributed across America and that shipping companies are pretty efficient). <a href="https://www.shiplilly.com/blog/ocean-shipping-from-china-to-miami-carrier-review-and-routes/#manhattan-bridge" target="_blank">This map</a> shows common shipping routes.  The distances are a little bit off since I don't know the exact routes and starting port.  The distances take the Panama Canal into account, but assume straight lines between destinations (this undercuts shipping accuracy by less than 1 pound).  Once in the states, it follows the same pattern as above starting with the port city.</p>
                        <p className="costs-form-bottom-paragraph">Rush shipping is the easiest calculation.  The package is transported to an airport first and then flown to the nearest hub.  I am assuming its then close enough to truck to its final detination.</p>
                    </div>
                </div>
            </div>
		);
	}
}


