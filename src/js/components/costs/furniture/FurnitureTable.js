import React from "react";
import PropTypes from 'prop-types';
import _ from 'lodash';

import { furnitureData } from './furniture-data';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';

const tableStyle = {textAlign: 'left', border: '1px solid black'}
const tdStyle = {
    whiteSpace: 'normal',
    wordWrap: 'normal'
};

const tdHeaderStyle = {
    ...tdStyle,
    fontSize: '22px'
};


export default class FurnitureTable extends React.Component {

    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

	render() {
        const keys = Object.keys(furnitureData);
        let tableRows = keys.map(key => {
            const moreKeys = Object.keys(furnitureData[key]);
            return moreKeys.map(secondKey => {
                return (
                    <TableRow>
                        <TableRowColumn style={tdStyle}>{this.capitalize(key)}</TableRowColumn>
                        <TableRowColumn style={tdStyle}>{furnitureData[key][secondKey].description}</TableRowColumn>
                        <TableRowColumn style={tdStyle}>{furnitureData[key][secondKey].amount}</TableRowColumn>
                    </TableRow>
                );
            });
        });
        tableRows = _.flattenDeep(tableRows);

		return (
            <div className="costs-page-data-table">
                <div className="costs-page-data-table-title">
                    CO<sub>2</sub> cost of different pieces of furniture
                </div>
                <Table style={tableStyle}>
                    <TableBody displayRowCheckbox={false} stripedRows={true}>
                        <TableRow>
                            <TableRowColumn style={{...tdHeaderStyle, width: '25%'}}><b>Category</b></TableRowColumn>
                            <TableRowColumn style={{...tdHeaderStyle, width: '50%'}}><b>Furniture</b></TableRowColumn>
                            <TableRowColumn style={tdHeaderStyle}><b>CO<sub>2</sub> (lb)</b></TableRowColumn>
                        </TableRow>
                        {tableRows}
                    </TableBody>
                </Table>
            </div>
		);
	}
}
