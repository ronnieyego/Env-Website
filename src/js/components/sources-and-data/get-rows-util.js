import React from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table'

const tdStyle = {
    whiteSpace: 'normal',
    wordWrap: 'normal'
};

const formatName = name => {
    if(!name) {
        return '';
    }
    name = name.replace(/-/g,' ');
    name = name.charAt(0).toUpperCase() + name.slice(1);
    return name;
}

const getFoodApplianceRow = (question, co2PerKwh) => {
    let co2 = question.co2 ? question.co2 : Math.round(question.kwh * co2PerKwh * 100)/100;
    // Just for energy efficient light bulbs, go one more decimal place
    co2 = co2 > 0 ? co2 : Math.round(question.kwh * co2PerKwh * 1000)/1000;
    const kwh = question.kwh;
    const water = question.water ? question.water : 'N/A';
    let useType;
    switch(question['use-type']) {
        case 'hour':
            useType = <TableRowColumn style={tdStyle} key={`use-type-${question.name}`}>Per hour used</TableRowColumn>;
            break;
        case 'monthly-use':
            useType = useType = <TableRowColumn style={tdStyle} key={`use-type-${question.name}`}>Per use</TableRowColumn>;
            break;
        case 'monthly-own':
            useType = useType = <TableRowColumn style={tdStyle} key={`use-type-${question.name}`}>Used each month</TableRowColumn>;;
            break;
        case 'serving':
            useType = useType = <TableRowColumn style={tdStyle} key={`use-type-${question.name}`}>Per serving</TableRowColumn>;;
            break;
    }
    const key = Math.random();
    return (
        <TableRow key={question.name}>
            <TableRowColumn style={tdStyle} key={`${question.name}-name-${key}`}>{formatName(question.name)}</TableRowColumn>
            <TableRowColumn style={tdStyle} key={`${question.name}-co2-${key}`}>{co2.toLocaleString()}</TableRowColumn>
            <TableRowColumn style={tdStyle} key={`${question.name}-kwh-${key}`}>{kwh.toLocaleString()}</TableRowColumn>
            <TableRowColumn style={tdStyle} key={`${question.name}-water-${key}`}>{water.toLocaleString()}</TableRowColumn>
            {useType}
        </TableRow>
    )
};

module.exports = {
    getFoodApplianceRow
}
