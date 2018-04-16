import React from "react";
import PropTypes from 'prop-types';

import ReactTooltip from 'react-tooltip';
import ids from '../utils/ids/index';

const data = [
    {
        id: ids.chargeIpad,
        name: 'Charging your Ipad once',
        description: 'It takes 0.06 kWhs to charge an Ipad.  The US emits 1.456 pounds of CO2 per kWh on average.',
        source: 'https://www.forbes.com/pictures/ekhf45ffjkj/ipad-150-per-year/#7728644cb9ea',
        amount: 0.09
    },
    {
        id: ids.watchTvOneHour,
        name: 'Watching TV for an hour',
        description: 'Most TVs use about 0.48 kWs.  The US emits 1.456 pounds of CO2 per kWh on average.',
        amount: 0.0672
    },
    
    {
        id: ids.largeCampfire,
        name: 'A Large Campfire',
        description: 'An average campfire burning ~20 pounds of wood',
        source: 'https://www.reddit.com/r/askscience/comments/h5tuq/how_much_carbon_dioxide_does_a_standard_campfire/?st=jef7sh2f&sh=7073ed92',
        amount: 20
    },
    {
        id: ids.treeSequester,
        name: 'Tree sequestering',
        description: 'This is how much CO2 a tree absorbs each year.',
        source: 'http://www.americanforests.org/explore-forests/forest-facts/',
        amount: 48
    },
    {
        id: ids.oneHundredTeaCandles,
        name: 'Using 100 Tea Candles',
        description: 'Each tea candle is 50g and is about 1in radius and 1in tall.',
        source: 'http://www.michaelsmithnews.com/2014/03/the-chemistry-of-earth-hour-1-candle-x-1-hour-8-x-the-co2-from-1-lightbulb-x-1-hour.html',
        amount: 69
    },
    {
        id: ids.poundOfChicken,
        name: 'One Pound of Chicken',
        description: 'This is a combination of feed, manure, and processing.',
        amount: 161
    },
    {
        id: ids.ipad,
        name: 'An Ipad',
        description: 'This includes materials, transportation, use, and disposal',
        amount: 297
    },
    {
        id: ids.oneBookcase ,
        name: 'One bookcase' ,
        description: 'This is how much CO2 it takes to create a 7\' x 4\' bookcase of books',
        amount: 400
    },
    {
        id: ids.exhalingOneYear ,
        name: 'Exhaling in one year',
        description: 'This is how much CO2 you inhale and exhale in one year.',
        source: 'http://www.slate.com/articles/news_and_politics/explainer/2009/08/7_billion_carbon_sinks.html',
        amount: 828
    },
    {
        id: ids.poundOfBeef ,
        name: 'One Pound of Beef',
        description: 'This is a mostly due to cow flatulence.',
        amount: 838
    },
    {
        id: ids.burnOilDrum ,
        name: 'Burning an oil drum',
        description: 'This is how much CO2 will be released if you burn a drum full of oil',
        amount: 880
    },
    {
        id: ids.burnTable ,
        name: 'Burning a table',
        description: 'This is how much CO2 will be released if you burned your dining room rable',
        amount: 1000
    },
    {
        id: ids.burnTubGasoline ,
        name: 'Burning a tub of gasoline',
        description: 'This is how much CO2 you\'d emit if you filled your bathtub with gasoline and lit it on fire',
        amount: 1568
    },
    {
        id: ids.smallBbq ,
        name: 'Small BBQ',
        description: 'Most of this come from growing 6 pounds of meat (2 beef, 2 pork, 2 chicken).  ~20 pounds comes from fuel for the grill itself.',
        amount: 2423
    },
    {
        id: ids.flyAcrossAmerica ,
        name: 'Flying across America',
        description: 'This is how much a full 747 emits on a flight from LA to NY',
        amount: 2500 
    },
    {
        id: ids.driveTenThousandMiles ,
        name: 'Driving ten thousand miles',
        description: 'This is how much CO2 you\'ll release if you drive 10,000 miles in a car with 25mpg',
        amount: 8000
    },
    {
        id: ids.powerTwitterOneHour ,
        name: 'Powering Twitter for an hour',
        description: 'Twitter\'s servers use about 8MW of energy in Georgia.  GA utilities release 1.16 pounds of CO2 per kwh',
        source: 'https://www.quora.com/Data-Centers-How-much-energy-does-a-server-farm-consume',
        amount: 9280
    },
    {
        id: ids.cementDriveway ,
        name: 'Making a cement driveway',
        description: 'A standard 600 sqft driveway weighs almost 40,000 pounds of CO2 intensive concrete.',
        source: 'https://www.quora.com/Data-Centers-How-much-energy-does-a-server-farm-consume',
        amount: 17512
    },
    {
        id: ids.raiseOneCow ,
        name: 'Raising one cow',
        description: 'An average cow weighs 1,500 pounds and produces ~4,500 servings of meat.',
        amount: 19000
    },
    {
        id: ids.oneAcreForestSequester ,
        name: '1 acre of forest sequestering',
        description: 'One acre of mature oak trees will absorb this much CO2 each year',
        source: 'http://www.nytimes.com/2012/12/04/science/how-many-pounds-of-carbon-dioxide-does-our-forest-absorb.html',
        amount: 30000
    },
    {
        id: ids.twoBedroomApartment ,
        name: '2 Bedroom apartment',
        description: 'This is the building cost for a 1,000 square foot apartment.',
        amount: 90000
    },
    {
        id: ids.burnHouse ,
        name: 'Burning down a house',
        description: 'This is a "standard" 2 story house made of wood',
        amount: 120000
    },
    {
        id: ids.showerEveryDay ,
        name: 'Showering every day',
        description: '15 minute shower every day for 80 years.  Varies largely by state',
        amount: 130000
    },
    {
        id: ids.acreOfForest ,
        name: '1 acre of forest',
        description: 'Total amount of CO2 stored in 1 acre of mature forest',
        source: 'http://www.arborenvironmentalalliance.com/carbon-tree-facts.asp',
        amount: 220462
    },
    {
        id: ids.powerGoogleOneHour ,
        name: 'Powering Google for an hour',
        description: 'Google uses 220 Mega Watts to power its servers.  This is the CO2 utilities emit to sustain them for 1 hour.',
        source: 'https://www.quora.com/Data-Centers-How-much-energy-does-a-server-farm-consume',
        amount: 320000
    },
    {
        id: ids.buildSuburbanHome ,
        name: 'Suburban Home',
        description: 'The building cost for a large suburb home',
        amount: 400000
    },
    {
        id: ids.spaceLaunch ,
        name: 'A Space Launch',
        description: 'A Falcon 9 from SpaceX will burn 262,570 pounds of rocket propellant',
        source: 'https://space.stackexchange.com/questions/13082/calculate-falcon-9-co2-emissions',
        amount: 440000
    },
    {
        id: ids.generalSherman ,
        name: 'General Sherman',
        description: 'General Sherman, the world\'s largest tree (by volume) weighs an estimated 1.5 Million pounds and holds a ton of carbon.',
        source: 'https://www.dewharvest.com/carbon-dioxide-stored-by-general-sherman-giant-sequoia.html',
        amount: 3172213
    },
    {
        id: ids.cementIndustryOneYear ,
        name: 'Cement Industry in 1 Year',
        description: 'Gloabal cement emissions.  This industry alone contributes 3.4% to all CO2 emissions.',
        source: 'https://www3.epa.gov/ttnchie1/conference/ei13/ghg/hanle.pdf',
        amount: 1827632154000
    },
];


