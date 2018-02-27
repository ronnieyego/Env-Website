import React from "react";
import PropTypes from 'prop-types';

import ReactTooltip from 'react-tooltip';

const oilDrum = 880;
const table = 1000;
const tub = 1568;
const grandPiano = 3000;
const twoStoryHouse = 120000;

const tableText = 'The CO2 footprint is comparable to burning your dining room table every month';
const tubText = 'The CO2 footprint is comparable to filling a bath tub with gasoline and lighting it on fire every month';
const oilDrumText = 'The CO2 footprint is comparable to burning a barrel of oil every month';
const threeOilDrumsText = 'The CO2 footprint is comparable to burning 3 barrels of oil every month';
const grandText = 'The CO2 footprint is comparable to burning a 600 pound grand piano every month';

const twoStoryHouseText = 'This is like burning a 2 story house down.';


export default class HowMuchCo2 extends React.Component {
    static propTypes = {
        co2: PropTypes.number,
        fontSize: PropTypes.number
    }

    getTooMuch(total) {
        return `The CO2 footprint is comparable to burning ${Math.round(total/oilDrum)} barrels of oil every month!`;
    }

	render() {
        const co2 = this.props.co2;
        let text;
        if (co2 > twoStoryHouse - 30000) {
            text = twoStoryHouseText;
        } else if (co2 > grandPiano * 2) {
            text = this.getTooMuch(co2);
        } else {
            return null;
        }
		return (
            <span>
                <span data-tip data-for='howMuchCo2'>{this.props.co2.toLocaleString()} <img src="/public/help.png" /> </span>
                <ReactTooltip id='howMuchCo2' type='dark' effect='solid'>
                    <span>{text}</span>
                </ReactTooltip>
            </span>   
		);
	}
}


