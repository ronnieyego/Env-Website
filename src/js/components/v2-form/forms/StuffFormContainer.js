import React from "react";
import { array, number, func } from 'prop-types';

import { STEPS } from './utils';
import FormTabs from './FormTabs';
import StuffFormHome from './StuffFormHome';

const SUB_TABs = [
    {step: STEPS.stuffHouse, label: 'Stuff you own'},
    {step: STEPS.stuffActivities, label: 'Stuff you do'},
]

export default class StuffFormContainer extends React.Component {
    static propTypes = {
        questions: array.isRequired,
        step: number.isRequired,
        dispatch: func.isRequired
    }
	render() {
        let form;
        let title;
        switch(this.props.step) {
            case STEPS.stuffHouse: 
              form = (<StuffFormHome questions={this.props.questions} step={this.props.step} dispatch={this.props.dispatch} />);
              title = 'Stuff you own';
              break;
            case STEPS.stuffActivities: 
              form = (<StuffFormHome questions={this.props.questions} step={this.props.step} dispatch={this.props.dispatch} />);
              title = 'Stuff you do';
              break;
            default:
                throw new Error('Step did not match a form in Stuff.', step);
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



