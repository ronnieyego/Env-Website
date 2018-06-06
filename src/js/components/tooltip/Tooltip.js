// Wrapper for tooltip since it likes to awkward render server side ><
import React from "react";
import { string, bool, arrayOf, node, oneOfType} from 'prop-types';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';

import ClientOnlyRenderHoc from '../ClientOnlyRenderHoc';

export default class Tooltip extends React.Component {
    static propTypes = {
        place: string,
        id: string.isRequired,
        children: oneOfType([
            arrayOf(node),
            node
        ]).isRequired
    }

    render() {
        return (
            <ClientOnlyRenderHoc
                component={(
                    <ReactTooltip place="bottom" id={this.props.id} type='dark' effect='solid'>
                        {this.props.children}
                    </ReactTooltip>
                )} 
            />
        );
    }
}