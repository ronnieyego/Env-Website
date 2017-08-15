import React from "react";

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
        let id = e.target.id;
		let value = document.getElementById(id).value;
        value = parseInt(value) >= 0 ? value : 0; // Only counts numbers
        this.props.updateQuestion(e);
    }

	render() {
        const questionStyle = {position: 'absolute', right: '50%', width: '50px'}
		return (
            <li style={{marginTop: '6px'}}>
                <div>
                    {this.formatName(this.props.question.name)}
                    <input id={this.props.id} type="text" style={questionStyle} onChange={this.updateQuestion.bind(this)} value={this.props.value}  />
                </div>
            </li>
		);
	}
};

