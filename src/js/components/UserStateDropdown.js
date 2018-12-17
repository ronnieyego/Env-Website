import React from "react";
import { bool, number, string } from 'prop-types';
import { connect } from 'react-redux';

import StateDropdown from './StateDropdown';
import { updateQuestionsV2} from '../actions/footprint/form-actions';

@connect((store, props) => {
	return {
        userState: store.userInfo.userState,
        isMobile: store.userInfo.isMobile
    };
})
export default class UserStateDropdown extends React.Component {

    static propTypes = {
        id: number,
        omitUs: bool,
        errorText: string
    }

    updateUserState(event, index, value) {
        // Dispatch both for now.  Utlimately userState is a question and should live with questions
        this.props.dispatch({type: 'UPDATE_USER_STATE', payload: value});
        this.props.dispatch(updateQuestionsV2({id: this.props.question.id, value, index})) // Add question info
    };
    
	render() {
        const containerClass = `form-question-container${!this.props.isMobile ? ' row' : '-mobile'}`;
        const nameClass = `form-question-name ${!this.props.isMobile ? 'col-md-3' : ''}`;

		return (
            <div className={containerClass}>
                <p className={nameClass}>Which state do you live in?</p>
                <div className="form-question col-md-6">
                    <StateDropdown 
                        id="update-user-state"
                        errorText={this.props.errorText}
                        value={this.props.userState}
                        updateQuestion={this.updateUserState.bind(this)}
                        isMobile={this.props.isMobile}
                        omitUs={this.props.omitUs}
                    />
                </div>
                <p className="form-question-subtext col-md-3" />
            </div>
		);
	}
}


