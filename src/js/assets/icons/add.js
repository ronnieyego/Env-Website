import React from 'react';
import { string } from 'prop-types';

export default class AddIcon extends React.Component {
    static propTypes = {
        fillColor: string
    }

    render() {
        return (
        <svg xmlns="http://www.w3.org/2000/svg" fill={this.props.fillColor || 'black'} width={this.props.size || '24'} height={this.props.size || '24'} viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
        </svg>
        )
    }   
}
