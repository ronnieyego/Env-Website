import React from "react";
import Widget from './solar-widget.js';

export default class WidgetContainer extends React.Component {
	constructor(props) {
	    super();
	    this.state = {
	      showResults: false
	    };
	    this.showResults = this.showResults.bind(this);
	}

	showResults() {
		this.setState({showResults: true})
	}

	render() {
		let widgetHeight = this.state.showResults ? {height: 500} : {height: 450};

		return (
			<Widget {...this.props} showResults={this.showResults} widgetHeight={{height: 425}} />
		);
	}
}
