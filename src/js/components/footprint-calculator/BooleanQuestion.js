import React from "react";

// props: {
//    questionName 
//    onChange,
//    value
//    questionGroup
// }

export default class Question extends React.Component {

    constructor(props) {
	    super();
	}

    formatName(name) {
        name = name.replace(/-/g,' ');
        name = name.charAt(0).toUpperCase() + name.slice(1);
        return name;
    }

    updateQuestion(e) {
        this.props.updateQuestion(e);
    }

	render() {
        const checked = this.props.checked;
        const input = checked === 'checked' ? <input id={this.props.id} type="checkbox" onChange={this.updateQuestion.bind(this)} checked  /> : <input id={this.props.id} type="checkbox" onChange={this.updateQuestion.bind(this)} />
		const textWidth = this.props.textWidth ? this.props.textWidth : '250px';
        const textStyle = {width: textWidth, display: 'inline-block'}
        return (
            <li style={{marginTop: '6px'}}>
                <div>
                    <div style={textStyle}>{this.formatName(this.props.question.name)} </div>
                    {input}
                </div>
            </li>
		);
	}
};
