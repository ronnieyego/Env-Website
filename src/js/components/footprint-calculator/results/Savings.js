import React from "react";
import getSavings from '../../../utils/footprint/calculate-footprint-savings'

export default class Compare extends React.Component {

    constructor(props) {
	    super();
	}


	render() {
        const results = this.props.results;
        let savings = getSavings(results);
        savings = savings.map(saving => {
            return <li>{saving.amount} kwh saved by {saving.display}</li>;
        })
        const containerStyle = {
            margin: 'auto',
            textAlign: 'left'
        };

        console.log('savings are', savings);        
        
		return (
            <div style={containerStyle}>
                <b>Savings below</b>
                <ul>
                    {savings}
                </ul>
                
            </div>
		);
	}
};

