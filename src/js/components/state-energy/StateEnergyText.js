import React from 'react';
import PropTypes from 'prop-types';

export default class StateEnergyText extends React.Component {

    static propTypes = {
        stateName: PropTypes.string,
        CO2PerKwh: PropTypes.number,
        stateRankCo2: PropTypes.number,
        stateRankEnergyProduced: PropTypes.number,
        totalEnergyProduced: PropTypes.number,
    }

    render() {
        return (
            <div className="state-energy-text">
                <h1 className="state-energy-text-h1">State Energy Profile</h1>
                <p>States generate their electricity in different ways depending on different economic and social factors.  Generally states in the northwest primarily use hydroelectric and natural gas while appalachian states tend to use more coal.</p>
                <p>On average, {this.props.stateName} produces <b>{this.props.CO2PerKwh}</b> pounds of CO2 per every MWh of energy.  {this.props.stateName} ranks number {50 - this.props.stateRankCo2} in fewest CO2 per MWH.</p>
                <p>In 2015, {this.props.stateName} produced <b>{this.props.totalEnergyProduced.toLocaleString()}</b> MWhs of energy and released <b>{Math.round((this.props.CO2PerKwh * 1000 * this.props.totalEnergyProduced)).toLocaleString()}</b> pounds of CO2.  {this.props.stateName} ranks number {this.props.stateRankEnergyProduced} in total energy production.</p>
            </div>
        )
    }   
                       

}