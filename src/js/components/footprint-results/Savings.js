import React from "react";
import { connect } from 'react-redux';
import SavingsCard from './SavingsCard';
import getCo2Savings from './calculations/savings';
import { GREEN_GRADIENT, YELLOW_GRADIENT } from '../../utils/shared-styles/colors';

const impactLevel = 100;

@connect(store => {
	return {
        results: store.footprintFormAnswers.formResults,
        questions: store.questions.questions,
        userState: store.footprintFormAnswers.userState,
        isMobile: store.userInfo.isMobile,
        largeCount: store.footprintFormAnswers.savingsCardDisplayCountLargeImpact,
        smallCount: store.footprintFormAnswers.savingsCardDisplayCountSmallImpact,
	};
})
export default class Compare extends React.Component {

    makeCard(saving, gradient) {
       return (
        <SavingsCard 
                gradient={gradient}
                amount={saving.amount}
                display={saving.display}
                subtext={saving.subtext}
                learnMore={saving.learnMore}
                key={saving.display}
                category={this.props.category}
            />
        );
    }

    renderDesktopLeanrMore(useful, notUseful) {
        const majoritySize = useful.length > notUseful.length ? 'big' : 'small';
        const majorityLength = Math.max(useful.length, notUseful.length);
        return this.renderLearnMore(majorityLength, majoritySize)
    }

    renderLearnMore(currentlyDisplayed, size) {
        if(size === 'big') {
            if(currentlyDisplayed < this.props.largeCount) {
                return null;
            }
            return <a className="savings-see-more" onClick={() => this.props.dispatch({type: 'SET_LARGE_IMPACT_SAVINGS_CARD_DISPLAY_COUNT', payload: this.props.largeCount + 5})}>See more</a>
        } else if(size === 'small') {
            if(currentlyDisplayed < this.props.smallCount) {
                return null;
            }
            return <a className="savings-see-more" onClick={() => this.props.dispatch({type: 'SET_SMALL_IMPACT_SAVINGS_CARD_DISPLAY_COUNT', payload: this.props.smallCount + 5})}>See more</a>
        } else {
            console.log('ERROR -- invalid size for savings cards');
            return null;
        }
    }

    renderMobile(useful, notUseful) {
        return(
            <div>
                <hr />
                <b className="savings-column-title">Large Impact</b>
                {useful}
                <br />
                {this.renderLearnMore(useful.length, 'big')}
                <br />
                <hr />
                <br />
                <b className="savings-column-title">Small Impact</b>
                {notUseful}
                <br />
                {this.renderLearnMore(notUseful.length, 'small')}
                <br />
            </div>
        );
    }

	render() {
        const results = this.props.results;
        results.userState = this.props.userState;
        console.log('RESULTS IS', results);
        console.log('QUESTIONS IS', this.props.questions);
        const savingSet = getCo2Savings(results, this.props.questions);
        const savings = savingSet.filter(saving => {
            return saving.amount !== 0; // Add filter logic here maybe based on index later?
        });

        const useful = savings
            .filter(card => card.amount >= impactLevel)
            .sort((a,b) => b.amount - a.amount)
            .filter((card, index) => index < this.props.largeCount)
            .map(saving => this.makeCard(saving, GREEN_GRADIENT));
        const notUseful = savings
            .filter(card => card.amount < impactLevel && card.amount > 0)
            .sort((a,b) => b.amount - a.amount)
            .filter((card, index) => index < this.props.smallCount)
            .map(saving => this.makeCard(saving, YELLOW_GRADIENT));

		return (
            <div className="savings-container">
                <p className="savings-title">Ways to reduce your footprint</p>
                    {!this.props.isMobile ? 
                        (
                            <div>
                                <div style={{display: 'flex'}}>
                                    <div className="savings-column">
                                        <b className="savings-column-title">Large Impact</b>
                                        {useful}
                                    </div>
                                    <div style={{borderLeft: 'solid black'}} />
                                    <div className="savings-column">
                                        <b className="savings-column-title">Small Impact</b>
                                        {notUseful}
                                    </div>
                                </div>
                                <br />
                                {this.renderDesktopLeanrMore(useful, notUseful)}
                                <br />
                            </div>
                        ) :
                        (
                            this.renderMobile(useful, notUseful)
                        )
                    }
            </div>
		);
	}
};

