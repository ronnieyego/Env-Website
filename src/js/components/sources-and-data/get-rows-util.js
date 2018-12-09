import React from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table'

const formatName = name => {
    if(!name) {
        return '';
    }
    name = name.replace(/-/g,' ');
    name = name.charAt(0).toUpperCase() + name.slice(1);
    return name;
}

export const getFoodApplianceRow = (question, co2PerKwh, isMobile, tdStyle) => {
    let co2 = question.co2 ? question.co2 : Math.round(question.kwh * co2PerKwh * 100)/100;
    // Just for energy efficient light bulbs, go one more decimal place
    co2 = co2 > 0 ? co2 : Math.round(question.kwh * co2PerKwh * 1000)/1000;
    const kwh = question.kwh;
    const water = question.water ? question.water : 'N/A';
    const key = Math.random();
    let useTypeText;
    switch(question['use-type']) {
        case 'hour':
            useTypeText = 'Per hour used';
            break;
        case 'monthly-use':
            useTypeText = 'Per use';
            break;
        case 'monthly-own':
            useTypeText = 'Used each month';
            break;
        case 'serving':
            useTypeText = 'Per serving';
            break;
    }

    const useType = <TableRowColumn style={tdStyle} key={`use-type-${question.name}-${key}`}>{useTypeText}</TableRowColumn>;
    
    return (
        <TableRow key={question.name}>
            <TableRowColumn style={tdStyle} key={`${question.name}-name-${key}`}>{formatName(question.name)}</TableRowColumn>
            <TableRowColumn style={tdStyle} key={`${question.name}-co2-${key}`}>{co2.toLocaleString()}</TableRowColumn>
            { !isMobile && <TableRowColumn style={tdStyle} key={`${question.name}-kwh-${key}`}>{kwh.toLocaleString()}</TableRowColumn>}
            { !isMobile && <TableRowColumn style={tdStyle} key={`${question.name}-water-${key}`}>{water.toLocaleString()}</TableRowColumn>}
            {useType}
        </TableRow>
    )
};

