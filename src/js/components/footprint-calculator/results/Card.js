import React from "react";
import PropTypes from 'prop-types';

export default class Card extends React.Component {
    static propTypes = {
        amount: PropTypes.number,
        category: PropTypes.string,
        display: PropTypes.string,
        subtext: PropTypes.string,
        link: PropTypes.string
    };

	render() {
        let savings;
        switch(this.props.category) {
            case 'energy':
                savings = (<p>Energy Saved: <b>{this.props.amount.toLocaleString()} kwhs</b></p>);
                break;
            case 'co2':
                savings = (<p>Co<sub>2</sub> Saved: <b>{this.props.amount.toLocaleString()} lb/Co<sub>2</sub>e</b></p>);
                break;
            case 'water':
                savings = (<p>Water Saved: <b>{this.props.amount.toLocaleString()} gallons</b></p>);
                break;
        }

        const subtext = this.props.subtext ? this.props.subtext : '';
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
