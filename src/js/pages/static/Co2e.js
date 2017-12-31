import React from "react";

import Header from '../../components/Header.js';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';


// Table Styles

const tableRowWrapText = {
    whiteSpace: 'normal',
    width: '55%',
    wordWrap: 'break-word'
};

export default class Co2ePage extends React.Component {
	render() {
		return (
			<div className="container-fluid text-center" >
				<Header />
                <div className="static-page">
                    <h1 className="static-page-header">What is CO<sub>2</sub>e?</h1>
                    <div className="static-page-section">
                        <p>There are many chemicals that contribute to global warming.  For example, a coal power plant will produce CO<sub>2</sub>, Nitrous Oxide (NO<sub>2</sub>), and Sulfur (S).  We want to measure the combined impact of all of these emissions on global warming.</p>
                        <p>CO<sub>2</sub>e is a unit of global warming potential.  In other words, it measures how much CO<sub>2</sub> would have the same heating potential.  One pound of methane has the warming potential of 20 pounds of CO<sub>2</sub> so one pound of methane is equal to 20 CO<sub>2</sub>e.  Its like saying a chcoclate bar has 20 times the calories as an apple.</p>
                        <div >
                            <span className="static-page-table-header">Here's a quick list of common compounds and their CO<sub>2</sub>e</span>
                            <Table selectable={false} >
                                <TableBody className="static-page-table" displayRowCheckbox={false}>
                                    <TableRow>
                                        <TableHeaderColumn><b>Compound</b></TableHeaderColumn>
                                        <TableHeaderColumn><b>CO<sub>2</sub>e</b></TableHeaderColumn>
                                        <TableHeaderColumn style={tableRowWrapText}><b>Notes</b></TableHeaderColumn>
                                    </TableRow>
                                    <TableRow>
                                        <TableRowColumn>CO<sub>2</sub></TableRowColumn>
                                        <TableRowColumn>1</TableRowColumn>
                                        <TableRowColumn style={tableRowWrapText}>Found everywhere.  Makes up ~80% of global warming</TableRowColumn>
                                    </TableRow>
                                    <TableRow>
                                        <TableRowColumn style={tableRowWrapText}>Methane</TableRowColumn>
                                        <TableRowColumn>25</TableRowColumn>
                                        <TableRowColumn style={tableRowWrapText}>Found in organic decomposition (landfills and swamps).  Makes up ~8% of global warming</TableRowColumn>
                                    </TableRow>
                                    <TableRow>
                                        <TableRowColumn>N<sub>2</sub>O</TableRowColumn>
                                        <TableRowColumn>298</TableRowColumn>
                                        <TableRowColumn style={tableRowWrapText}>Produced mostly from fertilizer</TableRowColumn>
                                    </TableRow>
                                    <TableRow>
                                        <TableRowColumn>SO<sub>x</sub></TableRowColumn>
                                        <TableRowColumn>2000</TableRowColumn>
                                        <TableRowColumn style={tableRowWrapText}>Makes up ~2% of global warming.  Comes from fossil fuel power plants. Can cause acid rain in large quanities</TableRowColumn>
                                    </TableRow>
                                    <TableRow>
                                        <TableRowColumn style={tableRowWrapText}>Fluorocarbons</TableRowColumn>
                                        <TableRowColumn>1,000-20,000</TableRowColumn>
                                        <TableRowColumn style={tableRowWrapText}>Chlorofluorocarbons (CFCs), hydrofluorocarbons (HFCs), hydrochlorofluorocarbons (HCFCs), and perfluorocarbons (PFCs). Commonly found in refrigerants.  They punched a hole in our ozone in the 70s and have largely been banned.</TableRowColumn>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                        
                        <div className="static-page-section">
                            <h2>Why use CO<sub>2</sub>e?</h2>
                            <p>CO<sub>2</sub>e lets you compare different things "easily".  The carbon cost of a 10 pounds chair might be 250 pounds of CO<sub>2</sub> while 10 pounds of apples cost 2 pounds of NO<sub>x</sub>.  Without a common unit, people find it difficult to compare the global warming impact of these two items.</p>
                            <p>Scientists have widely adopted CO<sub>2</sub>e and it is pretty common in all climate change publications.</p>
                        </div>
                        <div className="static-page-section">
                            <h2>Problems with CO<sub>2</sub>e</h2>
                            <p>CO<sub>2</sub>e isn't relevent unless you're comparing the global warming potential (GWP) of items.  For example, high quanities of Sulfur can cause acid rain and NO<sub>x</sub> can lead to suffocating algae blooms.  These distinctions and side effects are lost with using CO<sub>2</sub>e.</p>
                        </div>
                    </div>
                </div>
			</div>
		);
	}
}
