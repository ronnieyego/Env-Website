import React from "react";
import PropTypes from 'prop-types';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';

import { roundData } from './utils';

const tableStyle = {textAlign: 'left', border: '1px solid black'};
const tdStyle = { whiteSpace: 'normal', wordWrap: 'normal', textOverflow: '', textAlign: 'center', paddingLeft: '2px', paddingRight: '2px', };

export default class BarChartMobile extends React.Component {

    static propTypes = {
        key: PropTypes.string,
        graphData: PropTypes.array, // Array of {name: 'Grilling', You: grillCo2 || 0, 'Average American': 55 },
        dataKey: PropTypes.string, // Data key to look for in data set.
        compare: PropTypes.bool, // If true, looks for average american.  
        units: PropTypes.string, //units on left side
        title: PropTypes.string,
        mobileHeaders: PropTypes.array // For mobile, table headers from left -> right 
    }
        
    
    render() {
        const tableData = roundData(this.props.graphData);
        const units = this.props.units;
        const title = this.props.title || '';
        const dataKey = this.props.dataKey || 'You';
        const dataKeyCompare = this.props.dataKeyCompare || 'Average American';

        const tableHeader = this.props.compare === true ? (
            <TableRow >
                <TableRowColumn style={{...tdStyle, width: '40%'}}><b>{this.props.mobileHeaders[0]}</b></TableRowColumn>
                <TableRowColumn style={{...tdStyle, width: '25%'}}><b>{this.props.mobileHeaders[1]}</b></TableRowColumn>
                <TableRowColumn style={{...tdStyle, width: '35%'}}><b>{this.props.mobileHeaders[2]}</b></TableRowColumn>
            </TableRow>
        ) : (
            <TableRow>
                <TableRowColumn style={{...tdStyle, width: '75%'}}><b>{this.props.mobileHeaders[0]}</b></TableRowColumn>
                <TableRowColumn style={{...tdStyle, width: '25%'}}><b>{this.props.mobileHeaders[1]}</b></TableRowColumn>
            </TableRow>
        );

        const tableRows = tableData.map(row => {
            if (this.props.compare) {
                return (
                    <TableRow key={`compare-table-${row.name}`}>
                        <TableRowColumn style={tdStyle}><b>{row.name}</b></TableRowColumn>
                        <TableRowColumn style={tdStyle}>{row[dataKey].toLocaleString()}</TableRowColumn>
                        <TableRowColumn style={tdStyle}>{row[dataKeyCompare].toLocaleString()}</TableRowColumn>
                    </TableRow>
                );
            }
            return (
                <TableRow key={`compare-table-${row.name}`}>
                    <TableRowColumn style={tdStyle}>{row.name}</TableRowColumn>
                    <TableRowColumn style={tdStyle}>{row[dataKey].toLocaleString()}</TableRowColumn>
                </TableRow>
            );
        });

        return (
            <div key={`bar-chart-div-${this.props.key}-div`} className="bar-chart-mobile">
                <p className="bar-chart-title">{title}</p>
                <Table key={`bar-chart-table-${this.props.key}-div`} style={tableStyle}>
                    <TableBody displayRowCheckbox={false} stripedRows={true}>
                        {tableHeader}
                        {tableRows}
                    </TableBody>
                </Table>
            </div>
        );
    }
}