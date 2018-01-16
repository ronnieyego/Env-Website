import React from "react";
import _ from 'lodash';

import { RaisedButton } from 'material-ui';

import ApplianceForm from './ApplianceForm';
import FoodForm from './FoodForm';
import HeatingCoolingForm from './HeatingCoolingForm';
import HouseholdForm from './HouseholdForm';
import TransportationForm from './TransportationForm';

import { submitForm } from '../../../actions/footprint/form-actions';

const MAX_STEPS = 5

export default class FootprintForm extends React.Component {

    // For some reason, I can't do these in form actions.  No idea why
    decreaseStep(formError) {
       if(!formError) {
          this.props.dispatch({type: 'SUBMIT_READY', payload: true})
          this.props.dispatch({type: 'DECREASE_STEP'});
        } else {
          this.props.dispatch({type: 'SUBMIT_READY', payload: false})
        }
    }

    increaseStep(formError) {
      if(!formError) {
          this.props.dispatch({type: 'SUBMIT_READY', payload: true})
          this.props.dispatch({type: 'INCREASE_STEP'});
        } else {
          this.props.dispatch({type: 'SUBMIT_READY', payload: false})
        }
    }

    submitCalculator(formError) {
      if(!formError) {
        this.props.dispatch(submitForm(this.props.questions));
      }
    }

    getQuestionErrorIds() {
      const questions = this.props.allQuestions;
      let errorIds = [];
      questions.forEach(question => {
        if(question.errorText) {
          errorIds.push(question.name)
        }
      });
      return errorIds;
    }

	render() {
      if(!this.props.applianceHour) {
        return (<div>{'Loading Data'}</div>);
      }

      const errorIds = this.getQuestionErrorIds();
      const formError = errorIds.length > 0;
      const buttonJump = formError ? `#${errorIds[0]}` :  '#footprint-form-title';
      const submitJump = formError ? `#${errorIds[0]}` : '#footprint-finder-page-title';
        
      const submitError = !this.props.isSubmitReady ? (
        <div className="footprint-form-submit-invalid">
          Please fill out all answers correctly.
        </div>
      ) : null;
      
      const leftButton = this.props.step === 1 ? <div /> : (
          <RaisedButton 
            className="left-btn"
            href={buttonJump}
            label="Back"
            onClick={() => this.decreaseStep(formError)}
            secondary={true}
          />
      );
      const rightButton = this.props.step === MAX_STEPS ? (
        <RaisedButton 
            className="right-btn"
            href={submitJump}
            label="Calculate My Footprint"
            onClick={this.submitCalculator.bind(this, formError)}
            primary={true}
        />) : (
          <RaisedButton 
            className="right-btn"
            href={buttonJump}
            label="Next"
            onClick={() => this.increaseStep(formError)}
            primary={true}
        />
      );

      let form;
      switch(this.props.step) {
        case 1: 
          form = (<HouseholdForm questions={this.props.houseHoldQuestions} dispatch={this.props.dispatch} />);
          break;
        case 2:
          form = (<HeatingCoolingForm questions={this.props.heatingCoolingQuestions} dispatch={this.props.dispatch} />);
          break;
        case 3:
          form = (<ApplianceForm questions={this.props.applianceHour} dispatch={this.props.dispatch} />);
          break;
        case 4:
          form = (<FoodForm questions={this.props.foodQuestions} allQuestions={this.props.allQuestions} dispatch={this.props.dispatch} userGender={this.props.userGender} />);
          break;
        case 5:
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
          <h2 id="footprint-form-title" className="footprint-form-title"> Calculate your environmental footprint</h2>
            {form}
            {submitError}
            <div className="footprint-form-bottom-buttons">
              {leftButton}
              Step {this.props.step} of {MAX_STEPS}
              {rightButton}
            </div>
        </div>
      </div>
		);
	}
}