import React from "react";
import { object, string } from 'prop-types'
import { connect } from 'react-redux';

// import IntQuestion from './IntQuestion';
import IntQuestion from './int/IntQuestion';
// import DropdownQuestion from './DropdownQuestion';
import DropdownQuestion from './dropdown/DropdownQuestion';
import DropdownQuestionMobile from './dropdown/DropdownQuestionMobile';
//import BooleanQuestion from './BooleanQuestion';
import BooleanQuestion from './boolean/BooleanQuestion';
import MultipleQuestion from './MultipleQuestion';
import UserStateDropdown from '../UserStateDropdown';

import { updateQuestionsV2 } from '../../actions/footprint/form-actions';


@connect(store => {
	return {
		isMobile: store.userInfo.isMobile,
	};
})
export default class QuestionHoc extends React.Component {
    static proptypes = {
        // Routing
        questionType: string.isRequired, 
        question: object.isRequired,
        errorText: string,
        value: string
    }

	render() {
        const updateFunction = updateQuestionsV2;
        const id = this.props.question.id;
        let question;
        switch(this.props.questionType) {
            case 'int':
                question = <IntQuestion {...this.props} updateFunction={updateFunction} />;
                break;
            case 'bool':
                question = <BooleanQuestion {...this.props} updateFunction={updateFunction} />;
                break;
            case 'dropdown':
                if(this.props.isMobile) {
                    question = <DropdownQuestionMobile {...this.props} updateFunction={updateFunction} />;
                } else {
                    question = <DropdownQuestion {...this.props} updateFunction={updateFunction} />;
                }
                break;
            case 'multiple':
                question = <MultipleQuestion {...this.props} updateFunction={updateFunction} />;
                break;
            case 'user-state':
                question = <UserStateDropdown {...this.props} omitUs={this.props.question.omitUs} updateFunction={updateFunction} />
                break;
            default:
                console.log('Error.  Bad question type', this.props);
        };
        if (question.hidden) {
            question = null;
        }
		return (
            <div id={`question-${id}`}>
                { question }
            </div>
        );
    }
};
