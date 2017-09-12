import React from "react";

import Card from './Card';
import getSavings from '../../../utils/footprint/calculate-footprint-savings'

export default class Compare extends React.Component {

    constructor(props) {
	    super();
	}

	render() {
        const results = this.props.results;
        let savings = getSavings(results);
        savings = savings.map(saving => {
            return <Card 
                amount={saving.amount} 
                display={saving.display} 
                subtext={saving.subtext} 
                learnMore={saving.learnMore}
            />
        })
        const containerStyle = {
            margin: 'auto',
            textAlign: 'left'
        };

        console.log('savings are', savings);        
        
		return (
            <div style={containerStyle}>
                <b>Savings below</b>
                    {savings}
            </div>
		);
	}
};