const spanStyle = { display: 'inline-flex'};
const iconSize = {
    fontSize: '14px',
    marginTop: '5px',
    color: 'mediumpurple'
};

const upperLimit = {
    name: 'This footprint is huge',
    description: 'Wow this is a lot!  I don\'t even have anything to compare this against.  In any case, you should probably change something or else say "my bad" when people talk about climate change.',
    amount: 4000000
};
const range = .3; // 30% range for amounts
const FACTS_TO_DISPLAY = 3


export default class HowMuchCo2 extends React.Component {
    static propTypes = {
        co2: PropTypes.number,
        fontSize: PropTypes.number,
        exclude: PropTypes.array // Ids of those to avoid.
    }

    sortFacts(co2, facts) {
        if(facts.length < FACTS_TO_DISPLAY) {
            return facts;
        }
        const sorted = facts.sort((a,b) => {
            return Math.abs(a.co2 - co2) > Math.abs(b.co2 - co2);
        });
        const reduced = sorted.slice(0,FACTS_TO_DISPLAY);
        return reduced.sort((a,b) => {
            return a.co2 > b.co2;
        })
    }

    getLikelyFacts(co2, excludeArray) {
        if( co2 > upperLimit.amount) {
            return [upperLimit]
        }
        const facts = data.filter(fact => {
            return (
                fact.amount > (co2 * (1 - range))) 
                && (fact.amount < (co2 * (1+range))
                && excludeArray.indexOf(fact.id) === -1
            )
        });
        return this.sortFacts(co2, facts);
    }

    renderFact(fact) {
        const id1 =`how-much-co2-fact-${fact.name}`
        const id2 =`how-much-co2-name-${fact.name}`
        const id3 =`how-much-co2-desciption-${fact.name}`
        return (
            <div id={id1} className="how-much-co2-fact">
                <div id={id2} className="how-much-co2-fact-name">{fact.name}: {fact.amount.toLocaleString()} pounds of CO<sub>2</sub></div>
                <div id={id3} className="how-much-co2-fact-description">{fact.description}</div>
                <br />
            </div>
        );
    }

	render() {
        const co2 = this.props.co2;
        const excludeArray = this.props.exclude || [];
        const facts = this.getLikelyFacts(co2, excludeArray);
        const display = facts.map(fact => this.renderFact(fact))
		return (
            <span>
                <span style={spanStyle} data-tip data-for='howMuchCo2'>{co2.toLocaleString()} <i className="material-icons" style={iconSize}>help</i> </span>
                <ReactTooltip place="bottom" id='howMuchCo2' type='dark' effect='solid'>
                    <div id={`howMuchCO2-${co2}`}>
                        <p className="how-much-co2-fact-name">This footprint is close to. . .</p>
                        {display}
                    </div>
                </ReactTooltip>
            </span>   
		);
	}
}


