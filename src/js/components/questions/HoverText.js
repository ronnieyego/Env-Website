import React from "react";
import { string, number } from 'prop-types';
import ReactTooltip from '../tooltip/Tooltip';

export default class BooleanQuestion extends React.Component {

    static propType = {
        text: string,
        id: number
    }

	render() {
        const id = Math.random();
        return this.props.text ? (
            <span className="question-hover-container">
                <div className="question-help" data-tip data-for={`question-hover-${this.props.id}`}>
                    <i className="material-icons question-icon">help</i> 
                </div>
                <ReactTooltip id={`question-hover-${this.props.id}`} >
                    <p className="question-hover">{this.props.text}</p>
                </ReactTooltip>
            </span>
		) : (
            <span />   
        );
	}
};
