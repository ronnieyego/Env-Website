import React from "react";
import Widget from './solar-widget.js';

export default class WidgetContainer extends React.Component {
	constructor(props) {
	    super();
	    console.log('container : ', props);
	    this.state = {
	      showResults: false
	    };
	    this.showResults = this.showResults.bind(this);
	}

	showResults() {
		this.setState({showResults: true})
	}

	render() {
		console.log('container this: ', this.props);
		
		let widgetHeight = this.state.showResults ? {height: 500} : {height: 450};

		return (
			<Widget {...this.props} showResults={this.showResults} widgetHeight={widgetHeight} />
		);
	}
}
