import React from "react";

import Card from './Card';
import getSavings from '../../../utils/footprint/calculate-footprint-savings';
import { getCo2Savings } from '../../../utils/footprint/calculate-co2-savings';


const impactLevel = 100;

export default class Compare extends React.Component {

	render() {
        const results = this.props.results;
        const savingSet = this.props.category === 'energy' ? getSavings(results) : getCo2Savings(results, this.props.questions);
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
            return <Card 
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
            return <Card 
                color={'lightpink'}
                amount={saving.amount} 
                display={saving.display} 
                subtext={saving.subtext} 
                learnMore={saving.learnMore}
                key={saving.display}
                category={this.props.category}
            />
        });
        const containerStyle = {
            margin: 'auto',
            textAlign: 'center',
            border: 'solid black 3px'
        };

        const columnStyle = {
            textAlign: 'center',
            width: '50%',
            marginLeft: '15px',
            marginRight: '15px',
            marginBottom: '15px',
        }

		return (
            <div style={containerStyle}>
                <b style={{fontSize: '300%'}}>Ways to reduce your footprint</b>
                <div style={{display: 'flex'}}>
                    <div style={columnStyle}>
                        <b style={{fontSize: '200%'}}>Large Impact</b>
                        {useful}
                    </div>
                    <div style={{borderLeft: 'solid black'}} />
                    <div style={columnStyle}>
                        <b style={{fontSize: '200%'}}>Small Impact</b>
                        {notUseful}
                    </div>
                </div>
                    
            </div>
		);
	}
};

