import React from "react";
import { node } from 'prop-types';

export default class ClientRenderOnlyHoc extends React.Component {

    static propTypes = {
        component: node.isRequired
    }
    constructor() {
        super();
        this.state = {
            isClientSide: false
        }
    }

    componentDidMount(event, index, value) {
        this.setState({isClientSide: true});
    };

	render() {

		return this.state.isClientSide ? (
            <div>
                {this.props.component}
            </div>
        ) : 
        (
            <div />
        );
	}
}


