import React from 'react';
import { bool, number } from 'prop-types';
import getDisplayFacts from '../how-much-co2/get-display-facts';

const FACTS_TO_DISPLAY = 1;

export default class ResultsHero extends React.Component {
    static propTypes = {
        isMobile: bool.isRequired,
        monthlyCo2: number.isRequired
    }

    renderFact(fact) {
        return (
            <div className="results-hero-fact" key={fact.name}>
                <p className="results-hero-fact-title">{fact.name}: {fact.amount.toLocaleString()} pounds of CO<sub>2</sub></p>
                <p className="results-hero-fact-description">{fact.description}</p>
            </div>
        )
    }
    
    render() {
        const displayFact = getDisplayFacts(this.props.monthlyCo2, [], FACTS_TO_DISPLAY);
		return (
			<div className={this.props.isMobile ? "results-hero-mobile" : "results-hero"}>
                <div className="results-hero-amount">
                    <div className="results-hero-facts-background" />
                    <p className="results-hero-amount-text">You release <b>{this.props.monthlyCo2.toLocaleString()}</b> pounds of CO<sub>2</sub> each month.</p>
                </div>
                {displayFact.length > 0 && (
                    <div className="results-hero-facts">
                        <div className="results-hero-facts-background" />
                        <p className="results-hero-facts-title">This footprint is similar to. . .</p>
                        { displayFact.map(fact => this.renderFact(fact))}
                    </div>
                )}
            </div>
		);
	}
}

