import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import StateDropdown from './StateDropdown';

@connect((store, props) => {
	return {
        userState: store.userInfo.userState
    };
})
export default class UserStateDropdown extends React.Component {

    updateUserState(event, index, value) {
        this.props.dispatch({type: 'UPDATE_USER_STATE', payload: value});
    };

	render() {
		return (
            <div className="footprint-form-question">
                <p className="footprint-form-question-name">What state do you live in?</p>
                <StateDropdown 
                    id="update-user-state"
                    value={this.props.userState}
                    updateQuestion={this.updateUserState.bind(this)}
                />
            </div>
		);
	}
}


