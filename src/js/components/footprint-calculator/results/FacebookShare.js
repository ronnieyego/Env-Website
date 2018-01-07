import React from 'react';
import PropTypes from 'prop-types';
import {
    ShareButtons,
    //ShareCounts,
    generateShareIcon
  } from 'react-share';


const { FacebookShareButton } = ShareButtons;
const FacebookIcon = generateShareIcon('facebook');

export default class FacebookShare extends React.Component {
    static propTypes = {
        id: PropTypes.number,
        displayText: PropTypes.string
    };

	render() {
        return (
            <FacebookShareButton url={`http://www.footprint-finder.com/footprint/${this.props.id}`} quote="See my narcissistic footprint">
                <div className="social-icon">
                    <FacebookIcon round={true} size={32} />
                </div>
                {this.props.displayText}
            </FacebookShareButton>
        );
    }
}
