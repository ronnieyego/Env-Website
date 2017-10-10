import React from "react";

import { updateQuestions} from '../../../actions/footprint/form-actions';


export default class Question extends React.Component {

    constructor(props) {
	    super();
	}

    formatName(name) {
        if(!name) {
            return '';
        }
        name = name.replace(/-/g,' ');
        name = name.charAt(0).toUpperCase() + name.slice(1);
        return name;
    }

    updateQuestion(e) {
        let id = e.target.id;
        let value = document.getElementById(id).value;
        value = value.replace(/[^\d.-]/g, ''); // Only keep numbers and .
        this.props.dispatch(updateQuestions(id, value));
    }

	render() {
        const textWidth = this.props.textWidth ? this.props.textWidth : '250px';
        const textStyle = {width: textWidth, display: 'inline-block'}
        const inputStyle = {width: '50px'}
        const subtextStyle = {fontSize: '80%'}
        const subtext = this.props.subtext ? (<div style={subtextStyle}>{this.props.subtext}</div>) : '';
		return (
            <li style={{marginTop: '6px'}}>
                <div style={{display: 'inline-block'}}>
                    <div style={textStyle}>{this.formatName(this.props.question.name)} </div>
                    <input id={this.props.id} type="text" style={inputStyle} onChange={this.updateQuestion.bind(this)} value={this.props.value}  />
                </div>
                {subtext}
            </li>
		);
	}
};

