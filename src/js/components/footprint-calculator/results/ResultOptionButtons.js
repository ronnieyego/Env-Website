import React from "react";
import { RaisedButton } from 'material-ui';

export default class ResultOptionButtons extends React.Component {
    switchResult(payload) {
        this.props.dispatch({type: 'UPDATE_RESULTS_SHOWN', payload});
    }

	render() {
		return (
            <div className="results-buttons-container">
                <table className="results-buttons">
                    <tbody>
                        <tr className="results-buttons-header"><td className="results-buttons-header-cell"><b>CO<sub>2</sub></b></td></tr>
                        <tr><td className="results-buttons-cell"><RaisedButton className="results-button" href="#top-of-results" onClick={() => this.switchResult("co2-personalBreakdown")} label="My Personal CO2 Breakdown" primary={true}/></td></tr>
                        <tr><td className="results-buttons-cell"><RaisedButton className="results-button" href="#top-of-results" onClick={() => this.switchResult("co2-compare")} label="Compare my emissions" secondary={true}/></td></tr>
                        <tr><td className="results-buttons-cell"><RaisedButton className="results-button" href="#top-of-results" onClick={() => this.switchResult("co2-savings")} label="Reduce my carbon footprint" primary={true}/></td></tr>
                    </tbody>
                </table>
                <table className="results-buttons">
                    <tbody>
                        <tr className="results-buttons-header"><td className="results-buttons-header-cell"><b>Water</b></td></tr>
                        <tr><td className="results-buttons-cell"><RaisedButton className="results-button" href="#top-of-results" onClick={() => this.switchResult("water-personalBreakdown")} label="My Personal Water Breakdown" secondary={true}/></td></tr>
                        <tr><td className="results-buttons-cell"><RaisedButton className="results-button" href="#top-of-results" onClick={() => this.switchResult("water-compare")} label="Compare my water use" primary={true}/></td></tr>
                        <tr><td className="results-buttons-cell"><RaisedButton className="results-button" href="#top-of-results" onClick={() => this.switchResult("water-savings")} label="Reduce my water use" secondary={true}/></td></tr>
                    </tbody>
                </table>
                <table className="results-buttons">
                    <tbody>
                        <tr className="results-buttons-header"><td className="results-buttons-header-cell"><b>Energy</b></td></tr>
                        <tr><td className="results-buttons-cell"><RaisedButton className="results-button" href="#top-of-results" onClick={() => this.switchResult("energy-personalBreakdown")} label="My Personal Energy Breakdown" primary={true}/></td></tr>
                        <tr><td className="results-buttons-cell"><RaisedButton className="results-button" href="#top-of-results" onClick={() => this.switchResult("energy-compare")} label="Compare my energy use" secondary={true}/></td></tr>
                        <tr><td className="results-buttons-cell"><RaisedButton className="results-button" href="#top-of-results" onClick={() => this.switchResult("energy-savings")} label="Reduce my energy" primary={true}/></td></tr>
                    </tbody>
                </table>
                
            </div>
		);
	}
};

