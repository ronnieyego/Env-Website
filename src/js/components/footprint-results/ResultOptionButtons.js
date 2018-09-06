import React from "react";
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import FacebookShare from './FacebookShare';

export default class ResultOptionButtons extends React.Component {

    static proptypes = {
        dispatch: PropTypes.func,
        answerId: PropTypes.number,
        resultsShown: PropTypes.string,
        shareResults: PropTypes.bool
    }

    switchResult({resultsShown}) {
        this.props.dispatch({type: 'UPDATE_RESULTS_SHOWN', payload: resultsShown });
    }

	render() {
        const unit = 'CO2';
		return (
            <div className="results-changer">
                <h1><b>I want to . . .</b></h1>
                {/* {Results shown buttons} */}
                {this.props.resultsShown !== 'compare' && <div className="results-changer-row">
                    <RaisedButton className="results-button" href="#top-of-results" onClick={() => this.switchResult({resultsShown: 'compare'})} label="Compare" primary={true}/>
                    <p className="results-changer-row-explainer">Compare your footprint against different demographics.</p>
                </div>}
                {this.props.resultsShown !== 'personalBreakdown' && <div className="results-changer-row">
                    <RaisedButton className="results-button" href="#top-of-results" onClick={() => this.switchResult({resultsShown: 'personalBreakdown'})} label="Dive Deeper" primary={true}/>
                    <p className="results-changer-row-explainer">Explore a detailed view into what makes up your {unit} use.</p>
                </div>}
                {this.props.resultsShown !== 'savings' && <div className="results-changer-row">
                    <RaisedButton className="results-button" href="#top-of-results" onClick={() => this.switchResult({resultsShown: 'savings'})} label={`Reduce my ${unit} use`} primary={true}/>
                    <p className="results-changer-row-explainer">Discover some surprising ways to reduce {unit} use.</p>
                </div>}

                {/* Moar Buttons!! */}
                {/* <div className="results-changer-row">
                <a href="/static/how-the-form-works" target="_blank"><RaisedButton label="See the calculations" primary={true} /></a>
                    <p className="results-changer-row-explainer">A brief guide to how we constructed this footprint.</p>
                </div> */}
                <div className="results-changer-row">
                <a href="/static/how-much-co2" target="_blank"><RaisedButton label="How Much CO2 is this" primary={true} /></a>
                    <p className="results-changer-row-explainer">A listing of the CO<sub>2</sub> cost of things.</p>
                </div> 
                {!this.props.shareResults && <div className="results-changer-row">
                    <a href="/" target="_blank"><RaisedButton label="Calculate my footprint" secondary={true} /></a>
                    <p className="results-changer-row-explainer">See if your footprint is smaller than your friend's.</p>
                </div>}
                {this.props.shareResults && <div className="results-changer-row">
                    <FacebookShare id={this.props.answerId} displayText="Share on Facebook" />
                    <p className="results-changer-row-explainer">See if your footprint is smaller than your friend's.</p>
                </div>}
                {/* {this.props.shareResults && <div className="results-changer-row">
                <RaisedButton className="results-button" href="#top-of-results" onClick={() => this.props.dispatch({ type: 'DISPLAY_ANSWERS', action: false})} label="Return to Form" primary={true}/>
                </div>} */}
            </div>
		);
	}
};

