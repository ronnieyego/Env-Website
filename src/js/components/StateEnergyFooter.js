import React from "react";
import { getFullStateName } from '../utils/state-mappings';

const stateIds = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'US'];

export default class EnergyFooter extends React.Component {
	getLinkHtml(stateIds) {
        const target = this.props.openNewTab ? '_blank' : '_self';
        const links = stateIds.map(state => {
            const href = `/energy/${state}`;
            let html = <a href={href} key={`energy-footer-${state}`} className="state-energy-footer-link" target={target}>{getFullStateName(state)}</a>;
            return html;
        })
        return links;
    }

	render() {
        const stateIdLinks = this.getLinkHtml(stateIds);
		return (
            <div className="state-energy-footer-text-container" >
                <p className="state-energy-footer-text" ><b>Find out more about energy production in each state</b></p>
                <div className="state-energy-footer">
                    {stateIdLinks}
                </div>
            </div>
		);
	}
}