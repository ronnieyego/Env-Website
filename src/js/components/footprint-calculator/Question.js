import React from "react";

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
        value = parseInt(value) >= 0 ? value : 0; // Only counts numbers
        this.props.updateQuestion(e);
    }

	render() {
        const textWidth = this.props.textWidth ? this.props.textWidth : '250px';
        const textStyle = {width: textWidth, display: 'inline-block'}
        const inputStyle = {width: '50px'}
		return (
            <li style={{marginTop: '6px'}}>
                <div style={{display: 'inline-block'}}>
                    <div style={textStyle}>{this.formatName(this.props.question.name)} </div>
                    <input id={this.props.id} type="text" style={inputStyle} onChange={this.updateQuestion.bind(this)} value={this.props.value}  />
                </div>
            </li>
		);
	}
};

