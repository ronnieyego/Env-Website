import React from "react";
import { array, number, func } from 'prop-types';
import ids from '../../../utils/ids/index';

import { STEPS } from './utils';
import FormTabs from './FormTabs';
import HouseholdFormHome from './HouseholdFormHome';
import HouseholdFormActivities from './HouseholdFormActivites';
import HouseholdFormTemperature from './HouseholdFormTemperature';

import GenericForm from './GenericForm';
import HomeFormValidator from '../../../actions/footprint/validators/validate-home-form';
import { 
    CoolingIcon,
    LightbulbIcon,
    HouseIcon,
  } from '../../../assets/icons';

const homeForm = {
    questionOrder: [
        ids.userState,
        ids.homeType,
        ids.homeSqft,
        ids.homeMaterial,
        ids.liveWith
    ],
    questionFormName: 'household-home',
    headerText: 'Your home is one of the largest carbon costs in your life.  Answering the following questions will let you discover exactly how much.',
    step: 1,
    validator: HomeFormValidator
}


const SUB_TABs = [
    {step: STEPS.home, label: 'Home', icon: <HouseIcon size={'24px'} /> },
    {step: STEPS.homeActivities, label: 'Household Activities', icon: <LightbulbIcon size={'24px'} /> },
    {step: STEPS.heatingCooling, label: 'Heating and Cooling', icon: <CoolingIcon size={'24px'} /> },
];

export default class Household extends React.Component {
    static propTypes = {
        questions: array.isRequired,
        step: number.isRequired,
        dispatch: func.isRequired
    }

	render() {
        let form;
        let title;
        switch(this.props.step) {
            case STEPS.home: 
              form = (<GenericForm {...homeForm} />);
              title = 'Home';
              break;
            case STEPS.homeActivities: 
              form = (<HouseholdFormActivities questions={this.props.questions} step={this.props.step} dispatch={this.props.dispatch} />);
              title = 'Household Activities';
              break;
            case STEPS.heatingCooling: 
              form = (<HouseholdFormTemperature questions={this.props.questions} step={this.props.step} dispatch={this.props.dispatch} />);
              title = 'Heating and Cooling';
              break;
            default:
                throw new Error('Step did not match a form in Household.', step);
          };
		return (
            <div>
                <FormTabs dispatch={this.props.dispatch} step={this.props.step} tabs={SUB_TABs} subLevel={true} />
                <h3 className="footprint-form-header">{title}</h3>
                {form}
            </div>
		);
	}
};



