import React from "react";
import PropTypes from 'prop-types';

import ReactTooltip from '../tooltip/Tooltip';
import data from './how-much-co2-data';

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
            <div key={id1} className="how-much-co2-fact">
                <div key={id2} className="how-much-co2-fact-name">{fact.name}: {fact.amount.toLocaleString()} pounds of CO<sub>2</sub></div>
                <div key={id3} className="how-much-co2-fact-description">{fact.description}</div>
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
                <div style={spanStyle} data-tip data-for='howMuchCo2'>{co2.toLocaleString()} <i className="material-icons" style={iconSize}>help</i> </div>
                <ReactTooltip place="bottom" id='howMuchCo2'>
                    <div key={`howMuchCO2-${co2}`}>
                        <p key={`howMuchCO2-header${co2}`} className="how-much-co2-fact-name">This footprint is close to. . .</p>
                        {display}
                    </div>
                </ReactTooltip>
            </span>   
		);
	}
}


