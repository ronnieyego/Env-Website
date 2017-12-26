import React from "react";
import Header from '../components/Header';
import Widget from '../components/solar_panel_widget/solar-widget';

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
			<div className="container-fluid text-center">
                <Header />
                <div style={{marginLeft: 'auto'}}>
                    <h1>Solar Panels</h1>
                    <p style={{marginLeft: '15px'}}>Solar panels are a great way to generate energy!  They can usually supply excess power for a household and actually become a revenue source.  You can use the tool below to see how much CO<sub>2</sub> a solar panel set up can prevent as well as cost savings.</p>
                    <div style={{display: 'flex', justifyContent: 'space-around'}}>
                        <Widget {...this.props} showResults={this.showResults} widgetHeight={{height: 425}} />
                    </div>
                </div>
		    </div>
		);
	}
}
