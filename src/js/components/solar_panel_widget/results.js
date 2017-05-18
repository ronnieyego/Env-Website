import React from "react";


export default class Results extends React.Component {

	render() {
		return (
			<div>
				<p>{this.props.resultsMessageLine1}</p>
				<p>{this.props.resultsMessageLine2}</p>
			</div>
		);
	}
}


// npm create-react-app