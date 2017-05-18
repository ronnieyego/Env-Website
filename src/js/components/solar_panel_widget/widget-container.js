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
		console.log('showing results!!!!!!!!!!!');
		this.setState({showResults: true})
	}

	render() {
		let widgetHeight = this.state.showResults ? {height: 500} : {height: 450};
		console.log('widget height passed through is ', widgetHeight );
		console.log('showResults parent is ', this.state.showResults );
		return (
			<Widget showResults={this.showResults} widgetHeight={widgetHeight} />
		);
	}
}