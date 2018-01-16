import React from "react";
import PropTypes from 'prop-types';
import { RaisedButton } from 'material-ui';
import FacebookShare from './FacebookShare';

export default class ResultOptionButtons extends React.Component {

    static proptypes = {
        dispatch: PropTypes.func,
        answerId: PropTypes.number,
        resultsShown: PropTypes.string,
        resultsUnit: PropTypes.string,
        shareResults: PropTypes.bool
    }

    switchResult({resultsShown, resultsUnit}) {
        this.props.dispatch({type: 'UPDATE_RESULTS_SHOWN', payload: {resultsShown, resultsUnit} });
    }

	render() {
        let unit = 'CO2';
        if(this.props.resultsUnit === 'energy') {
            unit = 'energy'
        } else if (this.props.resultsUnit === 'water') {
            unit = 'water'
        }
		return (
            <div className="results-changer">
                <h1><b>I want to . . .</b></h1>
                {/* {Results shown buttons} */}
                {this.props.resultsShown !== 'compare' && <div className="results-changer-row">
                    <RaisedButton className="results-button" href="#top-of-results" onClick={() => this.switchResult({ resultsUnit: this.props.resultsUnit, resultsShown: 'compare'})} label="Compare" primary={true}/>
                    <p className="results-changer-row-explainer">Compare your footprint against different demographics.</p>
                </div>}
                {this.props.resultsShown !== 'personalBreakdown' && <div className="results-changer-row">
                    <RaisedButton className="results-button" href="#top-of-results" onClick={() => this.switchResult({ resultsUnit: this.props.resultsUnit, resultsShown: 'personalBreakdown'})} label="Dive Deeper" primary={true}/>
                    <p className="results-changer-row-explainer">Explore a detailed view into what makes up your {unit} use.</p>
                </div>}
                {this.props.resultsShown !== 'savings' && <div className="results-changer-row">
                    <RaisedButton className="results-button" href="#top-of-results" onClick={() => this.switchResult({ resultsUnit: this.props.resultsUnit, resultsShown: 'savings'})} label={`Reduce my ${unit} use`} primary={true}/>
                    <p className="results-changer-row-explainer">Discover some surprising ways to reduce {unit} use.</p>
                </div>}

                {/* {Change results unit} */}
                {this.props.resultsUnit !== 'co2' && <div className="results-changer-row">
                    <RaisedButton className="results-button" href="#top-of-results" onClick={() => this.switchResult({ resultsUnit: 'co2', resultsShown: this.props.resultsShown})} label="Explore CO2" primary={true}/>
                    <p className="results-changer-row-explainer">How much do you contribute to global warming?</p>
                </div>}
                {this.props.resultsUnit !== 'water' && <div className="results-changer-row">
                    <RaisedButton className="results-button" href="#top-of-results" onClick={() => this.switchResult({ resultsUnit: 'water', resultsShown: this.props.resultsShown})} label="Explore Water" primary={true}/>
                    <p className="results-changer-row-explainer">Most people have no idea how much water they use.</p>
                </div>}
                {this.props.resultsUnit !== 'energy' && <div className="results-changer-row">
                    <RaisedButton className="results-button" href="#top-of-results" onClick={() => this.switchResult({ resultsUnit: 'energy', resultsShown: this.props.resultsShown})} label="Explore Energy" primary={true}/>
                    <p className="results-changer-row-explainer">How much energy do you use and where does it come from?</p>
                </div>}

                {/* Moar Buttons!! */}
                <div className="results-changer-row">
                <a href="/how-your-footprint-was-calculated" target="_blank"><RaisedButton label="See the calculations" primary={true} /></a>
                    <p className="results-changer-row-explainer">A brief guide to how we constructed this footprint.</p>
                </div>
                {!this.props.shareResults && <div className="results-changer-row">
                    <a href="/" target="_blank"><RaisedButton label="Calculate my footprint" secondary={true} /></a>
                    <p className="results-changer-row-explainer">See if your footprint is smaller than your friend's.</p>
                </div>}
                {this.props.shareResults && <div className="results-changer-row">
                    <FacebookShare id={this.props.answerId} displayText="Share on Facebook" />
                    <p className="results-changer-row-explainer">See if your footprint is smaller than your friend's.</p>
                </div>}
            </div>
		);
	}
};

