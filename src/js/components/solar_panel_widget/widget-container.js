import React from "react";
import Widget from './solar-widget.js';

export default class WidgetContainer extends React.Component {
	constructor() {
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
			<Widget sunHours={this.props.sunHours} showResults={this.showResults} widgetHeight={widgetHeight} />
		);
	}
}
