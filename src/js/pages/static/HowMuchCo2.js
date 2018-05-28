import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AutoComplete from 'material-ui/AutoComplete';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';
import Divider from 'material-ui/Divider'

import Header from '../../components/header/HeaderHoc';
import howMuchCo2Data from '../../components/how-much-co2/how-much-co2-data';
import CostsFooter from '../../components/costs/CostsFooter';

const autoCompleteData = howMuchCo2Data.map(data => data.name);




@connect((store, props) => {
	return {
        isMobile: store.userInfo.isMobile
	};
})
export default class HowMuchCO2Page extends React.Component {

    // Avoiding a HOC for 1 piece of data.
    constructor() {
	    super();
        this.state = { co2Data: howMuchCo2Data }
    }

    chooseItem(chosenRequest, index) {
        const co2Data = this.state.co2Data;
        co2Data.map(row => row.selected = false); // Unselect all other rows.
        co2Data[index].selected = true;
        this.setState({co2Data});

        // I dont want to scroll to the top of the page, but rather have the selected row show up in the middle
        if( index < 5) {
            document.getElementById(`how-much-co2-row-${chosenRequest}-id`).scrollIntoView();
        } else {
            const name = co2Data[index - 5].name;
            document.getElementById(`how-much-co2-row-${name}-id`).scrollIntoView();
        }
        
    }

    getTableRows(howMuchCo2Data, styles) {
        return howMuchCo2Data.map(row => {
            const sourceName = row.source && "Source";
            return (
                <TableRow id={`how-much-co2-row-${row.name}-id`} key={`how-much-co2-row-${row.name}`} selected={row.selected}>
                    <TableRowColumn style={styles.tdStyleName}>{row.name}</TableRowColumn>
                    <TableRowColumn style={styles.tdStyleAmount}>{row.amount.toLocaleString()}</TableRowColumn>
                    <TableRowColumn style={styles.tdStyleDescription}>{row.description}</TableRowColumn>
                    <TableRowColumn style={styles.tdStyleLink}><a href={row.source} target="_blank">{sourceName}</a></TableRowColumn>    
                </TableRow>
            );
        });
    }

	render() {
        const tableStyle = { textAlign: this.props.isMobile ? 'center' : 'left', border: '1px solid black' };
        const tdStyle = {
            whiteSpace: 'normal',
            textAlign: this.props.isMobile ? 'center' : 'left',
            wordWrap: this.props.isMobile ? 'break-word' : 'normal',
            paddingLeft: this.props.isMobile ? '2px' : '24px',
            paddingRight: this.props.isMobile ? '2px' : '24px',
        };
        const tdStyleName = { ...tdStyle, textAlign: 'left', width: '25%' };
        const tdStyleAmount = { ...tdStyle, width: '20%', overflow: '' };
        const tdStyleDescription = { ...tdStyle, textAlign: 'left', width: '40%' };
        const tdStyleLink = { ...tdStyle, width: '15%' };

        const styles = {
            tdStyleName,
            tdStyleAmount,
            tdStyleDescription,
            tdStyleLink
        };
        // Not too happy with pasing in styles as an object but its the only way to give the 
        // method access to these objects.
        const tableRows = this.getTableRows(howMuchCo2Data, styles);

		return (
            <div className="static-page">
                <h1 className="static-page-header">How Much CO<sub>2</sub></h1>
                <p>The table below has the CO<sub>2</sub> costs/savings of everyday things.  Compare everything from a campfire to a rocket launch.</p>
                <p>Source is included if there's an easy link.  Otherwise, I calculated values across numerous sources.</p>
                <div className="static-page-section-center">
                    <h2>Have something in mind?</h2>
                    <AutoComplete 
                        hintText="Search for something"
                        dataSource={autoCompleteData}
                        filter={AutoComplete.caseInsensitiveFilter}
                        hintText="What are you looking for?"
                        onNewRequest={this.chooseItem.bind(this)}
                    />
                </div>
                <br />

                <Divider />
                <br />
                <div>
                    <h2 className="static-page-header">The CO<sub>2</sub> costs/savings of things.</h2>
                    <Table style={tableStyle}>
                        <TableBody displayRowCheckbox={false} stripedRows={true}>
                            <TableRow>
                                <TableRowColumn style={tdStyleName}><b>Name</b></TableRowColumn>
                                <TableRowColumn style={tdStyleAmount}><b>Pounds of CO<sub>2</sub></b></TableRowColumn>
                                <TableRowColumn style={tdStyleDescription}><b>Description</b></TableRowColumn>
                                <TableRowColumn style={tdStyleLink}><b>Source</b></TableRowColumn>
                            </TableRow>
                            {tableRows}
                        </TableBody>
                    </Table>
                </div>
                <CostsFooter title="Dive deeper into Carbon Costs"/>
            </div>
		);
	}
}


