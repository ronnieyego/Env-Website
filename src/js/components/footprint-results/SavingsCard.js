import React from "react";
import { number, string } from 'prop-types';

export default class SavingsCard extends React.Component {
    static propTypes = {
        amount: number,
        category: string,
        display: string,
        link: string
    };

	render() {
        const savings= (<p>CO<sub>2</sub> Saved: <b>{this.props.amount.toLocaleString()} lb/CO<sub>2</sub>e</b></p>);

        const learnMore = this.props.learnMore ? (
            <a href={this.props.learnMore} target="_blank">Learn More</a>
            ) : '';
		return (
            <div className="savings-card" style={{ backgroundColor: this.props.color || ''}}>
                <p className="savings-card-title" >{this.props.display}</p>
                {savings}
                <p className="savings-card-text">{this.props.subtext}</p>
                {learnMore}
            </div>
		);
	}
};
