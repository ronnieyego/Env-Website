import React from "react";

import Header from '../../components/Header.js';


// Styles

const header = {textAlign: 'center'};

const tableStyle = {width: '400px'}


export default class Co2ePage extends React.Component {
	render() {
		return (
			<div className="container-fluid text-center" >
				<Header />
				<h1 style={header}>What is Co<sub>2</sub>e?</h1>
                <div>
                    <p>There are many chemicals that contribute to global warming.  For example, a coal power plant will produce Co<sub>2</sub>, Nitrous Oxide (NO<sub>2</sub>), and Sulfur (S).  We want to measure the combined impact of all of these emissions on global warming.</p>
                    <p>Co<sub>2</sub>e is a unit of global warming potential.  In other words, it measures how much Co<sub>2</sub> would have the same heating potential.  One pound of methane has the warming potential of 20 pounds of Co<sub>2</sub> so one pound of methane is equal to 20 Co<sub>2</sub>e.  Its like saying a chcoclate bar has 20 times the calories as an apple.</p>
                    <div style={tableStyle}>
                        <span style={{textAlign: 'center'}}>Here's a quick list of comment compound and their Co<sub>2</sub>e</span>
                        <table>
                            <tr>
                                <td><b>Compound</b></td>
                                <td><b>Co<sub>2</sub>e</b></td>
                                <td><b>Notes</b></td>
                            </tr>
                            <tr>
                                <td>Co<sub>2</sub></td>
                                <td>1</td>
                                <td>Found everywhere.  Makes up ~80% of global warming</td>
                            </tr>
                            <tr>
                            <tr>
                                <td>Methane</td>
                                <td>20</td>
                                <td>Found in organic decomposition (landfills and swamps).  Makes up ~8% of global warming</td>
                            </tr>
                                <td>NO<sub>x</sub></td>
                                <td>200</td>
                                <td>Found in coal power production  Makes up ~80% of global warming</td>
                            </tr>
                            <tr>
                                <td>SO<sub>x</sub></td>
                                <td>2000</td>
                                <td>EEEEEPPP.  Makes up ~2% of global warming</td>
                            </tr>
                            <tr>
                                <td>Hydroflourous Carbons</td>
                                <td>20,000</td>
                                <td>Found in refrigerants.  Punched a hole in our ozone in the 70s!</td>
                            </tr>
                        </table>
                    </div>
                    

                    <h2>Why use Co<sub>2</sub>e?</h2>
                    <p>Co<sub>2</sub>e lets you compare different things "easily".  The carbon cost of a 10 pounds chair might be 250 pounds of Co<sub>2</sub> while 10 pounds of apples cost 2 pounds of NO<sub>x</sub>.  Without a common unit, people find it difficult to compare the global warming impact of these two items.</p>
                    <p>Scientists have widely adopted Co<sub>2</sub>e and it is pretty common in all climate change publications.</p>

                    <h2>Problems with Co<sub>2</sub>e</h2>
                    <p>Co<sub>2</sub>e isn't relevent unless you're comparing the global warming potential (GWP) of items.  For example, high quanities of Sulfur can cause acid rain and NO<sub>x</sub> can lead to suffocating algae blooms.  These distinctions and side effects are lost with using Co<sub>2</sub>e.</p>

                </div>
			</div>
		);
	}
}
