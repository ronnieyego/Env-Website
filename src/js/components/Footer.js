import React from "react";

export default class Footer extends React.Component {
	constructor() {
		super();
		this.state = {
			first: 'This is the first line of text',
			second: 'This is the second line of text'
		}
	}

	handleChangeText() {
		this.setState({
			first: 'hovered over text',
			second: 'hovered over text'
		});
	}

	render() {
		setTimeout(() => {
			this.setState({
			first: 'hovered over text',
			second: 'hovered over text'
			});
		}, 3000);
		return (
			<div>
				<p>{this.state.first}</p>
				<p>{this.state.second}</p>
			</div>
		);
	}
}