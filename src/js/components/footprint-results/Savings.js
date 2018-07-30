import React from "react";
import { connect } from 'react-redux';
import SavingsCard from './SavingsCard';
import getCo2Savings from './calculations/savings';

const impactLevel = 100;

@connect(store => {
	return {
        results: store.footprintFormAnswers.formResults,
        questions: store.questions.questions,
        userState: store.footprintFormAnswers.userState,
        isMobile: store.userInfo.isMobile
	};
})
export default class Compare extends React.Component {
	render() {
        const results = this.props.results;
        results.userState = this.props.userState;
        const savingSet = getCo2Savings(results, this.props.questions);
        const savings = savingSet.filter(saving => {
            return true;//saving.amount !== 0; // Add filter logic here maybe based on index later?
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
                    {!this.props.isMobile ? 
                        (
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
                        ) :
                        (
                            <div>Mobile</div>
                        )
                    }
                    
            </div>
		);
	}
};

