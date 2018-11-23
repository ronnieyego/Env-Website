import React from "react";
import { array, number, func } from 'prop-types';

import { STEPS } from './utils';
import FormTabs from './FormTabs';
import GenericForm from './GenericForm';
import FORMS from './generic-form-data';
import { 
    CoolingIcon,
    LightbulbIcon,
    HouseIcon,
  } from '../../../assets/icons';

const ICON_SIZE = '24px';

const SUB_TABs = [
    {step: STEPS.home, label: 'Home', icon: <HouseIcon size={ICON_SIZE} /> },
    {step: STEPS.homeActivities, label: 'Household Activities', icon: <LightbulbIcon size={ICON_SIZE} /> },
    {step: STEPS.heatingCooling, label: 'Heating and Cooling', icon: <CoolingIcon size={ICON_SIZE} /> },
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
              form = (<GenericForm {...FORMS.HOME_FORM} />);
              title = 'Home';
              break;
            case STEPS.homeActivities: 
              form = (<GenericForm {...FORMS.HOME_ACTIVITY_FORM} />);
              title = 'Household Activities';
              break;
            case STEPS.heatingCooling: 
            form = (<GenericForm {...FORMS.HOME_TEMPERATURE_FORM} />);
              title = 'Heating and Cooling';
              break;
            default:
                throw new Error('Step did not match a form in Household.', step);
          };
		return (
            <div>
                <FormTabs dispatch={this.props.dispatch} step={this.props.step} tabs={SUB_TABs} subLevel={true} />
                {form}
            </div>
		);
	}
};



