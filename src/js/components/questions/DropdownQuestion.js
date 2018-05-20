import React from "react";
import PropTypes from 'prop-types';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField'

import { formatName } from './utils';
import { updateQuestions} from '../../actions/footprint/form-actions';
import { updateCostsQuestions} from '../../actions/cost-forms/costs-actions';

export default class DropdownQuestion extends React.Component {

    static propType = {
        isMobile: PropTypes.bool,
        updateQuestion: PropTypes.func, 
        question: PropTypes.object,

    // Everything in Question object
        // id: Proptypes.string,
        // name: Proptypes.string,
        // marginLeft: Proptypes.string,
        // value: Proptypes.string,
        // selectOptions: Proptypes.string,
        // subtext: Proptypes.string,
        // formType: Proptypes.string
    }

    updateQuestion(id, event, index, value) {
        this.props.dispatch(this.props.updateFunction({id, value}));
    }

	render() {
        const question = this.props.question;
		const options = question.selectOptions;
        const dropDownOptions = options.map(option => {
            return <MenuItem 
                key={option}
                primaryText={formatName(option, this.props.question.formType)}
                value={formatName(option, this.props.question.formType)}  
            />
        });
        const marginLeft = question.marginLeft ? question.marginLeft : '10px';
        const labelStyle = { paddingRight: '0px', fontWeight: 'bold', textAlign: 'center' };
        
        return (
            <div className="question">
                <p className="question-name" style={{marginLeft}}>{formatName(question.name, this.props.question.formType)}</p>
                {question.subtext ? <p className="question-subtext">{question.subtext}</p> : ''}
                <SelectField
                    id={question.id.toString()}
                    labelStyle={labelStyle}
                    onChange={this.updateQuestion.bind(this, question.id)}
                    value={this.props.value}
                >
                    {dropDownOptions}
                </SelectField>
            </div>
		);
	}
};
