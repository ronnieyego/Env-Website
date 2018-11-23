import React from "react";
import { connect } from 'react-redux';

// import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { STEPS } from './utils';
import HouseholdForm from './HouseholdFormContainer';
import TransportationForm from './TransportationForm';
import FoodForm from './FoodForm';
import FORMS from './generic-form-data';
import FormTabs from './FormTabs';
import GenericForm from './GenericForm';
import { changeStep } from '../../../actions/footprint/form-actions';

import submitV2 from '../../../actions/footprint/submit';

import { 
  StuffIcon,
  ForkKnifeIcon,
  HouseIcon,
  TransportationIcon
} from '../../../assets/icons';

const MAX_STEPS = 6;
const TAB_ICON_SIZE = '24px';
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
            <FlatButton 
                className="form-bottom-buttons-left"
                href={'#form-title'}
                label="Back"
                onClick={() => this.props.dispatch(changeStep(step, step - 1))}
            />
        );

        const rightButton = this.props.step === MAX_STEPS ? (
            <FlatButton 
                className="form-bottom-buttons-right"
                href={'#form-title'}
                label={this.props.isMobile ? 'Calculate' : 'Calculate My Footprint'}
                onClick={() => this.props.dispatch(submitV2())}
            /> )  : (
            <FlatButton 
                className="form-bottom-buttons-right"
                label="Next"
                onClick={() => this.props.dispatch(changeStep(this.props.step, this.props.step + 1))}
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
            <div className="form-background">
                <div className="form">
                    <FormTabs dispatch={this.props.dispatch} step={this.props.step} tabs={TOP_TABS} />
                    { form }
                    <div className="form-bottom-buttons">
                        {leftButton}
                        Step {this.props.step} of {MAX_STEPS}
                    {rightButton}
                    </div>
                </div>
                <br />
                <br />
                <br />
            </div>
		);
	}
}