import React, { PropTypes } from 'react';
import fetch from 'isomorphic-fetch'

export default class Hello extends React.Component {

    static async getInitialProps({req}) {
        console.log('starting to fetch')
        const res = await fetch('http://localhost:3000/api');
        const json = await res.json()
        return {data: json};
        
    }

	render() {
        console.log('this.props ', this.props);
		return (
			<div className="container-fluid text-center">
				Hello World
			</div>
		);
	}
}
