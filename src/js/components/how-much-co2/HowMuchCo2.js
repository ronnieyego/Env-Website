import React from "react";
import PropTypes from 'prop-types';

import ReactTooltip from '../tooltip/Tooltip';
import getLikelyFacts from './get-display-facts';

const spanStyle = { display: 'inline-flex'};
const iconSize = {
    fontSize: '14px',
    marginTop: '5px',
    color: 'mediumpurple'
};

const FACTS_TO_DISPLAY = 3;


export default class HowMuchCo2 extends React.Component {
    static propTypes = {
        co2: PropTypes.number,
        fontSize: PropTypes.number,
        exclude: PropTypes.array // Ids of those to avoid.
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
        const facts = getLikelyFacts(co2, excludeArray, FACTS_TO_DISPLAY);
        const display = facts.map(fact => this.renderFact(fact))
		return (
            <span className="how-much-co2-container">
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


