import React from "react";
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import FacebookShare from './FacebookShare';
import { LIGHT_GREEN, MEDIUM_GREEN, LIGHT_PURPLE, LIGHT_BLUE } from "../../utils/shared-styles/colors";

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

    renderButton(resultsShown, label, color) {
        return (
            <div className="results-changer-button">
                <FlatButton
                    href="#top-of-results"
                    onClick={() => this.switchResult({ resultsShown })}
                    label={label}
                    backgroundColor={color}
                    style={{ borderRadius: '1rem' }}
                />
            </div>
        )
    }

	render() {
        const unit = 'CO2';
		return (
            <div className="results-changer">
                <hr className="results-changer-line" />
                <h2><b>There's more to explore!</b></h2>

                {/* {Results shown buttons} */}
                <div className="results-changer-row row">
                    {this.props.resultsShown !== 'compare' && (
                        <div className="results-changer-column col-xs-12 col-md-4">
                            <p className="results-changer-row-explainer">Compare your footprint against different demographics.</p>
                            {this.renderButton('compare', 'Compare', LIGHT_GREEN)}
                        </div>
                    )}
                    {this.props.resultsShown !== 'personalBreakdown' && (
                        <div className="results-changer-column col-xs-12 col-md-4">
                            <p className="results-changer-row-explainer">Explore a detailed view on your {unit} use.</p>
                            {this.renderButton('personalBreakdown', 'Dive Deeper', LIGHT_BLUE)}
                        </div>
                    )}
                    {this.props.resultsShown !== 'savings' && (
                        <div className="results-changer-column col-xs-12 col-md-4">
                            <p className="results-changer-row-explainer">Discover ways to reduce {unit} use.</p>
                            {this.renderButton('savings', 'Reduce My CO2 Use', MEDIUM_GREEN)}
                        </div>
                    )}
                    <div className="results-changer-column col-xs-12 col-md-4">
                        <p className="results-changer-row-explainer">A listing of the CO<sub>2</sub> cost of things.</p>
                        <a href="/static/how-much-co2" target="_blank">
                            <FlatButton
                                label="How Much CO2 is this"
                                backgroundColor={LIGHT_PURPLE}
                                style={{ borderRadius: '1rem' }}
                            />
                        </a>
                    </div>
                </div> 

                {/* Facebook button */}
                <div className="results-changer-row">
                    <hr className="results-changer-line" />
                    {this.props.shareResults && (
                        <div className="results-changer-facebook">
                            <FacebookShare id={this.props.answerId} displayText="Share on Facebook" />
                        </div>
                    )}
                </div>
            </div>
		);
	}
};

