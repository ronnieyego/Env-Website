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
        const questionStyle = {position: 'absolute', right: '25%', width: '50px'}
        console.log('bool question value is ', this.props.question.name, this.props.value);
		return (
            <li style={{marginTop: '6px'}}>
                <div>
                    {this.formatName(this.props.question.name)}
                    <input id={this.props.id} type="checkbox" style={questionStyle} onChange={this.updateQuestion.bind(this)} checked={this.props.value}  />
                </div>
            </li>
		);
	}
};
