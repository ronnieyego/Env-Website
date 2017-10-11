import React from "react";

import { updateQuestions} from '../../../actions/footprint/form-actions';

export default class DropdownQuestion extends React.Component {

    constructor(props) {
	    super();
        // Saves the default value in form response data. 
        props.dispatch(updateQuestions(props.id, props.selectOptions[0]));
	}

    formatName(name) {
        name = name.replace(/-/g,' ');
        name = name.charAt(0).toUpperCase() + name.slice(1);
        return name;
    }

    updateQuestion(e) {
        let id = e.target.id;
		let value = document.getElementById(id).value;
        this.props.dispatch(updateQuestions(id, value));
    }

	render() {
		const options = this.props.selectOptions;
        const dropDownOptions = options.map(option => {
            if(option === this.props.selected) { // Parent component passes down which value is selected
                return <option key={option} value={option} selected="selected">{this.formatName(option)}</option>
            }
            return <option key={option} value={option}>{this.formatName(option)}</option>
        });
        const textWidth = this.props.textWidth ? this.props.textWidth : '250px';
        const textStyle = {width: textWidth, display: 'inline-block'}
        return (
            <li style={{marginTop: '6px'}}>
                <div>
                    <div style={textStyle} >{this.formatName(this.props.question.name)} </div>
                    <select id={this.props.id} onChange={this.updateQuestion.bind(this)} >
                        {dropDownOptions}
                    </select>
                </div>
            </li>
		);
	}
};
