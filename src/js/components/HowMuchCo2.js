import React from "react";
import PropTypes from 'prop-types';

import ReactTooltip from 'react-tooltip';

const data = [
    {
        name: 'Tree sequestering',
        description: 'This is how much CO2 a tree absorbs each year.',
        source: 'http://www.americanforests.org/explore-forests/forest-facts/',
        amount: 48
    },
    {
        name: 'One bookcase' ,
        description: 'This how much CO2 it takes to create a 4 x 3 bookcase of books',
        amount: 400
    },
    {
        name: 'Exhaling in one year',
        description: 'This is how much CO2 you inhale and exhale in one year.',
        source: 'http://www.slate.com/articles/news_and_politics/explainer/2009/08/7_billion_carbon_sinks.html',
        amount: 828
    },
    {
        name: 'Burning an oil drum',
        description: 'This is how much CO2 will be released if you burn a drum full of oil',
        amount: 880
    },
    {
        name: 'Burning a table',
        description: 'This is how much CO2 will be released if you burned your dining room rable',
        amount: 1000
    },
    {
        name: 'Burning a tub of gasoline',
        description: 'This is how much CO2 you\'d emit if you filled your bathtub with gasoline and lit it on fire',
        amount: 1568
    },
    {
        name: 'Flying across America',
        description: 'This is how much a full 747 emits on a flight from LA to NY',
        amount: 2500 
    },
    {
        name: 'Driving ten thousand miles',
        description: 'This is how much CO2 you\'ll release if you drive 10,000 miles in a car with 25mpg',
        amount: 8000
    },
    {
        name: 'Powering Twitter for an hour',
        description: 'Twitter\'s servers use about 8MW of energy in Georgia.  GA utilities release 1.16 pounds of CO2 per kwh',
        source: 'https://www.quora.com/Data-Centers-How-much-energy-does-a-server-farm-consume',
        amount: 9280
    },
    {
        name: 'Raising one cow',
        description: 'An average cow weighs 1,500 pounds and produces ~4,500 servings of meat.',
        amount: 19000
    },
    {
        name: '1 acre of forest sequestering',
        description: 'One acre of mature oak trees will absorb this much CO2 each year',
        source: 'http://www.nytimes.com/2012/12/04/science/how-many-pounds-of-carbon-dioxide-does-our-forest-absorb.html',
        amount: 30000
    },
    {
        name: 'Burning down a house',
        description: 'This is a "standard" 2 story house made of wood',
        amount: 120000
    },
    {
        name: 'Showering every day',
        description: '15 minute shower every day for 80 years.  Varies largely by state',
        amount: 130000
    },
    {
        name: '1 acre of forest',
        description: 'Total amount of CO2 stored in 1 acre of mature forest',
        source: 'http://www.arborenvironmentalalliance.com/carbon-tree-facts.asp',
        amount: 220462
    },
    {
        name: 'Powering Google for an hour',
        description: 'Google uses 220 Mega Watts to power its servers.  This is the CO2 utilities emit to sustain them for 1 hour.',
        source: 'https://www.quora.com/Data-Centers-How-much-energy-does-a-server-farm-consume',
        amount: 320000
    },
    {
        name: 'A Space Launch',
        description: 'A Falcon 9 from SpaceX will burn 262,570 pounds of rocket propellant',
        source: 'https://space.stackexchange.com/questions/13082/calculate-falcon-9-co2-emissions',
        amount: 440000
    },
    {
        name: 'General Sherman',
        description: 'General Sherman, the world\'s largest tree (by volume) weighs an estimated 1.5 Million pounds and holds a ton of carbon.',
        source: 'https://www.dewharvest.com/carbon-dioxide-stored-by-general-sherman-giant-sequoia.html',
        amount: 3172213
    }
];


const spanStyle = { display: 'inline-flex'};
const iconSize = {
    fontSize: '14px',
    marginTop: '5px',
    color: 'mediumpurple'
};

const lowerLimit = {
    name: 'This footprint is pretty insignificant',
    description: 'While there are things that this footprint compares to, its pretty small in the grand scheme of things and I wouldn\'t worry about it.',
    amount: 25
};
const upperLimit = {
    name: 'This footprint is huge',
    description: 'Wow this is a lot!  I don\'t even have anything to compare this against.  In any case, you should probably change something or else say "my bad" when people talk about climate change.',
    amount: 4000000
};;
const range = .2; // 10% range for amounts

export default class HowMuchCo2 extends React.Component {
    static propTypes = {
        co2: PropTypes.number,
        fontSize: PropTypes.number
    }

    getTooMuch(total) {
        return `The CO2 footprint is comparable to burning ${Math.round(total/burnOilDrum)} barrels of oil every month!`;
    }

    getLikelyFacts(co2) {
        if( co2 < lowerLimit.amount) {
            return [lowerLimit]
        }
        if( co2 > upperLimit.amount) {
            return [upperLimit]
        }
        const facts = data.filter(fact => {
            return (fact.amount > (co2 * (1 - range))) && (fact.amount < (co2 * (1+range)))
        });
        return facts;
    }

    renderFact(fact) {
        const id1 =`how-much-co2-fact-${fact.name}`
        const id2 =`how-much-co2-name-${fact.name}`
        const id3 =`how-much-co2-desciption-${fact.name}`
        return (
            <div id={id1} className="how-much-co2-fact">
                <div id={id2} className="how-much-co2-fact-name">{fact.name} ({fact.amount.toLocaleString()} lb/CO2)</div>
                <div id={id3} className="how-much-co2-fact-description">{fact.description}</div>
                <br />
            </div>
        );
    }

	render() {
        const co2 = this.props.co2;
        const facts = this.getLikelyFacts(co2);
        const display = facts.map(fact => this.renderFact(fact))
		return (
            <span>
                <span style={spanStyle} data-tip data-for='howMuchCo2'>{co2.toLocaleString()} <i className="material-icons" style={iconSize}>help</i> </span>
                <ReactTooltip id='howMuchCo2' type='dark' effect='solid'>
                    <div id={`howMuchCO2-${co2}`}>
                        <p className="how-much-co2-fact-name">This footprint is close to. . .</p>
                        {display}
                    </div>
                </ReactTooltip>
            </span>   
		);
	}
}


