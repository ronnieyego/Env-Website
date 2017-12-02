import React from "react";
import _ from 'lodash';

import ApplianceForm from './ApplianceForm';
import FoodForm from './FoodForm';
import HouseholdForm from './HouseholdForm';
import TransportationForm from './TransportationForm';

import { submitForm } from '../../../actions/footprint/form-actions';

const MAX_STEPS = 4

export default class FootprintForm extends React.Component {
    decreaseStep() {
      this.props.dispatch({type: 'DECREASE_STEP'});
    }

    increaseStep() {
      this.props.dispatch({type: 'INCREASE_STEP'});
    }

    submitCalculator() {
        this.props.dispatch(submitForm(this.props.questions));
    }

	render() {
      if(!this.props.applianceHour) {
        return (<div>{'Loading Data'}</div>);
      }
        const buttonStyle = {
          display: 'flex',
          justifyContent: 'space-between'
        };
        let form;
        let leftButton = this.props.step === 1 ? <div /> : (<button type="button" className="left-btn" onClick={() => this.decreaseStep()}>Back</button>);
        let rightButton = this.props.step === MAX_STEPS ? (<button type="button" className="right-btn" onClick={this.submitCalculator.bind(this)}>Calculate My Footprint</button>) : (<button type="button" className="right-btn" onClick={() => this.increaseStep()}>Next</button>);
        switch(this.props.step) {
          case 1: 
            form = (<ApplianceForm questions={this.props.applianceHour} dispatch={this.props.dispatch} />);
            break;
          case 2:
            form = (<HouseholdForm questions={this.props.houseHoldQuestions} dispatch={this.props.dispatch} />);
            break;
          case 3:
            form = (<FoodForm questions={this.props.foodQuestions} dispatch={this.props.dispatch} />);
            break;
          case 4:
            form = (<TransportationForm questions={this.props.transportation} dispatch={this.props.dispatch} />);
            break;
          default:
            form = (<ApplianceForm questions={this.props.applianceHour} dispatch={this.props.dispatch} />);
        };

		return (
      <div className="footprint-main">
        <div className="footprint-form-paragraphs">
            <p>There is a ton of advice on how to lower your ecological footprint, "drive less, turn off your lights, dont' eat meat".  Sure, they're all good ideas, but have drastically different impacts.  One flaw I've found in all of these suggestions is that they take a qualitative approach to a very quantitative problem.</p>
            <p>The calculator below attempts to give you reasonably accurate insights on your ecological footprint.  The goal is to give you the ability to reduce your footprint in a way that fits with your life.  The form takes about 5 minutes to fill out.</p>    
        </div>
        <div className="footprint-form">
          <h2 className="footprint-form-title"> Calculate your environmental footprint</h2>
            {form}
            <div style={buttonStyle}>
              {leftButton}
              Step {this.props.step} of {MAX_STEPS}
              {rightButton}
            </div>
        </div>
      </div>
		);
	}
}