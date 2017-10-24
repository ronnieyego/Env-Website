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
        const style = {
            marginTop: '15px',
            border: '1px solid gray',
            backgroundColor: this.props.color || '',
            textAlign: 'center'
        };
        const textStyle = {
            overflowWrap: 'break-word',
        }
        const subtext = this.props.subtext ? this.props.subtext : '';
        const learnMore = this.props.learnMore ? (
            <a href={this.props.learnMore} target="_blank">Learn More</a>
            ) : '';
		return (
            <div style={style}>
                <h2 style={{fontWeight: 400, marginLeft: '15px', marginRight: '15px'}}>{this.props.display}</h2>
                {this.props.category === 'energy' ? (
                    <p>Energy Saved: <b>{this.props.amount.toLocaleString()} kwhs</b></p>
                ): (
                    <p>Co<sub>2</sub> Saved: <b>{this.props.amount.toLocaleString()} lb/Co<sub>2</sub>e</b></p>
                )}
                
                <p style={textStyle}>{this.props.subtext}</p>
                {learnMore}
            </div>
		);
	}
};
