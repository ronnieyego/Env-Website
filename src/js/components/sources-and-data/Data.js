import React from "react";
import { string, number, bool, array, func } from 'prop-types';
import { connect } from 'react-redux';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';

import Header from '../header/HeaderHoc';
import StateDropdown from '../StateDropdown';
import { getFoodApplianceRow } from './get-rows-util';

const questionSetStyle = {textAlign: 'left'};
const header = {textAlign: 'center'};

const tableStyle = {textAlign: 'left', border: '1px solid black'}





export default class Data extends React.Component {

    static proptypes = {
        co2PerKwh: number,
        applianceQuestions: array,
        foodQuestions: array,
        transportationData: array,
        updateQuestion: func,
        userState: string,
        isMobile: bool
    }

	render() {

        const tdStyle = {
            whiteSpace: 'normal',
            wordWrap: this.props.isMobile ? 'break-word' : 'normal',
            paddingLeft: this.props.isMobile ? '5px' : '24px',
            paddingRight: this.props.isMobile ? '5px' : '24px',
            textAlign: this.props.isMobile ? 'center' : 'left'
        };

        const tdStyleNotes = {
            ...tdStyle,
            width: '50%'
        };
        
        const transportationRows = this.props.transportationData.map(row => {
            return (
                <TableRow>
                    <TableRowColumn style={tdStyle}>{row.description}</TableRowColumn>
                    <TableRowColumn style={tdStyle}>{row.value}</TableRowColumn>
                    <TableRowColumn style={tdStyle}><a href={row.sourceLink} target="_blank">{row.sourceName}</a></TableRowColumn>
                    <TableRowColumn style={tdStyleNotes}>{row.notes}</TableRowColumn>
                </TableRow>
            );
        });

        const applianceRows = this.props.applianceQuestions.map(question => getFoodApplianceRow(question, this.props.co2PerKwh, this.props.isMobile, tdStyle));
        const foodRows = this.props.foodQuestions.map(question => getFoodApplianceRow(question, this.props.co2PerKwh, this.props.isMobile, tdStyle));
		return (
            <div className="static-page" >
                <h1 className="static-page-header">Footprint Data</h1>
                <h3 className="static-page-sub-header">The tables below contain most of the underlying data used in the footprint calculator</h3>
                <p>Please select your state for the highest accuracy</p>
                <StateDropdown id="state-dropdown" updateQuestion={this.props.updateStateDropdown.bind(this)} value={this.props.userState} />
                
                <div className="static-page-section">
                    <br />
                    <h3><b>Appliance Data</b></h3>
                    <ul>
                        <li>Primary source: <a href="http://www.siliconvalleypower.com/for-residents/save-energy/name-energy-use-chart" target="_blank">Siliconvalleypower.com</a></li>
                        <li>Accuracy: I feel fairly confident about this data.  I did make assumptions that I will reduce accuracy (ie. I condensed all monitor sizes into a single number), but I don't believe they'd significantly affect total footprint.</li>
                        <li>CO<sub>2</sub> calculated from energy used times <b>{this.props.co2PerKwh}</b> lbs/CO<sub>2</sub> per kwh (based on {this.props.userState}'s energy production)</li>
                    </ul>
                    <Table style={tableStyle}>
                        <TableBody displayRowCheckbox={false} stripedRows={true}>
                            <TableRow>
                                <TableRowColumn style={{...tdStyle, width: '85px'}}><b>Appliance</b></TableRowColumn>
                                <TableRowColumn style={tdStyle}><b>CO<sub>2</sub> emitted (lb)</b></TableRowColumn>
                                {!this.props.isMobile && <TableRowColumn style={tdStyle}><b>Energy used (kwh)</b></TableRowColumn> }
                                {!this.props.isMobile && <TableRowColumn style={tdStyle}><b>Water used (gallons)</b></TableRowColumn>}
                                <TableRowColumn style={tdStyle}><b>Useage period</b></TableRowColumn>
                            </TableRow>
                            {applianceRows}
                        </TableBody>
                    </Table>
                </div>

                <div className="static-page-section">
                    <br />
                    <h3><b>Food Data</b></h3>
                    <ul>
                        <li>Primary sources: Energy came from <a href="http://www.inference.org.uk/withouthotair/c13/page_77.shtml" target="_blank"><u>Without Hot Air</u></a>.  CO<sub>2</sub> data came from the FAO.  Water came from <a href="waterfootprint.org" target="_blank">Waterfootprint.org</a></li>
                        <li>Accuracy: I am less confident about this data and estimate that it can be off by a factor of 2.  Ex. within the FAO, I found multiple studies that had significantly different CO<sub>2</sub> emissions for cows.  Additionally, time of year affects whether food is imported or produced locally.  I am mostly assuming locally produced food</li> 
                    </ul>
                    <Table style={tableStyle}>
                        <TableBody displayRowCheckbox={false} stripedRows={true}>
                            <TableRow>
                                <TableRowColumn style={tdStyle}><b>Food Type</b></TableRowColumn>
                                <TableRowColumn style={tdStyle}><b>CO<sub>2</sub> emitted (lb)</b></TableRowColumn>
                                {!this.props.isMobile && <TableRowColumn style={tdStyle}><b>Energy used (kwh)</b></TableRowColumn>}
                                {!this.props.isMobile && <TableRowColumn style={tdStyle}><b>Water used (gallons)</b></TableRowColumn>}
                                <TableRowColumn style={tdStyle}><b>Useage</b></TableRowColumn>
                            </TableRow>
                            {foodRows}
                        </TableBody>
                    </Table>
                </div>

                <div className="static-page-section">
                    <br />
                    <h3><b>Transportation Data</b></h3>
                    <Table style={tableStyle}>
                        <TableBody displayRowCheckbox={false} stripedRows={true}>
                            <TableRow>
                                <TableRowColumn style={{...tdStyle, width: this.props.isMobile ? '85px' : '25%'}}><b>Descritpion</b></TableRowColumn>
                                <TableRowColumn style={{...tdStyle, width: this.props.isMobile ? '60px' : '100px'}}><b>Value</b></TableRowColumn>
                                <TableRowColumn style={{...tdStyle}}><b>Source</b></TableRowColumn>
                                <TableRowColumn style={{...tdStyle, width: '35%'}}><b>Notes</b></TableRowColumn>
                            </TableRow>
                            {transportationRows}
                        </TableBody>
                    </Table>
                </div>

            </div>
		);
	}
}
