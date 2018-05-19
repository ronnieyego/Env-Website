import React from "react";
import PropTypes from 'prop-types';
import flattenDeep from 'lodash/flattenDeep';

import { furnitureData } from './furniture-data';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';


export default class FurnitureTable extends React.Component {

    static propTypes = {
        isMobile: PropTypes.bool.isRequired
    }
    

    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

	render() {
        const tableStyle = {textAlign: 'left', border: '1px solid black'}
        const tdStyle = this.props.isMobile ? 
            { whiteSpace: 'normal', wordWrap: 'normal', textOverflow: '', textAlign: 'center', paddingLeft: '2px', paddingRight: '2px' }
            :
            {whiteSpace: 'normal', wordWrap: 'normal', textOverflow: ''};

        const tdHeaderStyle = this.props.isMobile ? 
            { ...tdStyle, fontSize: '16px' } 
            :
            { ...tdStyle, fontSize: '22px'};


        const keys = Object.keys(furnitureData);
        let tableRows = keys.map(key => {
            const moreKeys = Object.keys(furnitureData[key]);
            return moreKeys.map(secondKey => {
                return (
                    <TableRow key={`costs-furniture-table-${secondKey}`}>
                        <TableRowColumn style={tdStyle}>{this.capitalize(key)}</TableRowColumn>
                        <TableRowColumn style={tdStyle}>{furnitureData[key][secondKey].description}</TableRowColumn>
                        <TableRowColumn style={tdStyle}>{furnitureData[key][secondKey].amount}</TableRowColumn>
                    </TableRow>
                );
            });
        });
        tableRows = flattenDeep(tableRows);

        

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
