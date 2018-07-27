import React from "react";
import { array, object, string } from 'prop-types';

import SavingsCard from './SavingsCard';
import getCo2Savings from './calculations/savings';


const impactLevel = 100;

export default class Compare extends React.Component {
    static propTypes = {
        results: object,
        questions: array,
        userState: string
    }

	render() {
        const results = this.props.results;
        results.userState = this.props.userState;
        const savingSet = getCo2Savings(results, this.props.questions);
        const savings = savingSet.filter(saving => {
            return saving.card === true;
        });

        let useful = savings.filter(card => {
            return card.amount >= impactLevel;
        });
        let notUseful = savings.filter(card => {
            return card.amount < impactLevel;
        });

        useful = useful.map(saving => {
            return <SavingsCard 
                color={'lightgreen'}
                amount={saving.amount}
                display={saving.display}
                subtext={saving.subtext}
                learnMore={saving.learnMore}
                key={saving.display}
                category={this.props.category}
            />
        });

        notUseful = notUseful.map(saving => {
            return <SavingsCard 
                color={'lightpink'}
                amount={saving.amount} 
                display={saving.display} 
                subtext={saving.subtext} 
                learnMore={saving.learnMore}
                key={saving.display}
                category={this.props.category}
            />
        });

		return (
            <div className="savings-container">
                <b style={{fontSize: '300%'}}>Ways to reduce your footprint</b>
                <div style={{display: 'flex'}}>
                    <div className="savings-column">
                        <b className="savings-title">Large Impact</b>
                        {useful}
                    </div>
                    <div style={{borderLeft: 'solid black'}} />
                    <div className="savings-column">
                        <b className="savings-title">Small Impact</b>
                        {notUseful}
                    </div>
                </div>
                    
            </div>
		);
	}
};

