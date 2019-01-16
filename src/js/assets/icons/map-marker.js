import React from 'react';
import { string } from 'prop-types';

export default class MapMarker extends React.Component {
    static propTypes = {
        fillColor: string,
        size: string
    }

    render() {
        return (
            <svg 
                width={this.props.size || '24'}
                height={this.props.size || '24'}
                viewBox="0 0 24 24"
                fill={this.props.fillColor || 'white'}
            >
                <path d="M25.015 2.4c-7.8 0-14.121 6.204-14.121 13.854 0 7.652 14.121 32.746 14.121 32.746s14.122-25.094 14.122-32.746c0-7.65-6.325-13.854-14.122-13.854z"/>
            </svg>
        )
    }   
}

