// Wrapper for tooltip since it likes to awkward render server side ><
import React from "react";
import { string, bool, arrayOf, node, oneOfType} from 'prop-types';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';

@connect((store, props) => {
	return {
        isMobile: store.userInfo.isMobile,
        isServerSide: store.metadata.isServerSide,
        store: store
	};
})
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
            <div>
                {!this.props.isServerSide && 
                    <ReactTooltip place="bottom" id={this.props.id} type='dark' effect='solid'>
                        {this.props.children}
                    </ReactTooltip>
                }
            </div>
        )
    }
   
}