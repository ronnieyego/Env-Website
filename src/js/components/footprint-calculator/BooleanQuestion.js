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

	render() {
        const questionStyle = {position: 'absolute', right: '25%', width: '50px'}
		return (
            <li style={{marginTop: '6px'}}>
                <div>
                    {this.formatName(this.props.name)}
                    <input id={this.props.name} type="checkbox" style={questionStyle} onChange={ (e) => this.props.boolQuestionOnChange(e, this.props.questionGroup)}  />
                </div>
            </li>
		);
	}
};
