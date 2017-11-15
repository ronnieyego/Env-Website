import React from "react";
import _ from 'lodash';

import Header from '../../components/Header';
import FormQuestionRow from '../../components/Form-Question-Row';
import StateDropdown from '../../components/StateDropdown'

import { utilityEmissionsPerState } from '../../utils/utils-data/state-energy-and-emissions';
// import Questions from '../../../../public/data/temp-footprint-questions.json';


// Styles

const questionSetStyle = {textAlign: 'left'};
const header = {textAlign: 'center'};

const tableStyle = {width: '600px', textAlign: 'left', border: '1px solid black'}
const tdStyle = {border: '1px solid black', paddingLeft: '5px', paddingRight: '5px'}


export default class FormValues extends React.Component {
    constructor(props) {
        super();
        this.state = {
            questions: [],
            state: 'WA'
        }
        this.updateStateDropdown = this.updateStateDropdown.bind(this);
    }

    updateStateDropdown(e) {
        const id = e.target.id;
        const value = document.getElementById(id).value;
        this.setState({state: value});
    }

    componentDidMount() {
        fetch('/data/temp-footprint-questions.json')  
        .then(function(response) {
            return response.json();     
        })
        .then(questions => {
            this.setState({questions: questions.questions})
        });
    }

	render() {
        const co2PerKwh = utilityEmissionsPerState[this.state.state];
        const applianceHour = _.filter(this.state.questions, function(o) { return o['use-type'] === 'hour'; });
        const houseHoldQuestions = _.filter(this.state.questions, function(o) { return o['use-type'] === 'monthly-own' || o['use-type'] === 'monthly-use'; });
        const appliances = applianceHour.concat(houseHoldQuestions);
        const applianceRows = appliances.map(question => <FormQuestionRow question={question} co2PerKwh={co2PerKwh} />);

        const foodQuestions = _.filter(this.state.questions, function(o) { return o['use-type'] === 'serving'; });
        const foodRows = foodQuestions.map(question => <FormQuestionRow question={question} co2PerKwh={co2PerKwh} />);
        
		return (
			<div className="container-fluid text-center" >
				<Header />
                <h1>Question data</h1>
                <h3>The tables below contain most of the underlying data used in the footprint calculator</h3>
                <h3 style={{textAlign: 'left'}}>Please select your state for the highest accuracy</h3>
                <StateDropdown id="state-dropdown" updateQuestion={this.updateStateDropdown} />
                
                <div style={questionSetStyle}>
                    <h3><b>Appliance Data</b></h3>
                    <ul>
                        <li>Primary source: <a href="http://www.siliconvalleypower.com/for-residents/save-energy/name-energy-use-chart" target="_blank">Siliconvalleypower.com</a></li>
                        <li>Accuracy: I feel fairly confident about this data.  I did make assumptions that I will reduce accuracy (ie. I condensed all monitor sizes into a single number), but I don't believe they'd significantly affect total footprint.</li>
                        <li>CO<sub>2</sub> calculated from energy used times emissions per kwh for {this.state.state}</li>
                    </ul>
                    <table style={tableStyle}>
                        <tbody>
                            <tr>
                                <td style={tdStyle}><b>Appliance</b></td>
                                <td style={tdStyle}><b>CO<sub>2</sub> emitted (lb)</b></td>
                                <td style={tdStyle}><b>Energy used (kwh)</b></td>
                                <td style={tdStyle}><b>Water used (gallons)</b></td>
                                <td style={tdStyle}><b>Useage period</b></td>
                            </tr>
                            {applianceRows}
                        </tbody>
                    </table>
                </div>

                <div style={questionSetStyle}>
                    <h3><b>Food Data</b></h3>
                    <ul>
                        <li>Primary sources: Energy came from <a href="http://www.inference.org.uk/withouthotair/c13/page_77.shtml" target="_blank"><u>Without Hot Air</u></a>.  CO<sub>2</sub> data came from the FAO.  Water came from <a href="waterfootprint.org" target="_blank">Waterfootprint.org</a></li>
                        <li>Accuracy: I am less confident about this data and estimate that it can be off by a factor of 2.  Ex. within the FAO, I found multiple studies that had significantly different CO<sub>2</sub> emissions for cows.  Additionally, time of year affects whether food is imported or produced locally.  I am mostly assuming locally produced food</li> 
                    </ul>
                    <table style={tableStyle}>
                        <tbody>
                            <tr>
                                <td style={tdStyle}><b>Food Type</b></td>
                                <td style={tdStyle}><b>CO<sub>2</sub> emitted (lb)</b></td>
                                <td style={tdStyle}><b>Energy used (kwh)</b></td>
                                <td style={tdStyle}><b>Water used (gallons)</b></td>
                                <td style={tdStyle}><b>Useage</b></td>
                            </tr>
                            {foodRows}
                        </tbody>
                    </table>
                </div>


			</div>
		);
	}
}
