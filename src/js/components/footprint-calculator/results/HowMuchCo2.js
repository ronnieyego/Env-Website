import React, { PropTypes } from "react";

const table = 1000;
const tub = 1568;
const grandPiano = 3000;

const tableText = 'Your CO2 footprint is comparable to burning your dining room table every month';
const tubText = 'Your CO2 footprint is comparable to filling a bath tub with gasoline and lighting it on fire every month';
const grandText = 'Your CO2 footprint is comparable to buring a 600 pound grand piano every month';

const notBad = 'That said, you\'re not doing too bad.  This footprint is less than the average american.';
const style = {textAlign: 'left'}

export default class HowMuchCo2 extends React.Component {
    static proptypes = {
        co2: PropTypes.number,
        averageAmerican: PropTypes.number
    }

	render() {
        const co2 = this.props.co2;
        let text;
        if (co2 > grandPiano) {
            text = grandText;
        } else if (co2 > tubText) {
            text = tubText;
        } else {
            text = tableText
        }
        const judgement = co2 < this.props.averageAmerican ? notBad : '';

		return (
            <h3 style={style}>
                {text}
                <br />
                {judgement}
            </h3>
		);
	}
};

