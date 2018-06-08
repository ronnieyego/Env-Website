import {Tabs, Tab} from 'material-ui/Tabs';

import React from 'react';
import { func } from 'prop-types';

export default class FormTabs extends React.Component {
    static propTypes = {
        dispatch: func.isRequired
    }

    updateStep(step) {
        this.props.dispatch({type: 'SET_STEP', payload: step})
    }

	render() {
		return (
			<Tabs>
                <Tab label="Household" onActive={() => this.updateStep(1)} >
                </Tab>
                <Tab label="Transportation" onActive={() => this.updateStep(2)} >
                </Tab>
                <Tab label="Utilities" onActive={() => this.updateStep(1)}>
                </Tab>
            </Tabs>
		);
	}
}
