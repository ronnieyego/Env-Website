import React, { PropTypes } from "react";

const oilDrum = 880;
const table = 1000;
const tub = 1568;
const grandPiano = 3000;

const tableText = 'The CO2 footprint is comparable to burning your dining room table every month';
const tubText = 'The CO2 footprint is comparable to filling a bath tub with gasoline and lighting it on fire every month';
const oilDrumText = 'The CO2 footprint is comparable to burning a barrel of oil every month';
const threeOilDrumsText = 'The CO2 footprint is comparable to burning 3 barrels of oil every month';
const grandText = 'The CO2 footprint is comparable to burning a 600 pound grand piano every month';

const notBad = 'That said, its not doing too bad.  This footprint is less than the average american.';

const style = {textAlign: 'left'}

export default class HowMuchCo2 extends React.Component {
    static proptypes = {
        co2: PropTypes.number,
        averageAmerican: PropTypes.number
    }

    getTooMuch(total) {
        return `The CO2 footprint is comparable to burning ${Math.round(total/oilDrum)} barrels of oil every month!`;
    }

	render() {
        const co2 = this.props.co2;
        let text;
        if (co2 > grandPiano * 2) {
            text = this.getTooMuch(co2);
        } else if (co2 > grandPiano) { // 3000
            text = grandText;
        } else if (co2 > 2200) {
            text = threeOilDrumsText;
        } else if (co2 > tub) { // 1500
            text = tubText;
        } else if (co2 > table) { // 1000
            text = tableText
        } else if (co2 > 500) { // 500
            text = oilDrumText
        } else {
            return null;
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

