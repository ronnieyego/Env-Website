import React from "react";
import { getFullStateName } from '../utils/state-mappings';

const stateIds = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'US'];
const styles = {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    margin: '10 auto'
};

export default class EnergyFooter extends React.Component {
	constructor() {
		super();
        const stateIdLinks = this.getLinkHtml(stateIds);
		this.state = {
            stateIdLinks
		}
	}

	getLinkHtml(stateIds) {
        const linkStyle = {
            margin: '10px',
            textAlign: 'center'
        }
        let links = stateIds.map(state => {
            const href = `/energy/${state}`;
            let html = <a href={href} style={linkStyle} target="_blank">{getFullStateName(state)}</a>;
            return html;
        })
        return links;
    }

	render() {
		return (
            <div style={{textAlign: 'center', border: '3px solid gray', marginTop: '5px'}}>
                <p style={{fontSize: '150%', verticalAlign: 'center'}}><b>Find out more about energy production in each state</b></p>
                <div style={styles}>
                    {this.state.stateIdLinks}
                </div>
            </div>
		);
	}
}