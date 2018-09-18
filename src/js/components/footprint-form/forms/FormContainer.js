import React from "react";
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';
import { STEPS } from './utils';
import FORMS from './generic-form-data';
import IntroStep from './IntroStep';
import FormTabs from './FormTabs';
import HouseholdForm from './HouseholdFormContainer';
import TransportationForm from './TransportationForm';
import FoodForm from './FoodForm';
import GenericForm from './GenericForm';
import { changeStep } from '../../../actions/footprint/form-actions';

import submitV2 from '../../../actions/footprint/submit';

import { 
  StuffIcon,
  ForkKnifeIcon,
  HouseIcon,
  TransportationIcon
} from '../../../assets/icons';

const MAX_STEPS = 7;
const TAB_ICON_SIZE = '32px';
const TOP_TABS = [
  {step: STEPS.home, label: 'Household', icon: <HouseIcon size={TAB_ICON_SIZE} />},
  {step: STEPS.transportation, label: 'Transportation', icon: <TransportationIcon size={TAB_ICON_SIZE} />},
  {step: STEPS.food, label: 'Food', icon: <ForkKnifeIcon size={TAB_ICON_SIZE} /> },
  {step: STEPS.stuff, label: 'Stuff', icon: <StuffIcon size={TAB_ICON_SIZE} /> }
];


@connect((store, props) => {
	return {
        questions: store.questions.questions,
        step: store.footprintForm.step,
        userGender: store.userInfo.userGender,
        isMobile: store.userInfo.isMobile,
	};
})
export default class FormContainer extends React.Component {

	render() {

    const step = this.props.step;
    const leftButton = this.props.step === 1 ? <div /> : (
        <RaisedButton 
          className="left-btn"
          href={'#footprint-form-title'}
          label="Back"
          onClick={() => this.props.dispatch(changeStep(step, step - 1))}
          secondary={true}
        />
    );

    const rightButton = this.props.step === MAX_STEPS ? (
      <RaisedButton 
          className="right-btn"
          href={'#footprint-form-title'}
          label={this.props.isMobile ? 'Calculate' : 'Calculate My Footprint'}
          onClick={() => this.props.dispatch(submitV2())}
          primary={true}
      />) : (
          <RaisedButton 
            className="right-btn"
            label="Next"
            onClick={() => this.props.dispatch(changeStep(this.props.step, this.props.step + 1))}
            primary={true}
        />
    );

    let form;
    switch(this.props.step) {
      case STEPS.intro: 
        form = (<IntroStep />);
        break;
      case STEPS.home || STEPS.homeActivities || STEPS.heatingCooling: 
        form = (<HouseholdForm questions={this.props.questions} step={this.props.step} dispatch={this.props.dispatch} />);
        break;
      case STEPS.transportation: 
        form = (<TransportationForm questions={this.props.questions} step={this.props.step} dispatch={this.props.dispatch} />);
        break;
      case STEPS.food: 
        form = (<FoodForm questions={this.props.questions} step={this.props.step} dispatch={this.props.dispatch} />);
        break;
      case STEPS.stuff:
        form = (<GenericForm {...FORMS.STUFF_FORM} />);
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