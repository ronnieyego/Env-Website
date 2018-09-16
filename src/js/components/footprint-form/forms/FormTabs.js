import React from 'react';
import { connect } from 'react-redux';
import { array, bool, number, func } from 'prop-types';
import {Tabs, Tab} from 'material-ui/Tabs';
import cx from 'classnames';
import { changeStep } from '../../../actions/footprint/form-actions';

import { STEPS } from './utils';

@connect((store, props) => {
	return {
        isMobile: store.userInfo.isMobile
	};
})
export default class FormTabs extends React.Component {
    static propTypes = {
        dispatch: func.isRequired,
        step: number.isRequired,
        subLevel: bool,
        tabs: array.isRequired // [ { value, label, step }]
    }

    updateStep(step) {
        this.props.dispatch({type: 'SET_STEP', payload: step})
    }

    getTabFromStep(step) {
        switch(step) {
            case STEPS.home:
                return 'Home';
            case STEPS.homeActivities:
                return 'Household Activities';
            case STEPS.heatingCooling:
                return 'Heating and Cooling';
            case STEPS.transportation:
                return 'Transportation';
            case STEPS.food:
                return 'Food';
            case STEPS.stuff:
                return 'Stuff';
            default:
                throw new Error(`ERROR: In Form Tab.  No tab for step: ${step}`);
        }
    }

	render() {
        const value = this.getTabFromStep(this.props.step);
        const tabs = this.props.tabs.map(tab => (
            <Tab 
                className={cx('footprint-form-tab', {'footprint-form-tab-sublevel': this.props.subLevel})}
                key={`tab-step-${tab.step}`}
                value={tab.label}
                label={this.props.isMobile ? '' : tab.label}
                icon={tab.icon}
                onActive={() => this.props.dispatch(changeStep(this.props.step, tab.step))}/>
            )
        );

		return (
			<Tabs value ={value}>
                {tabs}
            </Tabs>
		);
	}
}
