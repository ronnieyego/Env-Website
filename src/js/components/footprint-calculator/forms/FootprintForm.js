import React from "react";
import _ from 'lodash';

import ApplianceForm from './ApplianceForm';
import FoodForm from './FoodForm';
import HouseholdForm from './HouseholdForm';
import TransportationForm from './TransportationForm';


import calculateFootprintSubmit from '../../../utils/footprint/calculate-footprint-submit';

const MAX_STEPS = 4

export default class FootprintForm extends React.Component {
  constructor(props) {
    super()
  }

    decreaseStep() {
      this.props.dispatch({type: 'DECREASE_STEP'});
    }

    increaseStep() {
      this.props.dispatch({type: 'INCREASE_STEP'});
    }
    validateData() {
      // Rewrite

      // let transportationQuestions = this.props.transportationQuestions;
      // let filteredTransportationQuestions = _.filter(transportationQuestions, function(o) { return o['useBool'] !== true; })
      //   .map(question => question.name);
      // let missingQuestions = [];
      // filteredTransportationQuestions.forEach(question => {
      //   if(!transportData[question] || transportData[question].value === '') {
      //     if(transportData["What's the fuel for your car?"].value !== 'Electric' || question !== 'What\'s the MPG of your car?') {
      //       missingQuestions.push(question);
      //     }
      //   }
      // });

      // if(transportData['What\'s the MPG of your car?'] && transportData['What\'s the MPG of your car?'].value == 0) {
      //     return false;
      //   }
      // if(missingQuestions.length > 0) {
      //   return false;
      // }
      return true;

  }
    submitCalculator() {
        let valid = this.validateData();
        if (valid) {
          let footprintResults = calculateFootprintSubmit(this.props.questions);
          console.log('Footprint results are back.  Values in kwh/period', footprintResults);
          fetch('/api/footprint-form/answer', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              formName: 'footprint-finder',
              formAnswers: this.props.questions,
              results: footprintResults
            })
          });
          this.props.displayResults(this.props.questions,footprintResults);
        } else {
          alert('Please fill out all of the fields');
        }
    }

	render() {
      if(!this.props.applianceHour) {
        return (<div>{'Loading Data'}</div>);
      }
        const containerStyle = {
            border: '3px solid gray',
            margin: 'auto',
            backgroundColor: 'lightgrey',
            width: '500px'
        };
        const headerStyle = {
            fontWeight: 'bold',
            border: '3px solid gray',
            textAlign: 'center',
            backgroundColor: 'white'
        };

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
      <div>
        <div style={{textAlign:'left'}}>
            <p>There is a ton of advice on how to lower your ecological footprint, "drive less, turn off your lights, dont' eat meat".  Sure, they're all good ideas, but have drastically different impacts.  One flaw I've found in all of these suggestions is that they take a qualitative approach to a very quantitative problem.</p>
            <p>The calculator below attempts to give you reasonably accurate insights on your ecological footprint.  The goal is to give you the ability to reduce your footprint in a way that fits with your life.  The form takes about 5 minutes to fill out.</p>    
        </div>
        <div style={containerStyle}>
          
          <h2 style={headerStyle}> Calculate your environmental footprint</h2>
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