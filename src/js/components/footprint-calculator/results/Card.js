import React from "react";
import PropTypes from 'prop-types';

export default class Card extends React.Component {

    constructor(props) {
	    super();
	}

	render() {
        const style = {
            marginTop: '15px',
            border: '1px solid gray',
            backgroundColor: 'light gray',
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
                <h2>{this.props.display}</h2>
                <p>Energy Saved: <b>{this.props.amount.toLocaleString()} kwhs</b></p>
                <p style={textStyle}>{this.props.subtext}</p>
                {learnMore}
            </div>
		);
	}
};

Card.propTypes = {
  amount: PropTypes.number,
  display: PropTypes.string,
  subtext: PropTypes.string,
  link: PropTypes.string
};
