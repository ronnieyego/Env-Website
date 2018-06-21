import React from "react";
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';

import { STEPS } from './utils';
import FormTabs from './FormTabs';
import HouseholdForm from './HouseholdFormContainer';
import TransportationForm from './TransportationForm';
import FoodForm from './FoodForm';
import StuffFormContainer from './StuffFormContainer';

import { submitForm } from '../../../actions/footprint/form-actions';

const MAX_STEPS = 7;
const TOP_TABS = [
  {step: STEPS.home, label: 'Household'},
  {step: STEPS.transportation, label: 'Transportation'},
  {step: STEPS.food, label: 'Food'},
  {step: STEPS.stuffHouse, label: 'Stuff'}
]

@connect((store, props) => {
	return {
        questions: store.questions.questions,
        step: store.footprintForm.step,
        isSubmitReady: store.footprintForm.isSubmitReady,
        userGender: store.userInfo.userGender,
        isMobile: store.userInfo.isMobile,
	};
})
export default class FormContainer extends React.Component {

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

	render() {
        
      const submitError = !this.props.isSubmitReady ? (
        <div className="footprint-form-submit-invalid">
          Please fill out all answers correctly.
        </div>
      ) : null;

      const formError = null;
      
      const leftButton = this.props.step === 1 ? <div /> : (
          <RaisedButton 
            className="left-btn"
            href={'#footprint-form-title'}
            label="Back"
            onClick={() => this.decreaseStep(formError)}
            secondary={true}
          />
      );
      const rightButton = this.props.step === MAX_STEPS ? (
        <RaisedButton 
            className="right-btn"
            href={'#footprint-form-title'}
            label={this.props.isMobile ? 'Calculate' : 'Calculate My Footprint'}
            onClick={this.submitCalculator.bind(this, formError)}
            primary={true}
        />) : (
          <RaisedButton 
            className="right-btn"
            href={'#footprint-form-title'}
            label="Next"
            onClick={() => this.increaseStep(formError)}
            primary={true}
        />
      );

      let form;
      switch(this.props.step) {
        case STEPS.home || STEPS.homeActivities || STEPS.heatingCooling: 
          form = (<HouseholdForm questions={this.props.questions} step={this.props.step} dispatch={this.props.dispatch} />);
          break;
        case STEPS.transportation: 
          form = (<TransportationForm questions={this.props.questions} step={this.props.step} dispatch={this.props.dispatch} />);
          break;
        case STEPS.food: 
          form = (<FoodForm questions={this.props.questions} step={this.props.step} dispatch={this.props.dispatch} />);
          break;
        case STEPS.stuffHouse || STEPS.stuffActivities:
          form = (<StuffFormContainer questions={this.props.questions} step={this.props.step} dispatch={this.props.dispatch} />);
          break;
        default:
        form = (<HouseholdForm questions={this.props.questions} step={this.props.step} dispatch={this.props.dispatch} />);
      };

		return (
      <div className="footprint-main">
        <div className="footprint-form-paragraphs">
            <p>There is a ton of advice on how to lower your ecological footprint, "drive less, turn off your lights, don't eat meat".  Sure, they're all good ideas, but have drastically different impacts.  One flaw I've found in all of these suggestions is that they take a qualitative approach to a very quantitative problem.</p>
            <p>The calculator below attempts to give you reasonably accurate insights on your ecological footprint.  The goal is to give you the ability to reduce your footprint in a way that fits with your life.  The form takes about 5 minutes to fill out.</p>    
        </div>
        <div className="footprint-form">
          <h2 id="footprint-form-title" className="footprint-form-title"> Calculate your environmental footprint</h2>
          <FormTabs dispatch={this.props.dispatch} step={this.props.step} tabs={TOP_TABS} />
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